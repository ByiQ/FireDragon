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
	
	node.find("page").each(function(index, page){
	    build(container, $(page));
	});

	break;
    case "page":
	var page = $(`<div class="row" id="${node.attr("name")}"></div>`);
	var col = $(`<div class="col"></div>`);

	page.append(col);
	parent.append(page);
	
	node.find("section").each(function(index, section){
	    build(col, $(section));
	});

	break;
    case "section":
	var section = $(`<div class="row"></div>`);
	var col = $(`<div class="col"></div>`);

	section.append(col);
	parent.append(section);
	
	node.find("row, form-row").each(function(index, row){
	    build(col, $(row));
	});

	break;
    case "form-row":
    case "row":
	var row = $(`<div class="${nodeName}"></div>`);

	parent.append(row);
	
	node.find("column").each(function(index, column){
	    build(row, $(column));
	});

	break;
    case "column":
	var column = $(`<div class="col"></div>`);

	// If header isn't set then just put a space in a header.
	// We want to align the headers. If none of the headers are set then we're just wasting space.
	var header = $(`<h3>${node.attr("label")||"&nbsp;"}</h3>`);

	column.append(header);
	
	parent.append(column);
	
	node.children().each(function(index, item){
	    build(column, $(item));
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
    case "datetime":
	var group = $(`<div class="form-group"></div>`);
	var label = $(
            `<label class="form-label" for="${node.attr("name")}">
                 ${node.attr("label")}
             </label>`
	);

	var type = nodeName == "date" ? "date" : "datetime-local";
	
	var input = $(
	    `<input type="${type}" name="$(node.attr("name")}" id="$(node.attr("name")}" class="form-control" />`
	);

	if(node.attr("required") == "required") {
	    input.attr("required");
	}
	
	label.append(input);
	group.append(label);
	
	parent.append(group);
	
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
    case "radio":
	

	break;
    case "select":
	var select = $(`<select class="form-control"></select>`);
	
	parent.append(select);

	node.find("option-group, > option").each(function(index, item){
	    build(select, $(item));
	});

	break;
    case "option-group":
	var optionGroup = $(`<optgroup label="${node.attr("label")}"></optgroup>`);

	parent.append(optionGroup);

	node.find("option").each(function(index, option){
	    build(optionGroup, $(option));
	});

	break;
    case "option":
	var option = $(`<option value="${node.attr("value")}">${node.attr("label")}</option>`);

	parent.append(option);

	break;
    default:
	break;
    }
}
