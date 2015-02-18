/**
 * Created by Travin on 10.02.2015.
 */
requirejs.config({
    shim: {
        'ol':{
            deps: [],
            exports: 'ol'
        }
    },
    map: {
            'core': {
                'Interfaces/IMapLibInitializer': 'Services/OLMapLibInitializer',
                'Interfaces/IRESTTalker': 'Services/RestTalker',
                'Interfaces/IMapEditComponentsManager': 'Services/OLMapEditComponentsManager'
            },
            'Services/OLMapEditComponentsManager': {
                'Interfaces/IEditMapObjectsConvertor': 'Services/OlEditMapObjectsConvertor'
            }
    }
});

require(['core', 'jquery-1.11.2.min.js'], function(Core){
    var core = new Core();
    core.startApplication();
});