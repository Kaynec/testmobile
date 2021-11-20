<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="self-test-questions" :style="styles">
    <nav class="sm-nav">
      <div>
        <span class="user-parts">
          امتیازات کسب شده : ۴۹۸۴ &nbsp; | &nbsp; امتیاز این فصل : ۱۸۷
        </span>
      </div>

      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!-- Progress Bar And Count -->
    <div class="progress-count">
      <div class="count">
        <span>
          {{ label }}
        </span>
        <!-- Change This And Width Of The Progress Bar Dynamically -->
        <span> ۵۰/۱۰۰ </span>
      </div>
      <div class="progress-container">
        <div class="progressbar">
          <div
            style="width: 50%"
            class="progressbar-child"
            ref="progressbarChild"
          ></div>
        </div>
      </div>
      <div class="timer">
        <span>{{ timeForTemplate }}</span>
        <img src="../../../assets/img/time@2x.png" alt="time icon" />
      </div>
    </div>

    <!-- Quiz Card -->

    <div class="quiz-card shadow">
      <p class="number-of-question">سوال شماره <span> ۱۰ </span></p>

      <h5>
        <!-- Change This With Real Data Of Question -->
        چرا برای نوشتن یک بند، موضوع کلی را به موضوع های کوچک تر تقسیم می کنیم؟
      </h5>
      <div class="quiz-card-container">
        <div class="card">
          <span>
            <!-- Answer Text -->
            تا بتوانیم بند بلندتری بنویسیم
          </span>
          <img src="../../../assets/img/vpn-key-white.png" class="tick" />
        </div>

        <div class="card">
          <span>
            <!-- Answer Text -->
            چون بند کوتاه است
          </span>
          <img src="../../../assets/img/vpn-key-white.png" class="tick" />
        </div>

        <div class="card">
          <span>
            <!-- Answer Text -->
            تا از پراکندگی مطالب بند، جلوگیری کنیم
          </span>
          <img src="../../../assets/img/vpn-key-white.png" class="tick" />
        </div>
        <div class="card">
          <span>
            <!-- Answer Text -->
            تا اطلاعات بیشتری درباره یک موضوع داشته باشیم
          </span>
          <img src="../../../assets/img/vpn-key-white.png" class="tick" />
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="btns">
      <button class="red">بعدی <i class="fas fa-arrow-right"></i></button>
      <button class="red">قبلی</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import router from '@/router';

export default defineComponent({
  props: {
    label: { type: String, default: 'فصل دوم بهداشت' }
  },
  setup() {
    const time = ref(7200);

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const goOnePageBack = () => router.go(-1);

    const timeForTemplate = computed(() => {
      return new Date(time.value * 1000).toISOString().substr(11, 8);
    });

    onMounted(() => {
      // Time minus  1 each second
      setInterval(() => {
        time.value = time.value - 1;
      }, 1000);
    });

    return { styles, goOnePageBack, timeForTemplate };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.self-test-questions {
  width: 100%;
  background: #f4f4f4;
  .sm-nav {
    width: 100%;
    background-color: #171717;
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 0.3rem;
    max-height: 8vh;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);

    div {
      img {
        width: 29px;
        height: 28px;
        margin: 0 10px 0 0;
        border-radius: 8px;
        border: solid 2px #ddd;
      }

      span {
        font-family: IRANSans;
        font-size: 11px;
        font-weight: bold;
      }
    }
  }

  .progress-count {
    width: 100%;
    padding: 1rem;
    .count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.5rem;
      font-family: IRANSans;
      color: #171717;

      span {
        &:first-child {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .timer {
      width: 100%;
      min-height: 2rem;
      max-height: 3rem;
      background: $redish-background;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      border-radius: 50px;
      padding: 5px 2px;

      span {
        background-image: linear-gradient(to left, #fad961 45%, #f76b1c);
        border-radius: 25px;
        display: inline-block;
        margin-left: 0.25rem;
        color: #fff;
        padding: 0.2rem 2rem;
        font-size: 18px;
        font-weight: bold;
      }
      img {
        width: 35px;
        height: 35px;
        object-fit: contain;
        margin-right: 0.75rem;
      }
    }
  }

  .quiz-card {
    width: 90%;
    margin: 1rem auto;
    background-color: #fff;
    padding: 1rem;
    border-radius: 25px;

    .number-of-question {
      font-family: IRANSans;
      font-size: 12px;
      text-align: right;
      color: #ed1b24;
      margin: 0.7rem 0;

      span {
        display: inline-block;
        margin-right: 0.25rem;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 11.8px;
        font-weight: bold;
        text-align: center;
        color: #fff;
        background: #c01a22;
        border-radius: 50%;
        padding: 0.4rem;
      }
    }

    h5 {
      margin: 25px 0 2.2rem;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      text-align: right;
      color: #171717;
      line-height: 1.4;
    }

    .quiz-card-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border: solid 1px #c1c1c193;
        background: #fff;
        width: 100%;
        flex-direction: row;
        border-radius: 18px;
        height: 4rem;
        max-height: 5.5rem;

        span {
          font-family: IRANSans;
          font-size: 13px;
          font-weight: bold;
          color: #646464;
        }

        .tick {
          width: 24px;
          height: 24px;
          object-fit: contain;
          border: solid 1px #c1c1c1;
          border-radius: 50px;
        }
      }
    }
  }

  .btns {
    width: 90%;
    margin: 2.5rem auto 0.8rem auto;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0.5rem;

    button {
      width: 50%;
      padding: 0.9rem 1.5rem;
      border-radius: 15px;
      border: none;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }

    .red {
      background: $redish-background;
      text-align: center;
      position: relative;

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.3rem;
        width: 24px;
        height: 24px;
        background: red;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 30%;
        margin-right: 0.7rem;
        margin-left: 0.7rem;
      }
    }

    .green {
      background-color: #3fca60;
      color: white;
    }
    // Give This Class When There isn't Anymore Question Left Back
    .grey {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      background-color: #d3d7e0;
      color: #646464;
    }
  }
}

.progress-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  .progressbar {
    flex-grow: 1;
    height: 6px;
    background-color: #171717;
    position: relative;
    margin-bottom: 1rem;
    border-radius: 5px;

    .progressbar-child {
      background-color: #3fca60;
      position: absolute;
      height: 100%;
      transition: ease 0.2s;
      width: 10%;
      left: 0;
    }
  }
}
</style>
