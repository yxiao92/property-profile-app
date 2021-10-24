<template>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div v-if="!!store.state.imgUrl">
      <img class="h-60 w-full object-cover" :src="store.state.imgUrl" alt="" />
    </div>
    <div v-else class="relative">
      <img class="h-60 w-full object-cover" src="/wave.svg" alt="" />
      <span
        class="absolute right-2 bottom-1 text-center text-xxs text-indigo-600 text-opacity-30"
      >
        <i class="px-1 fab fa-creative-commons"></i>
        <a href="https://bgjar.com/">by BGJar</a>
      </span>
    </div>

    <div class="p-8">
      <!-- Status -->
      <div
        v-if="store.state.domainData.onMarketTypes"
        class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
      >
        <span v-if="store.state.domainData.status === 'OffMarket'"
          >off the market</span
        >
        <span v-else
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
          class="text-lg md:text-xl text-gray-800 font-bold"
        >
          {{ store.state.domainData.flatNumber }} /
          {{ store.state.domainData.streetAddress }}
        </h1>
        <h1 v-else class="text-lg md:text-xl text-gray-800 font-bold">
          {{ store.state.domainData.streetAddress }}
        </h1>
        <h1 class="text-md text-gray-600">
          {{ store.state.domainData.suburb }}
          {{ store.state.domainData.state }}
          {{ store.state.domainData.postcode }}
        </h1>
      </div>
      <!-- Rooms -->
      <div class="flex items-center space-x-4 space-x-reverse text-md mt-4">
        <!-- Property Type -->
        <span id="property-type" class="hidden md:flex md:items-center md:pr-2">
          <span class="mr-2 text-gray-800">{{
            store.state.domainData.propertyCategory
          }}</span>
          <i class="fas fa-chevron-right text-gray-400"></i>
        </span>

        <!-- Bed -->
        <span id="bed" class="flex items-center">
          <span class="mr-2 text-gray-800">{{
            store.state.domainData.bedrooms ?? "-"
          }}</span>
          <i class="fas fa-bed text-lg text-gray-800"></i>
        </span>
        <!-- Bath -->
        <span id="bath" class="flex items-center">
          <span class="mr-2 text-gray-800">{{
            store.state.domainData.bathrooms ?? "-"
          }}</span>
          <i class="fas fa-bath text-md text-gray-800"></i>
        </span>
        <!-- Car -->
        <span id="car">
          <span id="bath" class="flex items-center">
            <span class="mr-2 text-gray-800">{{
              store.state.domainData.carSpaces ?? "-"
            }}</span>
            <i class="fas fa-car text-lg text-gray-800"></i>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  name: "PropertySummary",
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
};
</script>
