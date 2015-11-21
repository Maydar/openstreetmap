function generateCircles(map, points) {
    points.forEach(function(circle) {
        L.circle(circle.center, circle.radius).addTo(map);
    });
}

function generateCirclesOnFlight(count, map, mapCenter, layerGroup) {

    var lat, lng, center, tmpLng,
        radius = 1.3;

    for (var i = 0, l = count; i < l; i++) {
        lat = Math.random() * 2 * radius - radius;
        tmpLng = Math.sqrt(radius * radius - lat * lat);
        lng = Math.random() * 2 * tmpLng - tmpLng;
        center = L.latLng(mapCenter.lat + lat, mapCenter.lng + 2*lng);
        layerGroup.addLayer(L.circle(center, Math.random() * 500));
    }

    layerGroup.addTo(map);
}

function generatePolygons(count, map, mapCenter) {
    var radius = 1.3;
    for (var i = 0, l = count; i < l; i++) {
        var lat = Math.random() * 2 * radius - radius,
            tmpLng = Math.sqrt(radius * radius - lat * lat);
            lng = Math.random() * 2 * tmpLng - tmpLng;

        var a = L.latLng(mapCenter.lat + lat, mapCenter.lng + 2*lng),
            b = L.latLng(a.lat + Math.random() * 0.1, a.lng + Math.random() * 0.1),
            c = L.latLng(a.lat + Math.random() * 0.1, a.lng + Math.random() * 0.1);

        L.polygon([a,b,c]).addTo(map);
    }
}




function clearMap(layerGroup) {
    layerGroup.clearLayers();
}


$(function () {

    var mapCenter = L.latLng(55.75222, 37.61556),
        map = L.map('map').setView(mapCenter, 8),
        layerGroup = L.layerGroup();

    L.tileLayer('http://localhost:8000/osm/{z}/{x}/{y}.png', {
        attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    $('#jsCreate').click(function(event) {
        var count = Number($('#jsCount').val());
        var elapsedTime;
        if (count > 0) {

            var start = new Date().getTime();
            generateCirclesOnFlight(count, map, mapCenter, layerGroup);
            setTimeout(function() {
                var end = new Date().getTime();
                elapsedTime = end - start;
                console.log("Map render time %d milliseconds ", elapsedTime);
                $('.menu').append("<p> map render: " + elapsedTime + " </p>");
            },0);
        }
    });

    $('#jsClear').click(function(event) {
        clearMap(layerGroup);
    });

});

