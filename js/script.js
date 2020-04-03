// Chart
var chart1in, chart1out, chart2in, chart2out;
// Map
var mymap;
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

// Types of Vehicles
var typesOfVehicles = ["Ligeiro", "Pesado", "Motociclo"];
var percentageOfVehicles = [50, 25, 20];

document.getElementById("dateinput").disabled=true;
document.getElementById("dashinput").disabled=true;

fixCanvasSizes();

// ----------------------------------- Chart.js -------------------------------------------
// Create charts
function populateCharts(arg1){
  var id1 = document.getElementById(arg1);
  dashHourReset();
  if(id1.value == "d1"){
    hideHour();

    //Criar Chart In - Parte de Cima
    var chart = document.getElementById("ChartIn");
    chart1in = new Chart(chart, {
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
        responsive: false,
        title: {
          display: true,
          text: 'Traffic Density - IN (Nº Vehicles / Hour)'
        }
      }
    });

  // Criar PieChart IN - Parte de Cima
  var chart = document.getElementById("PieChartIn")
  chart2in = new Chart(chart, {
    type: 'pie',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF"],
          data: percentageOfVehicles
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Types of Vehicles - IN'
      }
    }
  });

  // Criar Chart Out - Parte de Baixo
  var chart = document.getElementById("ChartOut");
  chart1out = new Chart(chart, {
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
      responsive: false,
      title: {
        display: true,
        text: 'Traffic Density - OUT (Nº Vehicles / Hour)'
      }
    }
  });

  // PieChart Out - Parte de Baixo
  var chart = document.getElementById("PieChartOut")
  chart2out = new Chart(chart, {
    type: 'pie',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF"],
          data: percentageOfVehicles
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Types of Vehicles - OUT'
      }
    }
  });
}
  else if(id1.value == "d2"){
  showHour();
  if(chart1in != undefined)
    chart1in.destroy();
  if(chart1out != undefined)
    chart1out.destroy();
  if(chart2in != undefined)
    chart2in.destroy();
  if(chart2out != undefined)
    chart2out.destroy();
  }
}


// Create charts that need hour argument
function updateHourChart(arg1){
  var id1 = document.getElementById(arg1);

  //Criar Chart In - Parte de Cima
    var chart = document.getElementById("ChartIn");
    chart1in = new Chart(chart, {
      type: 'bar',
      data: {
        labels: minutes,
        datasets: [
          {
            label: "Homologous Day",
            backgroundColor: "#3e95cd",
            data: traffic5MinutesHomol
          }, {
            label: "Selected Day",
            backgroundColor: "#3333cd",
            data: traffic5Minutes
          }
        ]
      },
      options: {
        legend: { display: true },
        responsive: false,
        title: {
          display: true,
          text: 'Traffic Density - IN (Nº Vehicles / Hour)'
        }
      }
    });

  // Criar PieChart IN - Parte de Cima
  var chart = document.getElementById("PieChartIn")
  chart2in = new Chart(chart, {
    type: 'pie',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF"],
          data: percentageOfVehicles
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Types of Vehicles - IN'
      }
    }
  });

  // Criar Chart Out - Parte de Baixo
  var chart = document.getElementById("ChartOut");
  chart1out = new Chart(chart, {
    type: 'bar',
    data: {
      labels: minutes,
      datasets: [
        {
          label: "Homologous Day",
          backgroundColor: "#3e95cd",
          data: traffic5MinutesHomol
        }, {
          label: "Selected Day",
          backgroundColor: "#3333cd",
          data: traffic5Minutes
        }
      ]
    },
    options: {
      legend: { display: true },
      responsive: false,
      title: {
        display: true,
        text: 'Traffic Density - OUT (Nº Vehicles / Hour)'
      }
    }
  });

  // PieChart Out - Parte de Baixo
  var chart = document.getElementById("PieChartOut")
  chart2out = new Chart(chart, {
    type: 'pie',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF"],
          data: percentageOfVehicles
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Types of Vehicles - OUT'
      }
    }
  });
}

// ----------------------------------- OpenLayers -------------------------------------------
// Update map div
function getMap(arg1){
  document.getElementById("dateinput").disabled=false;
  document.getElementById("mapdiv").innerHTML = "";
  var id1 = document.getElementById(arg1);
  if(id1.value == "aveiro"){
    var map = new ol.Map({
        target: 'mapdiv',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-8.75278, 40.61771]),
          zoom: 13
        })
      });
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
  mymap.addLayer(vectorLayer);

  var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( -8.732, 40.6268 ).transform(epsg4326, projectTo),
            {description:'A25'} ,
            {externalGraphic: 'Images/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
        );
  vectorLayer.addFeatures(feature);

  controls = {
     selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
  };
  mymap.addControl(controls['selector']);
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
  mymap.addPopup(feature.popup);
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

function fixCanvasSizes(){
  var canvas = document.getElementById("ChartIn");
  var parent = document.getElementById("chart1div1");
  canvas.width = parent.offsetWidth*0.9;
  canvas.height = parent.offsetHeight*0.9;
  var canvas = document.getElementById("PieChartIn");
  var parent = document.getElementById("chart2div1");
  canvas.width = parent.offsetWidth*0.9;
  canvas.height = parent.offsetHeight*0.9;
  var canvas = document.getElementById("ChartOut");
  var parent = document.getElementById("chart1div2");
  canvas.width = parent.offsetWidth*0.9;
  canvas.height = parent.offsetHeight*0.9;
  var canvas = document.getElementById("PieChartOut");
  var parent = document.getElementById("chart2div2");
  canvas.width = parent.offsetWidth*0.9;
  canvas.height = parent.offsetHeight*0.9;
}