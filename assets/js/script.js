$(document).ready(function(){
<<<<<<< HEAD
  // import Data from "../json/data.json"
  $(".dropdown-trigger").dropdown();
  mapboxgl.accessToken = 'pk.eyJ1IjoidGFrb2xhZCIsImEiOiJja2x5MWRxMG8xNG82MnVwYnp0d2RlenE0In0.B_zd2XTmTSmCPhJtOCo3Vw';
  var map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/takolad/ckm1dmylv9ky817l5rrdpz13q', // style URL
      center: [-98.4870, 29.4227], // starting position [lng, lat]
      zoom: 12.5 // starting zoom
  });
  map.on('load', function (e) {
    /* Add the data to your map as a layer */
    map.addLayer({
      "id": "locations",
      "type": "circle",
      /* Add a GeoJSON source containing place coordinates and information. */
      "source": {
        "type": "geojson",
        "data": muhData
      }
    });
  });
<<<<<<< HEAD
})
=======
    $(".dropdown-trigger").dropdown();
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFrb2xhZCIsImEiOiJja2x5MWRxMG8xNG82MnVwYnp0d2RlenE0In0.B_zd2XTmTSmCPhJtOCo3Vw';
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/takolad/ckm1dmylv9ky817l5rrdpz13q', // style URL
        center: [-98.4870, 29.4227], // starting position [lng, lat]
        zoom: 12.5 // starting zoom
    });

    // Big Willie's Map Time
    map.on('load', function (e) {
        /* Add the data to your map as a layer */
        for (var i = 0; i < muhData.features.length; i++) {
            map.addLayer({
                "id": "locations" + i,
                "type": "circle",
                /* Add a GeoJSON source containing place coordinates and information. */
                "source": {
                "type": "geojson",
                "data": muhData.features[i],
                }
            });
        }
    });
});
>>>>>>> e6a2c1ba3e0e1a647cd14793ce59fb8a554b7296
=======
});
>>>>>>> 9b11f465bc58c9ddb48d92f2188e0c0407271922
