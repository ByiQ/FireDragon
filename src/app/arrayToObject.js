var mapArrayToObject = function(a){
    var result = {};
    
    $(a).each(function (i, field) {
        result[field.name] = field.value;
    });

    return result;
}
