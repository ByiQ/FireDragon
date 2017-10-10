var radioCounter = 0;
function addAllInputs(divName, inputType){

    var newDiv = $("<div/>", {
        "class" : "myDiv",
        "id" : "testDiv",
        appendTo : document.getElementById(divName)
    });

     switch(inputType) {
        case 'form':
            var newFormDiv = $("<div/>", {
                "class" : "form",
                "text" : "Test: newFormDiv",
                appendTo : newDiv
            });
            break;
        case 'pages':
            var newPagesDiv = $("<div/>", {
                "class" : "pages",
                "text" : "Test: newPagesDiv",
                appendTo : newDiv
            });
            break;
        case 'page':
            var newPageDiv = $("<div/>", {
                "class" : "page",
                "text" : "Test: newPageDiv",
                appendTo : newDiv
            });
            break;
        case 'row':
            var newRowDiv = $("<div/>", {
                "class" : "row",
                "text" : "Test: newRowDiv",
                appendTo : newDiv
            });
            break;
        case 'column':
            var newColumnDiv = $("<div/>", {
                "class" : "column",
                "text" : "Test: newColumnDiv",
                appendTo : newDiv
            });
            break;
        case 'header':
            var newHeader = $("<h1 />").html("Header Test").appendTo(newDiv);
            break;
        case 'section':
            var newSection = $("<span>Patient Information</span><section\>").appendTo(newDiv);
            break;
        case 'date':
            var newDateField = $("<input />", {
                "type" : "date",
                "name" : "dateOfBirth",
                appendTo : newDiv
            });
            break;
        case 'datetime':
            var newDateField = $("<input />", {
                "type" : "date",
                "name" : "dateField",
                appendTo : newDiv
            });
            var newTimeField = $("<input />", {
                "type" : "time",
                "name" : "timeField",
                appendTo : newDiv
            });
            break;
        case 'text':
            var newTextbox = $("<input />", {
                "type" : "text",
                "name" : "myTextBox",
                appendTo : newDiv
            });
            $("<span>Test Text Box : </span>").insertBefore(newTextbox);
            break;
        case 'radio':
            var newRadioButtonOne = $("<input />", {
                "type" : "radio",
                "name" : "myRadioButtonGroup".concat(radioCounter),
                appendTo : newDiv
            });
            var newRadioButtonTwo = $("<input />", {
                "type" : "radio",
                "name" : "myRadioButtonGroup".concat(radioCounter),
                appendTo : newDiv
            });
            $("<span>Test Radio Button Yes : </span>").insertBefore(newRadioButtonOne);
            $("<span>Test Radio Button No : </span>").insertBefore(newRadioButtonTwo);
            radioCounter++;
            break;
        case 'checkbox':
            var newCheckbox = $("<input />", {
                "type" : "checkbox",
                "name" : "myCheckbox",
                appendTo : newDiv
            });
            $("<span>Test Checkbox : </span>").insertBefore(newCheckbox);
            break;
        case 'textarea':
            var newTextArea = $("<textarea />", {
                "name" : "myTextArea",
                "placeholder" : "Type Text Here...",
                appendTo : newDiv
            });
            $("<span>Text Area : </span><br>").insertBefore(newTextArea);
            break;
          }
}