/*
Name : teatree.js 
Authors: Senthil Siva, Sundeep Yedida
*/

var TeaTree = function() {
    
    // Private properties
    var events_to_snoop = ['click', 'mousemove', 'keypress'];
    var backend_url = "127.0.0.1:5000/submit_info";


    // Private methods

    function logClickToStorage(e) {
       var payload = new Array();
                   
       var payload.event_type = "click";
       var payload.click_currentTarget = e.currentTarget;
       var payload.click_target = e.target;
       var payload.click_timestamp = e.timeStamp;
                          
       console.log("logging to backend click payload:" + payload);
    };



    function snoop_on_click(e) {
    	console.log("tt: clicked ...");

        logClickToStorage(e);
	log_to_backend(payload);
    }

    function snoop_on_mousemove(e) {
    }

    function snoop_on_scroll(e) {
    }

    
    // function resposible for the actual binding of events
    function bind_events_to_snoopers() {

    	console.log("tt: binding ");

    	// TODO : make this dynamic 

    	$(document).bind('click', snoop_on_click);
    	$(document).bind('mousemove', snoop_on_mousemove);
    	$(document).bind('scroll',snoop_on_scroll);

    	console.log('bound  click, mousemove, scroll');

    }

    function log_to_backend(payload) {
    	

	console.log("backend logging ...");

	//var params = JSON.stringify(payload);
	var params = payload;
	console.log("params:" + params);
	
	var webMethod = 'http://127.0.0.1:5000/submit_info';

                var success_func= function(response){
                        console.log("great success:" + response);
	        };

                var error_func =  function(xhr, err) {
                    if (xhr.status == 200) {
                        var parseResponse = JSON.parse(xhr.responseText);
                        alert(parseResponse);
                    }
                    console.log('Error\n-----\nStatus: ' + xhr.status + '\nResponse: ' + xhr.responseText + '\nMessage: ' + err);
                    //alert("\nReadyState: " + xhr.readyState);
                };

                var datafilter_func = function(data){
                    var response = JSON.parse(data)
                    return (response.hasOwnProperty('d')) ? response.d : response;
                };

	$.ajax({
        	type: "POST",
	        url: webMethod,
        	data: params,
	        contentType: "application/json; charset=utf-8",
                datafilter: datafilter_func,
                success:success_func,
                error: error_func,
                

	     });
       

    }


    return {

    	// public methods 

	init : function() {
	    
	    console.log("t t: initialized" );
	    var self = this;

	    // do bind etc 
	    bind_events_to_snoopers();
        
	}
    };

}();





$(document).ready( function() {

        TeaTree.init();
        
});
