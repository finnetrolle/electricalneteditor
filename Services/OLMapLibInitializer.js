/**
 * Created by Travin on 16.02.2015.
 */
define(['Interfaces/IMapLibInitializer', 'ol', 'applicationSettings'], function(MapLibInitializer, OpenLayers, settings){
    return function(){
        var ol = OpenLayers;
        MapLibInitializer.call(this);
        var appSettings = settings;

        this.init = function(parameters){
            var view = new ol.View({
                center: ol.proj.transform(parameters.startCoordinate, 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            });

            return new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                controls: ol.control.defaults(),
                target: appSettings.classes.mapContainerClassName,
                view: view
            });
        };
    }
})