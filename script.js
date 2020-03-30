// Chart
var myChart;

// Chart x axis
var hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
var minutes = [5,10,15,20,25,30,35,40,45,50,55,60];

// Chart y axis
var trafficHour = [86,114,106,106,107,111,133,221,783,2478,86,114,106,106,107,111,133,221,783,2478,133,221,783,2478];
var trafficHourHomol = [863,120,806,306,407,511,633,121,683,2978,186,214,706,606,507,511,633,321,283,1478,433,321,683,1478];
var traffic5Minutes = [282,350,411,502,635,809,947,1402,3700,5267,86,114];
var traffic5MinutesHomol = [382,150,511,202,135,909,1047,402,1000,2267,286,314];

// Hour charts data TEMPORARY
var traffic5Minutesh0 = [282,350,411,502,635,809,947,1402,3700,5267,86,114];
var traffic5MinutesHomolh0 = [382,150,511,202,135,909,1047,402,1000,2267,286,314];
var traffic5Minutesh1 = [282,350,411,502,635,809,947,1402,3700,5267,86,114];
var traffic5MinutesHomolh1 = [382,150,511,202,135,909,1047,402,1000,2267,286,314];

// ----------------------------------- Chart.js -------------------------------------------
// Create charts
function populateCharts(arg1){
  var id1 = document.getElementById(arg1);
  if(myChart != undefined)
    myChart.destroy();
  if(id1.value == "d1"){
    hideHour();
    var chart = document.getElementById("Chart");
    myChart = new Chart(chart, {
      type: 'bar',
      data: {
        labels: hours,
        datasets: [
          {
            label: "Selected Day",
            backgroundColor: "#3e95cd",
            data: trafficHour
          }, {
            label: "Homologous Day",
            backgroundColor: "#3333cd",
            data: trafficHourHomol
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Traffic Density (Nº Vehicles / Hour)'
        }
      }
    });
  }
  else if(id1.value == "d2"){
    showHour();
    var chart = document.getElementById("Chart");
    myChart = new Chart(chart, {
      type: 'bar',
      data: {
        labels: minutes,
        datasets: [
          {
            label: "Selected Day",
            backgroundColor: "#8e5ea2",
            data: traffic5Minutes
          }, {
            label: "Homologous Day",
            backgroundColor: "#2e42a2",
            data: traffic5MinutesHomol
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Traffic Density (Nº Vehicles / 5 Minutes)'
        }
      }
    });
  }
}

// Update charts with x axis -> hours
/*function updateHourChart(arg1){
  var id1 = document.getElementById(arg1);
  removeData(myChart);
  if(id1 == "h0"){
    addData(myChart, "Selected Day", traffic5Minutesh0);
    addData(myChart, "Homologous Day", traffic5MinutesHomolh0);
  }
  else if(id1 == "h1"){
    addData(myChart, "Selected Day", traffic5Minutesh1);
    addData(myChart, "Homologous Day", traffic5MinutesHomolh1);
  }
}*/

// Add data to a chart
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
// Remove Data from a chart
function removeData(chart) {
    //chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

// ----------------------------------- OpenLayers -------------------------------------------
// Update map div
function getMap(arg1){
  document.getElementById("map").innerHTML = "";
  var id1 = document.getElementById(arg1);
  if(id1.value == "aveiro"){
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

// Add data to a chart
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
// Remove Data from a chart
function removeData(chart) {
    //chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


// ----------------------------------- HTML -------------------------------------------
// Hide hour selection div
function hideHour() {
  var x = document.getElementById("selHour");
  x.style.visibility = "hidden";
}

// Hhow hour selection div
function showHour() {
  var x = document.getElementById("selHour");
  x.style.visibility = "visible";
}