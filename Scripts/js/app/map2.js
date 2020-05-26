// Map
var mymap;

var info;

var legend;

var statesData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Barra",
        "cityID": 2742611,
        "radar": "ponte",
        "density": 0,
        "speed": 0,
        "temperature": 0,
        "wind": 0,
        "humidity": 0
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -8.749022483825684,
              40.64417760251725
            ],
            [
              -8.750009536743164,
              40.64388453626028
            ],
            [
              -8.748893737792969,
              40.643689158040715
            ],
            [
              -8.748679161071777,
              40.64310301995052
            ],
            [
              -8.750782012939453,
              40.64075841611745
            ],
            [
              -8.749709129333496,
              40.64026994661965
            ],
            [
              -8.749451637268066,
              40.633398430243545
            ],
            [
              -8.751769065856934,
              40.628154759567266
            ],
            [
              -8.750824928283691,
              40.627307916989615
            ],
            [
              -8.74606132507324,
              40.626949634204884
            ],
            [
              -8.743185997009277,
              40.63203055585211
            ],
            [
              -8.74185562133789,
              40.63652489505349
            ],
            [
              -8.734989166259766,
              40.6429727663426
            ],
            [
              -8.736190795898438,
              40.644210165355254
            ],
            [
              -8.749022483825684,
              40.64417760251725
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Costa Nova",
        "cityID": 2738707,
        "radar": "riaAtiva",
        "density": 0,
        "speed": 0,
        "temperature": 0,
        "wind": 0,
        "humidity": 0
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -8.750867843627928,
              40.62707991907628
            ],
            [
              -8.750996589660645,
              40.625711915250335
            ],
            [
              -8.7540864944458,
              40.61968585056769
            ],
            [
              -8.753271102905273,
              40.619066926653474
            ],
            [
              -8.755073547363281,
              40.61528810890734
            ],
            [
              -8.75434398651123,
              40.614603989741646
            ],
            [
              -8.75734806060791,
              40.60864208337846
            ],
            [
              -8.756017684936523,
              40.608479182296605
            ],
            [
              -8.756318092346191,
              40.60707821660065
            ],
            [
              -8.747992515563963,
              40.60636143209714
            ],
            [
              -8.74837875366211,
              40.608251120114865
            ],
            [
              -8.74885082244873,
              40.6083488611452
            ],
            [
              -8.74885082244873,
              40.60942400304395
            ],
            [
              -8.748421669006348,
              40.61004301629061
            ],
            [
              -8.74885082244873,
              40.61496233874968
            ],
            [
              -8.748335838317871,
              40.6192949519206
            ],
            [
              -8.748936653137205,
              40.61968585056769
            ],
            [
              -8.749194145202637,
              40.62089110699679
            ],
            [
              -8.748764991760254,
              40.62310611615804
            ],
            [
              -8.746275901794434,
              40.62672163506838
            ],
            [
              -8.750867843627928,
              40.62707991907628
            ]
          ]
        ]
      }
    }
  ]
};



// To execute on boot
init();

// ----------------------------------- Leaflet ------------------------------------------- https://leafletjs.com/examples/quick-start/
async function init(){
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  getInfoData();

  mymap = L.map('mapdiv2').setView([40.61771, -8.75], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieGFja2EiLCJhIjoiY2s4bHc3NWo3MDVteTNsbzd4cTloZDRzNyJ9.k47kNQJQNpoyZQOlD3Rozg'
  }).addTo(mymap);

  L.geoJson(statesData).addTo(mymap);
  L.geoJson(statesData, {style: style}).addTo(mymap);

  geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(mymap);

  info = L.control();
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
    this._div.innerHTML = '<div class="onscreen">' +  (props ?
        '<h4><b>' + props.name + '</b><br><br></h4><i class="fa fa-car-side icon"></i>' + props.density + ' cars <br>'+
        '<i class="fa fa-tachometer-alt icon"></i>' + props.speed + ' km/h <br><br>'+
        '<i class="fa fa-thermometer-three-quarters icon"></i>' + props.temperature + ' ºC <br>'+
        '<i class="fa fa-wind icon"></i>' + props.wind + ' km/h <br>'+
        '<i class="fa fa-tint icon"></i>' + props.humidity + ' % <br></div>'
        : '<h6><center><b>Hover over a Region</b></center></h6> </div>');
  };

  info.addTo(mymap);

  legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 200, 500, 750, 1000, 2000, 5000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML += 'Traffic Volume<br><br>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +='<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(mymap);

  await sleep(1500);
  //modal.style.display = "none";
  $(modal).fadeOut();
}

// Gets current info data
function getInfoData(){
  // Weather Data
  var urle = "http://api.openweathermap.org/data/2.5/weather?id=";
  var apikey = "e88ed05524c759c4f431a030fb656814";
  for(var key in statesData.features){
    var url = urle.concat(statesData.features[key].properties.cityID, "&appid=", apikey);

    $.ajax({
     async: false,
     type: 'GET',
     url: url,
     success: function(data) {
      statesData.features[key].properties.temperature = Math.round((data.main.temp-272.15) * 100) / 100;
      statesData.features[key].properties.wind = data.wind.speed;
      statesData.features[key].properties.humidity = data.main.humidity;
     }
    });
  }

  // Speed Data
  var date = new Date();
  var strDate1 = 'Y-m-dTh%3A00%3A00Z'
    .replace('Y', date.getFullYear())
    .replace('m', date.getMonth()+1)
    .replace('d', date.getDate())
    .replace('h', date.getHours()-1);

  var strDate2 = 'Y-m-dTh%3A00%3A00Z'
    .replace('Y', date.getFullYear())
    .replace('m', date.getMonth()+1)
    .replace('d', date.getDate())
    .replace('h', date.getHours());


  for(var key in statesData.features){
    var urle = "https://pasmo.es.av.it.pt/api/radars/" +statesData.features[key].properties.radar +"/speed?initialDate=";

    var url = urle.concat(strDate1, "&finalDate=", strDate2, "&order=asc");

    var speed = 0;
    var i = 0;

    $.ajax({
     async: false,
     type: 'GET',
     url: url,
     success: function(data) {
      for(t = 0; t < data.length; t++){
        if(data[t].speed != 0){
          speed += data[t].speed;
          i++;
        }
      }
     }
    });

    statesData.features[key].properties.speed = Math.round((speed/i)*100)/100;
  }

  // Density Data
  var urle = "https://pasmo.es.av.it.pt/api/parking/occupation?day=";

  var date = new Date();
  var strDate1 = 'Y-m-d'
    .replace('Y', date.getFullYear())
    .replace('m', date.getMonth()+1)
    .replace('d', date.getDate())

  var i =  date.getHours()-1;
  for(var key in statesData.features){
    var url = urle.concat(strDate1);
    console.log(i);
    $.ajax({
     async: false,
     type: 'GET',
     url: url,
     success: function(data) {
      statesData.features[key].properties.density = data[i].taken;
     }
    });
    i--;
  }
}

// Changes color intensity
function getColor(d) {
    return d > 5000 ? '#800026' :
           d > 2000  ? '#BD0026' :
           d > 1000  ? '#E31A1C' :
           d > 750  ? '#FC4E2A' :
           d > 500   ? '#FD8D3C' :
           d > 200   ? '#FEB24C' :
           d > 100   ? '#FED976' :
                      '#FFEDA0';
}

// When mousing out polygon
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 0.1,
        color: 'black',
        fillOpacity: 0.4
    };
}

// When mousing over polygon
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        color: 'black',
        weight: 2.5,
        opacity: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.6
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

// Resets style and popup
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

// When clicking polygon
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// Attachs listeners
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}