require([ 'esri/Map', 'esri/views/MapView' ], function(Map, MapView) {
	let map = new Map({
		basemap: 'topo-vector'
	});

	let view = new MapView({
		container: 'viewDiv',
		map: map,
		center: [ -118.805, 34.027 ], // longitude, latitude
		zoom: 13
	});
});
