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