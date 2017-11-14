/**
 * @file addAllInputs : addAllInputs.js is the file that contains the functions that can dynamically add form elements.
 * @namespace addAllInputs
 */

var radioCounter = 0;

/** 
 * @function createForm
 * @memberOf addAllInputs
 * @author Jerrid Kimball, Ben Sprunger
 * @param fileLocation - The location of the xml file that describes the form.
 * 
 * @description The createForm() function builds a form from a xml file description.
 */

 function createForm(fileLocation)
 {
     $.get(fileLocation, function(xml){

         var build = function(parent, node) {
             var nodeName = node.prop("nodeName");

             switch(nodeName) {
                 case "form":
                    addDivElement(parent, node.attr("id"), node.attr("class"), node.attr("label"));
                    node.find("page").each(function(id){build(form, $(this));});
                 break;
                 case "page":
                    addDivElement(parent, node.attr("id"), node.attr("class"), node.attr("label"));
                    node.find("section").each(function(id){build(page, $(this));});
                 break;
                 case "section":
                    addDivElement(parent, node.attr("id"), node.attr("class"), node.attr("label"));
                    node.find("row").each(function(id){build(section, $(this));});
                 break;
                 case "row":
                    addDivElement(parent, node.attr("id"), node.attr("class"), node.attr("label"));
                    node.find("column").each(function(id){build(row, $(this));});
                 break;
                 case "column":
                    addDivElement(parent, node.attr("id"), node.attr("class"), node.attr("label"));
                    node.children().each(function(id){build(column, $(this));});
                 break;
                 case "header":
                    addHeaderElement(parent, node.text(), node.attr("class"), node.attr("id"));
                 break;
                 case "textbox":
                    addInputElement(parent, nodeName, node.attr("name"), node.attr("label"), node.attr("class"), node.attr("value"), node.attr("id"));
                 break;
                 case "date":
                    addInputElement(parent, nodeName, node.attr("name"), node.attr("label"), node.attr("class"), node.attr("value"), node.attr("id"));
                 break;
                 case "datetime":
                    addDateTimeElement(parent, node.attr("name"), node.attr("label"), node.attr("class"), "datetimeId");
                 break;
                 case "checkbox":
                    addCheckBoxElement(parent, node.attr("name"), node.attr("label"), node.attr("checked"));
                 break;
                 case "yesno":
                    addYesNo(parent, node.attr("name"), node.attr("label"))
                 break;
                 default:
                 break;
             }
         }

         var xmlDoc = $.parseXML(xml);
         var $xml = $(xmlDoc);
         var form = $xml.find("form");

         build($("body"), form);
     }, "text");
 }

