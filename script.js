var list;
var touchscreen = true;
var hideUnranked = false;

function refresh() {
    var options = {
        valueNames: ["pp", "player", "map", "mods", "acc", "rank", "status", "date"],
        item: "<tr><td></td><td class='pp'></td><td class='player'></td><td class='map'></td><td class='mods'><td class='acc'></td><td class='rank'></td><td class='status'></td><td class='date'></td></tr>"
    };

    list = new List("plays", options, values);
    
    list.sort("pp", { order: "desc" });
    
    // TODO rank alphabet = "SABCD"
}


function filterTouchscreen() {
    var o;
    var ls;
    if(document.getElementsByClassName("desc").length == 0) {
        ls = document.getElementsByClassName("asc")[0].getAttribute("data-sort");
        o = "asc";
    } else {
        ls = document.getElementsByClassName("desc")[0].getAttribute("data-sort");
        o = "desc";
    }
    
    touchscreen = !touchscreen;
    list.filter(function(item) {
        if(!touchscreen)
            return item.values().touchscreen != "true";
        else return true;
    });
    document.getElementById("touchscreen").innerHTML = touchscreen ? "Hide touchscreen plays" : "Show touchscreen plays";

    list.sort(ls, { order: o });
}

function filterRanked() {
    var o;
    var ls;
    if(document.getElementsByClassName("desc").length == 0) {
        ls = document.getElementsByClassName("asc")[0].getAttribute("data-sort");
        o = "asc";
    } else {
        ls = document.getElementsByClassName("desc")[0].getAttribute("data-sort");
        o = "desc";
    }
    
    hideUnranked = !hideUnranked;
    list.filter(function(item) {
        if(hideUnranked)
            return item.values().status == "Ranked";
        else return true;
    });
    document.getElementById("hideUnranked").innerHTML = hideUnranked ? "Show all plays" : "Hide unranked plays";

    list.sort(ls, { order: o });
}