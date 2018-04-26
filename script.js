var list;
var hideUnranked = false;
var hideOverwritten = false;

var includeEZ = false
var includeHT = false
var includeHD = false
var includeHR = false
var includeDT = false
var includeFL = false
var includeSO = false

var excludeEZ = false
var excludeHT = false
var excludeHD = false
var excludeHR = false
var excludeDT = false
var excludeFL = false
var excludeSO = false

function onload() {
    refresh()
    filter()
}

function refresh() {
    var options = {
        valueNames: ["pp", "player", "map", "mods", "acc", "rank", "status", "date"],
        item: "<tr><td></td><td class='pp'></td><td class='player'></td><td class='map'></td><td class='mods'><td class='acc'></td><td class='rank'></td><td class='status'></td><td class='date'></td></tr>"
    };

    list = new List("plays", options, values);
    
    list.sort("pp", { order: "desc" });
    
    // TODO rank alphabet = "SABCD"
}

function filter() {
    var o;
    var ls;
    if(document.getElementsByClassName("desc").length == 0) {
        ls = document.getElementsByClassName("asc")[0].getAttribute("data-sort");
        o = "asc";
    } else {
        ls = document.getElementsByClassName("desc")[0].getAttribute("data-sort");
        o = "desc";
    }
    
    list.filter(function(item) {
        if(hideUnranked && item.values().status != "Ranked") return false;
        //else if(hideOverwritten && item.values().overwritten != null && item.values().overwritten == "true") return false
        else if(includeEZ && !item.values().mods.includes("EZ")) return false
        else if(includeHT && !item.values().mods.includes("HT")) return false
        else if(includeHD && !item.values().mods.includes("HD")) return false
        else if(includeHR && !item.values().mods.includes("HR")) return false
        else if(includeDT && !item.values().mods.includes("DT")) return false
        else if(includeFL && !item.values().mods.includes("FL")) return false
        else if(includeSO && !item.values().mods.includes("SO")) return false
        else if(excludeEZ && item.values().mods.includes("EZ")) return false
        else if(excludeHT && item.values().mods.includes("HT")) return false
        else if(excludeHD && item.values().mods.includes("HD")) return false
        else if(excludeHR && item.values().mods.includes("HR")) return false
        else if(excludeDT && item.values().mods.includes("DT")) return false
        else if(excludeFL && item.values().mods.includes("FL")) return false
        else if(excludeSO && item.values().mods.includes("SO")) return false
        else if(hideOverwritten) {
            for(j = 0; j < list.items.length; j++) {
                if(item.values().player == list.items[j].values().player && item.values().map == list.items[j].values().map && item.values().mods == list.items[j].values().mods) {
                    if((Number(item.values().pp) < Number(list.items[j].values().pp) || (item.values().status != "Ranked" && list.items[j].values().status == "Ranked"))) return false
                }
            }
        }
        return true;
    });
    
    document.getElementById("hideUnranked").innerHTML = hideUnranked ? "Show unranked plays" : "Hide unranked plays";
    document.getElementById("hideOverwritten").innerHTML = hideOverwritten ? "Show overwritten plays*" : "Hide overwritten plays*";

    list.sort(ls, { order: o });
}

function filterRanked() {
    hideUnranked = !hideUnranked;
    filter();
}

function filterOverwritten() {
    hideOverwritten = !hideOverwritten;
    filter();
}

function include(mod) {
    switch(mod) {
        case "EZ": includeEZ = !includeEZ; document.getElementById("includeEZ").className = "mod " + (includeEZ ? "on" : "off"); break;
        case "HT": includeHT = !includeHT; document.getElementById("includeHT").className = "mod " + (includeHT ? "on" : "off"); break;
        case "HD": includeHD = !includeHD; document.getElementById("includeHD").className = "mod " + (includeHD ? "on" : "off"); break;
        case "HR": includeHR = !includeHR; document.getElementById("includeHR").className = "mod " + (includeHR ? "on" : "off"); break;
        case "DT": includeDT = !includeDT; document.getElementById("includeDT").className = "mod " + (includeDT ? "on" : "off"); break;
        case "FL": includeFL = !includeFL; document.getElementById("includeFL").className = "mod " + (includeFL ? "on" : "off"); break;
        case "SO": includeSO = !includeSO; document.getElementById("includeSO").className = "mod " + (includeSO ? "on" : "off"); break;
    }
    filter()
}

function exclude(mod) {
    switch(mod) {
        case "EZ": excludeEZ = !excludeEZ; document.getElementById("excludeEZ").className = "mod " + (excludeEZ ? "on" : "off"); break;
        case "HT": excludeHT = !excludeHT; document.getElementById("excludeHT").className = "mod " + (excludeHT ? "on" : "off"); break;
        case "HD": excludeHD = !excludeHD; document.getElementById("excludeHD").className = "mod " + (excludeHD ? "on" : "off"); break;
        case "HR": excludeHR = !excludeHR; document.getElementById("excludeHR").className = "mod " + (excludeHR ? "on" : "off"); break;
        case "DT": excludeDT = !excludeDT; document.getElementById("excludeDT").className = "mod " + (excludeDT ? "on" : "off"); break;
        case "FL": excludeFL = !excludeFL; document.getElementById("excludeFL").className = "mod " + (excludeFL ? "on" : "off"); break;
        case "SO": excludeSO = !excludeSO; document.getElementById("excludeSO").className = "mod " + (excludeSO ? "on" : "off"); break;
    }
    filter()
}