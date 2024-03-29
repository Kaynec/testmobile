<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="hamnavard" v-else>
    <i
      @click="pauseAndPlay"
      :class="
        pausedStatus == true
          ? 'fas fa-play pause-play'
          : 'fas fa-pause pause-play'
      "
      v-if="video"
      :style="`display : ${video.paused ? 'flex' : 'none'}`"
    ></i>
    <MinimalHeader title="کارنامه" />
    <div class="c-video">
      <video
        :src="videoSrc"
        class="video"
        autoplay
        ref="video"
        @timeupdate="onUpdate"
        @click="pauseAndPlay"
      ></video>
    </div>
    <!-- Btns -->
    <div class="progress-button">
      <div class="progress-container">
        <span>{{ duration || 0 }}</span>
        <!-- Attaching The event listener to the parent element and filling the child using a ref -->

        <div class="progressbar" @touchend="onTouch" @touchmove="touchMove">
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
import { defineComponent, watch, ref, onBeforeUpdate } from 'vue';
import router from '@/router';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import { StudentHamnavardApi } from '@/api/services/student/student-hamnavard-service';
import { displayProtectedVideo } from '@/utilities/get-image-from-url';
import { store } from '@/store';
export default defineComponent({
  components: { MinimalHeader },
  setup() {
    const allData = ref({}) as any;
    const sendRequest = ref(false);
    const goOnePageBack = () => router.go(-1);
    const video = ref(null) as any;
    const currentTime = ref(0) as any;
    const duration = ref(0) as any;
    const pausedStatus = ref(false);
    const progressbarChild = ref() as any;
    const videoSrc = ref('');

    (async () => {
      await StudentHamnavardApi.getAll().then(
        (res) => (allData.value = res.data.data)
      );
      const imageUrl = `https://www.api.devnirone.ir/api/hamnavard/getVideo/${allData.value.videos[0].file}`;
      displayProtectedVideo(imageUrl).then((res) => {
        videoSrc.value = res;
      });
    })();

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

      const tmp = currentTime.value / 60;
      let firstSide = tmp > 0 ? ~~tmp : `0${~~tmp}`;

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

    const onTouch = (e: any) => {
      let clientRect = e.currentTarget.getBoundingClientRect();
      let fullWidth = clientRect.right;
      // Account for margin and etc
      let deltaX = e.changedTouches[0].clientX - clientRect.left;
      const tmp = ~~video.value.duration / (~~fullWidth / ~~deltaX);
      video.value.currentTime = ~~tmp;
      video.value.play();
    };

    const changeSendRequest = () => (sendRequest.value = true);

    watch(video.value, () => {
      console.log(video.value);
    });

    return {
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
      touchMove,
      onTouch,
      videoSrc
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.hamnavard {
  width: 100%;
  height: 100%;
  font-family: IRANSans;
  position: relative;
  padding-top: 8vh;

  .pause-play {
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    width: 0px; /* Need a specific value to work */
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
    z-index: 9999;
  }
  .c-video {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    background-color: #f4f4f4;
    // z-index: -1;

    video {
      height: 100%;
      width: 100%;
      object-fit: contain;
      // z-index: 1;
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
