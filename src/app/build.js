var build = function(parent, node) {
    var nodeName = node.prop("nodeName");

    switch(nodeName) {
    case "form":
	// <div class="container">
	//    <div class="row">
	var container = $(
	    `<div class="container">
	        <div class="row">
                   <div class="col">
                   </div>
                </div>
             </div>`
	);

	parent.append($("<form></form>").append(container));
	
	node.find("page").each(function(id){
	    build(container, $(this));
	});

	break;
    case "page":
	var page = $(`<div class="row" id="${node.attr("name")}"></div>`);
	
	parent.append(page);
	
	node.find("section").each(function(id){
	    build(page, $(this));
	});

	break;
    case "section":
	var section = $(`<div class="row"></div>`);
	var col = $(`<div class="col"></div>`);

	section.append(col);
	
	parent.append(section);
	
	node.find("row").each(function(id){
	    build(col, $(this));
	});

	break;
    case "row":
	var row = $(document.createElement("div"))
	    .addClass("form-row"); // Bootstrap 

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
	var formGroup = $(document.createElement("div"))
	    .addClass("form-group");
	
	var label = $(document.createElement("label"))
	    .addClass("form-label")
	    .text(node.attr("label"))
	    .attr("for", node.attr("name"));
	
	var input = $(document.createElement("input"))
	    .attr("type", "text")
	    .attr("name", node.attr("name"))
	    .attr("id", node.attr("name"))
	    .addClass("form-control");

	if(node.attr("required") == "required") {
	    input.attr("required");
	}
	
	formGroup
	    .append(label)
	    .append(input);
	
	// parent.append(formGroup, $("<br />"));
	parent.append(formGroup);
	
	break;
    case "date":
	var formGroup = $(document.createElement("div"))
	    .addClass("form-group");
	
	var label = $(document.createElement("label"))
	    .addClass("form-label")
	    .text(node.attr("label"))
	    .attr("for", node.attr("name"));
	
	var input = $(document.createElement("input"))
	    .attr("type", "date")
	    .attr("name", node.attr("name"))
	    .attr("id", node.attr("name"))
	    .addClass("form-control");

	if(node.attr("required") == "required") {
	    input.attr("required");
	}
	
	formGroup
	    .append(label)
	    .append(input);
	
	// parent.append(formGroup, $("<br />"));
	parent.append(formGroup);
	
	break;
    case "datetime":
	var formGroup = $(document.createElement("div"))
	    .addClass("form-group");
	
	var label = $(document.createElement("label"))
	    .addClass("form-label")
	    .text(node.attr("label"))
	    .attr("for", node.attr("name"));
	
	var input = $(document.createElement("input"))
	    .attr("type", "datetime-local")
	    .attr("name", node.attr("name"))
	    .attr("id", node.attr("name"))
	    .addClass("form-control");

	if(node.attr("required") == "required") {
	    input.attr("required");
	}
	
	formGroup
	    .append(label)
	    .append(input);
	
	// parent.append(formGroup, $("<br />"));
	parent.append(formGroup);
	
	break;
    case "checkbox":
	var formGroup = $(document.createElement("div"))
	    .addClass("form-group");
	
	var formCheck = $(document.createElement("div"))
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
	
	formCheck
	    .append(input)
	    .append(label);

	formGroup.append(formCheck);

	parent.append(formGroup);
	
	break;
    case "yesno":
	var formLabel = $(document.createElement("label"))
	    .text(node.attr("label"));

	var btnGroup = $(document.createElement("div"))
	    .addClass("btn-group form-group")
	    .attr("role", "group")
	    .attr("data-toggle", "buttons");
	
	var yesLabel = $(document.createElement("label"))
	    .addClass("btn btn-secondary")
	    .text("Yes");

	var yesInput = $(document.createElement("input"))
	    .attr("type", "radio")
	    .attr("name", node.attr("name"))
	    .attr("value", "yes")
	    .attr("id", node.attr("name") + "-yes")

	var noLabel = $(document.createElement("label"))
	    .addClass("btn btn-secondary")
	    .text("No");

	var noInput = $(document.createElement("input"))
	    .attr("type", "radio")
	    .attr("name", node.attr("name"))
	    .attr("value", "no")
	    .attr("id", node.attr("name") + "-no");

	if(node.attr("default") == "yes") {
	    yesLabel.addClass("active")
	    yesInput.attr("checked", "checked");
	}
	else if(node.attr("default") == "no") {
	    noLabel.addClass("active")
	    noInput.attr("checked", "checked");
	}
	
	if(node.attr("required") == "required") {
	    yesInput.attr("required");
	    noInput.attr("required");
	}

	yesLabel.append(yesInput);
	noLabel.append(noInput);

	btnGroup
	    .append(yesLabel)
	    .append(noLabel);
	
	parent.append(formLabel, btnGroup, $("<br />"));
	
	break;
    default:
	break;
    }
}
