function dialogSection() {
    $('.container').prepend('<div id="dialog"></div>');
    $("#dialog").dialog({
        autoOpen: false,
        close: function (event, ui) {

        }
    });
}

function errorMessage(data) { //text
    $("#dialog").html(data);
    $("#dialog").dialog("open");
}