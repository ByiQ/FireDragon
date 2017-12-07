(function ($) {
    var state = {};

    var build = function(parent, node) {
	var nodeName = node.prop("nodeName");

	switch(nodeName) {
	case "form":
	    var form = $(document.createElement("div"))
		.addClass("container"); // Bootstrap

	    var header = $(document.createElement("span"));

	    header.text(node.attr("label"));

	    form.append(
		$(document.createElement("div"))
		    .addClass("row")
		    .append(
			$(document.createElement("div"))
			    .addClass("col")
			    .append(header)));

	    parent.append($(document.createElement("form")).append(form));
	    
	    node.find("page").each(function(id){
		build(form, $(this));
	    });

	    break;
	case "page":
	    var page = $(document.createElement("div"))
		.addClass("row"); // Bootstrap

	    parent.append(page);
	    
	    node.find("section").each(function(id){
		build(page, $(this));
	    });

	    break;
	case "section":
	    var section = $(document.createElement("div"))
		.addClass("row")
		.append(
		    $(document.createElement("div"))
			.addClass("col")
		);

	    parent.append(section);
	    
	    node.find("row").each(function(id){
		build(section, $(this));
	    });

	    break;
	case "row":
	    var row = $(document.createElement("div"))
		.addClass("row"); // Bootstrap 

	    parent.append(row);
	    
	    node.find("column").each(function(id){
		build(row, $(this));
	    });

	    break;
	case "column":
	    var column = $(document.createElement("div"))
		.addClass("col"); // Bootstrap 

	    parent.append(column);
	    
	    node.children().each(function(id){
		build(column, $(this));
	    });

	    break;
	case "header":
	    var header = $(document.createElement("h3"));

	    header.text(node.text());

	    parent.append(header);
	    
	    break;
	case "textbox":
	    var label = $(document.createElement("label")).text(node.attr("label"));
	    var input = $(document.createElement("input"))
		.attr("type", "text")
		.addClass("form-control");

	    if (node.attr("task") == "secondary-task") {
		input.attr("readonly", "readonly");
	    }
	    
	    label.append(input);
	    parent.append(label, $("<br />"));
	    
	    break;
	case "date":
	    var label = $(document.createElement("label")).text(node.attr("label"));
	    var input = $(document.createElement("input"))
		.attr("type", "date")
		.addClass("form-control");

	    label.append(input);
	    parent.append(label, $("<br />"));
	    
	    break;
	case "datetime":
	    var label = $(document.createElement("label")).text(node.attr("label"));
	    var input = $(document.createElement("input"))
		.attr("type", "datetime")
		.addClass("form-control");

	    label.append(input);
	    parent.append(label, $("<br />"));
	    
	    break;
	case "checkbox":
	    var div = $(document.createElement("div"))
		.addClass("form-check");

	    var label = $(document.createElement("label"))
		.addClass("form-check-label")
		.text(node.attr("label"));
	    
	    var input = $(document.createElement("input"))
		.attr("type", "checkbox")
		.addClass("form-check-input");

	    label.prepend(input);

	    parent.append(div.append(label), $("<br />"));
	    
	    break;
	case "yesno":
	    var label = $(document.createElement("label")).text(node.attr("label"));

	    var group = $(document.createElement("div"))
		.addClass("btn-group")
		.attr("role", "group")
		.attr("data-toggle", "buttons");
	    
	    var yes = $(document.createElement("label"))
		.addClass("btn btn-secondary")
		.text("Yes")
		.append(
		    $(document.createElement("input"))
		      .attr("type", "radio")
		      .attr("name", node.attr("name") + "-yes")
		);
	    
	    var no = $(document.createElement("label"))
		.addClass("btn btn-secondary")
		.text("No")
		.append(
		    $(document.createElement("input"))
		      .attr("type", "radio")
		      .attr("name", node.attr("name") + "-no")
		);

	    group.append(yes).append(no);
	    
	    parent.append(label, group, $("<br />"));
	    
	    break;
	default:
	    break;
	}
    }

    var gui = require('nw.gui');

    // nw.Window.get().showDevTools();

    // // Create an empty menubar
    // var menu = new nw.Menu({type: 'menubar'});

    // // Create a submenu as the 2nd level menu
    // var submenu = new nw.Menu();
    // submenu.append(new nw.MenuItem({ label: 'Quit' }));

    // // Create and append the 1st level menu to the menubar
    // menu.append(new nw.MenuItem({
    // 	label: 'Dragon',
    // 	submenu: submenu
    // }));

    // // Assign it to `window.menu` to get the menu displayed
    // nw.Window.get().menu = menu;
    
    gui.Window.get().on('close', function() {
	// operations
	if(confirm("Are you sure?")) {
	    this.close(true); // don't forget this line, else you can't close it (I tried)
	}
    });
    
    // $("#component-start-step").css("display", "none");
    $("#component-start-workflow-reload").css("display", "none");
    
    $("#component-start-workflow-file").change(function(e){
	var file = $(this).prop("files")[0];

	// Save for next program run.
	
	// state.xml = $.parseXML(xml);
	
	// var steps = state.xml.find("step");

	// step.each(function(step){
	// 	alert(step.attr("name"));
	// });

	var reader = new FileReader();

	reader.onload = function(e) {
	    // Need to catch errors if XML is invalid.
	    var xmlDoc = $.parseXML(e.target.result);

	    state.xml = $(xmlDoc);

	    // var steps = state.xml.find("step");

	    // steps.each(function(step) {
	    // 	$("#view-start-tasks").append(
	    // 	    $(document.createElement("button"))
	    // 		.addClass("btn btn-primary btn-lg"
	    // 		.attr("value", step)
	    // 		.text($(this).attr("name"))
	    // 	)
	    // });

	    $("#view-start-intro").css("display", "none");
	    $("#view-start-selecttask").css("display", "block");
	}

	reader.readAsText(file);
    });

    $("#view-start-selecttask-secondary-task").click(function(e) {
	var form = state.xml.find("form");

	build($("#view-task"), form, "secondary-task");

	$("#component-bottom").css("display", "block");
	$("#view-start-selecttask").css("display", "none");
	$("#view-task").css("display", "block");
    });

    $("#component-start-workflow-open, #component-start-workflow-continue").click(function(e){
	$("#component-start-workflow-file").trigger("click");
    });
}(jQuery));

// window.onload = function () {
//     var fileInput = document.getElementById('fileInput');
//     var fileDisplayArea = document.getElementById('fileDisplayArea');

//     fileInput.addEventListener('change', function(e) {
//         var file = fileInput.files[0];
//         var textType = /text.*/;

//         if(file.type.match(textType)) {
//             var reader = new FileReader();

//             reader.onload = function (e) {
//                 fileDisplayArea.innerText = reader.result;
//             };
//             reader.readAsText(file);
//         } else {
//             fileDisplayArea.innerText = "File not supported";
//         }
//     });
//     };

// function allowDrop(ev) {
//     ev.preventDefault();
// }

// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }
// function newDoc() {
//     window.location.assign('./FormPage.html');
// }
