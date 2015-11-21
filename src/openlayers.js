function generateCircles(count, map, mapCenter) {

    var lat, lng, center, tmpLng,
        radius = 1.3,
        vectorSource, vectorLayer;

    if (map.getLayers().getLength() > 1) {
        vectorLayer = map.getLayers().getArray()[1];
        vectorSource = vectorLayer.getSource();
        map.removeLayer(vectorLayer);
    } else {
        vectorSource = new ol.source.Vector({
            projection: 'EPSG:3857'
        });
    }


    for (var i = 0, l = count; i < l; i++) {
        lat = Math.random() * 2 * radius - radius;
        tmpLng = Math.sqrt(radius * radius - lat * lat);
        lng = Math.random() * 2 * tmpLng - tmpLng;
        center = [mapCenter[0] + 2*lat, mapCenter[1] + lng];
        var circle = new ol.geom.Circle(ol.proj.transform(center, "EPSG:4326", "EPSG:3857"), 2000);
        var circleFeature = new ol.Feature(circle);


        vectorSource.addFeature(circleFeature);

    }

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });

    map.addLayer(vectorLayer);


}

function generatePolygons(count, map, mapCenter) {
}


function clearMap(map) {
    map.getLayers().getArray()[1].getSource().clear();

}


$(function () {

    var mapCenter = [37.6155600, 55.7522200];
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(/*{
                    url: 'http://localhost:8000/osm/{z}/{x}/{y}.png',
                    crossOrigin: 'Anon'
                }*/)
            })
        ],

        view: new ol.View({
            center: ol.proj.transform(mapCenter, "EPSG:4326", "EPSG:3857"),
            zoom: 8
        }),
        target: 'map'
    });



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

