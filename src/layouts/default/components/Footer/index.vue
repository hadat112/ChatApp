<script setup>
import {
  EllipsisOutlined,
  SendOutlined,
  PictureFilled,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { ref, computed } from "vue";

let messageInput = ref("");
let selectFiles = ref([]);
const filesUrl = ref([]);

const sendMessage = async (messageInput, selecteFiles) => {
  let formData = new FormData();
  selecteFiles.forEach((file) => {
    formData.append("attachment", file);
  });
  formData.append("channel_id", this.currentChannel);
  formData.append("msg_type", "text");
  formData.append("ref_id", "1Pq2InaSrMP696rGQza5");
  formData.append("text", messageInput);

  await axios.post("https://chat.ghtk.vn/api/v3/messages", formData, {
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  // this.fetchNewMessage();
};

const sendMessageHandle = async () => {
  if ((messageInput.value || selectFiles.value) && currentChannel.value)
    await sendMessage(messageInput.value, selectFiles.value);
  messageInput.value = "";
  selectFiles.value = [];
  filesUrl.value = [];
};

const deletePreview = (index) => {
  filesUrl.value.splice(index, 1);
  selectFiles.value.splice(index, 1);
};

const onFileSelected = (e) => {
  Object.values(e.target.files).forEach((file) => {
    selectFiles.value.push(file);
    filesUrl.value.push(URL.createObjectURL(file));
  });
};

const activeSend = computed(() => messageInput || selectFiles[0]);
</script>

<template>
  <!-- msg-preview-img -->
  <div class="footer-expand">
    <div
      class="footer-preview-img"
      v-for="(item, index) in filesUrl"
      :key="index"
    >
      <img :src="item" alt="" />
      <span>
        <button class="delete-preview" @click="deletePreview(index)">
          <delete-outlined />
        </button>
      </span>
    </div>
  </div>
  <form @submit.prevent="sendMessageHandle">
    <div class="footer-input">
      <div class="message-more">
        <ellipsis-outlined />
      </div>

      <div class="menu-footer">
        <input
          type="text"
          placeholder="Nhập nội dung tin nhắn"
          name=""
          v-model="messageInput"
          @keyup.enter.prevent="submit"
        />
        <div class="menu-footer-icon">
          <input
            type="file"
            hidden="hidden"
            ref="inputUpload"
            multiple
            @change="onFileSelected"
          />
          <button
            type="button"
            class="upload-img"
            @click.prevent="$refs.inputUpload.click()"
          >
            <picture-filled />
          </button>
        </div>
      </div>
      <button type="submit" class="send-btn" :class="{ active: activeSend }">
        <send-outlined />
      </button>
    </div>
  </form>
</template>
