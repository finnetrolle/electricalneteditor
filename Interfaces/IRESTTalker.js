/**
 * Created by Travin on 13.02.2015.
 */
define([], function(){
    return function IRESTTalker(){
        this.sendData = function(jsonData, isAuth){throw new Error('You didn\'t implement IRESTTalker ' +
        'or didn\'t implement sendData method in your service implimentation');};
    };
})