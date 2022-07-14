<template>
  <div class="chat-container">
    <div class="chat-view" style="width: 576px; height: 980px">
      <a-layout-header style="background: #fff; padding: 0">
        <a-page-header
          backIcon=""
          style="border: 1px solid rgb(235, 237, 240)"
          title="Hà Đạt"
          sub-title="Web engineer"
        >
          <template #extra>
            <ellipsis-outlined
              @click="extraInfo"
              style="font-size: 28px; color: #a4a4a4"
            />
          </template>
        </a-page-header>
        <div class="channel-info-btn"></div>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ padding: '24px', background: '#fff', height: '100vh' }">
          <div
            class="message-container"
            v-for="(item, index) in messageList.data"
            :key="index"
          >
            <div class="message-avt-container">
              <div
                class="message-avt"
                :style="`background-image: url(${item.sender.avatar})`"
              ></div>
            </div>
            <div class="message-content">
              <div class="message-sender">
                {{ item.sender.fullname }}
              </div>
              <div class="message-text">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
    </div>
    <div
      class="chat-info"
      style="width: 375px; height: 980px"
      v-if="clickButton"
    >
      <div class="info-container">
        <div class="info-block" style="width: 375px; height: 339px">
          <div class="info-avatar">
            <img
              src="https://cache.giaohangtietkiem.vn/d/95cc21f4a7d54d0a9719cd2a2db4201e.jpg"
              alt="avatar"
              style="height: 163px; width: 375px"
            />
          </div>
          <div class="info-name">
            <div class="info-name-title">
              <span class="name">Hà Văn Đạt</span>
            </div>
            <div class="info-name-active">
              <span class="active">Đang hoạt động</span>
            </div>
          </div>
          <div
            class="info-short-act"
            style="
              display: flex;
              justify-content: space-around;
              padding: 20px 0;
            "
          >
            <div class="short-act-info-icon">
              <div class="short-act-info-block">
                <user-outlined class="user-outlined" @click="extraInfo" />
              </div>
              <span>Thông tin</span>
            </div>
            <div class="short-act-info-icon">
              <div class="short-act-info-block">
                <message-outlined class="user-outlined" />
              </div>
              <span>Chat</span>
            </div>
            <div class="short-act-info-icon">
              <div class="short-act-info-block">
                <tag-outlined class="user-outlined" />
              </div>
              <span>Gắn thẻ</span>
            </div>
          </div>
        </div>
        <div class="info-block" style="width: 375px; height: 300px">
          <div class="search" style="margin: 10px 0">
            <form class="search-form">
              <search-outlined style="padding-right: 10px" />
              <input
                type="text"
                style="
                  border-top: #fff;
                  border-left: #fff;
                  border-right: #fff;
                  width: 90%;
                "
                class="seach-form-input"
                placeholder="Seach Message"
              />
            </form>
          </div>
          <div
            class="imgage-link"
            style="
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              margin: 10px 0;
              cursor: pointer;
              border-top: 3px solid hsla(0, 0%, 91%, 0.4588235294117647);
            "
          >
            <div class="image-link-icon">
              <file-image-outlined style="padding-right: 10px" />
            </div>
            <div class="image-link-text">
              <span>Ảnh, file, link chia sẻ</span>
            </div>
            <div class="image-link-right-icon" style="padding-left: 170px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
          <div
            class="calender"
            style="
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              margin: 10px 0;
              cursor: pointer;
              border-top: 3px solid hsla(0, 0%, 91%, 0.4588235294117647);
            "
          >
            <div class="calender-icon">
              <clock-circle-outlined style="padding-right: 10px" />
            </div>
            <div class="calender-text">
              <span>Lịch hẹn</span>
            </div>
            <div class="calender-right-icon" style="padding-left: 250px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
          <div
            class="mail"
            style="
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              margin: 10px 0;
              cursor: pointer;
              border-top: 3px solid hsla(0, 0%, 91%, 0.4588235294117647);
            "
          >
            <div class="mail-icon">
              <mail-outlined style="padding-right: 10px" />
            </div>
            <div class="mail-text">
              <span>Mail chung</span>
            </div>
            <div class="mail-right-icon" style="padding-left: 235px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
          <div
            class="group"
            style="
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              margin: 10px 0;
              cursor: pointer;
              border-top: 3px solid hsla(0, 0%, 91%, 0.4588235294117647);
            "
          >
            <div class="group-icon">
              <team-outlined style="padding-right: 10px" />
            </div>
            <div class="group-text">
              <span>Group chung</span>
            </div>
            <div
              class="create-group"
              style="padding-left: 20px; display: inline-block"
            >
              <button
                class="create-group-button"
                style="border-radius: 50%; border-color: #a4a4a4;"
              >
                +Tạo
              </button>
            </div>
            <div class="group-right-icon" style="padding-left: 147px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
        </div>
        <div class="info-block" style="width: 375px; height: 300px">
          <div
            class="notification"
            style="
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              margin: 10px 0;
              cursor: pointer;
              border-top: 3px solid hsla(0, 0%, 91%, 0.4588235294117647);
            "
          >
            <div class="notification-icon">
              <bell-outlined style="padding-right: 10px; font-size: 25px" />
            </div>
            <div class="notification-text">
              <span>Thông báo</span>
            </div>
            <div class="notification-icon-right" style="padding-left: 210px">
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div
            class="pin-chat"
            style="
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              margin: 10px 0;
              cursor: pointer;
              border-top: 3px solid hsla(0, 0%, 91%, 0.4588235294117647);
            "
          >
            <div class="pin-chat-icon">
              <pushpin-outlined style="padding-right: 10px; font-size: 20px"/>
            </div>
            <div class="pin-chat-text">
              <span>Ghim chat</span>
            </div>
            <div class="pin-chat-icon-right" style="padding-left: 220px">
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div
            class="setting"
            style="
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              margin: 10px 0;
              cursor: pointer;
              border-top: 3px solid hsla(0, 0%, 91%, 0.4588235294117647);
            "
          >
            <div class="setting-icon">
              <setting-outlined style="padding-right: 10px; font-size: 20px"/>
            </div>
            <div class="setting-text">
              <span>Cài đặt cá nhân</span>
            </div>
            <div class="setting-right-icon" style="padding-left: 200px">
              <span><right-outlined style="padding-left: 10px" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FileImageOutlined,
  EllipsisOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  RightOutlined,
  MailOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  TagOutlined,
  BellOutlined,
  PushpinOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

