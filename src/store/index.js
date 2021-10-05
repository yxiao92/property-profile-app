import { reactive, readonly } from "vue";

const state = reactive({
  counter: 100,
  isLoading: false,
  domainPropertyId: "",
  // domainPropertyId: "RB-4744-TZ",
  // gnafId: "GANSW719734974",
  gnafId: "",
  domainData:{},
  customData: {},
  addressCoord: {},
  imgUrl: "",
});

const methods = {
  setLoadingStatus(isLoading) {
    state.isLoading = isLoading;
  },
  // showSearchResults(showResults) {
  //   state.showResults = showResults;
  // },
  // updateSearchText(searchText) {
  //   state.searchText = searchText;
  // },
  // updateSearchResults(data) {
  //   state.searchResults = data;
  // },
  updateDomainPropertyId(id) {
    state.domainPropertyId = id;
  },
  setDomainData(data) {
    state.domainData = data;
    state.addressCoord = data.addressCoordinate;
    state.gnafId = data.gnafIds[0].gnafPID;
  },
  setCustomData(data) {
    state.customData = data;
  },
  setImgUrl(url) {
    state.imgUrl = url;
  },
};

const getters = {
  // getSearchText(){
  //   return state.searchText;
  // }
}

export default {
  state: readonly(state),
  methods,
  getters,
};
