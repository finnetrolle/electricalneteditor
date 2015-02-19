/**
 * Created by Travin on 13.02.2015.
 */
define(['Interfaces/IRESTTalker'], function(interface){
    return function RESTTalker(){
        interface.call(this);

        this.sendData = function (jsonData, isAuth){
            if(isAuth){
                return JSON.stringify(startParametersImitation);
            }
            $.ajax({
                url:"http://172.16.22.55:1432/RestService.svc/post",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: jsonData,
                crossDomain: true,
                type: 'POST'
            }).done(function(data){
                debugger;
            }).error(function(data){debugger});
        };

        var startParametersImitation = {
            startCoordinate: [30.216667, 59.90],
            hotKeyCodes:{
                dragKeyCode:'17'
            },
            canEdit: true,
            components: {
                towers: [
                    {
                        attributes:{
                            name: 'ПС10П-6АМ',
                            voltage: '220',
                            type: 'middle',
                            material: 'Al'
                        },
                        geometry: {
                            lat: null,
                            lon: null
                        },
                        renderConditions:{
                            geometryType: 'Point',
                            color: 'green',
                            radius: 15
                        }
                    },{
                        attributes:{
                            name: 'ПК110-1',
                            voltage: '110',
                            type: 'angular',
                            material: 'Wood'
                        },
                        geometry: {
                            lat: null,
                            lon: null
                        },
                        renderConditions:{
                            geometryType: 'Point',
                            color: 'blue',
                            radius: 12
                        }
                    }
                ]
            }
        }
    }
})