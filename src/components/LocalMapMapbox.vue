<template>
  <div id="map" class="h-60 w-full"></div>
  <!-- <div
    id="map"
    class="h-60 md:h-auto md:max-h-72 w-full md:w-1/3 lg:w-full mb-4 md:mb-0 md:mr-2 rounded"
  > -->
  <!-- </div> -->
</template>

<script>
// import maplibregl from "maplibre-gl";
import mapboxgl from "mapbox-gl";
import { onMounted, toRefs } from "vue";

export default {
  name: "LocalMap",
  props: ["addressCoord", "loadingStatus"],
  setup(props) {
    const { addressCoord, loadingStatus } = toRefs(props);
    mapboxgl.accessToken =
        "pk.eyJ1IjoieXhpYW85MiIsImEiOiJjazlocWt2N2gwem8zM2ZwNHZkcmtxcDVlIn0.UtXDxWmG2am5EsOd5FEu2A";
    onMounted(() => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        // "https://api.maptiler.com/maps/bright/style.json?key=Apx0f0cRQ1j98kkQviAt",
        // "https://api.maptiler.com/maps/3a16d290-8f7b-4919-af1c-dc19ea833a57/style.json?key=Apx0f0cRQ1j98kkQviAt",
        hash: false,
        zoom: 18,
        // minZoom: 16,
        // maxZoom: 19,
        center: [151.2153, -33.8568],
        // center: [lon, lat],
      });
      map.scrollZoom.disable();

      map.on("load", () => {
        if (!loadingStatus.value && addressCoord.value.lon != undefined) {
          map.setCenter([addressCoord.value.lon, addressCoord.value.lat]);
          new mapboxgl.Marker()
            .setLngLat([addressCoord.value.lon, addressCoord.value.lat])
            .addTo(map);
        }

        // map.loadImage(
        //   "https://docs.mapbox.com/mapbox-gl-js/assets/cat.png",
        //   (error, image) => {
        //     if (error) throw error;

        //     map.addImage("cat", image);
        //   }
        // );

        // if (!loadingStatus.value) {
        //   const geojson = getLocation();

        //   map.addSource("address", {
        //     type: "geojson",
        //     data: geojson,
        //   });
        // }

        // map.addLayer({
        //   id: "iss",
        //   type: "symbol",
        //   source: "iss",
        //   layout: {
        //     "icon-image": "cat",
        //   },
        // });

        // Update the source from the API every 2 seconds.
        // const updateSource = setInterval(async () => {
        //   const geojson = getLocation(updateSource);
        //   map.getSource("address").setData(geojson);
        // }, 1000);

        // function getLocation(updateSource) {
        //   clearInterval(updateSource);

        //   map.setCenter([addressCoord.value.lon, addressCoord.value.lat]);

        //   new maplibregl.Marker()
        //     .setLngLat([addressCoord.value.lon, addressCoord.value.lat])
        //     .addTo(map);

        //   return {
        //     type: "FeatureCollection",
        //     features: [
        //       {
        //         type: "Feature",
        //         geometry: {
        //           type: "Point",
        //           coordinates: [addressCoord.value.lon, addressCoord.value.lat],
        //         },
        //       },
        //     ],
        //   };
        // }
        // if (updateSource) clearInterval(updateSource);
        // if (lat & lon) {
        //   new maplibregl.Marker().setLngLat([lon, lat]).addTo(map);
        //   map.setCenter([lon, lat]);
        // }
      });
    });
  },
};
</script>
