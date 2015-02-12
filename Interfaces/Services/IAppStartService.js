/**
 * Created by Travin on 10.02.2015.
 */
define([], function(){
    return function IAppStartService(){
        this.startApplication = function(){throw  new Error('You didn\'t implement IAppStartService ' +
        'or didn\'t implement startApplication method in your service implimentation');};

        this.createBindings = function(){throw  new Error('You didn\'t implement IAppStartService ' +
        'or didn\'t implement createBindings method in your service implimentation');};
    }
})