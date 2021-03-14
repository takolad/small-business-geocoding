var activeOn = false;
var inactiveOn = false;
var changedOn = false;

$(document).ready(function(){

    var inactiveB = $("#inactiveButton");
    var activeB = $("#activeButton");
    var changedB = $("#changedButton");
    


    /* This will let you use the .remove() function later on */
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    };
    
    $(".dropdown-trigger").dropdown();
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFrb2xhZCIsImEiOiJja2x5MWRxMG8xNG82MnVwYnp0d2RlenE0In0.B_zd2XTmTSmCPhJtOCo3Vw';
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/takolad/ckm1dmylv9ky817l5rrdpz13q', // style URL
        center: [-98.4870, 29.4227], // starting position [lng, lat]
        zoom: 12.5 // starting zoom
    });



    function flyToStore(currentFeature) {
        map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    };

    function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0])
            popUps[0].remove();
      
        var popup = new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML(
            '<h5>'+ currentFeature.properties.name + '</h5>' + 
            '<p>' + currentFeature.properties.status + '</p>' +
            '<p>' + currentFeature.properties.address + '</p>' + 
            '<p>' + currentFeature.properties.city + '</p>' + 
            '<p>' + currentFeature.properties.country + '</p>' +
            '<p>' + currentFeature.properties.postalCode + '</p>'
            )
          .addTo(map);
    }

    /* Assign a unique ID to each store */
    activeData.features.forEach(function(store, i){
        store.properties.id = i;
    });


    map.on('load', function () {
        // active businesses
        map.addLayer({
            "id": "activeLocations",
            "type": "circle",
            /* Add a GeoJSON source containing place coordinates and information. */
            "source": {
            "type": "geojson",
            "data": activeData
            },
            "layout": {
                "visibility": "none"
            }
        });

        // inactive businesses
        map.addLayer({
            "id": "inactiveLocations",
            "type": "circle",
            /* Add a GeoJSON source containing place coordinates and information. */
            "source": {
            "type": "geojson",
            "data": inactiveData
            },
            "layout": {
                "visibility": "none"
            }
        });

        // changed businesses
        map.addLayer({
            "id": "changedLocations",
            "type": "circle",
            /* Add a GeoJSON source containing place coordinates and information. */
            "source": {
            "type": "geojson",
            "data": changedData
            },
            "layout": {
                "visibility": "none"
            }
        });
    });

    // enumerate ids of the layers
    var toggleableLayerIds = ['activeLocations', 'inactiveLocations', 'changedLocations'];
    var legitIds = ['Active', 'Inactive', 'Changed'];

    // set up the corresponding toggle button for each layer
    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var button = document.createElement('button');
        button.classList.add('waves-effect', 'waves-light', 'cyan', 'accent-4', 'btn-large', 'z-depth-5');
        button.setAttribute('id', id);
        button.innerText = legitIds[i];
        
        button.onclick = function (e) {
        var clickedLayer = this.id;
        e.preventDefault();
        e.stopPropagation();
        
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
        
        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.classList.remove('active');
        } else {
        this.classList.add('active');
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
        };
        var layers = $('.buttons');
        layers.append(button);
    }

    map.on('click', function(e) {

        /* Determine if a feature in the "locations" layer exists at that point. */
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['activeLocations', 'inactiveLocations', 'changedLocations'],
        });
        
        /* If yes, then: */
        if (features.length) {
          var clickedPoint = features[0];
          
          /* Fly to the point */
          flyToStore(clickedPoint);
          
          /* Close all other popups and display popup for clicked store */
          createPopUp(clickedPoint);
        }
    });

    function buildLocationList(data) {
        data.features.forEach(function(store, i){
        
        var prop = store.properties;
    
        /* Add a new listing section to the sidebar. */
        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = "listing-" + data.features[i].properties.id;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';
    
        /* Add the link to the individual listing created above. */
        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.id = "link-" + prop.id;
        link.innerHTML = prop.address;

        /* Add details to the individual listing. */
        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = prop.city;
        if (prop.phone) {
        details.innerHTML += ' · ' + prop.phoneFormatted;
        }
        if (prop.distance) {
        var roundedDistance = Math.round(prop.distance * 100) / 100;
        details.innerHTML +=
            '<p><strong>' + roundedDistance + ' miles away</strong></p>';
        }
        });
    }
});