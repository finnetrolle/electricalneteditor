/**
 * Created by Travin on 16.02.2015.
 */
define(['applicationSettings'], function(settings){
    return function(){
        var appSettings = settings;
        var components;
        this.buildComponentsTree = function(dataComponents){
            components = dataComponents;
            for(var i = 0; i < components.towers.length; i++){
                components.towers[i].mainId = i;
                $('<li>' + '<input type="radio" name="figureType" value=' + i + '>' + components.towers[i].attributes.name + '<Br>').appendTo(appSettings.selectors.geometryTypesList);
            }

            $(appSettings.selectors.figureTypesElement).on(appSettings.eventNames.figureTypeChange, function(e){
                var data = components.towers[$(this).val()];
                $(document).trigger(appSettings.eventNames.changeGeometryType, data);
            })

            $(appSettings.selectors.startEditorButton).click(function(e){
                $(appSettings.selectors.startEditorButton).hide();
                $(appSettings.selectors.closeEditorButton).show();
                $(appSettings.selectors.geometryTypesList).show();
                var data = components.towers[0];
                $(document).trigger(appSettings.eventNames.startEditor, data);
            });

            $(appSettings.selectors.closeEditorButton).click(function(e){
                $(appSettings.selectors.startEditorButton).show();
                $(appSettings.selectors.closeEditorButton).hide();
                $(appSettings.selectors.geometryTypesList).hide();
                $(document).trigger(appSettings.eventNames.endEditor, $(this).val());
            });

            $(document).on('keydown', function(e){
                if(e.keyCode == 17){
                    $(document).trigger(appSettings.eventNames.startDragLinePoint);
                }
            });

            $(document).on('keyup', function(e){
                if(e.keyCode == 17){
                    $(document).trigger(appSettings.eventNames.endDragLinePoint);
                }
            });
        };

        this.showEditor = function(){
            $(appSettings.selectors.startEditorButton).show();
        }
    }
})