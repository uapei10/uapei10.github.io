// Map
var mymap;
// temp
var eq = false;

// ----------------------------------- Leaflet ------------------------------------------- https://leafletjs.com/examples/quick-start/
// Update map div
function getMap(arg1){
  document.getElementById("mapdiv").innerHTML = "";
  getEquipment();  // Temp
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
  showEquip();
  eq = !eq;
  if(eq)
    document.getElementById("equip").innerHTML="Equipment: A25"; 
  else
    document.getElementById("equip").innerHTML="Equipment: Av. José Estêvão"; 
}
