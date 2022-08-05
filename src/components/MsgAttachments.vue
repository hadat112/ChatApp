<template>
  <div class="message-attachments">
    <div
      v-for="attachment in attachments"
      :key="attachment.id"
      class="message-attachments-item"
    >
      <a-image
        v-if="
          attachment.ext == 'jpg' ||
          attachment.ext == 'jpeg' ||
          attachment.ext == 'png' ||
          attachment.ext == 'gif' ||
          attachment.ext == 'svg'
        "
        :src="`${attachment.url}`"
        alt=""
      />
      <video width="400" v-if="attachment.ext == 'mp4'" controls>
        <source :src="`${attachment.url}`" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        ['attachments']: {type: Array}
    },
};
</script>

<style>
</style>