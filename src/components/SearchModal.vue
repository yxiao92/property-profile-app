<template>
  <!-- Modal Button -->
  <div
    class="flex flex-auto items-center justify-between 
    h-18 px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8"
  >
    <button
      type="button"
      @click="toggleModal"
      class="group flex items-center 
      w-full py-2
      space-x-3 sm:space-x-4 
      leading-6 font-medium text-gray-400 
      hover:text-gray-600 transition-colors duration-200"
    >
      <svg width="24" height="24" fill="none">
        <path
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path></svg
      ><span
        >Quick search<span class="hidden sm:inline">
          for any address</span
        ></span
      >
      <!-- <span
        class="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md"
        ><span class="sr-only">Press </span
        ><kbd class="font-sans"
          ><abbr title="Command" class="no-underline">⌘</abbr></kbd
        ><span class="sr-only"> and </span><kbd class="font-sans">K</kbd
        ><span class="sr-only"> to search</span></span
      > -->
    </button>
  </div>
  <!-- Modal Container -->
  <div
    id="modal-overlay"
    v-if="showModal"
    @click="toggleModal"
    class="fixed inset-0
      bg-gray-600 bg-opacity-30"
  ></div>
  <div
    id="modal-content"
    v-if="showModal"
    class="
      fixed inset-x-0
      px-6 py-1 w-5/6  
      max-w-2xl mx-auto mt-20 mb-auto
      border-0 rounded-xl shadow-lg bg-white
      outline-none focus:outline-none
      overflow-x-hidden overflow-y-auto 
      "
  >
    <!-- Modal Content -->
    <!-- Search Bar -->
    <header
      class="flex items-center justify-between
          border-b border-solid border-gray-200 py-2"
    >
      <label for="search-input" id="search-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </label>
      <input
        type="text"
        ref="addressInput"
        v-model="searchText"
        @input="onChange"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        @keydown.esc="toggleModal"
        class="mx-2 py-2 px-4 w-full
              outline-none focus:outline-none
              text-md"
        placeholder="Type an address"
      />
      <button @click="toggleModal">
        <!-- <span
          class="px-1.5 py-0.5 rounded-md bg-gray-50 text-gray-600 text-sm border"
        >
          esc
        </span> -->
        <i
          class="fas fa-times
          text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200"
        ></i>
      </button>
    </header>
    <!-- Search Results -->
    <div class="relative h-auto my-4">
      <p
        v-if="searchText.length < 5 && !showResults"
        class="text-gray-500 text-md leading-relaxed"
      >
        No results
      </p>

      <p
        v-if="searchText.length >= 5 && !showResults"
        class="flex items-center text-gray-500 text-md leading-relaxed"
      >
        <svg
          class="animate-spin mr-3 h-5 w-5 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading ...
      </p>
      <ul v-show="showResults">
        <li
          v-for="(result, i) in searchResults"
          :key="i"
          @mouseover="cursor = i"
          @mouseleave="cursor = -1"
          @click="onEnter"
          class="flex items-center px-4 py-8 my-2 h-11 bg-gray-50 rounded-md shadow-sm"
          :class="{ 'bg-indigo-200': i === cursor }"
        >
          <div class="flex items-center">
            <i class="fas fa-home hidden md:block mr-4 text-gray-600"></i>
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              class="hidden md:block h-6 w-6 mr-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg> -->
            <div class="flex flex-col">
              <div class="flex">
                <span
                  v-if="result.addressComponents.unitNumber.length > 0"
                  class="md:text-md"
                >
                  {{ result.addressComponents.unitNumber }}/
                </span>
                <span class="md:text-md">
                  {{ result.addressComponents.streetNumber }}
                  {{ result.addressComponents.streetName }}
                  {{ result.addressComponents.streetTypeLong }}
                </span>
              </div>

              <p class="text-xs md:text-sm md:font-medium text-gray-500">
                {{ result.addressComponents.suburb }},
                {{ result.addressComponents.state }}
                <!-- {{ result.addressComponents.postCode }} -->
              </p>
            </div>
            <div
              class="hidden md:block 
                  md:absolute md:right-4 
                  text-xs text-gray-500"
            >
              ⮐
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal Container End -->
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { debounce } from "lodash";
import { getPropertyAddress } from "../helpers/domain.api.js";

export default {
  name: "SearchModal",
  setup() {
    const store = inject("store");
    const showModal = ref(false);
    const cursor = ref(-1);
    const addressInput = ref(null);
    const showResults = ref(false);
    const searchText = ref("");
    const searchResults = ref([]);

    const toggleModal = () => {
      showModal.value = !showModal.value;
      if (showModal.value) {
        focusInput();
        return document.querySelector("body").classList.add("overflow-hidden");
      }
      searchText.value = "";
      showResults.value = false;
      searchResults.value = [];
      cursor.value = -1;
      return document.querySelector("body").classList.remove("overflow-hidden");
    };

    const focusInput = () => {
      setTimeout(() => addressInput.value.focus(), 1);
    };

    const onChange = debounce(async () => {
      if (searchText.value.length < 10) {
        if (searchText.value.length == 0) {
          searchResults.value = [];
          showResults.value = false;
        }
      } else {
        const results = await getPropertyAddress(searchText.value, 5);
        if (results.length > 0) {
          searchResults.value = results;
          cursor.value = 0;
          showResults.value = true;
        }
      }
    }, 300);

    const onArrowDown = () => {
      if (cursor.value < searchResults.value.length - 1) {
        cursor.value += 1;
      } else {
        cursor.value = 0;
      }
    };

    const onArrowUp = () => {
      if (cursor.value > 0) {
        cursor.value -= 1;
      } else {
        cursor.value = searchResults.value.length - 1;
      }
    };

    const onEnter = () => {
      if (searchResults.value.length > 0) {
        const selectedResult = searchResults.value[cursor.value];

        searchText.value = selectedResult.address;

        store.methods.updateDomainPropertyId(selectedResult.id);
        store.methods.setLoadingStatus(true);

        toggleModal();
      }
    };

    // const searchText = computed({
    //   get() {
    //     return store.getters.getSearchText();
    //   },
    //   set(val) {
    //     store.methods.updateSearchText(val);
    //   },
    // });

    return {
      store,
      showModal,
      cursor,
      showResults,
      addressInput,
      searchText,
      searchResults,
      toggleModal,
      focusInput,
      onChange,
      onArrowDown,
      onArrowUp,
      onEnter,
    };
  },
};
</script>
