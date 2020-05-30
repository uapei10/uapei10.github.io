// ----------------------------------- Dates -------------------------------------------
// Gets Homol Day 
function updateDate(arg1){
  document.getElementById("dashinput").disabled=false;

  var date = new Date(document.getElementById('dateinput').value);
  var dateH = new Date(document.getElementById('dateHomolinput').value);

  var dashValue = document.getElementById("dashinput");
  var hourValue = document.getElementById("dashhour");
  if(dashValue.value != "dnull" && dashValue.value != "d2")
  	populateCharts("dashinput");
  else if(hourValue.value != "hnull" && dashValue.value == "d2")
  	updateHourChart("dashhour");

  if(!isValidDate(date) && !isValidDate(dateH)){
    putImage();
    hideTextCard();
    hideInfo();
    hideHour();
    document.getElementById("dashinput").disabled=true;
    document.getElementById("dashinput").value="dnull";
    document.getElementById("dashhour").value="hnull";
  }

  var month = date.getMonth() + 1;
  var day = date.getDate()-1;
  var year = date.getFullYear();

  if(month < 10)
    month = '0' + month.toString();
  if(day < 10)
    day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;   
  document.getElementById("dateHomolinput").max = maxDate;
}

function updateHomolDate(arg1){
  document.getElementById("dashinput").disabled=false;

  var date = new Date(document.getElementById('dateinput').value);
  var dateH = new Date(document.getElementById('dateHomolinput').value);

  var dashValue = document.getElementById("dashinput");
  var hourValue = document.getElementById("dashhour");
  if(dashValue.value != "dnull" && dashValue.value != "d2")
    populateCharts("dashinput");
  else if(hourValue.value != "hnull" && dashValue.value == "d2")
    updateHourChart("dashhour");

  if(!isValidDate(date) && !isValidDate(dateH)){
    putImage();
    hideTextCard();
    hideInfo();
    hideHour();
    document.getElementById("dashinput").disabled=true;
    document.getElementById("dashinput").value="dnull";
    document.getElementById("dashhour").value="hnull";
  }
}

// Checks if date d is valid
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}