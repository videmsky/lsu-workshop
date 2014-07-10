// main javascript file

(function() {

	var map = L.map('map', {
		center: [30.45, -91.14],
		zoom: 10
	});

	var tileURL1 = 'http://tile.stamen.com/terrain/{z}/{x}/{y}.png';
	var tileURL2 = 'http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'

	L.tileLayer(tileURL2, {

	}).addTo(map);

	var url = "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=la&parameterCd=00060,99133"

	$.getJSON( url, function( data ) {
		
		// console.log(data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude);
		// console.log(data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude);

		var d = data.value.timeSeries;

		$.each(d, function( i, item ) {	
			
			var lat = d[i].sourceInfo.geoLocation.geogLocation.latitude;
			var lng = d[i].sourceInfo.geoLocation.geogLocation.longitude;
			var unit = d[i].variable.unit.unitAbbreviation;		
			var latlng = [lat,lng];

			// console.log(d[i].values);	
			var val = d[i].values;
			
			$.each(val, function( k, item ) {
				// console.log(val[i].value);	
				
				v = val[k].value

				$.each(v, function( n, item ) {
					
					var discharge =  v[n].value;

					console.log(discharge);	
					var cmarker = L.circleMarker(latlng, {
		 				radius: 10

					}).addTo(map);

					cmarker.on('mouseover', function(e) {
					  var popup = L.popup()
							.setLatLng(e.latlng) 
							.setContent("Discharge: " + discharge + "  " + unit);	
						map.openPopup(popup);
					})
					.on('mouseout', function(e){
						map.closePopup();
					});
				
				});
			

			});

		});

	});



})();	



