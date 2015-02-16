/**
 * Created by Travin on 16.02.2015.
 */
define(['applicationSettings'], function(settings){
    return function(){
        var appSettings = settings;
        this.buildComponentsTree = function(data){
            var components = data.components;
            for(var i = 0; i < components.points.length; i++){
                $('<li>' + '<input type="radio" name="figureType" value=' + components.points[i].name + '>' + components.points[i].name + '<Br>').appendTo(appSettings.selectors.geometryTypesList);
            }
            for(var i = 0; i < components.lines.length; i++){
                $('<li>' + '<input type="radio" name="figureType" value=' + components.lines[i].name + '>' + components.lines[i].name + '<Br>').appendTo(appSettings.selectors.geometryTypesList);
            }

            $(appSettings.selectors.startEditorButton).click(function(e){
                $(appSettings.selectors.startEditorButton).hide();
                $(appSettings.selectors.closeEditorButton).show();
                $(appSettings.selectors.geometryTypesList).show();
                $(document).trigger(appSettings.eventNames.startEditor, $(this).val());
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