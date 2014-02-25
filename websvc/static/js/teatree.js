/*
Name : teatree.js 
Authors: Senthil Siva, Sundeep Yedida
*/
var TeaTree = function () {

        // Private properties
        var events_to_snoop = ['click', 'mousemove', 'keypress'];
        var backend_url = "127.0.0.1:5000/submit_info";

        // Private methods
        
		// BEGIN SESSION STUFF
		function setupSession() {
            
			// This is enough to 'init' session
	 		var s_id = getSessionId();
        };

        function getSessionId() {
            var sess_id = null;

            function getAndLogToLS()
            {

               // missing id, so get session_Id from backend TODO
                sess_id = Math.floor(Math.random() * 10001);

                // store locally
                 localStorage.setItem('s_id', sess_id);
            };

            // check for session id
            try {
                sess_id = localStorage.getItem('s_id');
            }
            // missing session_id, get it and log to storage
            catch (err) {
               getAndLogToLS();

            }
             if (sess_id == null) {
                getAndLogToLS();
             }
             return sess_id;
        };

	 	// END SESSION STUFF
		
		// BEGIN LOGGING STUFF

        function logClickToStorage(e) {
             var payload = new Object();

            payload.event_type = "click";
            //payload.target_html = e.toElement.outerHTML;
            payload.timestamp = e.timeStamp;
            payload.id = getSessionId();

            // flatten, stringify and store
            try {
                JSONstring.detectCirculars = true;
                JSONstring.restoreCirculars = false;
                var s = JSONstring.make(payload);
            } catch (err) {
                // bork ...
                console.log("malformed payload ...");
            }
            
            // store into LS 


            console.log("logging to backend click payload:" + s);
        };

		function check_log_to_backend() {};
		
		// END LOGGING STUFF

		// BEGIN SNOOPING 
        function snoop_on_click(e) {
            console.log("tt: clicked ...");

            logClickToStorage(e);
            // TODO : convert to callback async
            check_log_to_backend();
        };

        // function resposible for the actual binding of events
        function bind_events_to_snoopers() {

            console.log("tt: binding ");
            // TODO : make this dynamic 
            $(document).bind('click', snoop_on_click);
            //$(document).bind('mousemove', snoop_on_mousemove);
            //$(document).bind('scroll',snoop_on_scroll);
            console.log('bound  events');
                     

        }
		// END SNOOPING
		
        function log_to_backend(payload) {


            console.log("backend logging ...");

            //var params = JSON.stringify(payload);
            var params = payload;
            console.log("params:" + params);

            var webMethod = 'http://127.0.0.1:5000/submit_info';

            var success_func = function (response) {
                    console.log("great success:" + response);
                };

            var error_func = function (xhr, err) {
                    if (xhr.status == 200) {
                        var parseResponse = JSON.parse(xhr.responseText);
                        alert(parseResponse);
                    }
                    console.log('Error\n-----\nStatus: ' + xhr.status + '\nResponse: ' + xhr.responseText + '\nMessage: ' + err);
                    //alert("\nReadyState: " + xhr.readyState);
                };

            var datafilter_func = function (data) {
                    var response = JSON.parse(data)
                    return (response.hasOwnProperty('d')) ? response.d : response;
                };

            $.ajax({
                type: "POST",
                url: webMethod,
                data: params,
                contentType: "application/json; charset=utf-8",
                datafilter: datafilter_func,
                success: success_func,
                error: error_func,


            });


        };

        // Public methods
        return {

            // public methods 
            init: function () {

                console.log("t t: initialized");
                var self = this;

                // setup Session
                setupSession();


                // do bind etc 
                bind_events_to_snoopers();

            }
        };

    }();



$(document).ready(function () {

    TeaTree.init();

});
