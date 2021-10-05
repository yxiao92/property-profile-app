<template>
  <!-- Modal Button -->
  <div>
    <button id="search-modal" @click="toggleModal" class="p-4">
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
  <div
    id="modal-container"
    v-if="showModal"
    class="flex items-center justify-center 
      outline-none focus:outline-none
      overflow-x-hidden overflow-y-auto 
      fixed inset-x-0 top-40 z-50
      "
  >
    <div
      class="relative
      px-4
      w-5/6 max-w-2xl
      border-0 rounded-lg shadow-lg bg-white 
      outline-none focus:outline-none
    "
    >
      <!-- Modal Content -->
      <!-- Search Bar -->
      <header
        class="flex items-center justify-between m-2
          border-b border-solid 
          border-gray-400 rounded-t"
      >
        <label for="search-input" id="search-label">
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
              text-md
              "
          placeholder="Type an address"
        />
        <button @click="toggleModal">
          <span
            class="px-1.5 py-0.5 rounded-md bg-gray-50 text-gray-600 text-sm border"
          >
            esc
          </span>
        </button>
      </header>
      <!-- Search Results -->
      <div class="relative mx-2 h-auto">
        <p
          v-if="searchText.length == 0"
          class="my-4 text-gray-500 text-md leading-relaxed"
        >
          No results
        </p>
        <p
          v-if="searchText.length > 0 && searchResults.length == 0"
          class="my-4 text-gray-500 text-md leading-relaxed"
        >
          Loading ...
        </p>

        <ul v-show="showResults">
          <li
            v-for="(result, i) in searchResults"
            :key="i"
            @mouseover="cursor = i"
            @mouseleave="cursor = -1"
            @click="onEnter"
            class="flex items-center px-4 py-8 mb-2 h-11 bg-gray-50 rounded-md"
            :class="{ 'bg-green-100': i === cursor }"
          >
            <div class="flex items-center">
              <svg
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
              </svg>
              <div class="flex flex-col">
                <div class="flex">
                  <span
                    v-if="result.addressComponents.unitNumber.length > 0"
                    class="text-lg"
                  >
                    {{ result.addressComponents.unitNumber }}/
                  </span>
                  <span class="md:text-lg">
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
    </div>
    <!-- <div
      class="relative w-auto my-6 mx-auto max-w-3xl bg-red-600"
    >
    </div> -->
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { debounce } from "lodash";
import { getPropertyAddress } from "./domainAPI.js";

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
        // document.getElementById("property-info").classList.add("overflow:hidden");
        // document.body.classList.add("overflow-y-hidden");
        // console.log(document.getElementById("app"))

      }
      // document.getElementById("property-info").classList.remove("overflow-hidden");
      searchText.value = "";
      showResults.value = false;
      cursor.value = -1;
    };

    const focusInput = () => {
      setTimeout(() => addressInput.value.focus(), 1);
    };

    const onChange = debounce(async () => {
      if (searchText.value.length < 10) {
        if (searchText.value.length == 0) {
          searchResults.value = [];
        }
        showResults.value = false;
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
      const selectedResult = searchResults.value[cursor.value];

      searchText.value = selectedResult.address;
      // console.log("selected property id: ", selectedResult.id);

      store.methods.updateDomainPropertyId(selectedResult.id);
      // console.log("updated property id: ", store.state.domainPropertyId);
      store.methods.setLoadingStatus(true);
      cursor.value = -1;
      showResults.value = false;
      toggleModal();
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
