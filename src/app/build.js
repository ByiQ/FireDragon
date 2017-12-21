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
	var col = $(`<div class="col"></div>`);

	page.append(col);
	parent.append(page);
	
	node.find("section").each(function(id){
	    build(col, $(this));
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
    case "form-row":
	var row = $(`<div class="form-row"></div>`);

	parent.append(row);
	
	node.find("column").each(function(id){
	    build(row, $(this));
	});

	break;
    case "row":
	var row = $(`<div class="row"></div>`);

	parent.append(row);
	
	node.find("column").each(function(id){
	    build(row, $(this));
	});

	break;
    case "column":
	var column = $(`<div class="col"></div>`);
	var header = $(`<h3>${node.attr("label")||"&nbsp;"}</h3>`);

	column.append(header);
	
	parent.append(column);
	
	node.children().each(function(id){
	    build(column, $(this));
	});

	break;
    case "textbox":
	var group = $(
	    `<div class="form-group">
                <label class="form-label" for="${node.attr("name")}">
                   ${node.attr("label")}
                </label>
             </div>`
	);

	var input = $(`<input type="text" name="${node.attr("name")}" id="${node.attr("name")}" class="form-control">`);
	
	if(node.attr("required") == "required") {
	    input.attr("required");
	}
	
	group.append(input);
	
	// parent.append(formGroup, $("<br />"));
	parent.append(group);
	
	break;
    case "textarea":
	var group = $(
	    `<div class="form-group">
                <label class="form-label" for="${node.attr("name")}">
                   ${node.attr("label")}
                </label>
             </div>`
	);

	var input = $(`<textarea name="${node.attr("name")}" id="${node.attr(name)}" class="form-control">`);
	
	if(node.attr("required") == "required") {
	    input.attr("required");
	}
	
	group.append(input);
	
	// parent.append(formGroup, $("<br />"));
	parent.append(group);
	
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
	var group =
	   `<div class="form-group">
	       <div class="form-check">
  	          <label class="form-check-label">
	             <input class="form-check-input" type="checkbox" name="${node.attr("name")}" id="${node.attr("name")}">${node.attr("label")}
  	          </label>
	       </div>
	    </div>`;
	
	// if(node.attr("required") == "required") {
	// 	input.attr("required");
	// }
	
	parent.append(group);
	
	break;
    case "yesno":
	var label =
	   `<div class="form-group">
               <label>${node.attr("label")}</label>
            </div>`

	var buttons =
	    `<div class="btn-group form-group mx-sm-3" role="group" data-toggle="buttons">
            <label class="btn btn-secondary">
               Yes
               <input type="radio" name="${node.attr("name")}" value="yes" id="${node.attr("name")}-yes" />
            </label>
	    <label class="btn btn-secondary">
               No
               <input type="radio" name="${node.attr("name")}" value="no" id="${node.attr("name")}-no" />
            </label>
         </div>`

	// if(node.attr("default") == "yes") {
	//     yesLabel.addClass("active")
	//     yesInput.attr("checked", "checked");
	// }
	// else if(node.attr("default") == "no") {
	//     noLabel.addClass("active")
	//     noInput.attr("checked", "checked");
	// }
	
	// if(node.attr("required") == "required") {
	//     yesInput.attr("required");
	//     noInput.attr("required");
	// }

	parent.append(label, buttons);
	
	break;
    default:
	break;
    }
}
