var datenbank = [];

var dateien = ["testDaten1.txt", "testDaten2.txt"];

ladevorgangInitialisieren();

/* Initialisierung des Ladevorgangs zum Einlesen der EEG-Daten in die Datenbank*/
function ladevorgangInitialisieren() {
	queue()
	.defer(ladeDatei, "testDaten1.txt")								// Datei laden
	.defer(ladeDatei, "testDaten2.txt")								// Datei laden
	.defer(ladeDatei, "EEGID Record 2014-08-03-17-29-06-538.txt")	// Datei laden
	.awaitAll(ladevorgangAbschliessen);								// Ladevorgang abwarten
};

/* Funktion zum Einlesen von csv-Dateien in die Datenbank.*/
function ladeDatei(dateiname, callback) {
	console.log("Lade Datei", dateiname);

	var pfad = "eeg/" + dateiname;
	d3.csv(pfad, function(daten) {
		datensaetze = daten.map(function(d) {
			zeit = new Date(parseInt(d.timestampMs)).toISOString();
			signalFehler = +d.poorSignal;

			datenbank.push({
				"Zeit" : zeit,
				"Signalfehler" : signalFehler
			});
			console.log("neue Datensaetze hinzugefuegt.");
		});
		callback(null, datensaetze);
		// first argument is error reason, second is result
	});

};

/* Funktion, die nach dem vollstaendigen Laden der Datenbank aufgerufen wird*/
function ladevorgangAbschliessen(error, results) {
	console.log("Aktualisierung der Datenbank abgeschlossen.", results);
	console.log(datenbank);
	
	erstelleGrafiken();
};