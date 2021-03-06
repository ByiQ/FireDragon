window.onload = function () {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if(file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function (e) {
                fileDisplayArea.innerText = reader.result;
            };
            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported";
        }
    });
};
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function newDoc() {
    window.location.assign('./XMLTest1.html');
}