/**
 * Created by Travin on 10.02.2015.
 */
define( ['Interfaces/Services/IAppStartService', 'Services/FormService', 'applicationSettings'], function(Service, FormService, settings){
    return function BaseController(){
        var appStartService = new Service();
        var formService = new FormService();
        var appSettings = settings;

        this.startApplication = function(){
            formService.initFormHandler();
            appStartService.startApplication();
            appStartService.createBindings();
            attachEditorMenu()
        };

        function attachEditorMenu(){

        };
    };
});