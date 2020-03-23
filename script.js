// Our labels along the x-axis
var hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
var minutes = [5,10,15,20,25,30,35,40,45,50,55,60];
// For drawing the lines
var trafficHour = [86,114,106,106,107,111,133,221,783,2478,86,114,106,106,107,111,133,221,783,2478,133,221,783,2478];
var traffic5Minutes = [282,350,411,502,635,809,947,1402,3700,5267,86,114];

function populateCharts(arg1){
  document.getElementById("Chart").innerHTML = "";
  var id1 = document.getElementById(arg1);
  if(id1.value == "d1"){
    var chart = document.getElementById("Chart");
    var myChart = new Chart(chart, {
      type: 'bar',
      data: {
        labels: hours,
        datasets: [
          {
            backgroundColor: "#3e95cd",
            data: trafficHour
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Traffic Density (Nº Vehicles/Hour)'
        }
      }
    });
  }
  else if(id1.value == "d2"){
    var chart = document.getElementById("Chart");
    var myChart = new Chart(chart, {
      type: 'bar',
      data: {
        labels: minutes,
        datasets: [
          {
            backgroundColor: "#8e5ea2",
            data: traffic5Minutes
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Traffic Density (Nº Vehicles / 5 Minutes)'
        }
      }
    });
  }
}

function getMap(arg1){
  document.getElementById("map").innerHTML = "";
  var id1 = document.getElementById(arg1);
  if(id1.value == "aveiro"){
    // ------------------------------------ MAP --------------------------------------
    var map = new ol.Map({
      target: 'map',
      layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })],
      view: new ol.View({
        center: ol.proj.fromLonLat([-8.75278, 40.61771]),
        zoom: 13})
    });

    // ------------------------------------ MARKER -----------------------------------
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    
    markers.addMarker(new OpenLayers.Marker([-8.75278, 40.61771]));
    
    map.setCenter (lonLat, zoom);
  }

  else if(id1.value == "porto"){
    var map = new ol.Map({
      target: 'map',
      layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })],
      view: new ol.View({
        center: ol.proj.fromLonLat([-8.61099, 41.14961]),
        zoom: 13})
    });
  }
}

// Graph.js -> https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/
// OpenLayers -> https://openlayers.org/