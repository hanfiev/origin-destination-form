mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuZmlldiIsImEiOiJQYlFjVlNvIn0.ukrwZz0v6BXZEOsJHBdgDg';
var originMap = new mapboxgl.Map({
    container: 'originMap',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [106.827153, -6.175392], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

var destinationMap = new mapboxgl.Map({
    container: 'destinationMap',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [106.827153, -6.175392], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

var originMarker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([106.827153, -6.175392])
    .addTo(originMap);

var destinationMarker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([106.827153, -6.175392])
    .addTo(destinationMap);

originMap.on('click', function (e) {
    let originLat = e.lngLat.lat;
    let originLng = e.lngLat.lng;
    
    let queryCoord = originLat + ',' + originLng
    originMarker.setLngLat(e.lngLat);
    geocoding(queryCoord)
});

destinationMap.on('click', function (e) {
    let destinationLat = e.lngLat.lat;
    let destinationLng = e.lngLat.lng;
    
    let destinationCoord = destinationLat + ', ' + destinationLng;
    document.getElementById('destination').value = destinationCoord;
    destinationMarker.setLngLat(e.lngLat);
});

// synchronize the map zoom level and center coordinate of origin and destination map
originMap.on('dragend', function (e) {
    let originCenter = originMap.getCenter();
    let originZoom = originMap.getZoom();
    destinationMap.setCenter(originCenter);
    destinationMap.setZoom(originZoom);
});

originMap.on('zoomend', function () {
    let originCenter = originMap.getCenter();
    let originZoom = originMap.getZoom();
    destinationMap.setCenter(originCenter);
    destinationMap.setZoom(originZoom);
});

destinationMap.on('dragend', function (e) {
    let destinationCenter = destinationMap.getCenter();
    let destinationZoom = destinationMap.getZoom();
    originMap.setCenter(destinationCenter);
    originMap.setZoom(destinationZoom);
});

destinationMap.on('zoomend', function () {
    let destinationCenter = destinationMap.getCenter();
    let destinationZoom = destinationMap.getZoom();
    originMap.setCenter(destinationCenter);
    originMap.setZoom(destinationZoom);
});

$("#origin").focus(function () {
    $("#originMap").show()
    $("#destinationMap").hide()
    
    originMap.resize();
});
$("#destination").focus(function () {
    $("#originMap").hide()
    $("#destinationMap").show()
    
    destinationMap.resize();

});

//marker
originMarker.on('dragend', function (e) {
    let lngLat = originMarker.getLngLat();
    let queryCoord = lngLat.lat + ',' + lngLat.lng
    geocoding(queryCoord)

});

destinationMarker.on('dragend', function (e) {
    let lngLat = destinationMarker.getLngLat();
    document.getElementById('destination').value = lngLat.lat + ', ' + lngLat.lng
});

function selectOccupation() {
    if (document.getElementById('occupation').value == "Lainnya") {
        $("#other_occupation").prop('disabled', false);
    } else {
        $("#other_occupation").prop('disabled', true);

    }
}

function selectFrequency() {
    
    if (document.getElementById('sudahKeKantor').checked == true) {
        $("#less").prop('disabled', false);
        $("#more").prop('disabled', false);

    } else {
        $("#less").prop('disabled', true);
        $("#more").prop('disabled', true);

    }
}

function geocoding(coord) {
    
    let query = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coord + "&key=AIzaSyABkPJiUqaQ3bqgyV_-d2itIY1cnsegSC8"
    fetch(query)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('origin').value = data.results[0].plus_code.compound_code.substr(7);
        });
}

function transportType(){
    var transportChecked = [];
    $.each($("input[name='transport_type']:checked"), function(){
        transportChecked .push($(this).val());
    });

    document.getElementById('transport_type').value = transportChecked.join(", ");

}

