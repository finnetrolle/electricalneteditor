/**
 * Created by Travin on 10.02.2015.
 */
requirejs.config({
    map: {
            'Controllers/BaseController': { 'Interfaces/Services/IAppStartService': 'Services/AppStartService' },
            'Services/AppStartService': { 'Interfaces/Services/IMapService': 'Services/MapService' }
    }
});

require(['Controllers/BaseController', 'jquery-1.11.2.min.js'], function(Controller){
    var controller = new Controller();
    controller.startApplication();
});