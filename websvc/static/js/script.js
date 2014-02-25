$(document).ready(function () {

    // Calling our splashScreen plugin and
    // passing an array with images to be shown

    $('#promoIMG').splashScreen({
        textLayers: [
			'static/images/logo-mcafee.png',
		]
    });


    $("#slider").easySlider({
        continuous: false,
        numeric: true
    });
    $('#m_Password').password_strength();
    $('#m_ConfirmPassword').password_strength();

    $("#controls").children().click(function () {
        var location = $("a", $(this)).attr('rel');
        if (location == '4') {
            navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
        }
    });

    var currId = localStorage.getItem("currId");
    
    if (currId == null) {
        currId = 0;
    }

    if (currId == '4') {
        navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
    }

    function handle_geolocation_query(position) {
        //alert('Lat: ' + position.coords.latitude + ' ' +
        //'Lon: ' + position.coords.longitude);
        $.get("http://ws.geonames.org/countryCode?lat=37.354&lng=-121.955", function (data) {
            //alert(data);
            $("#countrySelect option[value=" + data + "]").attr("selected", "selected");
            //$("#countrySelect").val(data);
        });
    }

    function handle_errors(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED: alert("user did not share geolocation data");
                break;
            case error.POSITION_UNAVAILABLE: alert("could not detect current position");
                break;
            case error.TIMEOUT: alert("retrieving position timed out");
                break;
            default: alert("unknown error");
                break;
        }
    }
});
