<template>
  <!-- Loading Overlay -->
  <Loading :active="store.state.isLoading" />
  <!-- Navigator -->
  <nav
    class="sticky top-0 z-30 lg:z-40 
    w-full h-16 mb-4 md:max-w-2xl mx-auto 
    bg-white flex-none flex md:rounded-b-xl"
  >
    <div
      class="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center lg:w-60 xl:w-72"
    >
      <a class="overflow-hidden w-8 md:w-auto" href="/"
        ><span class="sr-only">Tailwind CSS home page</span>
        <svg
          width="280"
          height="68.57142857142857"
          viewBox="0 0 280 68.57142857142857"
          class="w-auto h-8"
        >
          <g
            transform="matrix(0.8571428571428571,0,0,0.8571428571428571,-12.857142857142856,-8.571428571428571)"
            fill="#8c82fc"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M50,10L15,30v40l35,20l34.99-19.994L85,69.99V30L50,10z M50,17.699L74.89,31.92l-6.732,3.848L50,25.397L31.846,35.771  l-6.738-3.851L50,17.699z M64.795,41.546v13.059L53.369,48.08V35.02L64.795,41.546z M46.631,35.02v13.057l-11.423,6.527V41.546  L46.631,35.02z M46.631,80.377L21.735,66.152v-28.46l6.734,3.848v20.761L46.631,72.68V80.377z M38.571,60.377l11.426-6.529  l11.429,6.529L50,66.904L38.571,60.377z M78.265,66.152L53.369,80.377V72.68L71.53,62.305V41.54l6.734-3.848V66.152z"
            ></path>
          </g>
          <g
            transform="matrix(2.5062655683143418,0,0,2.5062655683143418,77.2932357675945,-3.4411019847324162)"
            fill="#8c82fc"
          >
            <path
              d="M6.9 9.38 c1.4267 0 2.5666 0.5 3.42 1.5 s1.28 2.3534 1.28 4.06 c0 1.56 -0.41 2.84 -1.23 3.84 s-1.9233 1.5 -3.31 1.5 c-1.36 0 -2.3934 -0.52 -3.1 -1.56 l-0.04 0 l0 4.92 l-2.84 0 l0 -13.98 l2.7 0 l0 1.32 l0.04 0 c0.68 -1.0667 1.7067 -1.6 3.08 -1.6 z M3.82 14.86 c0 1.0133 0.21336 1.8133 0.64002 2.4 s1.04 0.88 1.84 0.88 c0.82666 0 1.4433 -0.29334 1.85 -0.88 s0.61 -1.3867 0.61 -2.4 c0 -1.04 -0.22 -1.8567 -0.66 -2.45 s-1.0533 -0.89 -1.84 -0.89 s-1.39 0.29334 -1.81 0.88 s-0.63 1.4067 -0.63 2.46 z M19.34 9.38 c0.24 0 0.44668 0.03334 0.62002 0.1 l0 2.64 c-0.30666 -0.06666 -0.64666 -0.1 -1.02 -0.1 c-1.8667 0 -2.8 1.1067 -2.8 3.32 l0 4.66 l-2.84 0 l0 -10.34 l2.7 0 l0 1.92 l0.04 0 c0.28 -0.66666 0.72334 -1.2 1.33 -1.6 s1.2633 -0.6 1.97 -0.6 z M25.740000000000002 9.38 c1.6533 0 2.96 0.50334 3.92 1.51 s1.44 2.3234 1.44 3.95 c0 1.64 -0.49 2.9566 -1.47 3.95 s-2.2766 1.49 -3.89 1.49 c-1.64 0 -2.94 -0.50334 -3.9 -1.51 s-1.44 -2.3166 -1.44 -3.93 c0 -1.6667 0.49 -2.9934 1.47 -3.98 s2.27 -1.48 3.87 -1.48 z M23.240000000000002 14.84 c0 1.0533 0.21334 1.8666 0.64 2.44 s1.0467 0.86 1.86 0.86 c0.84 0 1.47 -0.29334 1.89 -0.88 s0.63 -1.3933 0.63 -2.42 c0 -1.0667 -0.21666 -1.8867 -0.65 -2.46 s-1.0633 -0.86 -1.89 -0.86 c-0.8 0 -1.4133 0.28666 -1.84 0.86 s-0.64 1.3933 -0.64 2.46 z M38.76 9.38 c1.4267 0 2.5666 0.5 3.42 1.5 s1.28 2.3534 1.28 4.06 c0 1.56 -0.41 2.84 -1.23 3.84 s-1.9233 1.5 -3.31 1.5 c-1.36 0 -2.3934 -0.52 -3.1 -1.56 l-0.04 0 l0 4.92 l-2.84 0 l0 -13.98 l2.7 0 l0 1.32 l0.04 0 c0.68 -1.0667 1.7067 -1.6 3.08 -1.6 z M35.68 14.86 c0 1.0133 0.21336 1.8133 0.64002 2.4 s1.04 0.88 1.84 0.88 c0.82666 0 1.4433 -0.29334 1.85 -0.88 s0.61 -1.3867 0.61 -2.4 c0 -1.04 -0.22 -1.8567 -0.66 -2.45 s-1.0533 -0.89 -1.84 -0.89 s-1.39 0.29334 -1.81 0.88 s-0.63 1.4067 -0.63 2.46 z M49.94 9.38 c0.97334 0 1.84 0.22664 2.6 0.67998 s1.3567 1.11 1.79 1.97 s0.65 1.85 0.65 2.97 c0 0.10666 -0.0066602 0.28 -0.02 0.52 l-7.46 0 c0.02666 0.82666 0.24332 1.47 0.64998 1.93 s1.03 0.69 1.87 0.69 c0.52 0 0.99666 -0.13 1.43 -0.39 s0.71 -0.57666 0.83 -0.95 l2.5 0 c-0.73334 2.32 -2.3466 3.48 -4.84 3.48 c-0.94666 -0.01334 -1.8233 -0.22 -2.63 -0.62 s-1.45 -1.0233 -1.93 -1.87 s-0.72 -1.83 -0.72 -2.95 c0 -1.0533 0.24334 -2.0134 0.73 -2.88 s1.1333 -1.5133 1.94 -1.94 s1.6767 -0.64 2.61 -0.64 z M52.12 13.719999999999999 c-0.13334 -0.77334 -0.38 -1.3333 -0.74 -1.68 s-0.87334 -0.52 -1.54 -0.52 c-0.69334 0 -1.24 0.19666 -1.64 0.59 s-0.63334 0.93 -0.7 1.61 l4.62 0 z M62.68 9.38 c0.24 0 0.44668 0.03334 0.62002 0.1 l0 2.64 c-0.30666 -0.06666 -0.64666 -0.1 -1.02 -0.1 c-1.8667 0 -2.8 1.1067 -2.8 3.32 l0 4.66 l-2.84 0 l0 -10.34 l2.7 0 l0 1.92 l0.04 0 c0.28 -0.66666 0.72334 -1.2 1.33 -1.6 s1.2633 -0.6 1.97 -0.6 z M68.02000000000001 6.5600000000000005 l0.000019531 3.1 l2.08 0 l0 1.9 l-2.08 0 l0 5.12 c0 0.48 0.08 0.8 0.24 0.96 s0.48 0.24 0.96 0.24 c0.34666 0 0.64 -0.02666 0.88 -0.08 l0 2.22 c-0.4 0.06666 -0.96 0.1 -1.68 0.1 c-1.0933 0 -1.9067 -0.18666 -2.44 -0.56 s-0.8 -1.02 -0.8 -1.94 l0 -6.06 l-1.72 0 l0 -1.9 l1.72 0 l0 -3.1 l2.84 0 z M73.30000000000001 9.66 l2.34 7.08 l0.04 0 l2.26 -7.08 l2.94 0 l-4.32 11.64 c-0.30666 0.81334 -0.73 1.4067 -1.27 1.78 s-1.29 0.56 -2.25 0.56 c-0.41334 0 -1.0067 -0.03334 -1.78 -0.1 l0 -2.34 c0.50666 0.06666 1.0067 0.1 1.5 0.1 c0.4 0 0.71 -0.12334 0.93 -0.37 s0.33 -0.55666 0.33 -0.93 c0 -0.21334 -0.04 -0.42668 -0.12 -0.64002 l-3.64 -9.7 l3.04 0 z"
            ></path>
          </g>
        </svg>
        <!-- <svg viewBox="0 0 248 31" class="w-auto h-6">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
            fill="#06B6D4"
          ></path> -->

        <!-- <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
            fill="#000"
          ></path> -->
        <!-- </svg> -->
      </a>
    </div>
    <SearchModal />
  </nav>

  <body id="property-info">
    <main class="m-auto md:max-w-2xl space-y-6">
      <PropertySummary />
      <div v-if="!!store.state.customData" class="space-y-6">
        <BlockInfo
          :address-coord="store.state.addressCoord"
          :loading-status="store.state.isLoading"
          :custom-data="store.state.customData"
        />
        <AreaInfo
          :address-coord="store.state.addressCoord"
          :loading-status="store.state.isLoading"
          :custom-data="store.state.customData"
        />
        <SchoolCatchment
          :loading-status="store.state.isLoading"
          :custom-data="store.state.customData"
        />
      </div>
      <!-- Data Attribution & Disclaimer -->
      <div
        class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      >
        <div class="p-8 my-auto space-y-3">
          <h4 class="text-sm font-semibold text-gray-800">Data attribution</h4>
          <div class="flex items-center w-full space-x-6 text-gray-600">
            <img src="/logo-domain.png" alt="Domain.com.au" class="h-8" />

            <div class="flex items-center">
              <img
                src="/logo-nsw-gov.png"
                alt="NSW Government"
                class="w-12 mr-2"
              />
              <div class="text-xxs">
                <p>
                  Department of Planning, Industry and Environment
                </p>
                <p>Department of Education</p>
                <p>Spatial Services</p>
              </div>
            </div>
          </div>
          <p class="w-full text-xxs text-gray-600 italic">
            Statistics are either directly sourced or calculated based on the
            cadastral data provided from Domain API and NSW Spatial Services and
            may not be complete or accurate. Polygon boundaries, measurements
            and areas are estimates only. Information shown on this page may not
            have been prepared for or be suitable for legal, engineering, or
            surveying purposes.
          </p>
        </div>
      </div>
    </main>
    <footer
      class="flex-none flex-col justify-center items-center
      mt-6 m-auto md:max-w-2xl p-8 w-full space-y-4
      bg-white md:rounded-t-xl"
    >
      <div class="text-center text-xs text-gray-600">
        © Property Profile 2021
      </div>
    </footer>
  </body>
