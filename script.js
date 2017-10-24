var list;
var touchscreen = true;

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
    touchscreen = !touchscreen;
    list.filter(function(item) {
        if(!touchscreen)
            return item.values().touchscreen != "true";
        else return true;
    });
    console.log(touchscreen)
    document.getElementById("touchscreen").innerHTML = touchscreen ? "Hide touchscreen plays" : "Show touchscreen plays"
}