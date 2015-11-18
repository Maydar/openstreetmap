function generateCircles(count, map, mapCenter) {
    var lat, lng, center, tmpLng,
        radius = 1.3,
        vectorLayer, vectorSource;

    var allLayers = map.getLayersByClass('OpenLayers.Layer.Vector');
    if (allLayers.length > 1) {

    }

    for (var i = 0, l = count; i < l; i++) {
        lat = Math.random() * 2 * radius - radius;
        tmpLng = Math.sqrt(radius * radius - lat * lat);
        lng = Math.random() * 2 * tmpLng - tmpLng;
        center = [mapCenter[0] + 2*lat, mapCenter[1] + lng];

    }

}

function generatePolygons(count, map, mapCenter) {
}


function clearMap(map) {

}


$(function () {
    var map = new OpenLayers.Map('map'),
        layer = new OpenLayers.Layer.OSM(),
        fromProjection = new OpenLayers.Projection('EPSG:4326'),
        toProjection = new OpenLayers.Projection('EPSG:900913'),
        mapCenter = new OpenLayers.LonLat(37.6155600,55.7522200).transform(fromProjection, toProjection),
        zoom = 8;

    map.addLayer(layer);
    map.setCenter(position, zoom);


    $('#jsCreate').click(function(event) {
        var count = Number($('#jsCount').val());
        var elapsedTime;
        if (count > 0) {
            var start = new Date().getTime();
            generateCircles(count, map, mapCenter);
            setTimeout(function() {
                var end = new Date().getTime();
                elapsedTime = end - start;
                console.log("Map render time %d milliseconds ", elapsedTime);

            },0);
        }
    });

    $('#jsClear').click(function(event) {
        clearMap(map);
    });

});

