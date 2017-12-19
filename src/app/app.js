// Make dispacher action types into constants.
// Flux diagram.
// Make sure to register everything before dispatching.
// Define action type payloads in documentation.

var Datastore = require('nedb');
var WorkflowDispatcher = new Flux.Dispatcher();

var StateStore = {
    xml: null,
    workflow: null,
    dbPath: null,
    dbInstance: null
};

var TaskStore = {
    tasks: [],
    current: {
	label: null,
	name: null
    }
};

var FormStore = {
    // Keeps track of which country is selected
    waiting: [],

    // Keeps track of which city is selected
    completed: []
};

var App = (function ($) {
    // After research these performance-oriented shortcuts aren't that useful.
    // jQuery claims that its select, especially for IDs is very fast
    // thansk to brower enhancements.
    var views = {
        startIntro: $("#view-start-intro"),
        startTasks: $("#view-start-tasks"),
        task:       $("#view-task"),
	collect:    $("#view-collect"),
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
	startTasksTaskCollectButton: $("#comp-start-tasks-task-collect-button"),
        bottomPages: $("#comp-bottom-pages"),
	collectIntroFirstTime: $("#comp-collect-intro-firsttime"),
	collectIntroNotFirstTime: $("#comp-collect-intro-not-firsttime"),
	collectIntroLastCollectionDate: $("#comp-collect-intro-last-collection-date"),
	collectSinceLast: $("#comp-collect-since-last"),
	collectRangeStartDate: $("#comp-collect-range-start-date"),
	collectRangeEndDate: $("#comp-collect-range-end-date"),
	collectRangeButton: $("#comp-collect-range-button"),
	collectIntroFirstTime: $("#comp-collect-intro-firsttime"),
	collectAllButton: $("#comp-collect-all-button"),
	bottomSave: $("#comp-bottom-save"),
	bottomSubmit: $("#comp-bottom-submit")
    };

    
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
    //  // operations
    //  if(confirm("Are you sure?")) {
    //      this.close(true); // don't forget this line, else you can't close it (I tried)
    //  }
    // });

    var readWorkflow = function(file) {
        var fs = nw.require('fs');

        fs.readFile(file, 'utf8', function(err, txt) {
            if (err) {
                if(confirm("There was a problem opening the file:\n\n" +
			   file + "\n\nWould you like to try a different file?"))
		{
		    // Sufficient. More abstract event not necessary at this moment.
                    comps.startIntroFile.trigger("click");
                }
                
                return;
            }

	    WorkflowDispatcher.dispatch({
		actionType: "new-file",
		file: file,
		xml: $($.parseXML(txt))
	    });
	});
    }

    WorkflowDispatcher.register(function(payload) {
	if (payload.actionType === 'new-file') {
	    StateStore.xml = payload.xml;

	    // If the document is valid, this should not cause errors.
            StateStore.workflow = StateStore.xml.find("properties").find("property[name=workflow-name]").text();

	    // Same.
            StateStore.dbPath = StateStore.xml.find("properties").find("property[name=database-path]").text();

	    // If an old database is open it should be closed. 
	    StateStore.dbInstance = new Datastore({ filename: StateStore.dbPath, autoload: true });
	    // Unneeded dispatching.
	    if (payload.file != localStorage.getItem("file:last-path", payload.file)){
		localStorage.setItem("file:last-path", payload.file);
	    }

	    if (StateStore.workflow != localStorage.getItem("file:last-workflow-name", StateStore.workflow)) {
		if (localStorage.getItem("file:last-workflow-name", StateStore.workflow) != null) {
		    alert("Next time you use Dragon, " +
			  localStorage.getItem("file:last-workflow-name", StateStore.workflow) +
			  " will be called " + StateStore.workflow + ".");
		}
		
		localStorage.setItem("file:last-workflow-name", StateStore.workflow);
	    }

	    comps.startTasksWorkflowName.text(StateStore.workflow);

	    views.startIntro.css("display", "none");
	    views.startTasks.css("display", "block");

	    var tasks = StateStore.xml.find("task");

	    tasks.each(function(task) {
		var taskLabel = $(this).attr("label");
		var taskName = $(this).attr("name");

		TaskStore.tasks.push({
		    label: taskLabel,
		    name: taskName
		});

		var button = $(document.createElement("button"))
		    .attr("type", "button")
		    .addClass("btn btn-lg")
		    .addClass(taskName == localStorage.getItem("workflow:last-task-name") ? "btn-primary" : "btn-secondary")
		    .text(taskLabel)
		    .click(function(e) {
			WorkflowDispatcher.dispatch({
			    actionType: "select-task",
			    label: taskLabel,
			    name: taskName
			});			
		    });

		comps.startTasksTaskList.append(button);
	    });
	}
    });

    WorkflowDispatcher.register(function(payload) {
	if (payload.actionType === 'select-task') {
	    // Get waiting workflows.
	    // These are started, but incomplete forms, and those waiting from a previous task.
	    // StateStore.dbInstance.find({ "task": ""}, function(err, documents) {  
	    // 	var waiting = [];
		
	    // 	results.forEach(function(item) {
	    // 	    waiting.push({
	    // 		"label": item["patient-name"],
	    // 		"id": item._id
	    // 	    });
	    // 	});

	    // 	WorkflowDispatcher.dispatch({
	    // 	    actionType: "update-waiting-forms",
	    // 	    waiting: waiting
	    // 	});
	    // });

	    // // Get complete workflows.
	    // StateStore.dbInstance.find({ "task": ""}, function(err, results) {  
	    // 	var completed = [];
		
	    // 	results.forEach(function(item) {
	    // 	    completed.push({
	    // 		"label": item["patient-name"],
	    // 		"id": item._id
	    // 	    });
	    // 	});

	    // 	WorkflowDispatcher.dispatch({
	    // 	    actionType: "update-completed-forms",
	    // 	    completed: completed
	    // 	});
	    // });

	    localStorage.setItem("workflow:last-task-label", payload.label);
	    localStorage.setItem("workflow:last-task-name", payload.name);

	    var form = StateStore.xml.find("form");

	    build(views.task, form, name);
			
	    // comps.topWorkflowName.text(node.attr("label"));
	    // comps.bottomPages.append(
	    //  $(document.createElement("li"))
	    //      .addClass("nav-item")
	    //      .append(
	    //          $(document.createElement("a"))
	    //              .addClass("nav-link btn btn-lrg")
	    //              .attr("href", "#" + node.attr("name"))
	    //              .text(node.attr("label"))
	    //      )
	    // )

	    views.navBottom.css("display", "block");
	    views.startTasks.css("display", "none");
	    views.task.css("display", "block");
	}
    });
    
    // Save form for later without sending to next task.
    comps.bottomSave.click(function(e) {
    	var form = document.getElementsByTagName("form");
    	var jsonData = {};
    	var formData = $(form).serializeArray();

    	$(formData).each(function (i, field) {
            jsonData[field.name] = field.value;
    	});

	jsonData["task"] = "";
    	// Need to append step if we are being submitted.
	
    	StateStore.dbInstance.insert(jsonData ,function (err, doc) {
    	    // If successfully inserted, update store.
    	    if(err) {
    		return;
    	    }
	    
    	    WorkflowDispatcher.dispatch({
		actionType: 'new-waiting-form',
		label: jsonData["patient-name"],
	        id: doc._id
	    });

	    alert("did it");
    	});
    	// state.db.insert(jsonData ,function (err, doc) { });
    });

    // Could stick into state to start. Could think of it as outside that flow.
    if (localStorage.getItem("workflow:last-task-name") &&
        localStorage.getItem("workflow:last-task-label"))
    {
        comps.startTasksLastTaskName.text(localStorage.getItem("workflow:last-task-label"));
        comps.startTasksLastTaskName.show();
    }
    else {
        comps.startTasksLastTaskName.hide();
    }

    comps.startTasksTaskCollectButton.click(function(e){
	views.collect.css("display", "block");
	views.startTasks.css("display", "none");
    });

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

    // We could get update every time, but why.
    WorkflowDispatcher.register(function(payload) {
	if (payload.actionType === 'new-completed-form') {
	    FormStore.completed.push(payload.workflowName);
	}
	else if (payload.actionType === 'new-waiting-form') {
	    FormStore.waiting.push(payload.workflowName);

	    
	}
    });

    WorkflowDispatcher.register(function(payload) {
	if (payload.actionType === 'update-completed-forms') {
	    FormStore.completed = payload.completed;

	    // Remake the list
	}
	else if (payload.actionType === 'update-waiting-forms') {
	    FormStore.completed = payload.completed;

	    // Remake the list
	}
    });

}($));



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
