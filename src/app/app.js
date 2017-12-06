/*
 * @file app.js : The main JavaScript file for the application. Loads the database on start.
 */

var gui = require('nw.gui');

/*
 * Create and load a database.
 * Ideally, each *type* of form should have its own database instantiated and loaded.
 * For example,
 *          var ir_patients = new Datastore( ... );
 *          var other_patients = new Datastore( ... );
 *
 *          ir_patients.loadDatabase();
 *          other_patients.loadDatabase();
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: 'src/data/test.db' });
db.loadDatabase();

/*
 * @function showResults
 * @author Lauren Allpress
 *
 * @description The showResults function displays the results of searching the database
 * for the search term in a simple list.
 *
 * Note: The database name 'db" is hardcoded in right now as there is no need for more
 * than one. In the event of more than one database, the function should be modified
 * appropriately.
 */
function showResults() {
    var list = document.getElementById("results_list");
    var search_term = document.getElementById("search_box").value;

    // Remove any items from a previous search.
    list.innerHTML = "";
    db.find({name: search_term}, function (err, docs) {
        docs.forEach( function (arrayItem) {
            var list_item = document.createElement('li');
            list_item.setAttribute('name', arrayItem.name);
            list_item.textContent = "MRN: " + arrayItem.mrn + "\t\tName: " + arrayItem.name;

            list.appendChild(list_item);
        });
    });
}


/*
 * @function newDoc
 *
 * @description newDoc simply opens a blank default form for testing/ and development
 * purposes.
 */
function newDoc() {
    window.location.assign('./FormPage.html');
}