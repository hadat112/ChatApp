<template>
  <div
    class="message-avt-container"
    v-if="props.index === 0 || (isNotSender && isNotFirstMessage)"
  >
    <div
      class="message-avt"
      :style="`background-image: url(${props.avt})`"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  index: Number,
  senderID: String,
  prevSenderID: String,
  time: String,
  prevTime: String,
  avt: String,
});
const isNotFirstMessage = computed(() => {
  return (
    props.senderID != props.prevSenderID ||
    new Date(props.time) - new Date(props.prevTime) >= 1800000
  );
});
const isNotSender = computed(() => {
  return props.senderID != "6801990813180061667";
});
</script>
