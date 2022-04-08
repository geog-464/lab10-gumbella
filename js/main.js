let myMap;

// we might as well declare our baselayer(s) here too
const CartoDB_Positron = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
	{
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
	}
)

var Stamen_Watercolor = L.tileLayer(
	'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
	{
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			subdomains: 'abcd',
			ext: 'jpg'
	}
	);

function initialize(){
    loadMap();
};

function loadMap(mapid){
	console.log(mapid)
	try {
		myMap.remove()
	} catch(e) {
		console.log(e)
		console.log("no map to delete")
	} finally {

		if (mapid=='mapa'){
			
			myMap = L.map('mapdiv', {
				center: [45.50, -73.58]
				,zoom: 3
				,maxZoom: 18
				,minZoom: 2
				,layers: CartoDB_Positron
			});

		let baseLayers = {
		"CartoDB": CartoDB_Positron
		, "Stamen": Stamen_Watercolor
		
	};

	let lcontrol = L.control.layers(baseLayers);
		//add it to the map
		lcontrol.addTo(myMap);
		
		
		fetchData(mapid);
	}

	if (mapid=='mapb'){

		myMap = L.map('mapdiv', {
			center: [15, 90]
			,zoom: 3
			,maxZoom: 18
			,minZoom: 2
			,layers: CartoDB_Positron
		});

		let baseLayers = {
			"CartoDB": CartoDB_Positron
			, "Stamen": Stamen_Watercolor
		
		};

		let lcontrol = L.control.layers(baseLayers);
		//add it to the map
		lcontrol.addTo(myMap);
		
		
		fetchData(mapid);	
	}
	}
};



function fetchData(mapid){
    //load the data
	if(mapid == 'mapa'){
    fetch('https://raw.githubusercontent.com/geog-464/lab10/main/data/Amtrak_Stations.geojson')
        .then(function(response){
            return response.json();
        }) 	
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json,{style: styleAll, pointToLayer: generateCircles, onEachFeature: addPopups}).addTo(myMap);
        })
};
	if(mapid== 'mapb'){
	fetch('https://raw.githubusercontent.com/geog-464/lab10/main/data/megacities.geojson')
        .then(function(response){
            return response.json();
        }) 	
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json,{style: styleAll, pointToLayer: generateCircles, onEachFeature: addPopups}).addTo(myMap);
        })
}};

function generateCircles(feature, latlng) {
	return L.circleMarker(latlng);
};


function styleAll(feature, latlng, mapid) {
	console.log(feature.properties.ZipCode)
	var styles = {dashArray:null, dashOffset:null, lineJoin:null, lineCap:null, stroke:false, color:'#000', opacity:1, weight:1, fillColor:null, fillOpacity:0 };

	if (mapid=='mapa'){
		if (feature.geometry.type == "Point") {
		styles.fillColor = '#fff'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=9
	}

	if (typeof feature.properties.ZipCode == 'string') {
		styles.fillColor ='cyan'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=9

	}
		return styles;
		}

	if (mapid=='mapb'){
		if (feature.geometry.type == "Point") {
		styles.fillColor = 'red'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=9
	}

	if (typeof feature.properties.ZipCode == 'string') {
		styles.fillColor ='cyan'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=9

	}
	return styles; 
	}
	
};



function addPopups(feature, layer, mapid){
	console.log(feature)
	console.log(layer)
	if(mapid == 'mapa'){
		layer.bindPopup(feature.properties.City + ", " + feature.properties.State);
	}
	if(mapid== 'mapb'){
		layer.bindPopup(feature.properties.city + ". Pop: " + feature.properties.pop_2018);
	}
};


// window.onload = initialize();