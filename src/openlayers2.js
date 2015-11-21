function generateCircles(count, map, mapCenter) {
    var lat, lng, center, tmpLng,
        radius = 1.3,
        vectorLayer, vectorSource,
        fromProjection = new OpenLayers.Projection('EPSG:4326'),
        toProjection = new OpenLayers.Projection('EPSG:900913'),
        circleFeatures = [];

    var allLayers = map.getLayersByClass('OpenLayers.Layer.Vector');
    if (allLayers.length  === 0) {
        vectorLayer = new OpenLayers.Layer.Vector();
    } else {
        vectorLayer = allLayers[0];
    }

    

    for (var i = 0, l = count; i < l; i++) {
        lat = Math.random() * 2 * radius - radius;
        tmpLng = Math.sqrt(radius * radius - lat * lat);
        lng = Math.random() * 2 * tmpLng - tmpLng;
        var circle = OpenLayers.Geometry.Polygon.createRegularPolygon(
                new OpenLayers.Geometry.Point(mapCenter[0] + 2*lat, mapCenter[1] + lng)
                    .transform(fromProjection, toProjection),
                2000,
                30),
            circleFeature = new OpenLayers.Feature.Vector(circle);

        //circleFeatures.push(circleFeature);
        vectorLayer.addFeatures([circleFeature]);
    }


    map.addLayer(vectorLayer);

}

function generatePolygons(count, map, mapCenter) {
}


function clearMap(map) {
    var layer = map.getLayersByClass('OpenLayers.Layer.Vector')[0];
    layer.removeAllFeatures();
}


$(function () {
    var map = new OpenLayers.Map('map'),
        layer = new OpenLayers.Layer.OSM(),
        fromProjection = new OpenLayers.Projection('EPSG:4326'),
        toProjection = new OpenLayers.Projection('EPSG:900913'),
        mapCenter = [37.6155600, 55.7522200],
        position = new OpenLayers.LonLat(mapCenter[0], mapCenter[1]).transform(fromProjection, toProjection),
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
                $('.menu').append("<p> map render: " + elapsedTime + " </p>");

            },0);
        }
    });

    $('#jsClear').click(function(event) {
        clearMap(map);
    });

});

