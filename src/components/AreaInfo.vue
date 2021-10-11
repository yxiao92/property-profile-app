<template>
  <h2 class="max-w-md text-lg p-2 font-medium">Area information</h2>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div id="local-map" class="h-60 w-full rounded z-0"></div>
    <div class="p-8 my-auto space-y-3">
      <!-- Grid -->
      <div class="grid grid-cols-12 gap-4 items-center">
        <!-- Acid Sulfate Soils -->
        <h3
          class="col-start-1 col-span-4 md:col-span-3 
          text-md font-medium text-indigo-500"
        >
          Acid sulfate soils
        </h3>
        <i
          v-if="areaInfoState.acidSulfateSoilsCnt == 0"
          class="col-span-1 fas fa-check-circle text-green-500 w-5 text-base"
        ></i>
        <i
          v-else
          class="col-span-1 fas fa-exclamation-circle text-yellow-500 w-5 text-base"
        ></i>
        <div
          class="col-span-full md:col-span-8 text-gray-600 text-xs space-y-2"
        >
          <p v-for="(a, i) in areaInfoState.acidSulfateSoilsDesc" :key="i">
            {{ a }}
          </p>
        </div>

        <!-- Flood Risk -->
        <h3
          class="col-start-1 col-span-4 md:col-span-3 
          text-md font-medium text-indigo-500"
        >
          Flood risk
        </h3>
        <i
          v-if="areaInfoState.noiseLvl == 0"
          class="col-span-1 fas fa-check-circle text-green-500 w-5 text-base"
        ></i>
        <i
          v-else
          class="col-span-1 fas fa-exclamation-circle text-yellow-500 w-5 text-base"
        ></i>
        <p class="col-span-full md:col-span-8 text-gray-600 text-xs">
          The site doesn't appear to be in a flood prone area.
        </p>

        <!-- Landslide Risk -->
        <h3
          class="col-start-1 col-span-4 md:col-span-3 
          text-md font-medium text-indigo-500"
        >
          Landslide risk
        </h3>
        <i
          v-if="areaInfoState.noiseLvl == 0"
          class="col-span-1 fas fa-check-circle text-green-500 w-5 text-base"
        ></i>
        <i
          v-else
          class="col-span-1 fas fa-exclamation-circle text-yellow-500 w-5 text-base"
        ></i>
        <p class="col-span-full md:col-span-8 text-gray-600 text-xs">
          The site doesn't have any form of easement recorded in our database.
        </p>

        <!-- Noise Level -->
        <h3
          class="col-start-1 col-span-4 md:col-span-3 
          text-md font-medium text-indigo-500"
        >
          Noise level
        </h3>
        <i
          v-if="areaInfoState.noiseLvl == 0"
          class="col-span-1 fas fa-check-circle text-green-500 w-5 text-base"
        ></i>
        <i
          v-else-if="areaInfoState.noiseLvl == 3"
          class="col-span-1 fas fa-exclamation-circle text-red-500 w-5 text-base"
        ></i>
        <i
          v-else
          class="col-span-1 fas fa-exclamation-circle text-yellow-500 w-5 text-base"
        ></i>
        <p class="col-span-full md:col-span-8 text-gray-600 text-xs">
          {{ areaInfoState.noiseDesc }}
        </p>

        <!-- Power Lines -->
        <h3
          class="col-start-1 col-span-4 md:col-span-3 
          text-md font-medium text-indigo-500"
        >
          Power lines
        </h3>
        <i
          v-if="areaInfoState.powerLinesCnt == 0"
          class="col-span-1 fas fa-check-circle text-green-500 w-5 text-base"
        ></i>
        <i
          v-else
          class="col-span-1 fas fa-exclamation-circle text-yellow-500 w-5 text-base"
        ></i>
        <p class="col-span-full md:col-span-8 text-gray-600 text-xs">
          {{ areaInfoState.powerLinesDesc }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, onMounted, watch } from "vue";
// import { onMounted } from "vue";
import L from "leaflet";

import {
  processNoiseInfo,
  processPowerLinesInfo,
  processASSInfo,
} from "../helpers/area-info-details.js";

export default {
  name: "AreaInfo",
  props: ["addressCoord", "loadingStatus", "customData"],
  setup(props) {
    const { addressCoord, loadingStatus, customData } = toRefs(props);
    const areaInfoState = ref({
      noiseLvl: 0,
      noiseDesc: "",
      powerLinesCnt: 0,
      powerLinesDesc: "",
      acidSulfateSoilsCnt: 0,
      acidSulfateSoilsDesc: [],
    });

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

      // marker layer
      const layerGroup = L.layerGroup().addTo(localMap);

      watch([loadingStatus, customData], () => {
        if (!loadingStatus.value && customData.value.id != undefined) {
          // area info
          const noiseInfo = processNoiseInfo(customData.value.properties.noise);
          const powerLinesInfo = processPowerLinesInfo(
            customData.value.properties.powerLines
          );
          const assInfo = processASSInfo(
            customData.value.properties.acidSulfateSoils
          );

          // update state
          // noise
          areaInfoState.value.noiseLvl = noiseInfo.noiseLvl;
          areaInfoState.value.noiseDesc = noiseInfo.noiseDesc;
          // power lines
          areaInfoState.value.powerLinesCnt = powerLinesInfo.pLCnt;
          areaInfoState.value.powerLinesDesc = powerLinesInfo.pLDesc;
          // acid sulfate soils
          areaInfoState.value.acidSulfateSoilsCnt = assInfo.assCnt;
          areaInfoState.value.acidSulfateSoilsDesc = assInfo.assDesc;

          localMap
            .setView([addressCoord.value.lat, addressCoord.value.lon])
            .setZoom(16);

          const fontAwesomeIcon = L.divIcon({
            html: '<i class="fa fa-map-marker"></i>',
            className: "address-marker",
          });

          // clear & add markers
          layerGroup.clearLayers();
          L.marker([addressCoord.value.lat, addressCoord.value.lon], {
            icon: fontAwesomeIcon,
          }).addTo(layerGroup);
        }
      });
    });
    return {
      areaInfoState,
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
  font-size: 1.5rem;
}
</style>
