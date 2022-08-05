<template>
  <div
    class="message-forward"
    :class="{ self: senderID == '6801990813180061667' }"
  >
    <!-- msg-forward-icon -->
    <div class="message-forward-icon">
      <double-right-outlined />
    </div>
    <!-- msg-forward-des -->
    <div class="message-forward-des">
      <div class="message-forward_text" v-html="markedText(quoteMessage)"></div>
      <div class="message-forward-info">
        {{ msgName }},
        {{ quoteTime }}
      </div>
    </div>
    <!-- msg-forward-text -->
    <div class="message-forward-text" v-html="markedText(msgText)"></div>
  </div>
</template>

<script>
import { DoubleRightOutlined } from "@ant-design/icons-vue";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    DoubleRightOutlined,
  },
  props: {
    senderID: String,
    msgText: String,
    msgName: String,
    msgTime: String,
    quoteMessage: String,
  },
  setup(props) {
    function normalizeDate(number) {
      return number < 10 ? "0" + number : number;
    }

    const quoteTime = computed({
      get() {
        let d = new Date(props.msgTime);
        let time =
          normalizeDate(d.getDate()) +
          "/" +
          normalizeDate(d.getMonth() + 1) +
          "/" +
          d.getFullYear() +
          " " +
          normalizeDate(d.getHours()) +
          ":" +
          normalizeDate(d.getMinutes()) +
          " " +
          d.getDay();
        return time;
      },
    });

    return { quoteTime };
  },
};
</script>

<style>
</style>