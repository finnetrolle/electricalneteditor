/**
 * Created by Travin on 16.02.2015.
 */
define(['Interfaces/IMapEditComponentsManager', 'EditorComponents/ElectricalNetEditComponentsManager', 'Interfaces/IRESTTalker', 'Interfaces/IMapLibInitializer', 'applicationSettings'],
    function(MapComponentsManager, EditComponentsManager, RESTTalker, MapLibInitializer, settings){
        return function() {
            var appSettings = settings;
            var restTalker = new RESTTalker();
            var editComponentsManager = new EditComponentsManager();
            var mapComponentManager = new MapComponentsManager();

            this.startApplication = function(){
                var data = authentification();
                data = JSON.parse(data);

                var mapLibInitializer = new MapLibInitializer();
                mapLibInitializer.init(data);

                if(data.canEdit){
                    editComponentsManager.buildComponentsTree(data);
                    editComponentsManager.showEditor();
                }

                createEventsHandlerForEditComponentsMenu();

                createEventsHandlerForMapComponentsManager();
            };

            function createEventsHandlerForEditComponentsMenu(){
                $(document).bind(appSettings.eventNames.figureTypeChange, function(e, data){
                    mapComponentManager.changeDrawedComponent(data);
                });

                $(document).bind(appSettings.eventNames.startEditor, function(e){
                    mapComponentManager.startDrawer();
                });

                $(document).bind(appSettings.eventNames.endEditor, function(e){
                    mapComponentManager.closeDrawer();
                });

                $(document).bind('keydown', function(e){
                    if(e.keyCode == 17){
                        mapComponentManager.startModification();
                    }
                });

                $(document).bind('keyup', function(e){
                    if(e.keyCode == 17){
                        mapComponentManager.endModification();
                    }
                });
            };

            function createEventsHandlerForMapComponentsManager(){

            };

            function loadEditComponentsMenu(){
                return require(['text!templates/editorComponentsMenuTemplate.html'], function(Template){
                    return Template;
                });
            };

            function authentification(){
                var result = restTalker.sendData('', true);
                return result;
            };
        };
    }
);