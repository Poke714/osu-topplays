var list;
var hideTouchscreen = false;
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

function filterA() {
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
        if(hideUnranked && item.values().status != "Ranked")
            return false;
        else if(hideTouchscreen && item.values().touchscreen == "true")
            return false
        else return true;
    });
    
    document.getElementById("hideTouchscreen").innerHTML = hideTouchscreen ? "Show touchscreen plays" : "Hide touchscreen plays";
    document.getElementById("hideUnranked").innerHTML = hideUnranked ? "Show all plays" : "Hide unranked plays";

    list.sort(ls, { order: o });
}

function filterTouchscreen() {
    hideTouchscreen = !hideTouchscreen;
    filterA();
}

function filterRanked() {
    hideUnranked = !hideUnranked;
    filterA();
}