/** 
 * @function addDivElement
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new div element will appendTo().
 * @param idOfElement - The id attribute the new div element will be given.
 * @param {optional} className - The name of the class attribute the new div element will be given.
 * @param {optional} textValue - The default text value of the new div element.
 * 
 * @description The addDivElement function will dynamically generate a div element from the given parameters.
 */

 function addDivElement(divName, idOfElement, className, textValue)
 {
     if (textValue === undefined)
     {
         textValue === "";
     }

     if (className === undefined)
     {
         className = "classNameNotGiven";
     }

     var newFormDiv = $("<div/>", {
        html : textValue, 
        "class" : className,
        "id" : idOfElement,
         appendTo : document.getElementById(divName)
     })
 }

 /** 
 * @function addHeaderElement
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new header element will appendTo().
 * @param textValue - The text value of the header element.
 * @param {optional} className - The name of the class attribute the new header element will be given.
 * @param {optional} idOfElement - The id attribute the new header element will be given.
 * 
 * @description The addHeaderElement function will dynamically generate a header element from the given parameters.
 */

 function addHeaderElement(divName, textValue, className, idOfElement)
 {
    if (className === undefined)
    {
        className = "classNameNotGiven";
    }

    if (idOfElement === undefined)
    {
        idOfElement = "idNotGiven";
    }

    var newHeader = $("<h1 />", {
        html : textValue,
        "class" : className,
        "id" : idOfElement,
        appendTo : document.getElementById(divName)
     })
 }
 
 /** 
 * @function addSectionElement
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new section element will appendTo().
 * @param {optional} textValue - The text value of the section element.
 * @param {optional} className - The name of the class attribute the new section element will be given.
 * @param {optional} idOfElement - The id attribute the new section element will be given.
 * 
 * @description The addSectionElement function will dynamically generate a section element from the given parameters.
 */

 function addSectionElement(divName, textValue, className, idOfElement)
 {
    if (textValue === undefined)
    {
        textValue = "";
    }

    if (className === undefined)
    {
        className = "classNameNotGiven";
    }

    if (idOfElement === undefined)
    {
        idOfElement = "idNotGiven";
    }

    var newSection = $("<section />", {
        "text" : textValue,
        "class" : className,
        "idOfElement" : idOfElement,
        appendTo: document.getElementById(divName)
    })

 }

 /** 
 * @function addDateTimeElement
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new dateTime element will appendTo().
 * @param nameOfElement - The name of the new datetime element.
 * @param label - The label of the new datetime element.
 * @param {optional} textValue - The text value of the dateTime element.
 * @param {optional} className - The name of the class attribute the new dateTime element will be given.
 * @param {optional} idOfElement - The id attribute the new dateTime element will be given.
 * 
 * @description The addDateTimeElement function will dynamically generate a dateTime element from the given parameters.
 */

 /* Default values for both fields need to be added. */
 function addDateTimeElement(divName, nameOfElement, label, className, idOfElement)
 {
     if (className === undefined)
     {
         className = "classNameNotGiven"
     }

     if (idOfElement === undefined)
     {
         idOfElement = "idNotGiven"
     }

    var newDateField = $("<input />", {
        "type" : "date",
        "name" : nameOfElement.concat("test"),
        "class" : className.concat("test"),
        "id" : idOfElement,
        appendTo : document.getElementById(divName)
    })

    var newTimeField = $("<input />", {
        "type" : "time",
        "name" : nameOfElement,
        "class" : className,
        "id" : idOfElement,
        insertAfter : newDateField
    })
    $("<span>" + label + "</span>").insertBefore(newDateField);
 }

  /** 
 * @function addInputElement
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new dateTime element will appendTo().
 * @param elementType - The type of input element to be generated.
 * @param nameOfElement - The name attribute of the input element to be generated.
 * @param label - The label that insertBefore() will add before the input element to be generated.
 * @param {optional} className - The name of the class attribute the new input element will be given.
 * @param {optional} textValue - The text value of the input element.
 * @param {optional} idOfElement - The id attribute the new input element will be given.
 * 
 * @description The addInputElement function will dynamically generate an input element from the given parameters.
 */

 /* Add default for date */
 function addInputElement(divName, elementType, nameOfElement, label, className, textValue, idOfElement)
 {
    if (className === undefined)
    {
        className = "classNameNotGiven"
    }

     if (textValue === undefined)
     {
         textValue = "";
     }

     if (idOfElement === undefined)
     {
         idOfElement = "idNotGiven"
     }

     var newInputElement = $("<input />", {
         "type" : elementType,
         "name" : nameOfElement,
         "class" : className,
         "value" : textValue,
         "id" : idOfElement,
         appendTo : document.getElementById(divName)
     })
     $("<span>" + label + "</span>").insertBefore(newInputElement);

 }

 /** 
 * @function addYesNo
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new yesNo element will appendTo().
 * @param nameOfElement - The name attribute of the yesNo element to be generated.
 * @param label - The label that insertBefore() will add before the yesNo element to be generated.
 * @param {optional} whichRadioSelected - The variable used to determine which radio box(yes/no) is selected if any. 
 *                                        <br>"yes" : the yes radio button is selected. 
 *                                        <br>"no" : the no radio button is selected
 *                                        <br>undefined : neither radio button will be selected.
 * 
 * @description The addYesNo function will dynamically generate a yesNo element from the given parameters.
 */
 function addYesNo(divName, nameOfElement, label, whichRadioSelected)
 {
    var newRadioButtonOne = $("<input />", {
        "type" : "radio",
        "name" : nameOfElement + radioCounter,
        appendTo : document.getElementById(divName)
    });
    var newRadioButtonTwo = $("<input />", {
        "type" : "radio",
        "name" : nameOfElement + radioCounter,
        appendTo : document.getElementById(divName)
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
 }

 /** 
 * @function addRadio
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new radio element will appendTo().
 * @param nameOfElement - The name attribute of the radio element to be generated.
 * @param label - The label that insertBefore() will add before the radio element to be generated.
 * @param {optional} radioSelected - The variable used to determine if the radio box is selectd.
 *                                   <br>true : The radio button will be selected.
 *                                   <br>false/undefined : The radio button will not be selected.
 * 
 * @description The addRadio function will dynamically generate a radio element from the given parameters.
 */

 function addRadio(divName, nameOfElement, label, radioSelected)
 {
     var newRadioButton = $("<input />", {
         "type" : "radio",
         "name" : nameOfElement,
         appendTo : document.getElementById(divName)
     })

     $("<span>" + label + "</span>").insertBefore(newRadioButton);

     if (radioSelected === undefined || false)
     {
         $(newRadioButton).attr("checked", false);
     }
     else if (radioSelected === "true")
     {
         $(newRadioButton).attr("checked", true)
     }
 }

 /** 
 * @function addCheckBoxElement
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new checkbox element will appendTo().
 * @param nameOfElement - The name attribute of the checkbox element to be generated.
 * @param label - The label that insertBefore() will add before the checkbox element to be generated.
 * @param {optional} isChecked - The variable used to determine if the checkbox is selectd.
 *                                   <br>true : The checkbox will be selected.
 *                                   <br>false/undefined : The checkbox will not be selected.
 * 
 * @description The addCheckBoxElement function will dynamically generate a checkbox element from the given parameters.
 */
 function addCheckBoxElement(divName, nameOfElement, label, isChecked)
 {
     var newCheckbox = $("<input />", {
         "type" : "checkbox",
         "name" : nameOfElement,
         appendTo : document.getElementById(divName)
     })
     $("<span>" + label + "</span>").insertBefore(newCheckbox);

     if (isChecked === undefined || false)
     {
         $(newCheckbox).attr("checked", false);
     }
     else if (isChecked === true)
     {
         $(newCheckbox).attr("checked", true);
     }
 }

/** 
 * @function addTextAreaElement
 * @memberOf addAllInputs
 * @author Ben Sprunger
 * @param divName - The name of the div the new textarea element will appendTo().
 * @param nameOfElement - The name attribute of the textarea element to be generated.
 * @param label - The label that insertBefore() will add before the textarea element to be generated.
 * @param placeHolder - The placeholder text value.
 * @param {optional} - The html text content of the textarea element if any.  
 * 
 * @description The addTextAreaElement function will dynamically generate a textarea element from the given parameters.
 */
 function addTextAreaElement(divName, nameOfElement, label, placeHolder, textValue)
 {
     if(textValue === undefined)
     {
         textValue = '';
     }

     var newTextArea = $("<textarea />", {
         "name" : nameOfElement,
         "placeholder" : placeHolder,
         html : textValue,
         appendTo : document.getElementById(divName)
     })
     $("<span>" + label + "</span><br>").insertBefore(newTextArea);
 }