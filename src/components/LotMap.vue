<template>
  <div id="lot-map" class="h-full w-full rounded"></div>
</template>

<script>
import { onMounted, toRefs, watch } from "vue";
import L from "leaflet";

export default {
  name: "LocalMap",
  props: ["addressCoord", "loadingStatus", "customData"],
  setup(props) {
    const { addressCoord, loadingStatus, customData } = toRefs(props);

    onMounted(() => {
      const lotMap = L.map("lot-map", {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
      }).setView([-33.8568, 151.2153], 20);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}",
        {
          attribution:
            '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/outdoors-v11",
          tileSize: 512,
          maxZoom: 21,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoieXhpYW85MiIsImEiOiJjazlocWt2N2gwem8zM2ZwNHZkcmtxcDVlIn0.UtXDxWmG2am5EsOd5FEu2A",
        }
      ).addTo(lotMap);

      watch([loadingStatus, customData], () => {
        if (!loadingStatus.value && customData.value.id != undefined) {
          lotMap.setView([addressCoord.value.lat, addressCoord.value.lon]);
          const lotPolygon = L.geoJSON(customData.value).addTo(lotMap);
          const lotAreaStr =
            String(
              Math.round(customData.value.properties.planDetails.lotArea)
            ) + "&#13217;";

          lotMap.fitBounds(lotPolygon.getBounds(), {
            padding: [10, 10],
            animate: false,
          });

          lotPolygon
            .bindTooltip(lotAreaStr, {
              permanent: true,
              direction: "center",
              className: "lot-label",
            })
            .openTooltip();
        }
      });
    });
  },
};
</script>
<style>
.leaflet-tooltip.lot-label {
  background-color: transparent;
  border: transparent;
  box-shadow: none;
  font-weight: bold;
}
</style>
