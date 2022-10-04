<template>
  <div v-if="isNotSender && isNotFirstMessage" class="message-sender">
    {{ props.fullname }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  senderID: String,
  index: Number,
  prevSenderID: String,
  time: String,
  prevTime: String,
  fullname: String,
});

const isNotFirstMessage = computed(() => {
  return (
    props.index === 0 ||
    props.senderID != props.prevSenderID ||
    new Date(props.time) - new Date(props.prevTime) >= 1800000
  );
});

const isNotSender = computed(() => {
  return props.senderID != "6801990813180061667";
});
</script>