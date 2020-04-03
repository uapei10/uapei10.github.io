// Chart
var myChart;
// Map
var map;
// Popup Controls
var controls;

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

// Types of Vehicles
var typesOfVehicles = ["Ligeiro", "Pesado", "Motociclo", "Peão"];
var percentageOfVehicles = [50, 25, 20, 5];

document.getElementById("dateinput").disabled=true;
document.getElementById("dashinput").disabled=true;

// ----------------------------------- Chart.js -------------------------------------------
// Create charts
function populateCharts(arg1){
  var id1 = document.getElementById(arg1);
  dashHourReset();
  if(myChart != undefined)
    myChart.destroy();
  if(id1.value == "d1"){
    hideHour();
    //Criar Chart In - Parte de Cima
    var chart = document.getElementById("ChartIn");
    myChart = new Chart(chart, {
      type: 'bar',
      data: {
        labels: hours,
        datasets: [
          {
            label: "Homologous Day",
            backgroundColor: "#3e95cd",
            data: trafficHourHomol
          }, {
            label: "Selected Day",
            backgroundColor: "#3333cd",
            data: trafficHour
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Traffic Density - IN (Nº Vehicles / Hour)'
        }
      }
    });
  //Criar PieChart IN - Parte de Cima
  var chart = document.getElementById("PieChartIn")
  var myChart = new Chart(chart, {
    type: 'pie',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: "#3333cd",
          data: percentageOfVehicles
        }
      ]
    },
    options: {
      legend: {display: true},
      title: {
        display: true,
        text: 'Types of Vehicles - IN'
      }
    }
  });
  //Criar Chart Out - Parte de Baixo
  var chart = document.getElementById("ChartOut");
  myChart = new Chart(chart, {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [
        {
          label: "Homologous Day",
          backgroundColor: "#3e95cd",
          data: trafficHourHomol
        }, {
          label: "Selected Day",
          backgroundColor: "#3333cd",
          data: trafficHour
        }
      ]
    },
    options: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Traffic Density - OUT (Nº Vehicles / Hour)'
      }
    }
  });
  //PieChart Out - Parte de Baixo
  var chart = document.getElementById("PieChartOut")
  var myChart = new Chart(chart, {
    type: 'pie',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: "#3333cd",
          data: percentageOfVehicles
        }
      ]
    },
    options: {
      legend: {display: true},
      title: {
        display: true,
        text: 'Types of Vehicles - OUT'
      }
    }
  });
}
  else if(id1.value == "d2"){
    showHour();
  }
}


// Create charts that need hour argument
function updateHourChart(arg1){
  var id1 = document.getElementById(arg1);
  if(myChart != undefined)
    myChart.destroy();
  var chart = document.getElementById("Chart");
  myChart = new Chart(chart, {
    type: 'bar',
    data: {
      labels: minutes,
      datasets: [
        {
          label: "Homologous Day",
          backgroundColor: "#8e5ea2",
          data: traffic5MinutesHomol
        }, {
          label: "Selected Day",
          backgroundColor: "#2e42a2",
          data: traffic5Minutes
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
  document.getElementById("dateinput").disabled=false;
  document.getElementById("mapdiv").innerHTML = "";
  var id1 = document.getElementById(arg1);
  if(id1.value == "aveiro"){
    map = new OpenLayers.Map("mapdiv", {
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.ArgParser(),
        new OpenLayers.Control.Attribution()]
    });
    map.addLayer(new OpenLayers.Layer.OSM());
    epsg4326 =  new OpenLayers.Projection("EPSG:4326");
    projectTo = map.getProjectionObject();
    var lonLat = new OpenLayers.LonLat( -8.75278 ,40.61771 ).transform(epsg4326, projectTo);
    var zoom=13;
    map.setCenter (lonLat, zoom);
    addAveiroMarkers();
  }
}

//Adds Aveiro Markers
function addAveiroMarkers(){
  var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
  var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( -8.75278, 40.61771 ).transform(epsg4326, projectTo),
            {description:'Av. José Estevão'} ,
            {externalGraphic: 'Images/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
        );
  vectorLayer.addFeatures(feature);
  map.addLayer(vectorLayer);

  var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( -8.732, 40.6268 ).transform(epsg4326, projectTo),
            {description:'A25'} ,
            {externalGraphic: 'Images/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
        );
  vectorLayer.addFeatures(feature);

  controls = {
     selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
  };
  map.addControl(controls['selector']);
  controls['selector'].activate();
}

// Creates Popup
function createPopup(feature) {
  feature.popup = new OpenLayers.Popup.FramedCloud("pop",
    feature.geometry.getBounds().getCenterLonLat(),
    null,
    '<div style="text-align:center">' +feature.attributes.description +'<br><button type="button">Select</button>' +'</div>',
    null,
    false,
    function() { controls['selector'].unselectAll(); }
  );
  map.addPopup(feature.popup);
}

// Destroys Popup
function destroyPopup(feature) {
  feature.popup.destroy();
  feature.popup = null;
}

// ----------------------------------- Dates -------------------------------------------
function updateDate(arg1){
  document.getElementById("dashinput").disabled=false;
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

// Reset Droplist
function dashHourReset() {
  var dropDown = document.getElementById("dashhour");
  dropDown.selectedIndex = 0;
}
