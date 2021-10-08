<template>
  <div v-if="store.state.isLoading">Loading ...</div>
  <div v-else>
    <!-- <PropertySummary /> -->
    <div class="flex flex-col md:flex-row md:justify-between">
      <!-- Property Summary -->
      <div id="summary" class="pt-4 w-full">
        <!-- Status -->
        <div v-if="store.state.domainData.onMarketTypes">
          <span
            v-if="store.state.domainData.status === 'OffMarket'"
            class="px-2 py-1 text-sm text-gray-700 bg-red-300 uppercase rounded"
            >off the market</span
          >
          <span
            v-else
            class="px-2 py-1 text-sm text-gray-700 bg-red-300 uppercase rounded"
            >For
            {{ store.state.domainData.onMarketTypes[0] }}
          </span>
        </div>
        <!-- Address -->
        <div class="flex flex-col mt-2">
          <h1
            v-if="
              store.state.domainData.flatNumber &&
                store.state.domainData.flatNumber.length > 0
            "
            class="text-lg md:text-2xl text-gray-800 font-bold"
          >
            {{ store.state.domainData.flatNumber }} /
            {{ store.state.domainData.streetAddress }}
          </h1>
          <h1 v-else class="text-lg md:text-2xl text-gray-800 font-bold">
            {{ store.state.domainData.streetAddress }}
          </h1>
          <h1 class="text-md md:text-lg text-gray-800">
            {{ store.state.domainData.suburb }}
            {{ store.state.domainData.state }}
            {{ store.state.domainData.postcode }}
          </h1>
        </div>
        <!-- <hr class="hidden md:block md:my-4 md:min-w-full" /> -->

        <!-- <div
          class="flex items-center space-x-4 space-x-reverse text-md mt-4 md:mt-0"
        > -->
        <div class="flex items-center space-x-4 space-x-reverse text-md mt-4">
          <!-- Property Type -->
          <span
            id="property-type"
            class="hidden md:flex md:items-center md:pr-2"
          >
            <span class="mr-2">{{
              store.state.domainData.propertyCategory
            }}</span>
            <i class="fas fa-chevron-right text-gray-500"></i>
          </span>

          <!-- Bed -->
          <span id="bed" class="flex items-center">
            <span class="mr-2">{{ store.state.domainData.bedrooms }}</span>
            <i class="fas fa-bed text-lg text-gray-800"></i>
          </span>
          <!-- Bath -->
          <span id="bath" class="flex items-center">
            <span class="mr-2">{{ store.state.domainData.bathrooms }}</span>
            <i class="fas fa-bath text-md text-gray-800"></i>
          </span>
          <!-- Car -->
          <span id="car">
            <span id="bath" class="flex items-center">
              <span class="mr-2">{{ store.state.domainData.carSpaces }}</span>
              <i class="fas fa-car text-lg text-gray-800"></i>
            </span>
          </span>
        </div>

        <hr class="my-4 min-w-full" />
        <!-- Block Information -->
        <BlockInfo />
      </div>
    </div>
  </div>
</template>

<script>
import { inject, watch } from "vue";
// import { inject, onMounted } from "vue";
import { getPropertyData } from "../helpers/domain.api.js";
import { getLotData } from "../helpers/custom.api.js";
// import axios from "axios";

// import { inject, onMounted } from "vue";
// import LocalMap from "../components/LocalMap.vue";
import BlockInfo from "./BlockInfo.vue";
// import PropertySummary from "./PropertySummary.vue";

export default {
  name: "DomainPropertyProfile",
  components: {
    // LocalMap,
    BlockInfo,
    // PropertySummary,
  },
  setup() {
    const store = inject("store");

    const getPropertyInfo = async () => {
      store.methods.setLoadingStatus(true);
      // domain API
      const propertyData = await getPropertyData(store.state.domainPropertyId);
      console.log(propertyData);

      store.methods.setDomainData(propertyData);
      if (propertyData.photos.length > 0) {
        store.methods.setImgUrl(propertyData.photos[0].fullUrl);
      }

      // custom API
      console.log(store.state.gnafId);
      const lotData = await getLotData(store.state.gnafId);
      store.methods.setCustomData(lotData);

      store.methods.setLoadingStatus(false);
    };

    // onMounted(async () => {
    //   console.log("Getting lot profile");

    //   const propertyData = await axios("sample.json").then((res) => res.data);
    //   store.methods.setDomainData(propertyData);
    //   if (propertyData.photos.length > 0) {
    //     store.methods.setImgUrl(propertyData.photos[0].fullUrl);
    //   }
    //   fetch("lot_profile_sample.json")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       console.log("noise: ", data["properties"]["noise"]);

    //       console.log(
    //         "primary school:",
    //         data["properties"]["schoolCatchment"].filter((obj) =>
    //           obj.catchType.includes("PRIMARY")
    //         )
    //       );

    //       console.log(
    //         "high school:",
    //         data["properties"]["schoolCatchment"].filter((obj) =>
    //           obj.catchType.includes("HIGH")
    //         )
    //       );
    //     });
    //   // const lotData = await getLotData("GANSW713196590");
    //   // console.log(lotData);
    // });

    watch(() => store.state.domainPropertyId, getPropertyInfo);

    return {
      store,
      getPropertyInfo,
    };
  },
};
</script>
