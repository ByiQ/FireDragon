var gui = require('nw.gui');

var Datastore = require('nedb');
var db = new Datastore({ filename: 'src/data/test.db' });

db.loadDatabase();

// File extension validation needs debugging
// window.onload = function () {
//     var fileInput = document.getElementById('fileInput');
//     var fileDisplayArea = document.getElementById('fileDisplayArea');
//
//     fileInput.addEventListener('change', function(e) {
//         var file = fileInput.files[0];
//         var textType = /text.*/;
//
//         if(file.type.match(textType)) {
//             var reader = new FileReader();
//
//             reader.onload = function (e) {
//                 fileDisplayArea.innerText = reader.result;
//             };
//             reader.readAsText(file);
//         } else {
//             fileDisplayArea.innerText = "File not supported";
//         }
//     });
// };
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

function newDoc() {
    window.location.assign('./FormPage.html');
}