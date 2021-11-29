<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="self-test-answers" :style="styles">
    <nav class="sm-nav">
      <div>
        <span class="user-parts"> پاسخنامه تشریحی آزمون </span>
      </div>

      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!-- Progress Bar And Count -->

    <div class="difficulty">
      <img src="../../../assets/img/bookmark-light.png" alt="bookmark" />
      <span>آسان</span>
      <span>متوسط</span>
      <!-- Change This With The Type Of The Question -->
      <span class="active">دشوار</span>
    </div>

    <!-- Quiz Card -->
    <!-- Change This With Real Data Of Question -->

    <div class="quiz-card shadow">
      <p class="number-of-question">سوال شماره <span> ۱۰ </span></p>

      <h5>
        چرا برای نوشتن یک بند، موضوع کلی را به موضوع های کوچک تر تقسیم می کنیم؟
      </h5>
      <div class="quiz-card-container">
        <div class="card">
          <span> تا بتوانیم بند بلندتری بنویسیم </span>
          <div class="img">
            <img
              src="../../../assets/img/azmoon-icons/accept-path-light.png"
              alt="active"
            />
          </div>
        </div>

        <div class="card">
          <span> چون بند کوتاه است </span>
          <div class="img">
            <img
              src="../../../assets/img/azmoon-icons/accept-path-light.png"
              alt="active"
            />
          </div>
        </div>

        <div class="card active">
          <span> تا از پراکندگی مطالب بند، جلوگیری کنیم </span>
          <div class="img">
            <img
              src="../../../assets/img/azmoon-icons/accept-path-light.png"
              alt="active"
            />
          </div>
        </div>
        <div class="card">
          <span> تا اطلاعات بیشتری درباره یک موضوع داشته باشیم </span>
          <div class="img">
            <img
              src="../../../assets/img/azmoon-icons/accept-path-light.png"
              alt="active"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Answer -->
    <p class="answer">
      نگارش، به آموزش بندنویسی می‌پردازد و به تعمیق و تجربه‌های یادگیری در این
      زمینه اختصاص دارد. در این بخش موارد زیر آموزش داده می‌شود
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import router from '@/router';

export default defineComponent({
  props: {
    label: { type: String, default: 'فصل دوم بهداشت' }
  },
  setup() {
    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const goOnePageBack = () => router.go(-1);

    return { styles, goOnePageBack };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.self-test-answers {
  width: 100%;
  background: #f4f4f4;
  .sm-nav {
    width: 100%;
    background-color: #171717;
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem;
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

  .difficulty {
    display: flex;
    align-items: center;
    font-family: IRANSans;
    padding-top: 1rem;
    margin: 0 auto;
    justify-content: space-between;
    span {
      padding: 5px 27px 7px;
      border-radius: 15px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      background-color: #fff;
    }
    span.active {
      background: $redish-background;
      color: white;
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
      }

      .img {
        width: 27px;
        height: 27px;
        padding: 7px;
        background-color: #d3d7e0;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          object-fit: contain;
        }
      }
      //
      .card.active {
        border: solid 2px #4ac367;

        span {
          font-family: IRANSans;
          font-size: 13px;
          font-weight: bold;
          color: #4ac367;
        }
        .img {
          background-color: #4ac367;
        }
      }
    }
  }

  .answer {
    margin: 1rem 1rem;
    padding: 20px;
    font-family: IRANSans;
    border-radius: 14.7px;
    box-shadow: 0 11px 17px 0 rgba(7, 125, 62, 0.1);
    background-color: #4ac367;
    color: white;
  }
}
</style>
