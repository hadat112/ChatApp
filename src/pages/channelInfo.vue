<template>
  <!-- chatinfor -->
  <div
    v-if="channelInfoList.data"
    class="chat-info"
    style="width: 375px"
    :class="{ chatinfobtn: isShow, loading: loading || loadingChannelInfo }"
  >
    <div class="info-container" v-if="clickButton">
      <div class="info-block" style="width: 375px; height: 339px">
        <div class="info-avatar" v-if="channelInfoList.data">
          <span
            class="individual-avatar"
            v-if="channelInfoList.data.channel_type === 'direct'"
          >
            <img
              :src="`${channelInfoList.data.avatar}`"
              alt="avatar"
              style="height: 163px; width: 375px"
            />
          </span>
          <div class="group">
            <span
              class="group-avatar"
              v-if="channelInfoList.data.channel_type === 'group'"
            >
              <img
                :src="`${channelInfoList.data.group_images[0].avatar}`"
                alt="avatar"
                style="height: 163px; width: 125px; flex: 1"
              />
              <img
                :src="`${channelInfoList.data.group_images[1].avatar}`"
                alt="avatar"
                style="height: 163px; width: 125px; flex: 1"
              />
              <img
                :src="`${channelInfoList.data.group_images[2].avatar}`"
                alt="avatar"
                style="height: 163px; width: 125px; flex: 1"
                v-if="channelInfoList.data.count_member > 2"
              />
              <div
                class="number_participants"
                v-if="channelInfoList.data.count_member > 2"
              >
                +{{ channelInfoList.data.count_member - 3 }}
              </div>
            </span>
          </div>
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
          style="display: flex; justify-content: space-around; padding: 20px 0"
        >
          <div
            class="short-act-info-icon"
            v-if="channelInfoList.data.channel_type == 'direct' ? true : false"
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
            <span>Thêm người</span>
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
</template>

<script>
import { storeToRefs } from "pinia";
import { useChannelInfoStore } from "../stores/channel-info.js";
import { useMessageStore } from "../stores/message-list.js";
import { ref } from "vue";
import {
  FileImageOutlined,
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

export default {
  components: {
    BellOutlined,
    UserOutlined,
    SearchOutlined,
    FileImageOutlined,
    ClockCircleOutlined,
    RightOutlined,
    MailOutlined,
    MessageOutlined,
    TeamOutlined,
    TagOutlined,
    PushpinOutlined,
    SettingOutlined,
    LeftOutlined,
    UserAddOutlined,
  },
  setup() {
    const { channelInfoList, loadingChannelInfo, isShow } = storeToRefs(
      useChannelInfoStore()
    );
    const { loading } = storeToRefs(useMessageStore());
    let clickButton = ref(true);

    let extraInfo = () => {
      clickButton.value = !clickButton.value;
    };

    return { channelInfoList, loadingChannelInfo, extraInfo, loading, isShow, clickButton };
  },
};
</script>

<style>
</style>