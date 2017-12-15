(function ($) {
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
	startTasksTaskCollectButton: $("#comp-start-tasks-task-collect-button")
        bottomPages: $("#comp-bottom-pages"),
	collectIntroFirstTime: $("#comp-collect-intro-firsttime"),
	collectIntroNotFirstTime: $("#comp-collect-intro-not-firsttime"),
	collectIntroLastCollectionDate: $("#comp-collect-intro-last-collection-date"),
	collectSinceLast: $("#comp-collect-since-last"),
	collectRangeStartDate: $("#comp-collect-range-start-date"),
	collectRangeEndDate: $("#comp-collect-range-end-date"),
	collectRangeButton: $("#comp-collect-range-button"),
	collectIntroFirstTime: $("#comp-collect-intro-firsttime"),
	collectAllButton: $("#comp-collect-all-button")
    };

    var state = {};

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
                if(confirm("There was a problem opening the file:\n\n" + file + "\n\nWould you like to try a different file?")){
                    comps.startIntroFile.trigger("click");
                }
                
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

            var button = document.getElementById("component-submit");

        button.addEventListener("click", function () {
            var form = document.getElementsByTagName("Form");
            var jsonData = {};
            var formData = $(form).serializeArray();
            $(formData).each(function (i, field) {
                jsonData[field.name] = field.value;
            });
            state.db.insert(jsonData,function (err, doc) { });
        });


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
            
            if (localStorage.getItem("workflow:last-task-name") &&
                localStorage.getItem("workflow:last-task-label"))
            {
                comps.startTasksLastTaskName.text(localStorage.getItem("workflow:last-task-label"));
                comps.startTasksLastTaskName.show();
            }
            else {
                comps.startTasksLastTaskName.hide();
            }

            var steps = state.xml.find("step");

            steps.each(function(step) {
                state.stepLabel = $(this).attr("label");
                state.stepName = $(this).attr("name");

                var button =
                    $(document.createElement("button"))
                        .attr("type", "button")
                        .addClass("btn btn-lg")
                        .addClass(($(this).attr("name")) == localStorage.getItem("workflow:last-task-name") ? "btn-primary" : "btn-secondary")
                        .text($(this).attr("label"))
                        .click(function(e) {
                            localStorage.setItem("workflow:last-task-label", state.stepLabel);
                            localStorage.setItem("workflow:last-task-name", state.stepName);

                            var form = state.xml.find("form");

                            build(views.task, form, name)
                            
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
                        });

                comps.startTasksTaskList.append(button);
            });

            views.startIntro.css("display", "none");
            views.startTasks.css("display", "block");
        });
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
