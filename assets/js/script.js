$(document).ready(function(){
    // import Data from "../json/data.json"
    $(".dropdown-trigger").dropdown();
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFrb2xhZCIsImEiOiJja2x5MWRxMG8xNG82MnVwYnp0d2RlenE0In0.B_zd2XTmTSmCPhJtOCo3Vw';
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/takolad/ckm1dmylv9ky817l5rrdpz13q', // style URL
        center: [-98.4870, 29.4227], // starting position [lng, lat]
        zoom: 12.5 // starting zoom
    });
})

