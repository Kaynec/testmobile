<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="chat" v-else :style="styles">
    <nav class="nav">
      <span> گفتگو کنید </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!-- Messages -->
    <main class="chat-section">
      <div class="msg" v-for="item in Msgs" :key="item">
        <p :class="{ supporter: item.sender == 'supporter' }">{{ item.msg }}</p>
        <img
          v-if="item.sender == 'supporter'"
          alt="avatar"
          src="../../../assets/img/contact/avatar.png"
        />
      </div>
    </main>
    <!-- Keyboard -->
    <section class="toolbar">
      <div class="textarea">
        <textarea placeholder="پیام خود را اینجا بنویسید…"></textarea>
      </div>
      <div class="icons">
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
        <i class="fas fa-smile"></i>
        <i class="fa fa-paperclip" aria-hidden="true"></i>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import router from '@/router';

export default defineComponent({
  props: {
    data: { type: String }
  },
  setup(props) {
    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const goOnePageBack = () => router.go(-1);

    const Msgs = ref([
      {
        msg: 'سلام روزتون بخیر باشه',
        sender: 'customer'
      },
      {
        msg: `من در خدمت شما هستم
اگر سوالی دارید می توانید در اینجا مطرح کنید و من با تمام کمال پاسخگو شما هستم`,
        sender: 'supporter'
      }
    ]);

    return { styles, Msgs, goOnePageBack };
  }
});
</script>

<style lang="scss" scoped>
.chat {
  background-color: #f4f4f4;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .nav {
    width: 100%;
    height: 50px;
    padding: 10px 15px 10px 10px;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin: 7px 0 7px 2px;
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
    }
  }
  //
  .chat-section {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .msg {
      width: 100%;
      display: flex;
      padding: 0 0.5rem;
      img {
        width: 53px;
        height: 53px;
        margin: 66px 16px 0 0;
        object-fit: contain;
      }

      p {
        font-family: IRANSans;
        font-size: 14px;
        line-height: 1.43;
        text-align: right;
        color: #fff;
        background-color: #4ac367;
        padding: 19px 23px 21px 29px;
        border-radius: 22.5px;
        line-height: 1.8;
      }
    }

    .supporter {
      color: #171717c7 !important;
      background-color: #f0f7ff !important;
    }
  }

  //
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 9.1px;
    box-shadow: 0 -14px 148px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 97%;
    margin: 0 5px 5px 5px;
    padding: 1rem;

    .textarea {
      font-family: IRANSans;
      flex-basis: 70%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-grow: 1;
      margin-top: 1rem;

      textarea {
        border: none;
        outline: none;
        resize: none;
        font-size: 12px;
        color: #313131;
        width: 100%;
      }
    }

    .icons {
      color: #8f8d9a;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 0.95rem;
      margin-left: 0.25rem;
      font-size: 25px;
      flex-basis: 30%;

      .fa-paper-plane {
        color: #d21921 !important;
      }
    }
  }
}
</style>