export default {
  components: {
    UserOutlined,
    EllipsisOutlined,
    SearchOutlined,
    FileImageOutlined,
    ClockCircleOutlined,
    RightOutlined,
    MailOutlined,
    MessageOutlined,
    TeamOutlined,
    TagOutlined,
    BellOutlined,
    PushpinOutlined,
    SettingOutlined,
  },
  setup() {
    const route = useRoute();
    const { messageList } = storeToRefs(useMessageStore());
    const { fetchMessage } = useMessageStore();
    let channelID = route.params.id;
    fetchMessage(channelID, 40);
    let clickButton = true;
    let extraInfo = () => {
      clickButton = !clickButton;
      console.log(clickButton);
    };
    return { messageList, extraInfo, clickButton };
  },
};
</script>

<style scoped>
.message-container {
  display: flex;
}
.message-avt {
  border-radius: 50%;
  height: 35px;
  width: 35px;
  background-size: cover;
  background-color: aqua;
  flex: 1;
}
.message-content {
  width: 60%;
  margin: 2px 0 0 8px;
}

.message-text {
  background-color: #f0eff4;
  border-radius: 10px;
  padding: 6px 12px;
  width: fit-content;
  word-wrap: break-word;
}

.info-block {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  font-size: 15px;
  background-color: #fff;
  border-bottom: 4px;
  margin: 10px 0;
}
.chat-container {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
}
.info-container {
  background-color: #eee;
  letter-spacing: 0.2px;
  overflow: auto;
  height: 100%;
  position: relative;
}

.chat-info {
  flex: 0 1 25%;
  min-width: 375px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  position: relative;
}

.info-name {
  padding-top: 12px;
}
.info-name-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 10px;
}

.info-name-title .name {
  font-weight: 700;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
}

.info-name-active {
  text-align: center;
  color: #828282;
  font-size: 15px;
  line-height: 18px;
}

.info-avatar img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.short-act-info-block {
  display: flex;
  flex-direction: column;
}

.short-act-info-icon {
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-outlined {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 50%;
  background-color: #14a05b;
  color: #fff;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 21px;
  top: 1px;
  left: 1px;
  bottom: 1px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px white;
}

input:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>