(function ($) {
    var views = {
	startIntro: $("#view-start-intro"),
	startTasks: $("#view-start-tasks"),
	task:       $("#view-task"),
	navTop:     $("#view-top"),
	navBottom:  $("#view-bottom")
    };
    
    var comps = {
	topWorkflowName: $("#comp-top-workflow-name"),
	startIntroFirsttime: $("#comp-start-intro-firsttime"),
	startIntroNotFirsttime: $("#comp-start-intro-not-firsttime"),
	startIntroLastWorkflowName: $("#comp-start-intro-last-workflow-name"),
	startIntroContinue: $("#comp-start-intro-continue"),
	startIntroOpen: $("#comp-start-intro-open"),
	startIntroFile: $("#comp-start-intro-file"),
	startTasksWorkflowName: $("#comp-start-tasks-workflow-name"),
	startTasksLastTask: $("#comp-start-tasks-last-task"),
	startTasksLastTaskName: $("#comp-start-tasks-last-task-name"),
	startTasksTaskList: $("#comp-start-tasks-task-list"),
	bottomPages: $("#comp-bottom-pages")
    };

    var state = {};

    var build = function(parent, node) {
	var nodeName = node.prop("nodeName");

	switch(nodeName) {
	case "form":
	    var form = $(document.createElement("div"))
		.addClass("container");

	    comps.topWorkflowName.text(node.attr("label"));

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
		.attr("id", node.attr("name"))
		.addClass("row");

	    parent.append(page);
	    
	    comps.bottomPages.append(
		$(document.createElement("li"))
		    .addClass("nav-item")
		    .append(
			$(document.createElement("a"))
			    .addClass("nav-link btn btn-lrg")
			    .attr("href", "#" + node.attr("name"))
			    .text(node.attr("label"))
		    )
	    )

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
	        .attr("name", node.attr("name"))
		.addClass("form-control");

	    if(node.attr("required") == "required") {
		input.attr("required");
	    }
	    
	    label.append(input);
	    parent.append(label, $("<br />"));
	    
	    break;
	case "date":
	    var label = $(document.createElement("label")).text(node.attr("label"));
	    var input = $(document.createElement("input"))
		.attr("type", "date")
	        .attr("name", node.attr("name"))
		.addClass("form-control");

	    if(node.attr("required") == "required") {
		input.attr("required");
	    }
	    
	    label.append(input);
	    parent.append(label, $("<br />"));
	    
	    break;
	case "datetime":
	    var label = $(document.createElement("label")).text(node.attr("label"));
	    var input = $(document.createElement("input"))
		.attr("type", "datetime")
	        .attr("name", node.attr("name"))
		.addClass("form-control");

	    if(node.attr("required") == "required") {
		input.attr("required");
	    }
	    
	    label.append(input);
	    parent.append(label, $("<br />"));
	    
	    break;
	case "checkbox":
	    var div = $(document.createElement("div"))
		.addClass("form-check");

	    var label = $(document.createElement("label"))
		.addClass("form-check-label")
	        .attr("for", node.attr("name"))
		.text(node.attr("label"));
	    
	    var input = $(document.createElement("input"))
		.attr("type", "checkbox")
	        .attr("name", node.attr("name"))
		.attr("id", node.attr("name"))
		.addClass("form-check-input");

	    // if(node.attr("required") == "required") {
	    // 	input.attr("required");
	    // }
	    
	    label.prepend(input);

	    parent.append(div.append(label), $("<br />"));
	    
	    break;
	case "yesno":
	    var label = $(document.createElement("label")).text(node.attr("label"));

	    var group = $(document.createElement("div"))
		.addClass("btn-group")
		.attr("role", "group")
		.attr("data-toggle", "buttons");
	    
	    var yesLabel = $(document.createElement("label"))
		.addClass("btn btn-secondary")
		.text("Yes");

	    var yesInput = $(document.createElement("input"))
		.attr("type", "radio")
		.attr("name", node.attr("name"))
		.attr("id", node.attr("name") + "-yes")

	    var noLabel = $(document.createElement("label"))
		.addClass("btn btn-secondary")
		.text("No");

	    var noInput = $(document.createElement("input"))
		.attr("type", "radio")
		.attr("name", node.attr("name"))
		.attr("id", node.attr("name") + "-no");

	    if(node.attr("required") == "required") {
		yesInput.attr("required");
		noInput.attr("required");
	    }

	    yesLabel.append(yesInput);
	    noLabel.append(noLabel);

	    group
		.append(yesLabel)
		.append(noLabel);
	    
	    parent.append(label, group, $("<br />"));
	    
	    break;
	default:
	    break;
	}
    }

    /* If a previous workflow is not in localStorage then 
       it's probably not their first time using the app. */
    if (localStorage.getItem("file:last-workflow-name")) {
	comps.startIntroLastWorkflowName.text(localStorage.getItem("file:last-workflow-name"));
	comps.startIntroLastWorkflowName.css("display", "inline");
	comps.startIntroFirsttime.css("display", "none");
	comps.startIntroContinue.css("display", "inline-block");
    }
    else {
	comps.startIntroNotFirsttime.css("display", "none");
	comps.startIntroFirsttime.css("display", "block");
	comps.startIntroContinue.css("display", "none");
    }

    var gui = require('nw.gui');

    // gui.Window.get().on('close', function() {
    // 	// operations
    // 	if(confirm("Are you sure?")) {
    // 	    this.close(true); // don't forget this line, else you can't close it (I tried)
    // 	}
    // });
    
    var readWorkflow = function(file) {
	var fs = nw.require('fs');

	fs.readFile(file, 'utf8', function(err, txt) {
	    if (err) {
		alert(err);

		return;
	    }
	    
	    var xmlDoc = $.parseXML(txt);

	    state.xml = $(xmlDoc);

	    var workflowName = state.xml.find("properties").find("property[name=workflow-name]").text();

	    state.workflowName = workflowName;

	    var databasePath = state.xml.find("properties").find("property[name=database-path]").text();

	    state.databasePath = databasePath;

	    var Datastore = require('nedb');
	    state.db = new Datastore({ filename: state.databasePath, autoload: true });
	    
	    if (file != localStorage.getItem("file:last-path", file)){
		localStorage.setItem("file:last-path", file);
	    }

	    if (workflowName != localStorage.getItem("file:last-workflow-name", workflowName)) {
		if (localStorage.getItem("file:last-workflow-name", workflowName) != null) {
		    alert("Next time you use Dragon, " + localStorage.getItem("file:last-workflow-name", workflowName) + " will be called " + workflowName + ".");
		}
		
		localStorage.setItem("file:last-workflow-name", workflowName);
	    }

	    comps.startTasksWorkflowName.text(workflowName);
	    
	    if (localStorage.getItem("workflow:last-task-name")){
	    	comps.startTasksLastTaskName.text(localStorage.getItem("workflow:last-task-name"));
	    	comps.startTasksLastTaskName.show();
	    }
	    else {
	    	comps.startTasksLastTaskName.hide();
	    }

	    var steps = state.xml.find("step");

	    steps.each(function(step) {
		var name = $(this).attr("name");

		state.step = name;
		
	    	var button =
		    $(document.createElement("button"))
 		        .attr("type", "button")
	    	        .addClass("btn btn-lg")
		        .addClass(($(this).attr("name")) == localStorage.getItem("workflow:last-task-name") ? "btn-primary" : "btn-secondary")
	    		.text($(this).attr("label"))
	    		.click(function(e) {
			    localStorage.setItem("workflow:last-task-name", name);

			    var form = state.xml.find("form");

			    build(views.task, form, name);
			    
			    views.navBottom.css("display", "block");
			    views.startTasks.css("display", "none");
			    views.task.css("display", "block");
			});

	    	comps.startTasksTaskList.append(button);
	    });

	    views.startIntro.css("display", "none");
	    views.startTasks.css("display", "block");
	});
    }

    comps.startIntroFile.change(function(e){
	var file = $(this).prop("files")[0].path;

	readWorkflow(file);
    });

    comps.startIntroOpen.click(function(e){
	comps.startIntroFile.trigger("click");
    });

    comps.startIntroContinue.click(function(e){
	readWorkflow(localStorage.getItem("file:last-path"));
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
