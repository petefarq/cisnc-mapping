// Create a map object
var myMap = L.map("map", {
    center: [35.2, -79.79],
    zoom: 8
});
  
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
}).addTo(myMap);

// Add county boundaries
d3.json("NC_Counties.geojson", function(data) {
 
  county_colors = d3.csv("county_tier_colors.csv");

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    layer.bindTooltip(feature.properties.CO_NAME,
    {className: 'popup', permanent: true, direction:"center", opacity: 1})
  };

  function style(feature) {
      
      // function getColor(d) {

      //     var color = "";

      //     for (var i = 0; i < county_colors.length; i++) {
      //       console.log(county_colors[i].CO_NAME);
      //       if (county_colors[i].CO_NAME == CO_NAME) {
      //         color = county_colors[i].hue;
      //         break;
      //       }
      //     }
      //     return color;
      // };    
        
      return {
          fillColor: "white",
          fillOpacity: 0,
          weight: 1,
          opacity: 1,
          color: "black"
      }
  }
  
  L.geoJson(data, {onEachFeature: onEachFeature, style: style, interactive: false}).addTo(myMap).openTooltip();

}); 

// Add school circles

var cis_df_color = "#1f78b4"
var cis_abc_color = "#33a02c"
var df_color = "#ff7f00"

d3.json("all_schools_gj.geojson", function(data) {

  createFeatures(data.features)
});

function createFeatures(schoolData) {

  function onEachFeature(feature) {
        // Conditionals for circle color based on CISNC schools        
        
        var color = "";
        if (feature.properties.CISNC_school == "yes" && (feature.properties.S_P_grade == "D" || feature.properties.S_P_grade == "F")) {
            color = cis_df_color,
            fillcolor = cis_df_color
        }
        else if (feature.properties.CISNC_school == "yes" && (feature.properties.S_P_grade != "D" && feature.properties.S_P_grade != "F")) {
            color = cis_abc_color,
            fillcolor = cis_abc_color
        }
        else {
          color = df_color,
          fillcolor = df_color
        }
        
        // Add circles to map with popup
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillOpacity: .5,
            color: color,
            fillColor: fillcolor,
            radius: 1500
            }).bindPopup("<p><strong>" + feature.properties.name + "</strong><br>" +
                        feature.properties.district + "<br>" +
                        "CISNC school: "  + feature.properties.CISNC_school + "<br>" +
                        "CISNC Affiliate: "  + feature.properties.affiliate + "<br>" +
                        "SP Grade: "  + feature.properties.S_P_grade + "<br>" +
                        "EOG: "  + feature.properties.EOG + "%" +  "<br>" +
                        "Growth: " + feature.properties.growth_status + "<br>" +
                        "Graduation Rate: " + feature.properties.grad_rate + "%" + "<br>" +
                        "Econ Disadvantaged: "  + feature.properties.percent_EDS + "%" + "</p>")
            .addTo(myMap);   
  }
  
  L.geoJSON(schoolData, {
    onEachFeature: onEachFeature
  });

};

// Add legend

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += `<i style="background: ${cis_abc_color}"></i><span>CISNC Schools, Grade A/B/C</span><br>`;
  div.innerHTML += `<i style="background: ${cis_df_color}"></i><span style="color:black; font-size: 20px;">CISNC Schools, Grade D/F</span><br>`;
  div.innerHTML += `<i style="background: ${df_color}"></i><span style="color:black; font-size: 20px;">Non-CISNC Schools, Grade D/F</span><br>`;
  
  return div;
};

legend.addTo(myMap);

// Add Title
var title = L.control({ position: "topright" });

title.onAdd = function() {
  var div = L.DomUtil.create("div");
  div.innerHTML += `<span style="color:black; font-size: 24px;"><strong>CISNC Schools and D/F Performance Grade Schools</strong></span>`;
  return div;
};

title.addTo(myMap);