</template>

<script>
import { inject, watch } from "vue";

import SearchModal from "../components/SearchModal.vue";
import PropertySummary from "../components/PropertySummary.vue";
import BlockInfo from "../components/BlockInfo.vue";
import AreaInfo from "../components/AreaInfo.vue";
import SchoolCatchment from "../components/SchoolCatchment.vue";

import { getPropertyData } from "../helpers/domain.api.js";
import { getLotData } from "../helpers/custom.api.js";

import Loading from "../components/Loading.vue";
import { debounce } from "lodash";

export default {
  name: "PropertyProfile",
  components: {
    SearchModal,
    PropertySummary,
    BlockInfo,
    AreaInfo,
    SchoolCatchment,
    Loading,
  },
  setup() {
    const store = inject("store");

    const getPropertyInfo = debounce(async () => {
      store.methods.setLoadingStatus(true);
      // domain API
      const propertyData = await getPropertyData(store.state.domainPropertyId);
      console.log(propertyData);

      store.methods.setDomainData(propertyData);
      if (propertyData.photos.length > 0) {
        store.methods.setImgUrl(propertyData.photos[0].fullUrl);
      } else {
        store.methods.setImgUrl(null);
      }

      // custom API
      console.log(store.state.gnafId);
      const lotData = await getLotData(store.state.gnafId);
      store.methods.setCustomData(lotData);

      store.methods.setLoadingStatus(false);
    }, 400);

    watch(() => store.state.domainPropertyId, getPropertyInfo);
    // watch(
    //   () => store.state.domainPropertyId,
    //   () => {
    //     store.methods.setLoadingStatus(true);
    //     getPropertyInfo();
    //     setTimeout(() => store.methods.setLoadingStatus(false), 5);
    //   }
    // );

    return {
      store,
      getPropertyInfo,
    };
  },
};
</script>
