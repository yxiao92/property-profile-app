<template>
  <h2 class="max-w-md text-lg p-2 font-medium">Area information</h2>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div id="local-map" class="h-60 w-full rounded z-0"></div>
    <div class="p-8 my-auto space-y-3">
      <div class="flex items-start">
        <h3 class="px-4 text-md font-medium text-indigo-500">
          Noise level
        </h3>
        <i
          v-if="noiseLvl == 0"
          class="fas fa-check-circle  text-green-500 w-5 text-base"
        ></i>
        <i
          v-else-if="noiseLvl == 3"
          class="fas fa-exclamation-circle text-red-500 w-5 text-base"
        ></i>
        <i
          v-else
          class="fas fa-exclamation-circle text-yellow-500 w-5 text-base"
        ></i>
        <p class="w-2/3 px-4 text-gray-600 text-xs">
          {{ noiseDesc }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, onMounted, watch } from "vue";
// import { onMounted } from "vue";
import L from "leaflet";

import { processNoiseInfo } from "../helpers/area-info-details.js";

export default {
  name: "AreaInfo",
  props: ["addressCoord", "loadingStatus", "customData"],
  setup(props) {
    const { addressCoord, loadingStatus, customData } = toRefs(props);
    const noiseLvl = ref(0);
    const noiseDesc = ref("");

    onMounted(() => {
      const localMap = L.map("local-map", {
        zoomControl: false,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: false,
      }).setView([-33.8568, 151.2153], 15);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}",
        {
          attribution:
            '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/outdoors-v11",
          tileSize: 512,
          minZoom: 14,
          maxZoom: 19,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoieXhpYW85MiIsImEiOiJjazlocWt2N2gwem8zM2ZwNHZkcmtxcDVlIn0.UtXDxWmG2am5EsOd5FEu2A",
        }
      ).addTo(localMap);

      watch([loadingStatus, customData], () => {
        if (!loadingStatus.value && customData.value.id != undefined) {
          const noiseInfo = processNoiseInfo(customData.value.properties.noise);
          noiseLvl.value = noiseInfo.noiseLvl;
          noiseDesc.value = noiseInfo.noiseDesc;

          localMap
            .setView([addressCoord.value.lat, addressCoord.value.lon])
            .setZoom(16);

          const fontAwesomeIcon = L.divIcon({
            html: '<i class="fa fa-map-marker"></i>',
            className: "address-marker",
          });

          L.marker([addressCoord.value.lat, addressCoord.value.lon], {
            icon: fontAwesomeIcon,
          }).addTo(localMap);
        }
      });
    });
    return {
      noiseLvl,
      noiseDesc,
    };
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
.address-marker {
  color: green;
  font-size: 1rem;
}
</style>
