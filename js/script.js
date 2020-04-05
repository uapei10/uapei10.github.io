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
var trafficHourin = new Array();
var trafficHourHomolin = new Array();
var trafficHourout = new Array();
var trafficHourHomolout = new Array();
var traffic5Minutesin = new Array();
var traffic5MinutesHomolin = new Array();
var traffic5Minutesout = new Array();
var traffic5MinutesHomolout = new Array();

// Types of Vehicles
var typesOfVehicles = ["Light", "Heavy", "Bike", "Person"];
var percentageOfVehiclesin = new Array();
var percentageOfVehiclesout = new Array();

// Blocks date input and dashboard input
document.getElementById("dateinput").disabled=true;
document.getElementById("dashinput").disabled=true;

// Adjusts chart sizes to windows size
fixCanvasSizes();

// Hides text below map
hideInfo();

// ----------------------------------- Chart.js -------------------------------------------
// Create charts
function populateCharts(arg1){
  var id1 = document.getElementById(arg1);
  dashHourReset();
  resetGraphs();
  getyData()
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
            label: "Homologous Date",
            backgroundColor: "#3e95cd",
            data: trafficHourHomolin
          }, {
            label: "Selected Date",
            backgroundColor: "#3333cd",
            data: trafficHourin
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
    type: 'doughnut',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF", "#0089AB"],
          data: percentageOfVehiclesin
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Categorization - IN'
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
          label: "Homologous Date",
          backgroundColor: "#3e95cd",
          data: trafficHourHomolout
        }, {
          label: "Selected Date",
          backgroundColor: "#3333cd",
          data: trafficHourout
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
    type: 'doughnut',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF", "#0089AB"],
          data: percentageOfVehiclesout
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Categorization - OUT'
      }
    }
  });
}
  else if(id1.value == "d2"){
    showHour();
    resetGraphs();
  }
}

// Create charts that need hour argument
function updateHourChart(arg1){
  var id1 = document.getElementById(arg1);
  resetGraphs();
  getyData()

  // Criar Chart In - Parte de Cima
    var chart = document.getElementById("ChartIn");
    chart1in = new Chart(chart, {
      type: 'bar',
      data: {
        labels: minutes,
        datasets: [
          {
            label: "Homologous Date",
            backgroundColor: "#3e95cd",
            data: traffic5MinutesHomolin
          }, {
            label: "Selected Date",
            backgroundColor: "#3333cd",
            data: traffic5Minutesin
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
    type: 'doughnut',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF", "#0089AB"],
          data: percentageOfVehiclesin
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Categorization - IN'
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
          label: "Homologous Date",
          backgroundColor: "#3e95cd",
          data: traffic5MinutesHomolout
        }, {
          label: "Selected Date",
          backgroundColor: "#3333cd",
          data: traffic5Minutesout
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
    type: 'doughnut',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF", "#0089AB"],
          data: percentageOfVehiclesout
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: 'Categorization - OUT'
      }
    }
  });
}

// ----------------------------------- Leaflet ------------------------------------------- https://leafletjs.com/examples/quick-start/
// Update map div
function getMap(arg1){
  document.getElementById("mapdiv").innerHTML = "";
  var id1 = document.getElementById(arg1);
  if(id1.value == "aveiro"){
      var mymap = L.map('mapdiv').setView([40.61771, -8.75], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGFja2EiLCJhIjoiY2s4bHc3NWo3MDVteTNsbzd4cTloZDRzNyJ9.k47kNQJQNpoyZQOlD3Rozg'
      }).addTo(mymap);

      var markerIcon = L.icon({
        iconUrl: 'Images/marker.png',
        iconSize:     [25, 30], // size of the icon
        iconAnchor:   [25, 30], // point of the icon which will correspond to marker's location
      });

      var marker1 = L.marker([40.62, -8.748], {icon: markerIcon}).addTo(mymap);
      var marker2 = L.marker([40.6268, -8.732], {icon: markerIcon}).addTo(mymap);
      marker1.bindPopup("<center><b>Av. José Estêvão</b><br><button onclick='getEquipment()'>Select</button></center>");
      marker2.bindPopup("<center><b>A25</b><br><button onclick='getEquipment()'>Select</button></center>");
  }
}

// When pressing a map popup button
function getEquipment(){
  document.getElementById("dateinput").disabled=false;
  showInfo();
}

// ----------------------------------- Dates -------------------------------------------
// Gets Homol Day 
function updateDate(arg1){
  document.getElementById("dashinput").disabled=false;
  showHday();

  var date = new Date(document.getElementById('dateinput').value);
  var daysPrior = 7;
  date.setDate(date.getDate() - daysPrior);

  document.getElementById("homolday").innerHTML="Homologous Date: " +date.toDateString(); 
}

// ----------------------------------- HTML -------------------------------------------
// Hide hour selection div
function hideHour() {
  var x = document.getElementById("selHour");
  x.style.visibility = "hidden";
}

// Show hour selection div
function showHour() {
  var x = document.getElementById("selHour");
  x.style.visibility = "visible";
}

// Hide textinfo
function hideInfo() {
  var x = document.getElementById("textinfo");
  x.style.visibility = "hidden";
}

// Show textinfo
function showInfo() {
  var x = document.getElementById("textinfo");
  x.style.visibility = "visible";
}

// Hide homolday
function hideHday() {
  var x = document.getElementById("homolday");
  x.style.visibility = "hidden";
}

// Show homolday
function showHday() {
  var x = document.getElementById("homolday");
  x.style.visibility = "visible";
}

// Reset Droplist
function dashHourReset() {
  var dropDown = document.getElementById("dashhour");
  dropDown.selectedIndex = 0;
}

// Resets Graph Sizes
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

// Destroys graphs if the exist
function resetGraphs(){
  if(chart1in != undefined)
    chart1in.destroy();
  if(chart1out != undefined)
    chart1out.destroy();
  if(chart2in != undefined)
    chart2in.destroy();
  if(chart2out != undefined)
    chart2out.destroy();
}

// Get data for charts, currently random
function getyData(){
  for (i = 0; i < 24; i++) {
    trafficHourin[i] = Math.floor(Math.random() * 50); 
    trafficHourHomolin[i] = Math.floor(Math.random() * 50); 
    trafficHourout[i] = Math.floor(Math.random() * 50); 
    trafficHourHomolout[i] = Math.floor(Math.random() * 50); 
  }
  for (i = 0; i < 12; i++) {
    traffic5Minutesin[i] = Math.floor(Math.random() * 20); 
    traffic5MinutesHomolin[i] = Math.floor(Math.random() * 20); 
    traffic5Minutesout[i] = Math.floor(Math.random() * 20); 
    traffic5MinutesHomolout[i] = Math.floor(Math.random() * 20); 
  }
  for (i = 0; i < 4; i++) {
    percentageOfVehiclesin[i] = Math.floor(Math.random() * 20); 
    percentageOfVehiclesout[i] = Math.floor(Math.random() * 20); 
  }
}