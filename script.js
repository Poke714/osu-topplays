function refresh() {
    var options = {
        valueNames: ["pp", "player", "map", "mods", "acc", "rank", "status"],
        item: "<tr><td></td><td class='pp'></td><td class='player'></td><td class='map'></td><td class='mods'><td class='acc'></td><td class='rank'></td><td class='status'></td></tr>"
    };

    var list = new List("plays", options, values);
    
    list.sort("pp", { order: "desc" });
}
