<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="start" v-else>
    <MinimalHeader title="کارنامه" />
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
      <div class="budget-img">
        <h5>بودجه بندی آزمون</h5>
        <img src="../../../assets/img/duel-start.png" />
      </div>

      <div class="budget-label">
        <p class="budget-label-first-p">درس هوش مصنوعی</p>
        <p class="budget-label-second-p">از درس ۱ تا ۱۱</p>
      </div>

      <div class="budget-label">
        <p class="budget-label-first-p">درس شبکه پیشرفته</p>
        <p class="budget-label-second-p">از درس ۴ تا ۱۳</p>
      </div>

      <div class="budget-label">
        <p class="budget-label-first-p">درس برنامه نویس فانکشنال پیشرفته</p>
        <p class="budget-label-second-p">
          از مبحث مربوط به تابع map تا مبحث مربوط به تابع filter
        </p>
      </div>
    </div>

    <!--  -->
    <button @click="goToquestions">
      شروع آزمون دوئل
      <i class="fas fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import router from '@/router';

export default defineComponent({
  components: { MinimalHeader },
  setup() {
    const goOnePageBack = () => router.go(-1);

    const goToquestions = () =>
      router.push({
        name: 'CompTestQuestions'
      });

    return {
      goOnePageBack,
      goToquestions
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.start {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  height: 100%;
  position: relative;
  padding-top: 8vh;
  overflow-x: hidden;
  overflow-y: auto;

  .time {
    width: 95%;
    margin: 1rem auto;
    background: linear-gradient(268deg, #ff545b 6%, #a50d14);
    border-radius: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.66rem 0;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      min-width: 33%;
      color: #fff;
      padding: 0.5rem 0;

      &:nth-of-type(2) {
        border-right: 1px dashed #fff;
      }
      &:nth-of-type(3) {
        border-right: 1px dashed #fff;
      }

      p {
        font-size: 13.2px;
        margin: 0;
      }
      h5 {
        font-size: 11.2px;
        margin: 0;
        margin-top: 0.7rem;
      }
    }
  }

  .budget {
    width: 95%;
    margin: 1rem auto;
    border-radius: 18px;
    padding: 0.5rem;
    background: #fff;

    .budget-img {
      width: 100%;
      align-items: center;
      justify-content: start;
      display: flex;
      flex-direction: row-reverse;
      position: relative;
      padding: 0.5rem 0;

      img {
        margin-left: 0.5rem;
        border: 2px solid red;
        border-radius: 50%;
        margin-bottom: 0.2rem;
        width: 1.8rem;
        padding: 4px;
        background: #000;
      }

      h5 {
        font-size: 14px;
        text-align: right;
        font-weight: bold;
      }
    }

    .budget-img::before {
      content: '';
      position: absolute;
      width: 1px;
      top: 80%;
      right: 3px;
      height: 40%;
      margin-right: 10.5px;
      background: #d21921;
    }

    .budget-label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 0.3rem 1.5rem;

      .budget-label-first-p {
        font-size: 12px;
        font-weight: bold;
        text-align: right;
        color: #646464;
      }

      .budget-label-second-p {
        font-size: 12px;
        text-align: left;
        color: #646464;
      }
    }
    .budget-label::after {
      content: '';
      position: absolute;
      right: 0;
      top: 30%;
      width: 0.5rem;
      height: 0.5rem;
      background: #d21921;
      border-radius: 50%;
      margin-right: 10px;
    }
    .budget-label::before {
      content: '';
      position: absolute;
      width: 1px;
      top: 55%;
      height: 20px;
      right: 0;
      margin-right: 13px;
      background: #d21921;
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
    width: 80%;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 1rem auto;
    position: fixed;

    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.7rem;
      background: rgb(207, 8, 8);
      border-radius: 50%;
      position: absolute;
      right: 0;
      top: 20%;
      padding: 0.7rem;
    }
  }
}
</style>
