<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="hamnavard" v-else :style="styles">
    <i
      @click="pauseAndPlay"
      :class="
        pausedStatus == true
          ? 'fas fa-pause pause-play'
          : 'fas fa-play pause-play'
      "
    ></i>
    <nav class="nav">
      <span> کارنامه </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <div class="c-video">
      <video
        src="https://mazwai.com/videvo_files/video/free/2019-05/small_watermarked/190416_08_Whales_Drone_004_preview.webm"
        class="video"
        autoplay
        ref="video"
        @timeupdate="onUpdate"
      ></video>
    </div>
    <!-- Btns -->
    <div class="progress-button">
      <div class="progress-container">
        <span>{{ duration || 0 }}</span>
        <!-- Attaching The event listener to the parent element and filling the child using a ref -->

        <div class="progressbar" @touchmove="touchMove">
          <div
            :style="`width : ${
              (video && (video.currentTime / video.duration) * 100) || 0
            }% `"
            class="progressbar-child"
            ref="progressbarChild"
          ></div>
        </div>
        <span>{{ currentTime }}</span>
      </div>

      <button
        @click="changeSendRequest"
        class="btn"
        :class="sendRequest ? 'green' : 'red'"
      >
        <span>
          {{
            sendRequest == false
              ? 'درخواست جلسه مشاوره'
              : 'درخواست شما ارسال شد'
          }}
        </span>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeUpdate } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const sendRequest = ref(false);
    //
    const goOnePageBack = () => router.go(-1);
    const video = ref(null) as any;
    const currentTime = ref(0) as any;
    const duration = ref(0) as any;
    const pausedStatus = ref(false);
    const progressbarChild = ref() as any;
    //
    onBeforeUpdate(() => {
      duration.value = video.value.duration;
      const tmp = duration.value / 60;
      if (tmp > 0) {
        let firstSide = tmp > 0 ? ~~tmp : `0${~~tmp}`;
        let secondSide =
          currentTime.value < 60 ? ~~duration.value : ~~duration.value % 60;
        duration.value = firstSide + ':' + secondSide;
        duration.value = firstSide + ':' + secondSide;
      }
    });

    const onUpdate = () => {
      currentTime.value = ~~video.value.currentTime;
      video.value.paused
        ? (pausedStatus.value = true)
        : (pausedStatus.value = false);
      //
      const tmp = currentTime.value / 60;
      let firstSide = tmp > 0 ? ~~tmp : `0${~~tmp}`;
      //
      let secondSide =
        currentTime.value < 60 ? ~~currentTime.value : ~~currentTime.value % 60;
      currentTime.value = firstSide + ':' + secondSide;
    };

    const pauseAndPlay = () => {
      video.value.paused ? video.value.play() : video.value.pause();
    };
    ``;

    const touchMove = (e: any) => {
      let clientRect = e.currentTarget.getBoundingClientRect();
      let fullWidth = clientRect.right;
      // Account for margin and etc
      let deltaX = e.changedTouches[0].clientX - clientRect.left;
      const tmp = ~~video.value.duration / (~~fullWidth / ~~deltaX);
      video.value.currentTime = ~~tmp;
      video.value.play();
    };

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const changeSendRequest = () => (sendRequest.value = true);
    return {
      styles,
      goOnePageBack,
      video,
      currentTime,
      duration,
      onUpdate,
      pauseAndPlay,
      pausedStatus,
      progressbarChild,
      sendRequest,
      changeSendRequest,
      touchMove
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.hamnavard {
  width: 100%;
  font-family: IRANSans;
  position: relative;
  overflow: hidden;

  .pause-play {
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    width: 50px; /* Need a specific value to work */
    height: 2rem;
    font-size: 3rem;
    border-radius: 50%;
    color: white;
    width: 120px;
    height: 120px;
    padding: 31px 32px 31px 36px;
    background-image: linear-gradient(268deg, #ff545ade 6%, #a50d15d8);
    top: 40%;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

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
      display: inline-block;
    }
  }

  .c-video {
    width: 100%;
    height: 100%;
    inset: 0;
    position: absolute;
    z-index: -1;

    video {
      height: 100%;
      z-index: 1;
    }
  }

  .progress-button {
    margin: 1rem 1rem 1rem;
    position: fixed;
    width: 90%;
    bottom: 0;

    .btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row-reverse;
      text-align: center;
      width: 100%;
      border-radius: 15px;
      padding: 15px 8px;
      border: none;
      color: white;

      span {
        width: 100%;
      }
    }

    .red {
      background: $redish-background;

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.3rem;
        width: 24px;
        height: 24px;
        background: red;
        border-radius: 50%;
      }
    }
    .green {
      background: #4ac367;
      i {
        visibility: hidden;
      }
    }

    .progress-container {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;

      span {
        display: inline-flex;
        &:first-child {
          margin-left: 1rem;
        }
        &:last-child {
          margin-right: 1rem;
        }
      }

      .progressbar {
        flex-grow: 1;
        height: 12px;
        background-color: white;
        position: relative;
        margin-bottom: 1rem;

        .progressbar-child {
          background-color: red;
          position: absolute;
          height: 100%;
          transition: ease 0.2s;
          width: 10%;
          left: 0;
        }
      }
    }
  }
}
</style>
