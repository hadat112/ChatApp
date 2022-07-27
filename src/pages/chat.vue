<template>
  <div class="chat-container">
    <div
      class="chat-view"
      style="width: 100%; height: 980px"
      v-if="channelInfoList.data"
    >
      <a-layout-header
        style="background: #fff; padding: 0"
        v-if="channelInfoList.data.channel_type == 'direct' ? true : false"
      >
        <a-page-header
          backIcon=""
          style="border: 1px solid rgb(235, 237, 240)"
          :title="`${channelInfoList.data.channel_name}`"
          :sub-title="`${channelInfoList.data.partner.position_name}`"
        >
          <template #extra>
            <ellipsis-outlined
              @click="extra"
              style="font-size: 28px; color: #a4a4a4"
            />
          </template>
        </a-page-header>
        <div class="channel-info-btn"></div>
      </a-layout-header>

      <a-layout-header
        style="background: #fff; padding: 0"
        v-if="channelInfoList.data.channel_type == 'group' ? true : false"
      >
        <a-page-header
          backIcon=""
          style="border: 1px solid rgb(235, 237, 240)"
          :title="`${channelInfoList.data.channel_name}`"
          :sub-title="`${channelInfoList.data.count_member}` + ' Thành viên'"
        >
          <template #extra>
            <ellipsis-outlined
              @click="extra"
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
    <div class="chat-info" style="width: 375px; height: 980px">
      <div class="info-container" v-if="clickButton && clickExtraInfo">
        <div class="info-block" style="width: 375px; height: 339px">
          <div class="info-avatar" v-if="channelInfoList.data">
            <img
              :src="`${
                channelInfoList.data.channel_type === 'direct'
                  ? channelInfoList.data.avatar
                  : channelInfoList.data.author.avatar
              }`"
              alt="avatar"
              style="height: 163px; width: 375px"
            />
          </div>
          <div class="info-name">
            <div class="info-name-title" v-if="channelInfoList.data">
              <span class="name">
                {{ channelInfoList.data.channel_name }}
              </span>
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
            <div
              class="short-act-info-icon"
              v-if="
                channelInfoList.data.channel_type == 'direct' ? true : false
              "
            >
              <div class="short-act-info-block">
                <user-outlined class="user-outlined" @click="extraInfo" />
              </div>
              <span>Thông tin</span>
            </div>

            <div
              class="short-act-info-icon"
              v-if="channelInfoList.data.channel_type == 'group' ? true : false"
            >
              <div class="short-act-info-block">
                <user-add-outlined class="user-outlined" @click="extraInfo" />
              </div>
              <span>Them nguoi</span>
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
          <div class="sub-item">
            <div class="sub-item-icon">
              <file-image-outlined style="padding-right: 10px" />
            </div>
            <div class="sub-item-text">
              <span>Ảnh, file, link chia sẻ</span>
            </div>
            <div class="sub-item-right-icon" style="padding-left: 170px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
          <div class="sub-item">
            <div class="sub-item-icon">
              <clock-circle-outlined style="padding-right: 10px" />
            </div>
            <div class="sub-item-text">
              <span>Lịch hẹn</span>
            </div>
            <div class="sub-item-right-icon" style="padding-left: 250px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
          <div class="sub-item">
            <div class="sub-tem-icon">
              <mail-outlined style="padding-right: 10px" />
            </div>
            <div class="sub-item-text">
              <span>Mail chung</span>
            </div>
            <div class="sub-item-right-icon" style="padding-left: 235px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
          <div class="sub-item">
            <div class="sub-item-icon">
              <team-outlined style="padding-right: 10px" />
            </div>
            <div class="sub-item-text">
              <span>Group chung</span>
            </div>
            <div
              class="create-group"
              style="padding-left: 20px; display: inline-block"
            >
              <button
                class="create-group-button"
                style="border-radius: 50%; border-color: #a4a4a4"
              >
                +Tạo
              </button>
            </div>
            <div class="sub-item-right-icon" style="padding-left: 147px">
              <span>5</span>
              <span
                ><right-outlined @click="extraInfo" style="padding-left: 10px"
              /></span>
            </div>
          </div>
        </div>
        <div class="info-block" style="width: 375px; height: 300px">
          <div class="sub-item">
            <div class="sub-item-icon">
              <bell-outlined style="padding-right: 10px; font-size: 25px" />
            </div>
            <div class="sub-item-text">
              <span>Thông báo</span>
            </div>
            <div class="sub-item-icon-right" style="padding-left: 210px">
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="sub-item">
            <div class="sub-item-icon">
              <pushpin-outlined style="padding-right: 10px; font-size: 20px" />
            </div>
            <div class="sub-item-text">
              <span>Ghim chat</span>
            </div>
            <div class="sub-item-icon-right" style="padding-left: 220px">
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="sub-item">
            <div class="sub-item-icon">
              <setting-outlined style="padding-right: 10px; font-size: 20px" />
            </div>
            <div class="sub-item-text">
              <span>Cài đặt cá nhân</span>
            </div>
            <div class="sub.item-right-icon" style="padding-left: 200px">
              <span><right-outlined style="padding-left: 10px" /></span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-container" v-if="!clickButton">
        <div
          class="info-container-title"
          style="
            display: flex;
            font-size: 18px;
            font-weight: bold;
            align-items: center;
            border-bottom: 1px solid #eee;
            height: 55px;
            background-color: #fff;
          "
        >
          <div class="info-container-title-icon">
            <left-outlined @click="extraInfo" />
          </div>
          <div class="info-container-title-name" style="margin-left: 35%">
            <span>Thông tin</span>
          </div>
        </div>
        <div class="info-container-block">
          <div class="sub-menu-item">
            <div class="sub-menu-item-left">Username</div>
            <div class="sub-menu-item-right" v-if="channelInfoList.data">
              {{ channelInfoList.data.partner.username }}
            </div>
          </div>
          <div class="sub-menu-item">
            <div class="sub-menu-item-left">Vị trí</div>
            <div class="sub-menu-item-right" v-if="channelInfoList.data">
              {{ channelInfoList.data.partner.position_name }}
            </div>
          </div>
          <div class="sub-menu-item">
            <div class="sub-menu-item-left">Kho</div>
            <div class="sub-menu-item-right" v-if="channelInfoList.data">
              {{ channelInfoList.data.partner.station_name }}
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
  LeftOutlined,
  UserAddOutlined,
} from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { useChannelInfoStore } from "../stores/channel-info.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";

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
    LeftOutlined,
    UserAddOutlined,
  },
  setup() {
    const route = useRoute();
    const { messageList } = storeToRefs(useMessageStore());
    const { fetchMessage } = useMessageStore();
    let channelID = route.params.id;
    fetchMessage(channelID, 40);

    const { channelInfoList } = storeToRefs(useChannelInfoStore());
    const { fetchChannelInfo } = useChannelInfoStore();
    let channelInfoID = route.params.id;
    fetchChannelInfo(channelInfoID);
    // console.log(channelInfoList.value.data.channel_type)

    let clickButton = ref(true);
    let clickExtraInfo = ref(false);
    let extraInfo = () => {
      clickButton.value = !clickButton.value;
      // console.log(clickButton);
    };

    let extra = () => {
      clickExtraInfo.value = !clickExtraInfo.value;
    };
    return {
      messageList,
      channelInfoList,
      extraInfo,
      clickButton,
      clickExtraInfo,
      extra,
    };
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

</style>