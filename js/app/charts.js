// Chart
var chart1in, chart1out, chart2in, chart2out;

// Chart x axis
var hours;
var minutes;

// Chart y axis
var trafficHourin;
var trafficHourHomolin;
var trafficHourout;
var trafficHourHomolout;
var traffic5Minutesin;
var traffic5MinutesHomolin;
var traffic5Minutesout;
var traffic5MinutesHomolout;

// Types of Vehicles
var typesOfVehicles;
var percentageOfVehiclesin;
var percentageOfVehiclesout;

// To executes on boot
init();
function init(){
  hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  minutes = [5,10,15,20,25,30,35,40,45,50,55,60];
  trafficHourin = new Array();
  trafficHourHomolin = new Array();
  trafficHourout = new Array();
  trafficHourHomolout = new Array();
  traffic5Minutesin = new Array();
  traffic5MinutesHomolin = new Array();
  traffic5Minutesout = new Array();
  traffic5MinutesHomolout = new Array();
  typesOfVehicles = ["Light", "Heavy", "Bike", "Person"];
  percentageOfVehiclesin = new Array();
  percentageOfVehiclesout = new Array();

  document.getElementById("dateinput").disabled=true; // Blocks date input
  document.getElementById("dashinput").disabled=true; // Blocks dashboard input
  fixCanvasSizes(); // Adjusts chart sizes to windows size
  hideInfo();       // Hides text below map
}

// ----------------------------------- Chart.js -------------------------------------------
// Create charts
function populateCharts(arg1){
  var id1 = document.getElementById(arg1);
  dashHourReset();
  resetGraphs();
  getRandomData();
  showInfo();
  if(id1.value == "d1"){
    hideHour();
    var chart;

    // Criar Chart In - Parte de Cima
    chart1in = makeBarChart(document.getElementById("ChartIn"), 'Traffic Density - IN (Nº Vehicles / Hour)', trafficHourHomolin, trafficHourin, hours);

    // Criar PieChart IN - Parte de Cima
    chart2in = makePieChart(document.getElementById("PieChartIn"), 'Categorization - IN', percentageOfVehiclesin);

    // Criar Chart Out - Parte de Baixo
    chart1out = makeBarChart(document.getElementById("ChartOut"), 'Traffic Density - OUT (Nº Vehicles / Hour)', trafficHourHomolout, trafficHourout, hours);

    // PieChart Out - Parte de Baixo
    chart2out = makePieChart(document.getElementById("PieChartOut"), 'Categorization - OUT', percentageOfVehiclesout);
}
  else if(id1.value == "d2"){
    showHour();
    resetGraphs();
  }
}

// Create charts that need hour argument
function updateHourChart(arg1){
  var id1 = document.getElementById(arg1);
  var chart;
  resetGraphs();
  getRandomData();

  // Criar Chart In - Parte de Cima
  chart1in = makeBarChart(document.getElementById("ChartIn"), 'Traffic Density - IN (Nº Vehicles / Hour)', traffic5MinutesHomolin, traffic5Minutesin, minutes);

  // Criar PieChart IN - Parte de Cima
  chart2in = makePieChart(document.getElementById("PieChartIn"), 'Categorization - IN', percentageOfVehiclesin);

  // Criar Chart Out - Parte de Baixo
  chart1out = makeBarChart(document.getElementById("ChartOut"), 'Traffic Density - OUT (Nº Vehicles / Hour)', traffic5MinutesHomolout, traffic5Minutesout, minutes);

  // PieChart Out - Parte de Baixo
  chart2out = makePieChart(document.getElementById("PieChartOut"), 'Categorization - OUT', percentageOfVehiclesout);
}

// Creates Bar Chart
function makeBarChart(chartInput, titleText, dataHomol, dataSelect, labelType){
  return new Chart(chartInput, {
      type: 'bar',
      data: {
        labels: labelType,
        datasets: [
          {
            label: "Homologous Date",
            backgroundColor: "#3e95cd",
            data: dataHomol
          }, {
            label: "Selected Date",
            backgroundColor: "#3333cd",
            data: dataSelect
          }
        ]
      },
      options: {
        legend: { display: true },
        responsive: false,
        title: {
          display: true,
          text: titleText
        }
      }
    });
}

// Creates Pie Chart
function makePieChart(chartInput, titleText, dataPie){
  return new Chart(chartInput, {
    type: 'doughnut',
    data: {
      labels:typesOfVehicles,
      datasets:[
        {
          backgroundColor: ["#3e95cd", "#007AFF","#00CBFF", "#0089AB"],
          data: dataPie
        }
      ]
    },
    options: {
      legend: {display: true},
      responsive: false,
      title: {
        display: true,
        text: titleText
      }
    }
  });
  return chart2in
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
function getRandomData(){
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