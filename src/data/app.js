import PopupTemplate from "esri/PopupTemplate";
import Map from "esri/Map";
import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Point from "esri/geometry/Point";
import Graphic from "esri/Graphic";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import PictureMarkerSymbol from "esri/symbols/PictureMarkerSymbol";
import myIcon from "../../public/assets/info.png";
import { setupBasemapGallery } from "./basemapGalleryBehavior";
import "../css/baseMap.css";

const noop = () => {};

const map = new Map({
  basemap: "topo-vector",
});

export const webmap = new WebMap({
  portalItem: {
    id: "974c6641665a42bf8a57da08e607bb6f",
  },
});

export const view = new MapView({
  map: webmap,
  center: [78.962883, 20.593683],
  zoom: 1,
});

setupBasemapGallery(view);

export const initialize = (container) => {
  view.container = container;
  view
    .when()
    .then((_) => {
      console.log("Map and View are ready");
      view.map.removeAll();
      const extent = {
        xmin: -125.0,
        ymin: 24.0,
        xmax: -66.0,
        ymax: 50.0,
        spatialReference: { wkid: 4326 },
      };

      view.extent = extent;
      const graphicsLayer = new GraphicsLayer();
      view.map.add(graphicsLayer);

      const points = [
        {
          latitude: 39.742043,
          longitude: -104.991531,
          name: "Denver",
          description: "hello denver",
        },
        {
          latitude: 34.027,
          longitude: -118.80543,
          name: "Point 1",
          description: "This is point 1",
        },
        {
          latitude: 34.0192,
          longitude: -118.80743,
          name: "Point 2",
          description: "This is point 2",
        },
        {
          latitude: 34.0305,
          longitude: -118.813,
          name: "Point 3",
          description: "This is point 3",
        },
      ];

      points.forEach((point) => {
        const pt = new Point({
          longitude: point.longitude,
          latitude: point.latitude,
        });

        const markerSymbol = new PictureMarkerSymbol({
          url: myIcon,
          width: "20px",
          height: "23px",
        });

        const popupTemplate = new PopupTemplate({
          title: point.name,
          content: `<p>${point.description}</p>`,
        });

        const graphic = new Graphic({
          geometry: pt,
          symbol: markerSymbol,
          attributes: { name: point.name, description: point.description },
          popupTemplate: popupTemplate,
        });
        graphicsLayer.add(graphic);

        view.popup.defaultPopupTemplateEnabled = false;

        view.on("click", function(event) {
          view.hitTest(event).then(function(response) {
            if (response.results.length) {
              console.log(response);
              response.results[0].graphic = graphic;

              var popup = new PopupTemplate({
                location: event.mapPoint,
                title: graphic.attributes.Name,
                content:
                  "Coordinates: " +
                  event.mapPoint.latitude +
                  ", " +
                  event.mapPoint.longitude,
              });

              view.map.allLayers.forEach((layer) => {
                if (layer.popupTemplate) {
                  layer.popupTemplate = popup;
                }
              });
            }
          });
        });
      });
    })
    .catch(noop);

  return () => {
    view.container = null;
  };
};
