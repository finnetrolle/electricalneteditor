/**
 * Created by Travin on 10.02.2015.
 */
define(['applicationSettings'], function(settings){
    return function FormService(){
        var appSettings = settings;

        this.initFormHandler = function(){
            $(appSettings.selectors.startEditorButton).click(function(){
                $(appSettings.selectors.geometryTypesList).show();
                $(appSettings.selectors.mapContainer).trigger(appSettings.eventNames.startEditor);
            });
            $(appSettings.selectors.saveButton).click(function(){
                console.log('save');
            });
            $(appSettings.selectors.closeEditorButton).click(function(){
                $(appSettings.selectors.geometryTypesList).hide();
                $(appSettings.selectors.mapContainer).trigger(appSettings.eventNames.endEditor);
            });

            $(document).on('keydown',function(e){
                if(e.keyCode == appSettings.hotKeyCodes.dragKeyCode){
                    $(appSettings.selector.mapContainer).trigger(appSettings.eventNames.startDragLinePoint);
                }
            });

            $(document).on('keyup', function(e){
                if(e.keyCode == appSettings.hotKeyCodes.dragKeyCode){
                    $(appSettings.selector.mapContainer).trigger(appSettings.eventNames.endDragLinePoint);
                }
            });
        };
    }
});