<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
</template>

<script>
import { provide } from "vue";
import store from "./store";
export default {
  setup() {
    provide("store", store);
  },
};
</script>
