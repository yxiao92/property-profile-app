<template>
  <h2 class="max-w-md mx-auto md:mx-0 text-lg p-2 font-medium">
    Planning information
  </h2>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div class="p-8 my-auto space-y-3">
      <!-- Flex -->
      <div class="flex flex-col space-y-4">
        <!-- Acid Sulfate Soils -->
        <div class="flex justify-between items-center">
          <div class="flex items-center text-indigo-500">
            <i class="w-5 fas fa-flask text-center"></i>
            <h3 class="pl-2 text-md font-medium">
              Acid sulfate soils
            </h3>
          </div>
          <i
            v-if="planningInfoState.acidSulfateSoilsInfo == null"
            class="md:mx-4 fas fa-check-circle text-green-500 w-5"
          ></i>
          <i
            v-else
            class="md:mx-4 fas fa-exclamation-circle text-yellow-500 w-5"
          ></i>
        </div>
        <p
          v-if="planningInfoState.acidSulfateSoilsInfo == null"
          class="text-gray-600 text-xs"
        >
          The site doesn't appear to be in an acid sulfate soil area.
        </p>
        <div v-else class="text-gray-600 text-xs space-y-2">
          <p v-for="(a, i) in planningInfoState.acidSulfateSoilsInfo" :key="i">
            {{ a }}
          </p>
        </div>

        <!-- Easement -->
        <div class="flex justify-between items-center">
          <div class="flex items-center text-indigo-500">
            <i class="w-5 fas fa-road text-center"></i>
            <h3 class="pl-2 text-md font-medium">
              Easement
            </h3>
          </div>
          <i
            v-if="planningInfoState.easementInfo == null"
            class="md:mx-4 fas fa-check-circle text-green-500 w-5"
          ></i>
          <i
            v-else
            class="md:mx-4 fas fa-exclamation-circle text-yellow-500 w-5"
          ></i>
        </div>
        <p
          v-if="planningInfoState.easementInfo == null"
          class="text-gray-600 text-xs"
        >
          The site doesn't have easement recorded in our database.
        </p>
        <div v-else class="text-gray-600 text-xs space-y-2">
          <p v-for="(h, i) in planningInfoState.easementInfo" :key="i">
            {{ h }}
          </p>
        </div>

        <!-- Flood Risk -->
        <div class="flex justify-between items-center">
          <div class="flex items-center text-indigo-500">
            <i class="w-5 fas fa-water text-center"></i>
            <h3 class="pl-2 text-md font-medium">
              Flood risk
            </h3>
          </div>
          <i
            v-if="!planningInfoState.floodRisk"
            class="md:mx-4 fas fa-check-circle text-green-500 w-5"
          ></i>
          <i
            v-else
            class="md:mx-4 fas fa-exclamation-circle text-yellow-500 w-5"
          ></i>
        </div>
        <p class="text-gray-600 text-xs">
          The site
          {{ planningInfoState.floodRisk ? "appears" : "doesn't appear" }} to be
          in a flood prone area.
        </p>

        <!-- Heritage -->
        <div class="flex justify-between items-center">
          <div class="flex items-center text-indigo-500">
            <i class="w-5 fas fa-medal text-center"></i>
            <h3 class="pl-2 text-md font-medium">
              Heritage status
            </h3>
          </div>
          <i
            v-if="planningInfoState.heritageInfo == null"
            class="md:mx-4 fas fa-check-circle text-green-500 w-5"
          ></i>
          <i
            v-else
            class="md:mx-4 fas fa-exclamation-circle text-yellow-500 w-5"
          ></i>
        </div>
        <p
          v-if="planningInfoState.heritageInfo == null"
          class="text-gray-600 text-xs"
        >
          The site doesn't have heritage items recorded in our database.
        </p>
        <div v-else class="text-gray-600 text-xs space-y-2">
          <p v-for="(h, i) in planningInfoState.heritageInfo" :key="i">
            {{ h }}
          </p>
        </div>

        <!-- Landslide Risk -->
        <div class="flex justify-between items-center">
          <div class="flex items-center text-indigo-500">
            <i class="w-5 fas fa-mountain text-center"></i>
            <h3 class="pl-2 text-md font-medium">
              Landslide risk
            </h3>
          </div>
          <i
            v-if="!planningInfoState.landslideRisk"
            class="md:mx-4 fas fa-check-circle text-green-500 w-5"
          ></i>
          <i
            v-else
            class="md:mx-4 fas fa-exclamation-circle text-yellow-500 w-5"
          ></i>
        </div>
        <p class="text-gray-600 text-xs">
          The site
          {{ planningInfoState.landslideRisk ? "appears" : "doesn't appear" }}
          to be in a landslide prone area.
        </p>
      </div>
    </div>
  </div>
  <h2 class="max-w-md mx-auto md:mx-0 text-lg p-2 font-medium">
    Area information
  </h2>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div id="local-map" class="h-60 w-full rounded z-0"></div>

    <div class="p-8 my-auto space-y-3">
      <!-- Flex -->
      <div class="flex flex-col space-y-4">
        <!-- Noise Levels -->
        <div class="flex justify-between items-center">
          <div class="flex items-center text-indigo-500">
            <i
              v-if="areaInfoState.noiseLvl == 0"
              class="w-5 fas fa-volume-down text-center"
            ></i>
            <i v-else class="w-5 fas fa-volume-up text-center"></i>
            <h3 class="pl-2 text-md font-medium">
              Noise Levels
            </h3>
          </div>
          <i
            v-if="areaInfoState.noiseLvl == 0"
            class="md:mx-4 fas fa-check-circle text-green-500 w-5"
          ></i>
          <i
            v-else-if="areaInfoState.noiseLvl == 3"
            class="md:mx-4 fas fa-exclamation-circle text-red-500 w-5"
          ></i>
          <i
            v-else
            class="md:mx-4 fas fa-exclamation-circle text-yellow-500 w-5"
          ></i>
        </div>
        <p class="text-gray-600 text-xs">
          {{ areaInfoState.noiseDesc }}
        </p>

        <!-- Power Lines -->
        <div class="flex justify-between items-center">
          <div class="flex items-center text-indigo-500">
            <i class="w-5 fas fa-bolt text-center"></i>
            <h3 class="pl-2 text-md font-medium">
              Power lines
            </h3>
          </div>
          <i
            v-if="areaInfoState.powerLinesInfo == null"
            class="md:mx-4 fas fa-check-circle text-green-500 w-5"
          ></i>
          <i
            v-else
            class="md:mx-4 fas fa-exclamation-circle text-yellow-500 w-5"
          ></i>
        </div>
        <p
          v-if="areaInfoState.powerLinesInfo == null"
          class="text-gray-600 text-xs"
        >
          The site doesn't have high voltage power lines nearby.
        </p>
        <p v-else class="text-gray-600 text-xs">
          {{ areaInfoState.powerLinesInfo }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, onMounted, watch } from "vue";
