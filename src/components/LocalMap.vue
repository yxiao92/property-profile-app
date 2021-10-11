<template>
  <div id="local-map" class="h-full w-full rounded"></div>
</template>

<script>
import { onMounted, toRefs } from "vue";
import L from "leaflet";

export default {
  name: "LocalMap",
  props: ["addressCoord", "loadingStatus"],
  setup(props) {
    const { addressCoord, loadingStatus } = toRefs(props);

    onMounted(() => {
      const localMap = L.map("local-map", {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
      }).setView([-33.8568, 151.2153], 16);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}",
        {
          attribution:
            '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/outdoors-v11",
          tileSize: 512,
          maxZoom: 16,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoieXhpYW85MiIsImEiOiJjazlocWt2N2gwem8zM2ZwNHZkcmtxcDVlIn0.UtXDxWmG2am5EsOd5FEu2A",
        }
      ).addTo(localMap);

      // marker layers

      const layerGroup = L.layerGroup().addTo(localMap);
      if (!loadingStatus.value && addressCoord.value.lon != undefined) {
        localMap.setView([addressCoord.value.lat, addressCoord.value.lon]);
        layerGroup.clearLayers();
        L.marker([addressCoord.value.lat, addressCoord.value.lon]).addTo(
          layerGroup
        );
      }
    });
  },
};
</script>
