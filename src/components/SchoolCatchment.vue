<template>
  <h2 class="max-w-md mx-auto md:mx-0 text-lg p-2 font-medium">
    Public school catchments
  </h2>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div class="p-8 my-auto">
      <!-- Local School Boilerplate -->
      <i v-if="!schoolInfo" class="text-sm text-gray-600"
        >School information not available</i
      >
      <div v-else>
        <div
          v-for="(school, i) in schoolInfo"
          :key="i"
          class="flex items-center mb-3"
        >
          <h3 class="mr-3 text-sm text-gray-800">
            {{ school.schoolName }}
          </h3>
          <p
            class="p-1
          bg-indigo-500 bg-opacity-80 
          text-white text-xs  text-center rounded-md"
          >
            {{ school.type }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from "vue";

import { processSchoolInfo } from "../helpers/school-details";

export default {
  name: "SchoolCatchment",
  props: ["loadingStatus", "customData"],
  setup(props) {
    const { loadingStatus, customData } = toRefs(props);
    const schoolInfo = ref(null);
    watch([loadingStatus, customData], () => {
      if (!loadingStatus.value && customData.value.id != undefined) {
        schoolInfo.value = processSchoolInfo(
          customData.value.properties.schoolCatchment
        );
      }
    });

    return { schoolInfo };
  },
};
</script>
