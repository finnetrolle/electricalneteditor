/**
 * Created by Travin on 17.02.2015.
 */
define(['Interfaces/IEditMapObjectsConvertor'], function(interface){
    return function(){
        interface.call(this);
        this.convertObjectToGeometry = function(object) {
            var geometryType;
            var style;
            switch(object.renderConditions.geometryType) {
                case 'Point':
                    geometryType = 'Point';
                    break;
                case 'Line':
                    geometryType = 'LineString';
                    break;
            }
            switch (geometryType){
                case 'Point':
                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: object.renderConditions.radius,
                            fill: new ol.style.Fill({
                                color: object.renderConditions.color
                            })
                        })
                    });
                    break;
            }
            var geometry = {
                type: geometryType,
                style: style,
                featureOverlay: new ol.FeatureOverlay({
                    style: style
                })
            };

            return geometry;
        };

        this.convertGeometryToObject = function(){
            throw new Error('You didn\'t implement IEditMapObjectsConvertor ' +
            'or didn\'t implement convertGeometryToObject method in your service implimentation');
        };
    }
})