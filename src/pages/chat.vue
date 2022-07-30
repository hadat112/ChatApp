<template>
  <a-spin class="chat-spinner" v-if="loading || loadingChannelInfo" />
  <!-- chatview -->
  <div class="chat-view" :class="{ loading: loading || loadingChannelInfo }">
    <!-- header -->
    <a-layout-header
      v-if="!loadingChannelInfo"
      style="background: #fff; height: fit-content; padding: 0"
    >
      <a-page-header
        v-if="channelInfoList.data.channel_type == 'direct'"
        :title="`${channelInfoList.data.channel_name}`"
        :sub-title="`${channelInfoList.data.partner.position_name}`"
      >
        <template #extra>
          <button
            @click="showInfo"
            style="background: #fff; border: none; outline: none"
          >
            <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
          </button>
        </template>
      </a-page-header>
      <a-page-header
        v-if="channelInfoList.data.channel_type == 'group'"
        :title="`${channelInfoList.data.channel_name}`"
        :sub-title="`${channelInfoList.data.count_member} thành viên`"
      >
        <template #extra>
          <button @click="showInfo" style="background: #fff; border: none">
            <ellipsis-outlined style="font-size: 28px; color: #a4a4a4" />
          </button>
        </template>
      </a-page-header>
      <div class="channel-info-btn"></div>
    </a-layout-header>
    <!-- content -->
    <a-layout-content
      @scroll.prevent="scrollHandle"
      :class="{ stopScroll: loadingMore }"
    >
      <span class="scroll-start-at-top"></span>
      <div class="">
        <!-- loading more-->
        <div class="load-more-msg" style="width: 100%">
          <a-spin class="" style="width: 100%" v-if="loadingMore" />
        </div>
        <div
          :style="{ background: '#fff' }"
          v-for="(item, index) in messageList
            ? messageList.slice().reverse()
            : []"
          :key="index"
        >
          <!--msg time-->
          <div class="massage-container">
            <div
              class="msg-chain-time"
              v-if="
                index &&
                new Date(item.created_at) -
                  new Date(
                    messageList[messageList.length - index].created_at
                  ) >=
                  1800000
              "
              style="justify"
            >
              {{ getTime(item.created_at) }}
              <!-- <span> {{ new Date(t) | dayjs('YYYY-MM-DD') }} </span> -->
            </div>
          </div>
          <!-- msg container-->
          <div
            class="message-container"
            :class="{
              self: item.sender.id == '6801990813180061667',
              mt16:
                index &&
                item.sender.id !=
                  messageList[messageList.length - index].sender.id,
            }"
          >
            <!-- msg avatar -->
            <div
              class="message-avt-container"
              v-if="
                item.sender.id != '6801990813180061667' &&
                (index == 0 ||
                  item.sender.id !=
                    messageList[messageList.length - index].sender.id ||
                  new Date(item.created_at) -
                    new Date(
                      messageList[messageList.length - index].created_at
                    ) >=
                    1800000)
              "
            >
              <div
                class="message-avt"
                :style="`background-image: url(${item.sender.avatar})`"
              ></div>
            </div>
            <!-- msg content -->
            <div
              class="message-content"
              :class="{
                ml47:
                  index &&
                  item.sender.id ==
                    messageList[messageList.length - index].sender.id &&
                  new Date(item.created_at) -
                    new Date(
                      messageList[messageList.length - index].created_at
                    ) <
                    1800000,
              }"
            >
              <!-- msg name -->
              <div
                v-if="
                  item.sender.id != '6801990813180061667' &&
                  (index == 0 ||
                    item.sender.id !=
                      messageList[messageList.length - index].sender.id ||
                    new Date(item.created_at) -
                      new Date(
                        messageList[messageList.length - index].created_at
                      ) >=
                      1800000)
                "
                class="message-sender"
              >
                {{ item.sender.fullname }}
              </div>
              <!-- msg attachments -->
              <div class="message-attachments">
                <div
                  v-for="attachment in item.attachments"
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
              <!-- msg-text -->
              <div
                v-if="item.text && item.msg_type == 'text'"
                class="message-text"
                :class="{
                  self: item.sender.id == '6801990813180061667',
                  message_delete: item.text === 'Tin nhắn đã được thu hồi',
                }"
                v-html="urlify(item.text)"
              ></div>
              <!-- msg-forward -->
              <div
                v-if="item.msg_type == 'forward_message'"
                class="message-forward"
                :class="{ self: item.sender.id == '6801990813180061667' }"
              >
                <!-- msg-forward-icon -->
                <div class="message-forward-icon">
                  <double-right-outlined />
                </div>
                <!-- msg-forward-des -->
                <div class="message-forward-des">
                  <div
                    class="message-forward_text"
                    v-html="urlify(item.quote_message.text)"
                  ></div>
                  <div class="message-forward-info">
                    {{ item.quote_message.sender.fullname }},
                    {{ getTimeQuote(item.quote_message.created_at) }}
                  </div>
                </div>
                <!-- msg-forward-text -->
                <div
                  class="message-forward-text"
                  v-html="urlify(item.text)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
    <!-- footer -->
    <a-layout-footer>
      <!-- msg-preview-img -->
      <div class="footer-expand">
        <div
          class="footer-preview-img"
          v-for="(item, index) in filesUrl"
          :key="index"
        >
          <img :src="item" alt="" />
          <span>
            <!-- <a href="">
              <eye-outlined />
            </a> -->
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
          <button
            type="submit"
            class="send-btn"
            :class="{ active: messageInput || selectFiles[0] }"
          >
            <send-outlined />
          </button>
        </div>
      </form>
    </a-layout-footer>
  </div>

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
                style="height: 163px; width: 125px; flex:1"
              />
              <img
                :src="`${channelInfoList.data.group_images[1].avatar}`"
                alt="avatar"
                style="height: 163px; width: 125px; flex:1"
              />
              <img
                :src="`${channelInfoList.data.group_images[2].avatar}`"
                alt="avatar"
                style="height: 163px; width: 125px; flex:1"
                v-if="channelInfoList.data.count_member > 2"
              />
              <div class="number_participants" v-if="channelInfoList.data.count_member > 2">+{{ channelInfoList.data.count_member - 3 }}</div>
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
import {
  EllipsisOutlined,
  SendOutlined,
  MoreOutlined,
  DoubleRightOutlined,
  PictureFilled,
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
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { useMessageStore } from "../stores/message-list.js";
import { useChannelInfoStore } from "../stores/channel-info.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useChannelStore } from "../stores/channel.js";

export default {
  components: {
    UserOutlined,
    EllipsisOutlined,
    SendOutlined,
    MoreOutlined,
    DoubleRightOutlined,
    PictureFilled,
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
    DeleteOutlined,
    EyeOutlined,
  },
  setup() {
    const route = useRoute();

    let { messageList, loading, loadingMore, error, limit, currentChannel } =
      storeToRefs(useMessageStore());
    const { fetchMessage, fetchMore, sendMessage } = useMessageStore();

    const { channelList } = storeToRefs(useChannelStore());

    const { channelInfoList, loadingChannelInfo } = storeToRefs(
      useChannelInfoStore()
    );

    const { fetchChannelInfo } = useChannelInfoStore();
    // console.log(channelInfoList.value.data.channel_type)
    let clickButton = ref(true);
    const isShow = ref(true);
    let messageInput = ref("");
    let selectFiles = ref([]);
    const filesUrl = ref([]);
    currentChannel.value = route.params.id;

    const ws = new WebSocket(
      "wss://ws.ghtk.vn/ws/chat?Authorization=c_9pvt7zjguoe6bpz7anisrh5ymtrzkckne73srm6mjqk9clzcfocicirmz1edjq1t&appType=gchat&appVersion=2022-07-29%2C02%3A14%3A08&device=web&deviceId=zhXaUEkd5S0zxjrNPScW&source=chats"
    );

    ws.onopen = function () {
      ws.send(
        "c_w7t3uynrn9ekd2mor8oasahmlhqagauhgzubek8jwt1hi89fnrb2ho9f6zt0unrj|sub|chats_user_6801990813180061667"
      );
    };

    ws.onmessage = function (event) {
      let message = JSON.parse(event.data);
      console.log(message);
      if (message.event === "message") {
        // console.log(messageList);
        messageList.value.unshift({
          channel_id: message.data.channel_id,
          channel_mode: message.data.channel_mode,
          channel_type: message.data.channel_type,
          created_at: message.data.created_at,
          id: message.data.id,
          is_pin: message.data.is_pin,
          msg_type: message.data.msg_type,
          ref_id: message.data.ref_id,
          score: message.data.score,
          sender: message.data.sender,
          status: message.data.status,
          text: message.data.text,
          total_seen: message.data.total_seen,
        });

        console.log(channelList);
        fetchChannel();
        // fetchMessage();
      }
    };

    let extraInfo = () => {
      clickButton.value = !clickButton.value;
      // console.log(clickButton);
    };
    function showInfo() {
      isShow.value = !isShow.value;
    }
    function urlify(text) {
      if (text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
          return '<a href="' + url + '">' + url + "</a>";
        });
      }
    }
    function normalizeDate(number) {
      return number < 10 ? "0" + number : number;
    }

    function getTimeQuote(date) {
      let d = new Date(date);
      let time;
      time =
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
    }
    async function sendMessageHandle() {
      if (messageInput.value && currentChannel.value)
        await sendMessage(messageInput.value, selectFiles.value);
      messageInput.value = "";
      selectFiles.value = [];
      filesUrl.value = [];
    }
    async function scrollHandle(e) {
      const { target } = e;
      // console.log(Math.ceil(-target.scrollTop), target.scrollHeight - target.offsetHeight + 15);
      if (
        Math.ceil(-target.scrollTop) >=
          Math.ceil(target.scrollHeight - target.offsetHeight + 15) &&
        loadingMore
      ) {
        if (limit.value < 100) {
          limit.value += 10;
          await fetchMore();
        }
      }
    }

    function normalizeDate(number) {
      return number < 10 ? "0" + number : number;
    }

    function getTime(date) {
      let d = new Date(date);
      let today = new Date();
      let time;
      if (d.getDate() === today.getDate()) {
        time =
          "Hôm nay, " +
          normalizeDate(d.getHours()) +
          ":" +
          normalizeDate(d.getMinutes());
      } else if (d.getDate() + 1 === today.getDate()) {
        time =
          "Hôm qua, " +
          normalizeDate(d.getHours()) +
          ":" +
          normalizeDate(d.getMinutes());
      } else {
        time =
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
      return time;
    }

    function onFileSelected(e) {
      selectFiles.value.push(e.target.files[0]);
      filesUrl.value.push(URL.createObjectURL(e.target.files[0]));
    }

    function deletePreview(index) {
      filesUrl.value.splice(index, 1);
      selectFiles.value.splice(index, 1);
    }
    return {
      messageList,
      loading,
      loadingMore,
      loadingChannelInfo,
      messageInput,
      sendMessageHandle,
      showInfo,
      isShow,
      urlify,
      getTime,
      getTimeQuote,
      scrollHandle,
      onFileSelected,
      filesUrl,
      selectFiles,
      channelInfoList,
      extraInfo,
      clickButton,
      deletePreview,
    };
  },
};
</script>;
