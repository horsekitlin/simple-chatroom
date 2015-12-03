"use strict";
function AjaxRequest(formData, route){

    var xhr = new XMLHttpRequest();

    xhr.open("POST", route, true);

    xhr.onload = function() {
        callback(JSON.parse(xhr.responseText));
    };

    xhr.send(formData);

}

function MakeRequest(Form, callback){
    var formData = new FormData(Form);

    var xhr = new XMLHttpRequest();

    xhr.open("POST", $(Form).attr("action"), true);

    xhr.onload = function() {
        callback(JSON.parse(xhr.responseText));
    };

    xhr.send(formData);
}
function MakeProgressRequest(Form, callback){
    $(".progress").removeClass("hide");
    var formData = new FormData(Form);

    var xhr = new XMLHttpRequest();

    xhr.open("POST", $(Form).attr("action"), true);

    xhr.upload.onprogress = function(evt){

        if (evt.lengthComputable) {
            var percentage = (evt.loaded / evt.total) * 100;

            $("#progress").css("min-width", percentage + "%");;
            $("#progress").text(percentage + "%");;

        }
    }

    xhr.onload = function() {
        setTimeout(function(){
            $(".progress").addClass("hide");;
        }, 500)
        callback(JSON.parse(xhr.responseText));
    };

    xhr.send(formData);
}
