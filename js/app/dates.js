// ----------------------------------- Dates -------------------------------------------
// Gets Homol Day 
function updateDate(arg1){
  document.getElementById("dashinput").disabled=false;
  showHday();

  var date = new Date(document.getElementById('dateinput').value);
  var daysPrior = 7;
  date.setDate(date.getDate() - daysPrior);

  document.getElementById("homolday").innerHTML="<div class='onscreen'> <span class='fa-stack onscreen'><span class='fa fa-circle-o fa-stack-2x'></span><strong class='fa-stack-1x fa fa-calendar'></strong></span></i> Homologous Date: " +date.toDateString() +"</div>"; 

  var dashValue = document.getElementById("dashinput");
  var hourValue = document.getElementById("dashhour");
  if(dashValue.value != "dnull" && dashValue.value != "d2")
  	populateCharts("dashinput");
  else if(hourValue.value != "hnull" && dashValue.value == "d2")
  	updateHourChart("dashhour");
}