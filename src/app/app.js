var gui = require('nw.gui');

var Datastore = require('nedb');
var db = new Datastore({ filename: 'src/data/test.db' });

db.loadDatabase();

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
 * @function insert(formID)
 * @author Lauren Allpress
 *
 * @description The insert function serializes form data to a json object and
 * inserts it into the database.
 *
 * Note: This will also have to be modified for more than one database.
 */
function insert(formId) {
    var form = document.getElementById(formId);
    var jsonData = {};
    var formData = $(form).serializeArray();

    $(formData).each(function (i, field) {
        jsonData[field.name] = field.value;
    });
    db.insert(jsonData, function (err, doc) { });
}

/*
 * @function newDoc
 *
 * @description newDoc simply opens a blank default form for testing/ and development
 * purposes.
 */
function newDoc() {
    window.location.assign('./XMLTest1.html');
}

function emptyDoc() {
    window.location.assign('./FormPage.html');
}