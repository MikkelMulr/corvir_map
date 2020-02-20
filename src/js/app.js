// require('axios');
fetch('../src/data.json').then(response => {
	return response.json();
}).then(data => {
	console.log(data);
	document.querySelector('#infTotal').innerHTML = data.confirmed_infected;
	document.querySelector('#casuTotal').innerHTML = data.confirmed_casualties;
	document.querySelector('#recTotal').innerHTML = data.confirmed_recovered;
}).catch(err => {
	console.log(err);
});


require([
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/Layer"
], function (Map, MapView, Layer) {
	let map = new Map({
		basemap: 'topo-vector'
	});

	let view = new MapView({
		container: 'viewDiv',
		map: map,
		center: [-95.80500, 44.02700], // longitude, latitude
		zoom: 4
	});

	// Add coordinates
	let coordsWidget = document.createElement("div");
	coordsWidget.id = "coordsWidget";
	coordsWidget.className = "esri-widget esri-component";
	coordsWidget.style.padding = "7px 15px 5px";

	view.ui.add(coordsWidget, "bottom-right");

	//*** ADD ***//
	function showCoordinates(pt) {
		let coords = `Lat/Lon  ${pt.latitude.toFixed(3)}  ${pt.longitude.toFixed(3)}
			 | Scale 1: ${Math.round(view.scale * 1) / 1} 
			 | Zoom  ${view.zoom}`;
		coordsWidget.innerHTML = coords;
	}
	view.watch("stationary", function (isStationary) {
		showCoordinates(view.center);
	});

	view.on("pointer-move", function (evt) {
		showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
	});


	function addLayer(layerItemPromise, index) {
		return layerItemPromise.then(function (layer) {
			map.add(layer, index);
		});
	}

	let corvirData = Layer.fromPortalItem({
		portalItem: {
			id: "c0b356e20b30490c8b8b4c7bb9554e7c"
		}
	});

	addLayer(corvirData, 0);
});


// Map Layer for corvir data overlay
// c0b356e20b30490c8b8b4c7bb9554e7c

document.querySelector('.today_date').innerHTML = `Last update: ${new Date().getMonth() + 1}/ ${new Date().getDate()}/ ${new Date().getFullYear()}`;


