/**
 * Created by Travin on 10.02.2015.
 */
define([], function(){
    return function IMapService(){
        this.initMap = function(params){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement initMap method in your service implimentation');};

        this.startElectricalLineEditor = function(){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement startElectricalLineEditor method in your service implimentation');};

        this.closeElectricalLineEditor = function(){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement endElectricalLineEditor method in your service implimentation');};

        this.startDragLinePoint = function(){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement startDragLinePoint method in your service implimentation');};

        this.endDragLinePoint = function(){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement endDragLinePoint method in your service implimentation');};

        this.startEditor = function(){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement startEditor method in your service implimentation');};

        this.closeEditor = function(){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement endEditor method in your service implimentation');};

        this.changeDrawingFigureType = function(){throw new Error('You didn\'t implement IMapService ' +
        'or didn\'t implement changeDrawingFigureType method in your service implimentation');};

    };
})