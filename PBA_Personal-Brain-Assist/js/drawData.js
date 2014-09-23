function erstelleGrafiken(){
	console.log("ZEICHNEN");
	var ndx = crossfilter(datenbank);
	
	var parseDate = d3.time.format.iso.parse;
		
	datenbank.forEach(function(d) {
		d.Zeit = parseDate(d.Zeit);
		d.Signalfehler = parseInt(d.Signalfehler);
	});
	
	var dateDim = ndx.dimension(function(d) {
		return +d.Zeit;
	});
	
	console.log(dateDim);
	
	var poorSignal = dateDim.group().reduceSum(function(d) {
		return +d.Signalfehler;
	});

	var minDate = dateDim.bottom(1)[0].Zeit;
	var maxDate = dateDim.top(1)[0].Zeit;

var hitslineChart  = dc.lineChart("#chart-line-hitsperday");
hitslineChart
.width(500).height(200)
.dimension(dateDim)
.group(poorSignal, "Poor Signal")
// .brushOn(false)
.renderArea(true)
.x(d3.time.scale().domain([minDate,maxDate]))
.yAxisLabel("Schlechte Signalwerte")
// .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5));

dc.renderAll();

}


function zeichneDiagramm() {
	console.log(datenbank);

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
