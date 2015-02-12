/**
 * Created by Travin on 10.02.2015.
 */
define([], (function(){
    return {
        selectors:{
            mapContainer: '.map',
            figureTypesElement: 'input[type=radio][name=figureType]',
            startEditorButton: '.editor-button',
            saveButton: '.save-button',
            closeEditorButton: '.close-editor-button',
            geometryTypesList: '.geometry-type-list'
        },
        classes:{
            mapContainerClassName: 'map'
        },
        eventNames:{
            startDragLinePoint: 'startDragLinePoint',
            endDragLinePoint: 'endDragLinePoint',
            startEditor: 'startEditor',
            endEditor: 'endEditor',
            figureTypeChange: 'change',
            endDrawing: 'endDrawing'
        },
        hotKeyCodes:{
            dragKeyCode:'17'
        },
        pointObjects:{
            big:{
                height: 200,
                width: 20,
                long: 20,
                material: 'composit',
                centerPoint: null
            },
            small: {
                height: 100,
                width: 10,
                long: 10,
                material: 'plastic',
                centerPoint: null
            }
        },
        lineObjects: {

        }
    }
})())