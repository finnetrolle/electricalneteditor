/**
 * Created by Travin on 10.02.2015.
 */
define(['Interfaces/Services/IAppStartService', 'Interfaces/Services/IMapService','Interfaces/Services/IRESTTalker', 'applicationSettings'], function(interface, MapService, RestTalker, settings){
    return function AppStartService(){

        interface.call(this);
        var appSettings = settings;
        var mapService = new MapService();
        var restTalker = new RestTalker();

        this.startApplication = function(){
            mapService.initMap(appSettings);
        };

        this.createBindings = function(){
            $(appSettings.selectors.mapContainer).on(appSettings.eventNames.startDragLinePoint, function(){
                mapService.startDragLinePoint();
            });

            $(appSettings.selectors.mapContainer).on(appSettings.eventNames.startDragLinePoint, function(){
                mapService.endDragLinePoint();
            });

            $(appSettings.selectors.mapContainer).on(appSettings.eventNames.startEditor, function(){
                mapService.startElectricalLineEditor();
            });

            $(appSettings.selectors.mapContainer).on(appSettings.eventNames.endEditor, function(){
                mapService.closeElectricalLineEditor();
            });

            $(appSettings.selectors.figureTypesElement).on(appSettings.eventNames.figureTypeChange, function(){
                mapService.changeDrawingFigureType($(this).val());
            });

            $(document).on('sendRequest', function(e, data){
                restTalker.sendData(data);
            })

        };
    }
})