import L from "leaflet";

import {
  processNoiseInfo,
  processPowerLinesInfo,
} from "../helpers/area-info-details.js";

import {
  processASSInfo,
  processEasementInfo,
  processHeritageListing,
} from "../helpers/planning-info-details.js";

export default {
  name: "AreaInfo",
  props: ["addressCoord", "loadingStatus", "customData"],
  setup(props) {
    const { addressCoord, loadingStatus, customData } = toRefs(props);
    const areaInfoState = ref({
      noiseLvl: 0,
      noiseDesc:
        "The site is located away from airfields, railways or major roads. It is not often to experience traffic noise.",
      powerLinesInfo: null,
    });

    const planningInfoState = ref({
      acidSulfateSoilsInfo: null,
      easementInfo: null,
      floodRisk: false,
      heritageInfo: null,
      landslideRisk: false,
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
          // planning info
          const assInfo = processASSInfo(
            customData.value.properties.acidSulfateSoils
          );
          const easementInfo = processEasementInfo(
            customData.value.properties.easement
          );
          const heritageInfo = processHeritageListing(
            customData.value.properties.heritage
          );

          // area info
          const noiseInfo = processNoiseInfo(customData.value.properties.noise);
          const powerLinesInfo = processPowerLinesInfo(
            customData.value.properties.powerLines
          );

          // update planning info
          // acid sulfate soils
          planningInfoState.value.acidSulfateSoilsInfo = assInfo;
          // easement
          planningInfoState.value.easementInfo = easementInfo;
          // flood
          planningInfoState.value.floodRisk = !!customData.value.properties
            .flood;
          // heritage
          planningInfoState.value.heritageInfo = heritageInfo;
          // landslide
          planningInfoState.value.landslideRisk = !!customData.value.properties
            .landslide;

          // update area info
          // noise
          areaInfoState.value.noiseLvl = noiseInfo.noiseLvl;
          areaInfoState.value.noiseDesc = noiseInfo.noiseDesc;
          // power lines
          areaInfoState.value.powerLinesInfo = powerLinesInfo;

          // update map
          localMap
            .setView([addressCoord.value.lat, addressCoord.value.lon])
            .setZoom(17);

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
      planningInfoState,
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
