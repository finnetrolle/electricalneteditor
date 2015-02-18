/**
 * Created by Travin on 17.02.2015.
 */
define(['Interfaces/IEditMapObjectsConvertor'], function(interface){
    return function(){
        interface.call(this);
        this.convertObjectToGeometry = function() {
            return {
                type: 'LineString',
                featureOverlay: new ol.FeatureOverlay({
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(120,128,53,0.75)',
                            width: 2
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255,0,0,0.1)'
                        }),
                        image: new ol.style.Icon({
                            anchor: [0.5, 132],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.5,
                            src: 'marker.png'
                        })
                    })
                })
            };
        };

        this.convertGeometryToObject = function(){
            throw new Error('You didn\'t implement IEditMapObjectsConvertor ' +
            'or didn\'t implement convertGeometryToObject method in your service implimentation');
        };
    }
})