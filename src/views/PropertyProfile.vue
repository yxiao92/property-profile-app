<template>
  <!-- Navigator -->
  <nav class="flex justify-between items-center m-3">
    <div class="flex items-center">
      <button id="menu" class="p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <button id="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg>
      </button>
    </div>
    <SearchModal />
  </nav>
  <body id="property-info">
    <main class="m-auto md:max-w-2xl space-y-6">
      <PropertySummary />
      <BlockInfo
        :address-coord="store.state.addressCoord"
        :loading-status="store.state.isLoading"
        :custom-data="store.state.customData"
      />
    </main>
    <!-- <footer class="bg-blue-300 h-20"></footer> -->
  </body>
</template>

<script>
import { inject, watch } from "vue";

import SearchModal from "../components/SearchModal.vue";
import PropertySummary from "../components/PropertySummary.vue";
import BlockInfo from "../components/BlockInfo.vue";

import { getPropertyData } from "../components/domainAPI.js";
import { getLotData } from "../components/customAPI.js";

export default {
  name: "PropertyProfile",
  components: {
    SearchModal,
    BlockInfo,
    PropertySummary,
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

    watch(() => store.state.domainPropertyId, getPropertyInfo);

    return {
      store,
      getPropertyInfo,
    };
  },
};
</script>
