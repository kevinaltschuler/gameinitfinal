const generateCollectables = function(origin) {
        var radius = 1000;

        var collectables = new Array(10);

        function randLoc(loc, rad) {

            var y0 = loc.lat;
            var x0 = loc.lng;

            var rd = rad / 111300; 

            var u = Math.random();
            var v = Math.random();

            var w = rd * Math.sqrt(u);
            var t = 2 * Math.PI * v;
            var x = w * Math.cos(t);
            var y = w * Math.sin(t);


            var newlat = y + y0;
            var newlon = x + x0;

            return {
                'lat': newlat.toFixed(7),
                'lng': newlon.toFixed(7),
            };
        }

    for (var i = 0; i < collectables.length; i++ ){
        collectables[i] = randLoc(origin, radius);
    }
    return collectables;
}

export default generateCollectables;