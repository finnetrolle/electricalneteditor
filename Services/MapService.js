/**
 * Created by Travin on 10.02.2015.
 */
define(['Interfaces/Services/IMapService', 'ol'], function(Interface, openLayers){
    return function MapService(){
        var ol = openLayers;
        Interface.call(this);
        var appSettings;

        this.initMap = function(settings){
            appSettings = settings;
            appSettings.map = null;
            appSettings.drawer = null;
            appSettings.modifier = null;
            appSettings.featureOverlays = null;
            createMap();
        };

        this.startElectricalLineEditor = function(){
            appSettings.isEditor = true;
            if(appSettings.featureOverlays == null){
                initFeatureOverlays();
            }
            initDrawer();
            if(appSettings.modifier == null){
                initModifier();
            }
        };

        this.closeElectricalLineEditor = function(){
            appSettings.isEditor = false;
            appSettings.map.removeInteraction(appSettings.drawer);
        };

        function createMap(){
            var view = new ol.View({
                center: ol.proj.transform([30.216667, 59.90], 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            });

            appSettings.map = new ol.Map({
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

        function initDrawer(){
            /*TODO make dynamcal analizator for styles and types*/
            appSettings.featureOverlays.defaultPointStyle.setMap(appSettings.map);

            appSettings.drawer = new ol.interaction.Draw({
                features: appSettings.featureOverlays.defaultPointStyle.getFeatures(),
                type: 'Point'
            });

            appSettings.drawer.on('drawend', function(e, a, b, c,d){
                var info = {
                    command: "create",
                    timestamp: "",
                    userId: "",
                    sessionId: "GUIDSESSION",
                    object: {
                        objType: "tower",
                        objId: "GUID827365803754623",
                        geometry: {
                            Point: {
                                lat: 20,
                                lon: 20
                            }
                        },
                        attributes:
                        {
                            material:"ZHELEZHO",
                            label:"U220-2T",
                            type:"PVS",
                            voltage:220000
                        }
                    }
                }
                $(document).trigger('sendRequest', JSON.stringify(info));
            });

            appSettings.map.addInteraction(appSettings.drawer);
        };

        function initModifier(){
            /*TODO make dynamcal analizator for styles and types*/
            appSettings.modifier = new ol.interaction.Modify({
                features: appSettings.featureOverlays.defaultPointStyle.getFeatures()
            });

            appSettings.map.addInteraction(appSettings.modifier);
        }

        /*TODO create custom styles for subjects*/
        function initFeatureOverlays(){
            appSettings.featureOverlays = {
                defaultPointStyle: new ol.FeatureOverlay({
                    style: new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            fill: new ol.style.Fill({
                                color: '#0B610B'
                            })
                        })
                    })
                })
            }
        };
    }
})