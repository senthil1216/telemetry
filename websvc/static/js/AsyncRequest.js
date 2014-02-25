
var IsLoggingEnabled = false;       //this can be set to true to enable logging in console for chrome/firefox browsers

var Dashboard = window.Dashboard || {};

Dashboard.AsyncFacade = (function() {
    var __make_async_call = function(methodName, parameters, processingStart, processingEnd, successCallBack, errorCallBack) {
        var url = "/webservices/dashboardsvc.asmx/";
        var webMethod = url + methodName;
        Log.Console(url);
        Log.Console(webMethod);
        var jsonData = parameters;
        Log.Console(jsonData);
        $.ajax({
            type: "POST",
            url: webMethod,
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            cache: false,
            processData: true,
            beforeSend: processingStart,
            dataFilter: function(data) {
                var response = JSON.parse(data);
                return (response.hasOwnProperty('d')) ? response.d : response;
            },
            success: successCallBack,
            error: errorCallBack,
            complete: processingEnd
        });
    };

    return {
        
        /***********************************************
        /This is a public function that accepts method name, parameters, success call back
        ************************************************/
        CallWithSuccess: function(methodName, parameters,sucessCallBack) {
            __make_async_call(methodName, parameters,"", "", sucessCallBack, "");
        },        
        
        /***********************************************
        method name, parameters, success call back, errorCallBack
        ************************************************/
        CallWithSuccessAndError: function(methodName, parameters, sucessCallBack, errorCallBack) {
            __make_async_call(methodName, parameters, "", "", sucessCallBack, errorCallBack);
        },

        /***********************************************
        method name, parameters, processing start, processing end , success call back, errorCallBack
        ************************************************/        
        CallWithSuccessAndProcessing: function(methodName, parameters, processStart, processEnd, sucessCallBack, errorCallBack) {
            __make_async_call(methodName, parameters, processStart, processEnd, sucessCallBack, errorCallBack);
        }
    };
})();

/******************************************************************************************
* WebMethod Names
******************************************************************************************/
Dashboard.Metadata = function() {
    return {
        WebMethodNames: {
            GET_DASHBOARD_INFO: "GetDashboardInfo"
        }
    };
};
/******************************************************************************************
* Console Log 
******************************************************************************************/
var Log = {
    Console: function(message) {
        if ((typeof console != "undefined") && (IsLoggingEnabled == true)) {
            console.log(message);
        }
    }
};