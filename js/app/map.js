// Map
var mymap;

// Markers
var markers;

// Markers map layer
var markersLayer;

// Select Locations
var locations;

// To execute on boot
init();
function init(){
  mymap = L.map('mapdiv').setView([40, -9], 6);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGFja2EiLCJhIjoiY2s4bHc3NWo3MDVteTNsbzd4cTloZDRzNyJ9.k47kNQJQNpoyZQOlD3Rozg'
      }).addTo(mymap);

  markers = [
    [40.62, -8.748, 'Av. José Estêvão'],
    [40.6268, -8.732, 'A25']
  ];

  locations = ['A25'];

  markersLayer = L.layerGroup();
}

// ----------------------------------- Leaflet ------------------------------------------- https://leafletjs.com/examples/quick-start/
// Update map div
function getMap(arg1){
  getEquipment(); 
  destroyMap();
  var id1 = document.getElementById(arg1);
  if(id1.value == "aveiro"){
      mymap = L.map('mapdiv').setView([40.61771, -8.75], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoieGFja2EiLCJhIjoiY2s4bHc3NWo3MDVteTNsbzd4cTloZDRzNyJ9.k47kNQJQNpoyZQOlD3Rozg'
      }).addTo(mymap);
      addMarkers();
  }
}

// Adds Markers to map
function addMarkers(){
  var markerIcon = L.icon({
        iconUrl: 'Images/marker2.png',
        iconSize:     [35, 40],
        iconAnchor:   [35, 40],
      });

  for (i = 0; i < markers.length; i++) {
    var buttonID = "buttonMarker" +i;
    var bText = "Select";
    if (locations.includes(markers[i][2]))
      bText = "Deselect";

    var marker = L.marker([markers[i][0], markers[i][1]], {icon: markerIcon}).bindPopup("<center><b>" +markers[i][2] +"</b><br><button id= \"" +buttonID +"\" onclick='getEquipment(\"" +markers[i][2] +"\"); changeText(this.id);'>" +bText +"</button></center>");
    marker.addTo(markersLayer);
  }
  mymap.addLayer(markersLayer);
}

// When pressing a map popup button
function getEquipment(eqName){
  document.getElementById("dateinput").disabled=false;
  showEquip();

  // Selects or deselects a equipment
  if(locations.includes(eqName)){
    removeEquipment(eqName);
  }
  else{
    addEquipment(eqName);
  }

  // Writes on the app page
  var names = " Equipment: ";
  for (i = 0; i < locations.length; i++){
    if(i == 0)
      names = names.concat(locations[i]);
    else 
      names = names.concat(", " +locations[i]);
  }
  if(locations.length == 0){
    document.getElementById("equip").innerHTML=("<div class='onscreen'><span class='fa-stack'><span class='fa fa-circle-o fa-stack-2x'></span><strong class='fa-stack-1x fa fa-camera'></strong></span></i> Equipment: <b>Undefined</b><div>");
    equipmentCheck();
  }
  else{
    document.getElementById("equip").innerHTML=("<div class='onscreen'><span class='fa-stack'><span class='fa fa-circle-o fa-stack-2x'></span><strong class='fa-stack-1x fa fa-camera'></strong></span></i>" +names +"<div>");
    var dashValue = document.getElementById("dashinput");
    var hourValue = document.getElementById("dashhour");
    if(dashValue.value != "dnull" && dashValue.value != "d2")
      populateCharts("dashinput");
    else if(hourValue.value != "hnull" && dashValue.value == "d2")
      updateHourChart("dashhour");
  }
}

// Corrects button text when pressing
function changeText(arg1){
  if(document.getElementById(arg1).innerHTML == "Select")
    document.getElementById(arg1).innerHTML = "Deselect";
  else
    document.getElementById(arg1).innerHTML = "Select";

  mymap.removeLayer(markersLayer);
  addMarkers();
}

// Adds Equipment to locations
function addEquipment(eqName){
  locations.push(eqName)
  locations = removeEmptyElements(locations);
  locations = removeDuplicates(locations);
}

// Removes Equipment to locations
function removeEquipment(eqName){
  const index = locations.indexOf(eqName);
  if (index > -1) {
    locations.splice(index, 1);
  }
}

// Destroys mymap
function destroyMap(){
  mymap.off();
  mymap.remove();
}

// Defensive Programming
function equipmentCheck(){
  if(locations.length==0){
    putImage();
    hideHday();
    hideTextCard();
    hideInfo();
    hideHour();
    document.getElementById("dateinput").value = "";
    document.getElementById("dashinput").disabled=true;
    document.getElementById("dateinput").disabled=true;
    document.getElementById("dashinput").value="dnull";
    document.getElementById("dashhour").value="hnull";
  }
}

// Get XML radars file from Server
function getDataRadarsXLM(url, region){
  $.get(
      url,
      {paramOne : region},
      function(data) {
        console.log(data);
      }
    );
}