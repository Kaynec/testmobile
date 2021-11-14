<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="self-test-questions" :style="styles">
    <nav class="sm-nav">
      <div>
        <span class="user-parts"> سوالات برگزیده </span>
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
        <span> ۲/۱ </span>
      </div>
      <div class="progress" style="height: 5px">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          :style="`width: ${50}%`"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
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
      <button class="red">سوال بعدی <i class="fas fa-arrow-right"></i></button>
      <img src="../../../assets/img/bookmark.png" alt="" />
    </div>
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
    justify-content: space-between;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $redish-background;
      flex-direction: row-reverse;

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
      background-color: #3fca60;
      color: white;
    }
  }
}
</style>
