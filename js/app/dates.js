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