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
    <div class="chart-container">
      <div class="chart-info">
        <p><span>۶۰ </span> پاسخ‌های صحیح</p>
        <p><span>۳۰</span> پاسخ‌های غلط</p>
        <p><span>۱۰</span> بی پاسخ‌ها</p>
      </div>
      <!--  -->
      <div class="chart">
        <vue3-chart-js v-bind="{ ...doughnutChart }" />
      </div>

      <!--  -->
      <div class="user-info">
        <div class="info-div">
          <p>تراز کاربر</p>
          <span> ۹،۰۳۵ </span>
        </div>
        <div class="info-div">
          <p>رتبه کاربر</p>
          <span> ۳۵۳،۴۵۴ </span>
        </div>
        <div class="info-div">
          <p>رتبه کلی کاربر</p>
          <span> ۱،۲۴۳،۵۶۶ </span>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="card-container">
      <div class="card">
        <div class="img-label">
          <img src="../../../assets/img/azmoon-icons/farsi.png" alt="farsi" />
          <span class="card-label"> نگارش فارسی </span>
        </div>
        <div class="percent">
          <div class="percent-wrapper card-first-number">
            <span class=""> ۸۵٪ </span>
          </div>
          <div class="percent-wrapper card-second-number">
            <span class=""> ۱۵٪ </span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="img-label">
          <img src="../../../assets/img/azmoon-icons/math.png" alt="farsi" />
          <span class="card-label"> مطالعات اجتماعی </span>
        </div>
        <div class="percent">
          <div class="percent-wrapper card-first-number">
            <span class=""> ۸۵٪ </span>
          </div>

          <div class="percent-wrapper card-second-number">
            <span class=""> ۱۵٪ </span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="img-label">
          <img src="../../../assets/img/azmoon-icons/Physic.png" alt="farsi" />
          <span class="card-label"> فیزیک </span>
        </div>
        <div class="percent">
          <div class="percent-wrapper card-first-number">
            <span class=""> ۸۵٪ </span>
          </div>

          <div class="percent-wrapper card-second-number">
            <span class=""> ۱۵٪ </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Btns -->
    <div class="btns">
      <button @click="goToHamnavard">همنورد</button>
      <button @click="changeShowTaraz">تخمین رتبه کنکور</button>
    </div>
    <!-- Taraz(تخمین رتبه) -->
    <Taraz v-if="showTaraz" @convertBoolean="changeShowTaraz" />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import router from '@/router';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import Taraz from '@/modules/student-modules/azmoon/comp-test-taraz.vue';

export default defineComponent({
  // TODO
  // uncomment This later
  // props:{
  //     label ,
  //     info,
  //     count,
  //     data
  // },
  components: {
    Vue3ChartJs,
    Taraz
  },

  setup() {
    const showTaraz = ref(false);

    const goOnePageBack = () => router.go(-1);

    const changeShowTaraz = () => (showTaraz.value = !showTaraz.value);

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const doughnutChart = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: ['#4ac367', '#ff5960', '#d3d7e0'],
            data: [60, 30, 10]
          }
        ]
      }
    };

    const goToHamnavard = () =>
      router.push({
        name: 'Hamnavard'
      });

    return {
      styles,
      goOnePageBack,
      doughnutChart,
      goToHamnavard,
      showTaraz,
      changeShowTaraz
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
  .chart-container {
    display: grid;
    width: 90%;
    margin: 10px auto;
    border-radius: 16.7px;
    box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
    background-color: #fff;
    grid-template-areas:
      'chart chart-info'
      'chart chart-info'
      'user-info user-info ';
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    grid-gap: 1rem;
    padding: 15px;
    .chart {
      grid-area: chart;
    }
    .chart-info {
      grid-area: chart-info;
      display: flex;
      flex-direction: column;
      margin-top: 1rem;

      p {
        font-size: 12px;
        color: #646464;
        span {
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          color: #fff;
          border-radius: 10px;
          display: inline-block;
          width: 30px;
          height: 30px;
          padding: 5px;
        }
        //
        &:first-child {
          span {
            // Change This Later Automatically
            background-color: #4ac367;
          }
        }
        &:nth-child(2) {
          span {
            background-color: #ff5960;
          }
        }
        &:nth-child(3) {
          span {
            background-color: #d3d7e0;
          }
        }
      }
    }
    .user-info {
      border-top: dotted 2px #959fba;
      grid-area: user-info;
      display: flex;
      justify-content: space-between;
      padding: 1rem 0.5rem;

      .info-div {
        border-right: 5px solid #ededed;
        padding-right: 0.5rem;
        p {
          font-size: 12px;
          text-align: right;
          color: #646464;
          margin: 0;
          line-height: 1.9em;
        }

        span {
          font-size: 14px;
          font-weight: bold;
          text-align: right;

          color: #171717;
        }
      }
    }
  }
  // card-container
  .card-container {
    width: 90%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;

    .card {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0.6rem;
      border: 3px solid #fff;
      border-radius: 10px;

      .img-label {
        img {
          width: 52px;
          height: 52px;
          background-color: #ededed;
          padding: 13px;
          border-radius: 18px;
        }

        .card-label {
          font-size: 13px;
          font-weight: bold;
          text-align: right;
          color: #171717;
          margin-right: 10px;
        }
      }
      .percent {
        margin-left: 0.8rem;
        display: flex;
        gap: 1rem;
        .percent-wrapper {
          display: flex;
          width: 2rem;
          height: 2rem;
          font-size: 12px;
          border-radius: 12px;
          align-items: center;
          justify-content: center;
          // text-align: center;
          // padding: 0.5rem;
          padding: 1.1rem;
        }
        .card-first-number {
          background-color: #4ac3666b;
          color: green;
        }
        .card-second-number {
          background-color: #ff596175;
          color: red;
          margin-left: 15%;
        }
      }
    }
  }
  // btns
  .btns {
    width: 90%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;

    button {
      background: $redish-background;
      padding: 1rem 0;
      border: none;
      width: 46%;
      border-radius: 15px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
