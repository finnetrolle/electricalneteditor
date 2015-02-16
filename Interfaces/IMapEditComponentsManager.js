/**
 * Created by Travin on 16.02.2015.
 */
define([], function(){
    return function(){
        this.init = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement init method in your service implimentation');};

        this.changeDrawedComponent = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement changeDrawedComponent method in your service implimentation');};

        this.startDrawer = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement startDraw method in your service implimentation');};

        this.closeDrawer = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement closeDrawer method in your service implimentation');};

        this.startModification = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement startModification method in your service implimentation');};

        this.endModification = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement endModification method in your service implimentation');};

        this.getElements = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement getElements method in your service implimentation');};

        this.setElements = function(elements){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement setElements method in your service implimentation');};
    }
})