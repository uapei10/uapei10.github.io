var login = false;

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

// Adds Hour Selection to page
function putHourSelection(){
  document.getElementById("selHour").innerHTML=`<div class="onscreen">
                      <label for="dashboard">
                        <span class="fa-stack"><span class="fa fa-circle-o fa-stack-2x"></span><strong class="fa-stack-1x">4</strong>
                        </span>
                        Select Hour:
                      </label>
                      <select id="dashhour" onchange="updateHourChart(this.id)">
                        <option value="hnull" disabled selected value> -- select an option -- </option>
                        <option value="h0">0:00</option>
                        <option value="h1">1:00</option>
                        <option value="h2">2:00</option>
                        <option value="h3">3:00</option>
                        <option value="h4">4:00</option>
                        <option value="h5">5:00</option>
                        <option value="h6">6:00</option>
                        <option value="h7">7:00</option>
                        <option value="h8">8:00</option>
                        <option value="h9">9:00</option>
                        <option value="h10">10:00</option>
                        <option value="h11">11:00</option>
                        <option value="h12">12:00</option>
                        <option value="h13">13:00</option>
                        <option value="h14">14:00</option>
                        <option value="h15">15:00</option>
                        <option value="h16">16:00</option>
                        <option value="h17">17:00</option>
                        <option value="h18">18:00</option>
                        <option value="h19">19:00</option>
                        <option value="h20">20:00</option>
                        <option value="h21">21:00</option>
                        <option value="h22">22:00</option>
                        <option value="h23">23:00</option>
                      </select></div>`;
}

// Swap Charts
/*function swapCharts() {
  var x = document.getElementById("chartscontainer");
  x.innerHTML = `<div class="w3-row w3-card onscreen" id="charts">
                  <div class="w3-col" style="width:70%">
                    <div id="chart1div1" class="chartcont"> <canvas id="ChartIn"></canvas></div>
                  </div>
                  <div class="w3-col" style="width:30%">
                    <div id="chart2div1" class="chartcont"> <canvas id="PieChartIn"></canvas></div>
                  </div>
                </div>
                <div class="w3-row w3-card onscreen" id="charts2" style="margin-top:16px">
                  <div class="w3-col" style="width:70%">
                    <div id="chart1div2" class="chartcont"> <canvas id="ChartOut"></canvas></div>
                  </div>
                  <div class="w3-col" style="width:30%">
                    <div id="chart2div2" class="chartcont"> <canvas id="PieChartOut"></canvas></div>
                  </div>
                </div>`;
}*/

// Swap Charts
function swapCharts() {
  var x = document.getElementById("chartscontainer");
  x.innerHTML = `<div class="w3-col-padding">
                  <div class="w3-col onscreen" id="charts" style="width:70%;">
                    <div class="w3-card">
                      <div class="w3-row">
                        <div id="chart1div1" class="chartcont"> <canvas id="ChartIn"></canvas></div>
                      </div>
                      <div class="w3-row">
                        <div id="chart1div2" class="chartcont"> <canvas id="ChartOut"></canvas></div>
                      </div>
                    </div>
                  </div>
                  <div class="w3-col onscreen" id="charts2" style="width:30%; ">
                    <div class="w3-card" style="margin-left:16px">
                      <div class="w3-row">
                        <div id="chart2div1" class="chartcont"> <canvas id="PieChartIn"></canvas></div>
                      </div>
                      <div class="w3-row">
                        <div id="chart2div2" class="chartcont"> <canvas id="PieChartOut"></canvas></div>
                      </div>
                    </div>
                  </div>
                </div>`;
}

// Puts image again
function putImage(){
  var x = document.getElementById("chartscontainer");
  x.innerHTML = "<img class='chartImage onscreen' src='../../Images/chartsubs3.png' alt='Dan'>"
}

// Hide textCard
function hideTextCard() {
  var x = document.getElementById("textcard");
  x.style.visibility = "hidden";
}

// Show textCard
function showTextCard() {
  var x = document.getElementById("textcard");
  x.style.visibility = "visible";
}

// Show Selected Equipment
function showEquip() {
  var x = document.getElementById("equip");
  x.style.visibility = "visible";
}

// Reset Droplist
function dashHourReset() {
  var dropDown = document.getElementById("dashhour");
  dropDown.selectedIndex = 0;
}

// Removes empty Elements from array
function removeEmptyElements(array){
  var processed = array.filter(function (el) {
    return el != null;
  });
  return processed;
}
// Removes duplicates from array
function removeDuplicates(array){
  var uniqueNames = [];
  $.each(array, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });
  return uniqueNames;
}

// Changes Log in boolean
function logIn(){
  login = true;
  alert(login);
}

// Changes Bar
function changeAppBar(){
  if(login)
    putLoggedIn();
  else
    putLoggin();
}