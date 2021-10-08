<template>
  <div>
    <input
      v-model="searchText"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      type="text"
      class="w-96 px-3 py-2 border rounded rounded-b-none"
    />
    <ul
      v-show="showResults"
      class="absolute py-2 w-96 bg-white border border-t-0 rounded rounded-t-none"
    >
      <li
        v-for="(result, i) in searchResults"
        :key="i"
        @mouseover="cursor = i"
        @mouseleave="cursor = -1"
        class="px-3 py-1 h-11"
        :class="{ 'bg-green-100': i === cursor }"
      >
        {{ result.address }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, inject } from "vue";
// import { ref, inject, computed } from "vue";
import { debounce } from "lodash";
import { getPropertyAddress } from "../helpers/domain.api.js";

export default {
  name: "SearchBar",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  setup() {
    const store = inject("store");
    const cursor = ref(-1);
    const showResults = ref(false);
    const searchText = ref("");
    const searchResults = ref([]);

    const onChange = debounce(async () => {
      cursor.value = -1;
      if (searchText.value.length < 10) {
        showResults.value = false;
      } else {
        const results = await getPropertyAddress(searchText.value);
        console.log(results);
        searchResults.value = results;
        showResults.value = true;
      }
    }, 500);

    const onArrowDown = () => {
      if (cursor.value < searchResults.value.length) {
        cursor.value += 1;
      }
    };

    const onArrowUp = () => {
      if (cursor.value > 0) {
        cursor.value -= 1;
      }
    };

    const onEnter = () => {
      searchText.value = searchResults.value[cursor.value].address;
      cursor.value = -1;
      showResults.value = false;
    };

    // const searchText = computed({
    //   get() {
    //     return store.getters.getSearchText();
    //   },
    //   set(val) {
    //     store.methods.updateSearchText(val);
    //   },
    // });

    // const onChange = debounce(async () => {
    //   console.log(store.state.searchText);
    //   cursor.value = -1;
    //   if (store.state.searchText.length < 10) {
    //     store.methods.showSearchResults(false);
    //   } else {
    //     const searchResults = await getPropertyAddress(store.state.searchText);
    //     store.methods.updateSearchResults(searchResults);
    //     store.methods.showSearchResults(true);
    //   }
    // }, 500);

    // const onArrowDown = () => {
    //   console.log("current cursor:", cursor.value);
    //   if (cursor.value < store.state.searchResults.length) {
    //     cursor.value += 1;
    //   }
    // };

    // const onArrowUp = () => {
    //   if (cursor.value > 0) {
    //     cursor.value -= 1;
    //   }
    // };

    return {
      store,
      cursor,
      showResults,
      searchText,
      searchResults,
      onChange,
      onArrowDown,
      onArrowUp,
      onEnter,
    };
  },
};
</script>
