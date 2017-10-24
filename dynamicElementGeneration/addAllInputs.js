var radioCounter = 0;

/*
    [Required Parameters]
    divName : The name of the div the new element will appendTo().
    elementType: The type of element the caller wishes to create.
    className : The name of the class attribute the new element will be given.
    
    [Optional Parameters]
    textValue : The default text value of the element.
    nameOfElement: The name attribute the new element will be given. 
    label : A label that will insertBefore() the new element.
    whichRadioSelected : Which radio button, if any, is selected by default (yes or no).
    isChecked : Will determine if the new checkbox element is checked by default. 

*/
function addAllInputs(divName, elementType, className, textValue, nameOfElement, label, whichRadioSelected, isChecked){


    if (textValue === undefined){
        textValue = "Text Not Given";
    }

    if (name === undefined){
        name = "undefinedName";
    }

    if (label === undefined){
        label = "undefinedLabel: ";
    }

    var newDiv = $("<div/>", {
        "class" : "myDiv",
        "id" : "testDiv",
        appendTo : document.getElementById(divName)
    });

     switch(elementType) {
        case 'form':
            var newFormDiv = $("<div/>", {
                "class" : className,
                "text" : textValue,
                appendTo : newDiv
            });
            break;
        case 'pages':
            var newPagesDiv = $("<div/>", {
                "class" : className,
                "text" : textValue,
                appendTo : newDiv
            });
            break;
        case 'page':
            var newPageDiv = $("<div/>", {
                "class" : className,
                "text" : textValue,
                appendTo : newDiv
            });
            break;
        case 'row':
            var newRowDiv = $("<div/>", {
                "class" : className,
                "text" : textValue,
                appendTo : newDiv
            });
            break;
        case 'column':
            var newColumnDiv = $("<div/>", {
                "class" : className,
                "text" : textValue,
                appendTo : newDiv
            });
            break;
        case 'header':
            var newHeader = $("<h1 />", {
                html : textValue,
                appendTo : newDiv
            })
            break;
        case 'section':
            var newSection = $("<section />", {
                "text" : textValue,
                appendTo : newDiv
            })
            break;
        case 'date':
            var newDateField = $("<input />", {
                "type" : elementType,
                "name" : nameOfElement,
                "class" : className,
                appendTo : newDiv
            });
            break;
        case 'datetime':
            var newDateField = $("<input />", {
                "type" : "date",
                "name" : "nameOfElement",
                "class" : "className",
                appendTo : newDiv
            });
            var newTimeField = $("<input />", {
                "type" : "time",
                "name" : nameOfElement,
                "class" : className,
                appendTo : newDiv
            });
            break;
        case 'text':
            var newTextbox = $("<input />", {
                "type" : elementType,
                "name" : nameOfElement,
                "class" : className,
                "value" : textValue,
                appendTo : newDiv
            });
            $("<span>" + label + "</span>").insertBefore(newTextbox);
            break;
        case 'radio':
            var newRadioButtonOne = $("<input />", {
                "type" : elementType,
                "name" : nameOfElement + radioCounter,
                appendTo : newDiv
            });
            var newRadioButtonTwo = $("<input />", {
                "type" : elementType,
                "name" : nameOfElement + radioCounter,
                appendTo : newDiv
            });
            $("<span>" + label + "</span>").insertBefore(newRadioButtonOne);
            $("<span>   Yes : </span>").insertBefore(newRadioButtonOne);
            $("<span>   No : </span>").insertBefore(newRadioButtonTwo);
            
            if (whichRadioSelected === undefined)
            {
                $(newRadioButtonOne).attr("checked", false);
                $(newRadioButtonTwo).attr("checked", false);
            }
            else if (whichRadioSelected === "yes")
            {
                $(newRadioButtonOne).attr("checked", true);
            }
            else if (whichRadioSelected === "no")
            {
                $(newRadioButtonTwo).attr("checked", true);
            }

            radioCounter++;
            break;
        case 'checkbox':
            var newCheckbox = $("<input />", {
                "type" : elementType,
                "name" : nameOfElement,
                appendTo : newDiv
            });
            $("<span>" + label + "</span>").insertBefore(newCheckbox);
            if (isChecked === undefined)
            {
                // do nothing
            }
            else if (isChecked === "true")
            {
                $(newCheckbox).attr("checked", true);
            }
            break;
        case 'textarea':
            var newTextArea = $("<textarea />", {
                "name" : nameOfElement,
                "placeholder" : textValue,
                appendTo : newDiv
            });
            $("<span>" + label + "</span><br>").insertBefore(newTextArea);
            break;
          }
}