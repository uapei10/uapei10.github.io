// Chart
var chart1in, chart1out, chart2in, chart2out;

// Chart x axis
var hours;
var minutes;
var week;

// Chart y axis
var trafficWeekin;
var trafficWeekHomolin;
var trafficWeekout;
var trafficWeekHomolout;
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

var chartYSum;
var chartYHomolSum;
var chartYOutSum;
var chartYOutHomolSum;


// To execute on boot
init();
function init(){
  week = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
  hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  minutes = [0,5,10,15,20,25,30,35,40,45,50,55];
  trafficWeekin = new Array();
  trafficWeekHomolin = new Array();
  trafficWeekout = new Array();
  trafficWeekHomolout = new Array();
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
  chartYSum = 0;

  document.getElementById("dateinput").disabled=true; // Blocks date input
  document.getElementById("dashinput").disabled=true; // Blocks dashboard input
  hideInfo();                                         // Hides text below map
}

// ----------------------------------- Chart.js -------------------------------------------
// Create charts
function populateCharts(arg1){
  var id1 = document.getElementById(arg1);
  dashHourReset();
  resetGraphs();
  ResetData();
  showInfo();
  showTextCard();
  swapCharts();
  fixCanvasSizes();
  if(id1.value == "d0"){
    hideHour();

    // http://fjunior.f2mobile.eu/teste.php?ACCAO=QUERY_DIA_TOTAL&dia=04-05-2020&inOut=in&radar=ponte

    var url = "http://fjunior.f2mobile.eu/teste.php?ACCAO=QUERY_DIA_TOTAL&dia=";

    var datesS = new Array();
    var date = (new Date(document.getElementById('dateinput').value));
    for(i = (date.getDay()); i >= 0; i--){
      var dd = date.getDate();
      var mm = date.getMonth()+1; 
      var yyyy = date.getFullYear();
      if(dd<10) 
        dd='0'+dd;
      if(mm<10) 
        mm='0'+mm;
      datesS[i] = dd+'-'+mm+'-'+yyyy;
      date.setDate(date.getDate()-1);
    }

    var dateHomol = new Array();
    date = (new Date(document.getElementById('dateinput').value));
    date.setDate(date.getDate() - 7);
    for(i = (date.getDay()); i >= 0; i--){
      var dd = date.getDate();
      var mm = date.getMonth()+1; 
      var yyyy = date.getFullYear();
      if(dd<10) 
        dd='0'+dd;
      if(mm<10) 
        mm='0'+mm;
      dateHomol[i] = dd+'-'+mm+'-'+yyyy;
      date.setDate(date.getDate()-1);
    }

    for(t = 0; t < datesS.length; t++){
      for (i = 0; i < locations.length; i++) {
        var location = locations[i];

        urlIn = url.concat(datesS[t] ,"&inOut=in&radar=", location);
        urlOut = url.concat(datesS[t] ,"&inOut=out&radar=", location);
        urlHomolIn = url.concat(dateHomol[t] ,"&inOut=in&radar=", location);
        urlHomolOut = url.concat(dateHomol[t] ,"&inOut=out&radar=", location);

        trafficWeekin[t] = getDataWeekXLM(urlIn);
        trafficWeekHomolin[t] = getDataWeekXLM(urlHomolIn);
        trafficWeekout[t] = getDataWeekXLM(urlOut);
        trafficWeekHomolout[t] = getDataWeekXLM(urlHomolOut);
      }
    }

    chartYSum = sum(trafficWeekin);
    chartYHomolSum = sum(trafficWeekHomolin);
    chartYOutSum = sum(trafficWeekout);
    chartYOutHomolSum = sum(trafficWeekHomolout);
    updateTextInfo();

    // Criar Chart In - Parte de Cima
    chart1in = makeBarChart(document.getElementById("ChartIn"), 'Traffic Density - IN (Nº Vehicles / Day)', trafficWeekHomolin, trafficWeekin, week);

    // Criar PieChart IN - Parte de Cima
    chart2in = makePieChart(document.getElementById("PieChartIn"), 'Categorization - IN', percentageOfVehiclesin);

    // Criar Chart Out - Parte de Baixo
    chart1out = makeBarChart(document.getElementById("ChartOut"), 'Traffic Density - OUT (Nº Vehicles / Day)', trafficWeekHomolout, trafficWeekout, week);

    // PieChart Out - Parte de Baixo
    chart2out = makePieChart(document.getElementById("PieChartOut"), 'Categorization - OUT', percentageOfVehiclesout);
  }

  else if(id1.value == "d1"){
    hideHour();

    // http://fjunior.f2mobile.eu/teste.php?ACCAO=QUERY_DIA&dia=04-05-2020&inOut=in&radar=ponte

    var url = "http://fjunior.f2mobile.eu/teste.php?ACCAO=QUERY_DIA&dia=";

    var date = new Date(document.getElementById('dateinput').value);
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) 
      dd='0'+dd;
    if(mm<10) 
      mm='0'+mm;
    var dateS = dd+'-'+mm+'-'+yyyy;

    date.setDate(date.getDate() - 7);
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) 
      dd='0'+dd;
    if(mm<10) 
      mm='0'+mm;
    var dateHomol = dd+'-'+mm+'-'+yyyy;

    for (i = 0; i < locations.length; i++) {
      urlIn = url.concat(dateS ,"&inOut=in&radar=", locations[i]);
      urlOut = url.concat(dateS ,"&inOut=out&radar=", locations[i]);
      urlHomolIn = url.concat(dateHomol ,"&inOut=in&radar=", locations[i]);
      urlHomolOut = url.concat(dateHomol ,"&inOut=out&radar=", locations[i]);

      trafficHourin = getDataDayXLM(urlIn);
      trafficHourout = getDataDayXLM(urlOut);
      trafficHourHomolin = getDataDayXLM(urlHomolIn);
      trafficHourHomolout = getDataDayXLM(urlHomolOut);
    }

    chartYSum = sum(trafficHourin);
    chartYHomolSum = sum(trafficHourHomolin);
    chartYOutSum = sum(trafficHourout);
    chartYOutHomolSum = sum(trafficHourHomolout);
    updateTextInfo();

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
    putImage();
    showHour();
    putHourSelection();
    hideInfo();
    hideTextCard();
  }

}

