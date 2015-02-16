/**
 * Created by Travin on 10.02.2015.
 */
requirejs.config({
    map: {
            'mainEditorControl': {
                'Interfaces/IMapLibInitializer': 'Services/OLMapLibInitializer',
                'Interfaces/IRESTTalker': 'Services/RESTTalker'
            }
    }
});

require(['mainEditorControl', 'jquery-1.11.2.min.js'], function(MainControl){
    var control = new MainControl();
    control.startApplication();
});