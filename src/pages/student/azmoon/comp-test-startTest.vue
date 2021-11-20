<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="report-card" v-else :style="styles">
    <nav class="nav">
      <span> کارنامه </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!--  -->
    <div class="label">
      <!-- Count -->
      <p>آزمون شماره ۱۰</p>
      <!-- Info -->
      <h6>عمومی ۱۴۰۰ - ۱۴۰۱</h6>
      <h6 class="second-h6">پایه کنکور ریاضی فیزیک</h6>
    </div>
    <!--  -->
    <div class="time">
      <div>
        <p>۲۰ آبان ۱۴۰۰</p>
        <h5>تاریخ آزمون</h5>
      </div>
      <div>
        <p>۱۳:۰۰</p>
        <h5>ساعت شروع آزمون</h5>
      </div>
      <div>
        <p>۱۶:۰۰</p>
        <h5>ساعت پایان آزمون</h5>
      </div>
    </div>
    <!--  -->
    <div class="budget">
      <h5>بودجه بندی آزمون</h5>
      <div>
        <p>درس هوش مصنوعی</p>
        <p>از درس ۱ تا ۱۱</p>
      </div>
      <div>
        <p>درس شبکه پیشرفته</p>
        <p>از درس ۴ تا ۱۳</p>
      </div>
      <div>
        <p>درس برنامه نویس فانکشنال پیشرفته</p>
        <p>از مبحث مربوط به تابع map تا مبحث مربوط به تابع filter</p>
      </div>
    </div>
    <!--  -->
    <button @click="goToquestions">شروع آزمون</button>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const goOnePageBack = () => router.go(-1);

    const goToquestions = () =>
      router.push({
        name: 'CompTestQuestions'
      });

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    return {
      styles,
      goOnePageBack,
      goToquestions
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.report-card {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
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

  .time {
    width: 95%;
    margin: 1rem auto;
    background: linear-gradient(268deg, #ff545b 6%, #a50d14);
    border-radius: 7px;
    display: flex;
    align-items: center;
    font-family: iranSans;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      padding: 1rem;
      min-width: 33%;
      min-height: 10rem;
      color: #fff;

      &:nth-of-type(2) {
        border-right: 2px dashed #fff;
      }
      &:nth-of-type(3) {
        border-right: 2px dashed #fff;
      }

      p {
        font-size: 12px;
      }
      h5 {
        font-size: 15px;
      }
    }
  }

  .budget {
    width: 95%;
    margin: 1rem auto;
    font-family: IRANSans;
    h5 {
      font-size: 16px;
      text-align: right;
      font-weight: bold;
      margin: 1.5rem 0;
    }

    div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin: 1.5rem 0;
      padding: 0.2rem 1.25rem;

      p {
        width: 50%;
        color: #312e2e;
      }

      p {
        :first-child {
          font-size: 14px;
          text-align: right;
          font-weight: bold;
        }
        &:last-child {
          font-size: 12px;
          text-align: left;
        }
      }
    }
  }

  .label {
    width: 100%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    background-color: #fff;
    margin-bottom: 1rem;
    padding: 0.5rem;

    p {
      font-size: 11px;
      text-align: right;
      color: #ed1b24;
    }

    h6 {
      font-size: 14px;
      font-weight: bold;
      color: #171717;
      display: inline-flex;
    }
    .second-h6 {
      margin-right: 1.25rem;
    }
  }

  button {
    background: $redish-background;
    padding: 1rem 0;
    border: none;
    width: 95%;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    margin: 0 auto;
    display: block;
  }
}
</style>
