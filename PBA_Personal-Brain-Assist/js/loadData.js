		var datenbank= [];
	pba = {};

	
	createDatabase();
	
	
	function createDatabase(){
		var files = [
			"testDaten1.txt",
			"testDaten2.txt",
		];
		
		
		console.log("LADEN");
		var q = queue()
    		.defer(loadFile, "EEGID Record 2014-08-03-17-29-06-538.txt")
    		.defer(loadFile, "testDaten1.txt")
    		.defer(loadFile, "testDaten2.txt")
    		.awaitAll(console.log("all done"));
		// for(var i = 0; i < files.length; i++){
			// loadFile(files[i]);
			// console.log("Datei:" + files[i]);
			
			
			
		// }
				
		// print_filter(pba.database);
		
		// optimiereDatenbank();
};
	
function loadFile(dateiname)
{
	var pfad = "eeg/" + dateiname;		
		
	d3.csv(pfad, function(daten)
	{
		datensaetze = daten.map(function(d){
			zeit = new Date(parseInt(d.timestampMs)).toISOString();
			signalFehler = +d.poorSignal;
			
			datenbank.push({"Zeit": zeit, "Signalfehler": signalFehler});
			// console.log(datenbank);
		});
  });
};  
    
		
	function optimiereDatenbank(){
		console.log("OPTIMIERUNG");
				// var ndx = crossfilter(pba.database);
// 
		// // var parseDate = d3.time.format("%m/%d/%Y").parse;
// 
		// pba.database.forEach(function(d) {
			// // pba.database
		// });
		
		zeichneDiagramm();
	};
	
function zeichneDiagramm(){
	console.log("ZEICHNEN");	
	console.log(datenbank);
	var ndx = crossfilter(datenbank);
	var dateDim = ndx.dimension(function(d) {
		
		console.log(d);
		// return d.zeit;
		});
	var poorSignal = dateDim.group().reduceSum(function(d) {return d.signalFehler;}); 
	
			// var minDate = dateDim.bottom(1)[0].zeit;
		// var maxDate = dateDim.top(1)[0].zeit;
	};
        

// 		
		// var dateDim = ndx.dimension(function(d) {return d.date;});
		// var hits = dateDim.group().reduceSum(function(d) {return d.total;}); 
// 		
		// var status_200 = dateDim.group().reduceSum(function(d){return d.http_200;});
		// var status_302 = dateDim.group().reduceSum(function(d){return d.http_302;});
		// var status_404 = dateDim.group().reduceSum(function(d){return d.http_404;});
// 		
// 		
		// var minDate = dateDim.bottom(1)[0].date;
		// var maxDate = dateDim.top(1)[0].date;
// 		
		// var hitslineChart  = dc.lineChart("#chart-line-hitsperday");
// 		
		// hitslineChart
			// .width(500).height(200)
			// .dimension(dateDim)
			// .group(status_200, "200")
			// .stack(status_302, "302")
			// .stack(status_404, "404")
			// .brushOn(false)
			// .renderArea(true)
			// .x(d3.time.scale().domain([minDate,maxDate])) 
			// .yAxisLabel("Hits per day") 
			// .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5));
// 		
// 		
		// // Ring-Chart
		// var yearDim = ndx.dimension(function(d){return d.year;});
		// var year_total = yearDim.group().reduceSum(function(d){return d.total;});
// 		
		// var yearRingChart   = dc.pieChart("#chart-ring-year");
		// yearRingChart
		    // .width(150).height(150)
		    // .dimension(yearDim)
		    // .group(year_total)
		    // .innerRadius(30); 
// 		
// 		
// 		
// 		
// 		
		// // Tabelle
		// var datatable   = dc.dataTable("#dc-data-table");
		// datatable
		    // .dimension(dateDim)
		    // .group(function(d) {return d.Year;})
		    // // dynamic columns creation using an array of closures
		    // .columns([
		        // function(d) { return d.date.getDate() + "/" + (d.date.getMonth() + 1) + "/" + d.date.getFullYear(); },
		        // function(d) {return d.http_200;},
		        // function(d) {return d.http_302;},
		        // function(d) {return d.http_404;},        
		        // function(d) {return d.total;}
		    // ]);
// 		
// 		
// 		
		// dc.renderAll();

		
function print_filter(filter){
			var f=eval(filter);
			if (typeof(f.length) != "undefined") {}else{}
			if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
			if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
			console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}; 