// Create charts that need hour argument
function updateHourChart(arg1){
  var id1 = document.getElementById(arg1);
  resetGraphs();
  ResetData();
  swapCharts();
  fixCanvasSizes();
  showTextCard();
  showInfo();

  // http://fjunior.f2mobile.eu/teste.php?ACCAO=QUERY_HORA&dia=04-05-2020&hora=2&inOut=in&radar=ponte

  var url = "http://fjunior.f2mobile.eu/teste.php?ACCAO=QUERY_HORA&dia=";

  var date = new Date(document.getElementById('dateinput').value);
  var dd = date.getDate();
  var mm = date.getMonth()+1; 
  var yyyy = date.getFullYear();
  if(dd<10) 
    dd='0'+dd;
  if(mm<10) 
    mm='0'+mm;
  var dateS = dd+'-'+mm+'-'+yyyy;

  date.setDate(date.getDate() - 7);
  var dd = date.getDate();
  var mm = date.getMonth()+1; 
  var yyyy = date.getFullYear();
  if(dd<10) 
    dd='0'+dd;
  if(mm<10) 
    mm='0'+mm;
  var dateHomol = dd+'-'+mm+'-'+yyyy;

  var hour = (document.getElementById('dashhour').value).slice(1);
  for (i = 0; i < locations.length; i++) {
    urlIn = url.concat(dateS ,"&hora=", hour ,"&inOut=in&radar=", locations[i]);
    urlOut = url.concat(dateS ,"&hora=", hour ,"&inOut=out&radar=", locations[i]);
    urlHomolIn = url.concat(dateHomol ,"&hora=", hour ,"&inOut=in&radar=", locations[i]);
    urlHomolOut = url.concat(dateHomol ,"&hora=", hour ,"&inOut=out&radar=", locations[i]);

    traffic5Minutesin = getDataDayXLM(urlIn);
    traffic5Minutesout = getDataDayXLM(urlOut);
    traffic5MinutesHomolin = getDataDayXLM(urlHomolIn);
    chartYOutHomolSum= getDataDayXLM(urlHomolOut);
  }

  chartYSum = sum(traffic5Minutesin);
  chartYHomolSum = sum(traffic5MinutesHomolin);
  chartYOutSum = sum(traffic5Minutesout);
  chartYOuHomolSum = sum(traffic5MinutesHomolout);
  updateTextInfo();

  // Criar Chart In - Parte de Cima
  chart1in = makeBarChart(document.getElementById("ChartIn"), 'Traffic Density - IN (Nº Vehicles / 5 Minutes)', traffic5MinutesHomolin, traffic5Minutesin, minutes);

  // Criar PieChart IN - Parte de Cima
  chart2in = makePieChart(document.getElementById("PieChartIn"), 'Categorization - IN', percentageOfVehiclesin);

  // Criar Chart Out - Parte de Baixo
  chart1out = makeBarChart(document.getElementById("ChartOut"), 'Traffic Density - OUT (Nº Vehicles / 5 Minutes)', traffic5MinutesHomolout, traffic5Minutesout, minutes);

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
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
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
function ResetData(){
  trafficWeekin = new Array();
  trafficWeekHomolin = new Array();
  trafficWeekout = new Array();
  trafficWeekHomolout = new Array();
  trafficHourin = new Array();
  trafficHourHomolin = new Array();
  trafficHourout = new Array();
  trafficHourHomolout = new Array();
  traffic5Minutesin = new Array();
  traffic5MinutesHomolin = new Array();
  traffic5Minutesout = new Array();
  traffic5MinutesHomolout = new Array();
  // Week Dashboard
  for (i = 0; i < 7; i++) {
    trafficWeekin[i] = 0; 
    trafficWeekHomolin[i] = 0; 
    trafficWeekout[i] = 0; 
    trafficWeekHomolout[i] =0; 
  }

  // Day Dashboard
  for (i = 0; i < 24; i++) {
    trafficHourin[i] = 0; 
    trafficHourHomolin[i] = 0; 
    trafficHourout[i] = 0; 
    trafficHourHomolout[i] = 0; 
  }

  // Hour Dashboard
  for (i = 0; i < 12; i++) {
    traffic5Minutesin[i] = 0; 
    traffic5MinutesHomolin[i] = 0; 
    traffic5Minutesout[i] = 0; 
    traffic5MinutesHomolout[i] = 0; 
  }

  // Pie Chart
  for (i = 0; i < 4; i++) {
    percentageOfVehiclesin[i] = 2; 
    percentageOfVehiclesout[i] = 2; 
  }
}

// Updates Textbox Info
function updateTextInfo(){
  var x = document.getElementById("textinfo");
  x.innerHTML = "<div class='onscreen'><br><br>Total nº of Vehicles In (Selected Date): "+ chartYSum+"<br>Total nº of Vehicles In (Homologous Date): "+ chartYHomolSum +"<br><br>Total nº of Vehicles Out (Selected Date): "+ chartYOutSum+"<br>Total nº of Vehicles Out (Homologous Date): "+ chartYOutHomolSum +"<div>";
}

// Get XML Radars Hour file from Server
function getDataHourXLM(urle){
  var array = new Array();
    $.ajax({
     async: false,
     type: 'GET',
     url: urle,
     success: function(data) {
      try{
        var x = data.getElementsByTagName("REGISTO");
        for (i = 0; i < 12; i++) {
          array.push(parseInt(x[i].childNodes[2].childNodes[0].nodeValue));
        }
      }catch(err){}
     }
  });
  return array;
}
// Get XML Radars Day file from Server
function getDataDayXLM(urle){
  var array = new Array();
    $.ajax({
     async: false,
     type: 'GET',
     url: urle,
     success: function(data) {
      try{
        var x = data.getElementsByTagName("REGISTO");
        for (i = 0; i < 24; i++) {
          array.push(parseInt(x[i].childNodes[2].childNodes[0].nodeValue));
        }
      }catch(err){}
     }
  });
  return array;
}

// Get XML Radars Week file from Server
function getDataWeekXLM(urle){
  var value = 0;
    $.ajax({
     async: false,
     type: 'GET',
     url: urle,
     success: function(data) {
      try{
        var x = data.getElementsByTagName("REGISTO");
        value = parseInt(x[i].childNodes[2].childNodes[0].nodeValue);
      }catch(err){}
     }
  });
  return value;
}

// Sums a int array
function sum(input){   
 if (toString.call(input) !== "[object Array]")
    return false;
  var total =  0;
  for(var i=0;i<input.length;i++){                  
    if(isNaN(input[i])){
      continue;
    }
    total += Number(input[i]);
  }
  return total;
}