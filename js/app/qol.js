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

// Swap Charts
function swapCharts() {
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