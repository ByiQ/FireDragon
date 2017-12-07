$.get('../xml/page.xml', function(data) {
    alert("hello");
    alert(data);
}, "text");
    alert("hello1");

var xml = "/xml/page.xml";

var xmlDoc = $.parseXML(xml); 

var $xml = $(xmlDoc);

alert($xml);

var $person = $xml.find("person");

$person.each(function(){

    var name = $(this).find('name').text(),
        age = $(this).find('age').text();

    $("#ProfileList" ).append('<li>' +name+ ' - ' +age+ '</li>');

});
