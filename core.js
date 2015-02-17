/**
 * Created by Travin on 16.02.2015.
 */
define(['Interfaces/IMapEditComponentsManager', 'EditorComponents/ElectricalNetEditComponentsManager', 'Interfaces/IRESTTalker', 'Interfaces/IMapLibInitializer', 'applicationSettings'],
    function(MapComponentsManager, EditComponentsManager, RESTTalker, MapLibInitializer, settings){
        return function() {
            var appSettings = settings;
            var restTalker = new RESTTalker();
            var editComponentsManager = new EditComponentsManager();
            var mapComponentsManager;

            this.startApplication = function(){
                var data = authentification();
                data = JSON.parse(data);

                var mapLibInitializer = new MapLibInitializer();
                var map = mapLibInitializer.init(data);
                mapComponentsManager = new MapComponentsManager(map)

                if(data.canEdit){
                    editComponentsManager.buildComponentsTree(data);
                    editComponentsManager.showEditor();
                }

                createEventsHandlerForEditComponentsMenu();

                createEventsHandlerForMapComponentsManager();
            };

            function createEventsHandlerForEditComponentsMenu(){
                $(document).bind(appSettings.eventNames.figureTypeChange, function(e, data){
                    mapComponentsManager.changeDrawedComponent(data);
                });

                $(document).bind(appSettings.eventNames.startEditor, function(e){
                    mapComponentsManager.startDrawerOrModify();
                });

                $(document).bind(appSettings.eventNames.endEditor, function(e){
                    mapComponentsManager.closeDrawerOrModify();
                });

                $(document).bind('keydown', function(e){
                    if(e.keyCode == 17){
                        mapComponentsManager.startModification();
                    }
                });

                $(document).bind('keyup', function(e){
                    if(e.keyCode == 17){
                        mapComponentsManager.endModification();
                    }
                });
            };

            function createEventsHandlerForMapComponentsManager(){

            };

            function authentification(){
                var result = restTalker.sendData('', true);
                return result;
            };
        };
    }
);