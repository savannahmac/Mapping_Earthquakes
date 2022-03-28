// Store API endpoint
let airportData = "https://raw.githubusercontent.com/savannahmac/Mapping_Earthquakes/main/majorAirports.json";

d3.json(airportData, function(data) {
  createFeatures(data.features);
});

// Create the function to hold the data features
function createFeatures(airportMarkers) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h2>" + feature.properties.faa + "</h2> <hr> <h3>" + feature.properties.name + "</h3>");
  }

  var airports = L.geoJSON(airportMarkers, {
    onEachFeature: onEachFeature
  });

  createMap(airports);
}

function createMap(airports) {

// We create the tile layer that will be the background of our map.
// Using 'streets' because it is the street-level map
  let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });

// We create the dark view tile layer that will be an option for our map.
  let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });

// Create a base layer that holds both maps.
  let baseMaps = {
    Street: streets,
    Dark: dark
  };

  var overlayMaps = {
    Airports: airports
  };

  // Create the map object with center, zoom level and default layer.
  let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets, airports]
  });

// Pass our map layers into our layers control and add the layers control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
