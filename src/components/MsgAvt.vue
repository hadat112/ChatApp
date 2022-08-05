<template>
  <div
    class="message-avt-container"
    v-if="
      index == 0 || senderID != '6801990813180061667' && (senderID != prevSenderID || showAvt)
    "
  >
    <div class="message-avt" :style="`background-image: url(${avt})`"></div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
export default {
  props: {
    index: Number,
    senderID: String,
    prevSenderID: String,
    time: String,
    prevTime: String,
    avt: String,
  },

  setup(props) {
    const showAvt = computed({
      get() {
        return new Date(props.time) - new Date(props.prevTime) >= 1800000;
      },
    });
    return { showAvt };
  },
};
</script>

<style>
</style>