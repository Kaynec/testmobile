<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="inbox" v-else>
    <MinimalHeader title="پیام های دریافتی " />

    <!-- Container -->
    <div class="container">
      <div
        class="card"
        v-for="item in data"
        :key="item"
        @click="changeShowMessage(item)"
      >
        <span class="label"> {{ item.label }} </span>
        <img
          src="../../../assets/img/shape.svg"
          class="position-absolute top-50 start-0 translate-middle ml-3"
          alt="angle left icon"
        />
        <div class="inner-child">
          <p class="clock">
            <span>
              <i class="far fa-clock"></i>
              {{ item.day }}
              <strong> | </strong>
              <span> ساعت {{ item.time }}</span>
            </span>
          </p>
          <p :class="item.isRead ? 'status' : 'status active'">
            {{ item.isRead ? 'خوانده نشده' : 'خوانده شده' }}
          </p>
        </div>
      </div>
    </div>
    <!-- Show Message Info -->
    <Message v-if="showMessage" @convertBoolean="changeShowMessage" />
  </div>
</template>

<script lang="ts">
import Message from '@/modules/student-modules/message/profile-message.vue';
import router from '@/router';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import { defineComponent, reactive, computed, ref } from 'vue';

export default defineComponent({
  components: { Message, MinimalHeader },
  setup() {
    const showMessage = ref(false);
    // We Change This objects Information with the pressed div
    const currentItem = ref({});

    const goOnePageBack = () => router.go(-1);

    const changeShowMessage = (itemToBeShownUsingComponent = {}) => {
      showMessage.value = !showMessage.value;
      currentItem.value = itemToBeShownUsingComponent;
    };

    const data = reactive([
      {
        label: 'موضوع و عنوان پیام در اینجا نوشته می شود…',
        day: 'سه شنبه',
        time: '۱۵:۳۰',
        isRead: false
      },
      {
        label: 'موضوع و عنوان پیام در اینجا نوشته می شود…',
        day: 'سه شنبه',
        time: '۱۵:۳۰',
        isRead: true
      },
      {
        label: 'موضوع و عنوان پیام در اینجا نوشته می شود…',
        day: 'سه شنبه',
        time: '۱۵:۳۰',
        isRead: true
      },
      {
        label: 'موضوع و عنوان پیام در اینجا نوشته می شود…',
        day: 'سه شنبه',
        time: '۱۵:۳۰',
        isRead: true
      }
    ]);
    return {
      goOnePageBack,
      data,
      changeShowMessage,
      showMessage,
      currentItem
    };
  }
});
</script>

<style lang="scss" scoped>
.inbox {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  height: 100%;
  position: relative;
  padding-top: 8vh;
  .container {
    width: 95%;
    margin: 1.5rem auto;

    .card {
      padding: 0.5rem 1rem;
      padding-bottom: 0;
      border-radius: 15px;
      border: 3px solid #fff;

      .label {
        font-size: 12px;
        font-weight: bold;
        text-align: right;
        color: #171717;
      }

      .inner-child {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;

        .clock {
          font-size: 12px;
          letter-spacing: -1.1px;
          text-align: right;
          color: #979797;
        }
        .status {
          margin-left: 15%;
          font-size: 12px;
          letter-spacing: -1.1px;
          color: #979797;
        }
        .active {
          font-size: 12px;
          font-weight: bold;
          letter-spacing: -1.1px;
          color: #4ac367;
        }
      }
    }
  }
}
</style>
