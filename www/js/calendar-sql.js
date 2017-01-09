function executeQuery(tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS Calendar (month unique, contents)');
  tx.executeSql('INSERT INTO TestTable (id, data) VALUES (4, "たちつてと")');  
}

function queryDB(tx) {
  tx.executeSql('SELECT * FROM Calendar', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
  var len = results.rows.length;
  for (var i=0; i<len; i++){
    document.writeln("row = " + i + " ID = " + results.rows.item(i).id + " Data = " + results.rows.item(i).data+"<br/>");
  }        
}

function errorCB(err) {
  console.log("Error occured while executing SQL: "+err.code);
}

// Callback function when the transaction is success.
function successCB() {
  var db = window.openDatabase("Database", "1.0", "CalendarDatabase", 200000);
  db.transaction(queryDB, errorCB);
}
 
function createDB(){
  var db = window.openDatabase("Database", "1.0", "CalendarDatabase", 200000);
  db.transaction(executeQuery, errorCB, successCB);
  successCB();
}      
