<template>
  <h2 class="max-w-md mx-auto md:mx-0 text-lg p-2 font-medium">
    Block information
  </h2>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div class="md:flex">
      <div class="md:flex-shrink-0 h-48 w-full md:h-auto md:w-2/5">
        <div id="lot-map" class="h-full w-full rounded z-0"></div>
      </div>
      <div class="p-8 my-auto space-y-2">
        <!-- Plan Details -->
        <div class="flex text-indigo-500">
          <i class="flex w-5 fas fa-map-marked text-base"></i>

          <div class="flex flex-col px-2">
            <h3 class="mb-1 text-md font-medium">Plan details</h3>
            <i v-if="!blockInfoState.planDetails" class="text-xs text-gray-600">
              Information not available
            </i>
            <p v-else class="text-sm text-gray-800">
              {{ blockInfoState.planDetails }}
            </p>
          </div>
        </div>
        <!-- Zoning -->
        <div class="flex text-indigo-500">
          <i class="flex w-5 fas fa-layer-group text-base"></i>

          <div class="flex flex-col px-2">
            <h3 class="mb-1 text-md font-medium">Land zoning</h3>
            <i v-if="!blockInfoState.zoningInfo" class="text-xs text-gray-600">
              Information not available
            </i>
            <div v-else class="text-sm text-gray-800">
              <p
                v-for="(z, i) in blockInfoState.zoningInfo.zoningCode"
                :key="i"
              >
                {{ z }}
              </p>
            </div>
          </div>
        </div>
        <!-- Min Lot Size -->
        <div class="flex text-indigo-500">
          <i class="flex w-5 fas fa-ruler-combined text-base"></i>

          <div class="flex flex-col px-2">
            <h3 class="mb-1 text-md font-medium">Minimum lot size</h3>
            <i v-if="!blockInfoState.minLotSize" class="text-xs text-gray-600">
              Information not available
            </i>
            <div v-else>
              <p
                v-for="(lsz, i) in blockInfoState.minLotSize"
                :key="i"
                class="text-sm text-gray-800"
              >
                {{ lsz }}
              </p>
            </div>
          </div>
        </div>
        <!-- LGA -->
        <div class="flex text-indigo-500">
          <i class="flex w-5 fas fa-info-circle text-base"></i>

          <div class="flex flex-col px-2">
            <h3 class="mb-1 text-md font-medium">Local government area</h3>
            <i v-if="!blockInfoState.zoningInfo" class="text-xs text-gray-600">
              Information not available
            </i>
            <div v-else class="text-sm text-gray-800">
              <p v-for="(l, i) in blockInfoState.zoningInfo.lgaName" :key="i">
                {{ l }}
              </p>
            </div>
          </div>
        </div>
        <!-- LEP -->
        <div class="flex text-indigo-500">
          <i class="flex w-5 fas fa-pencil-ruler text-base"></i>

          <div class="flex flex-col px-2">
            <h3 class="mb-1 text-md font-medium">Local environmental plan</h3>
            <i v-if="!blockInfoState.zoningInfo" class="text-xs text-gray-600">
              Information not available
            </i>
            <div v-else class="text-sm text-gray-800">
              <p v-for="(epi, i) in blockInfoState.zoningInfo.epiName" :key="i">
                {{ epi }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, onMounted, watch } from "vue";
import L from "leaflet";

import {
  processMinLotSizeInfo,
  processPlanDetailsInfo,
  processZoningInfo,
} from "../helpers/block-info-details.js";

export default {
  name: "BlockInfo",
  props: ["addressCoord", "loadingStatus", "customData"],
  setup(props) {
    const { addressCoord, loadingStatus, customData } = toRefs(props);

    const blockInfoState = ref({
      planDetails: null,
      zoningInfo: null,
      minLotSize: null,
    });

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
          // get lot details
          const planDetails = processPlanDetailsInfo(
            customData.value.properties.planDetails
          );
          const zoningInfo = processZoningInfo(
            customData.value.properties.zoning
          );
          const minSize = processMinLotSizeInfo(
            customData.value.properties.minSize
          );
          // update state
          blockInfoState.value.planDetails = planDetails;
          blockInfoState.value.zoningInfo = zoningInfo;
          blockInfoState.value.minLotSize = minSize;

          // move map to address
          lotMap.setView([addressCoord.value.lat, addressCoord.value.lon]);
          // plot polygon
          const lotPolygon = L.geoJSON(customData.value).addTo(lotMap);
          // add lot size label
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

    return {
      blockInfoState,
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
</style>
