/**
 * Created by Travin on 17.02.2015.
 */
define([], function(){
    return function(){
        this.convertObjectToGeometry = function(){
            throw new Error('You didn\'t implement IEditMapObjectsConvertor ' +
            'or didn\'t implement convertObjectToGeometry method in your service implimentation');
        };

        this.convertGeometryToObject = function(){
            throw new Error('You didn\'t implement IEditMapObjectsConvertor ' +
            'or didn\'t implement convertGeometryToObject method in your service implimentation');
        };
    }
})