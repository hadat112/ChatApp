<template>
  <div class="massage-container">
    <div class="msg-chain-time" v-if="showTime" style="justify">
      {{ timeFormated }}
      <!-- <span> {{ new Date(t) | dayjs('YYYY-MM-DD') }} </span> -->
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    index: Number,
    time: String,
    prevTime: String,
  },
  setup(props) {
    const showTime = computed({
      get() {
        return new Date(props.time) - new Date(props.prevTime) >= 1800000;
      },
    });

    function normalizeDate(number) {
      return number < 10 ? "0" + number : number;
    }

    const timeFormated = computed({
      get() {
        let d = new Date(props.time);
        let today = new Date();
        let format;
        if (d.getDate() === today.getDate()) {
          format =
            "Hôm nay, " +
            normalizeDate(d.getHours()) +
            ":" +
            normalizeDate(d.getMinutes());
        } else if (d.getDate() + 1 === today.getDate()) {
          format =
            "Hôm qua, " +
            normalizeDate(d.getHours()) +
            ":" +
            normalizeDate(d.getMinutes());
        } else {
          format =
            normalizeDate(d.getDate()) +
            "/" +
            normalizeDate(d.getMonth() + 1) +
            "/" +
            d.getFullYear() +
            ", " +
            normalizeDate(d.getHours()) +
            ":" +
            normalizeDate(d.getMinutes());
        }
        return format;
      },
    });
    return { showTime, timeFormated };
  },
};
</script>

<style>
</style>