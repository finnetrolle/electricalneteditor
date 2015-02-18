/**
 * Created by Travin on 10.02.2015.
 */
define(['Interfaces/IMapEditComponentsManager', 'Interfaces/IEditMapObjectsConvertor', 'applicationSettings'], function(interface, Convertor, settings){
    return function(mainMap, params){
        interface.call(this);
        var appSettings = settings;
        var drawer,
            modificator,
            isEditorOn,
            isModify;
        var map = mainMap;
        var converter = new Convertor();
        var pointCoord = null;

        this.startDrawerOrModify = function(object){
            isEditorOn = true;
            var geometry = converter.convertObjectToGeometry(object);
            geometry.featureOverlay.setMap(map);
            if(!modificator) {
                initModificator(geometry);
            }
            initDrawer(geometry);
        };

        this.closeDrawerOrModify = function(){
            isEditorOn = false;
            map.removeInteraction(modificator);
            map.removeInteraction(drawer);
        };

        this.changeDrawedComponent = function(object){
            var geometry = converter.convertObjectToGeometry(object);
            initDrawer(geometry);
        };

        this.startModification = function(){
            isModify = true;
        };

        this.endModification = function(){
            isModify = false;
        };

        this.getElements = function(){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement getElements method in your service implimentation');};

        this.setElements = function(elements){throw new Error('You didn\'t implement IMapComponentsManager ' +
        'or didn\'t implement setElements method in your service implimentation');};

        function initDrawer(geometry){
            if(drawer){
                var features = drawer.features_.array_;
            }
            drawer = new ol.interaction.Draw({
                features: geometry.featureOverlay.getFeatures(),
                type: geometry.type
            });

            setDrawerSettings(drawer);

            map.addInteraction(drawer);
        }

        function initModificator(geometry) {
            modificator = new ol.interaction.Modify({
                features: geometry.featureOverlay.getFeatures()
            });

            setModificatorSettings(modificator);

            map.addInteraction(modificator);
        };

        function setModificatorSettings(myModificator){
            myModificator.__proto__.handlePointerAtPixel_ = function(pixel, map, fromMove) {
            if(isEditorOn) {
                var pixelCoordinate = map.getCoordinateFromPixel(pixel);
                if (isModify && pointCoord) {
                    pixelCoordinate = pointCoord;
                }
                var sortByDistance = function (a, b) {
                    return ol.coordinate.squaredDistanceToSegment(pixelCoordinate, a.segment) -
                        ol.coordinate.squaredDistanceToSegment(pixelCoordinate, b.segment);
                };

                var pixelToLerance = this.pixelTolerance_;

                var lowerLeft = map.getCoordinateFromPixel(
                    [pixel[0] - pixelToLerance, pixel[1] + pixelToLerance]);
                var upperRight = map.getCoordinateFromPixel(
                    [pixel[0] + pixelToLerance, pixel[1] - pixelToLerance]);
                var box = ol.extent.boundingExtent([lowerLeft, upperRight]);

                var rBush = this.rBush_;
                var nodes = rBush.getInExtent(box);
                if (nodes.length > 0) {
                    nodes.sort(sortByDistance);
                    var node = nodes[0];
                    var closestSegment = node.segment;
                    var vertex = (ol.coordinate.closestOnSegment(pixelCoordinate,
                        closestSegment));
                    var vertexPixel = map.getPixelFromCoordinate(vertex);
                    if (Math.sqrt(ol.coordinate.squaredDistance(pixel, vertexPixel)) <=
                        pixelToLerance) {
                        var pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
                        var pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
                        var squaredDist1 = ol.coordinate.squaredDistance(vertexPixel, pixel1);
                        var squaredDist2 = ol.coordinate.squaredDistance(vertexPixel, pixel2);
                        var dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
                        this.snappedToVertex_ = dist <= pixelToLerance;
                        if (this.snappedToVertex_) {
                            vertex = squaredDist1 > squaredDist2 ?
                                closestSegment[1] : closestSegment[0];
                        }
                        this.createOrUpdateVertexFeature_(vertex, fromMove, node);
                        var vertexSegments = {};
                        vertexSegments[goog.getUid(closestSegment)] = true;
                        var segment;
                        for (var i = 1, ii = nodes.length; i < ii; ++i) {
                            segment = nodes[i].segment;
                            if ((ol.coordinate.equals(closestSegment[0], segment[0]) &&
                                ol.coordinate.equals(closestSegment[1], segment[1]) ||
                                (ol.coordinate.equals(closestSegment[0], segment[1]) &&
                                ol.coordinate.equals(closestSegment[1], segment[0])))) {
                                vertexSegments[goog.getUid(segment)] = true;
                            } else {
                                break;
                            }
                        }
                        this.vertexSegments_ = vertexSegments;
                        return;
                    }
                }
                if (!goog.isNull(this.vertexFeature_)) {
                    this.overlay_.removeFeature(this.vertexFeature_);
                    this.vertexFeature_ = null;
                }
            }
        };

            myModificator.__proto__.createOrUpdateVertexFeature_ = function(coordinates, fromMove, node){
                if(fromMove){
                    pointCoord = coordinates;
                }
                var vertexFeature = this.vertexFeature_;
                if (goog.isNull(vertexFeature)) {
                    vertexFeature = new ol.Feature(new ol.geom.Point(coordinates));
                    this.vertexFeature_ = vertexFeature;
                    this.overlay_.addFeature(vertexFeature);
                    pointCoord = coordinates;
                } else {
                    var geometry = (vertexFeature.getGeometry());
                    geometry.setCoordinates(coordinates);
                }
                return vertexFeature;
            };

            myModificator.handleDragEvent_ = function(evt) {
                initDrawer();
                if(isModify && isEditorOn) {
                    var vertex = pointCoord ? pointCoord : evt.coordinate;
                    for (var i = 0, ii = this.dragSegments_.length; i < ii; ++i) {
                        var dragSegment = this.dragSegments_[i];
                        var segmentData = dragSegment[0];
                        var depth = segmentData.depth;
                        var geometry = segmentData.geometry;
                        var coordinates = geometry.getCoordinates();
                        var segment = segmentData.segment;
                        var index = dragSegment[1];

                        while (vertex.length < geometry.getStride()) {
                            vertex.push(0);
                        }

                        switch (geometry.getType()) {
                            case ol.geom.GeometryType.POINT:
                                coordinates = vertex;
                                segment[0] = segment[1] = vertex;
                                break;
                            case ol.geom.GeometryType.MULTI_POINT:
                                coordinates[segmentData.index] = vertex;
                                segment[0] = segment[1] = vertex;
                                break;
                            case ol.geom.GeometryType.LINE_STRING:
                                coordinates[segmentData.index + index] = vertex;
                                segment[index] = vertex;
                                break;
                            case ol.geom.GeometryType.MULTI_LINE_STRING:
                                coordinates[depth[0]][segmentData.index + index] = vertex;
                                segment[index] = vertex;
                                break;
                            case ol.geom.GeometryType.POLYGON:
                                coordinates[depth[0]][segmentData.index + index] = vertex;
                                segment[index] = vertex;
                                break;
                            case ol.geom.GeometryType.MULTI_POLYGON:
                                coordinates[depth[1]][depth[0]][segmentData.index + index] = vertex;
                                segment[index] = vertex;
                                break;
                        }

                        geometry.setCoordinates(coordinates);
                        this.createOrUpdateVertexFeature_(vertex);
                    }
                }
            };

            myModificator.__proto__.handlePointerMove_ = function(event) {
                if(isEditorOn) {
                    pointCoord = null;
                    myModificator.lastPixel_ = event.pixel;
                    myModificator.handlePointerAtPixel_(event.pixel, event.map, true);
                }
            };
        };

        function setDrawerSettings(myDrawer){
            myDrawer.__proto__.handlePointerMove_ = function (event) {
                var myEvent = event;
                myEvent.coordinate = pointCoord ? pointCoord : event.coordinate;
                if (this.mode_ === ol.interaction.DrawMode.POINT &&
                    goog.isNull(this.finishCoordinate_)) {
                    this.startDrawing_(event);
                } else if (!goog.isNull(this.finishCoordinate_)) {
                    this.modifyDrawing_(event);
                } else {
                    this.createOrUpdateSketchPoint_(event);
                }
                return true;
            };

            myDrawer.handleDownEvent_ = function (event) {
                if (this.condition_(event)) {
                    if (myDrawer.type_ == ol.geom.GeometryType.LINE_STRING) {
                        setPoint(event.coordinate);
                    }
                    this.downPx_ = event.pixel;
                    return true;
                } else {
                    return false;
                }
            };
        };

        function setPoint(coordinates){
            if(modificator.vertexFeature_){
            }else{
                var feature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinates)
                });
                drawer.features_.push(feature);
            }
        }

        function transformLatLonToMercator(coordinateLikeArray){
            return ol.proj.transform(coordinateLikeArray, 'EPSG:4326', 'EPSG:3857');
        };

        function transformMercatorToLatLon(coordinateLikeArray){
            return ol.proj.transform(coordinateLikeArray, 'EPSG:3857', 'EPSG:4326');
        };
    };
})