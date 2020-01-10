// Create a map object
var myMap = L.map("map", {
    center: [35.2, -79.79],
    zoom: 8
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);
  
// Add county boundaries
d3.json("NC_Counties.geojson", function(data) {
  L.geoJson(data).addTo(myMap);
});

// Add school points
d3.json("df_schools_geojson.geojson", function(data) {
  L.geoJson(data).addTo(myMap);
});

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature) {

//         // Conditionals for circle color based on magnitude
//         var color = "";
//         if (feature.properties.mag > 3) {
//             color = "#a50f15",
//             fillcolor = "#a50f15"
//         }
//         else if (feature.properties.mag > 2.5) {
//             color = "#de2d26",
//             fillcolor = "#de2d26"
//         }
//         else if (feature.properties.mag > 2) {
//             color = "#fb6a4a",
//             fillcolor = "#fb6a4a"
//         }
//         else if (feature.properties.mag > 1.5) {
//             color = "#fcae91",
//             fillcolor = "#fcae91"
//         }
//         else {
//             color = "#fee5d9",
//             fillcolor = "#fee5d9"
//         }
      
//         // Add circles to map with popup
//         L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
//             fillOpacity: 0.4,
//             color: color,
//             fillColor: fillcolor,
//             // Adjust radius
//             radius: feature.properties.mag * 2500
//             }).bindPopup("<h3>" + feature.properties.place + "<p>" + "Magnitude: "  + feature.properties.mag +
//                 "</h3><hr><p>" + new Date(feature.properties.time) + "</p>").addTo(myMap);

//   };

//   L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

// };

// var legend = L.control({ position: "bottomleft" });

// legend.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   div.innerHTML += "<h3>Earthquakes Past 7 Days:<br>by Richter Scale</h3>";
//   div.innerHTML += '<i style="background: #a50f15"></i><span> > 3</span><br>';
//   div.innerHTML += '<i style="background: #de2d26"></i><span> > 2.5</span><br>';
//   div.innerHTML += '<i style="background: #fb6a4a"></i><span> > 2</span><br>';
//   div.innerHTML += '<i style="background: #fcae91"></i><span>> 1.5</span><br>';
//   div.innerHTML += '<i style="background: #fee5d9"></i><span> <= 1.5</span><br>';
//   div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i>';
  
//   return div;
// };

// legend.addTo(myMap);

