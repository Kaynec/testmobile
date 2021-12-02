<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="start" v-else :style="styles">
    <nav class="nav">
      <span> کارنامه </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!--  -->
    <div class="label">
      <p>دوئل مدیر شغلی مهندس عمران</p>
      <h6>پایه کنکور ریاضی</h6>
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
        <Vue3ChartJs v-bind="{ ...doughnutChart }" />
      </div>

      <!--  -->

      <div class="user-info">
        <div class="info-div">
          <p>رتبه کاربر</p>
          <span> ۳۴ </span>
        </div>
        <div class="info-div">
          <p>رتبه کلی کاربر</p>
          <span> ۹،۳۴۸ </span>
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

    <!--  -->
    <button @click="moveToList">
      مشاهده کلی رتبه ها
      <i class="fas fa-arrow-right"></i>
    </button>
    <!--  -->
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import router from '@/router';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';

export default defineComponent({
  components: { Vue3ChartJs },
  setup() {
    const goOnePageBack = () => router.go(-1);

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

    const moveToList = () => router.push({ name: 'DuelAll' });

    return {
      styles,
      goOnePageBack,
      moveToList,
      doughnutChart
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
    padding: 1rem;

    p {
      font-size: 11px;
      text-align: right;
      color: #ed1b24;
      margin: 3px 0;
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
      justify-content: flex-start;
      padding: 1rem 0.5rem;

      .info-div {
        border-right: 5px solid #ededed;
        padding-right: 0.5rem;

        &:first-child {
          margin-left: 25%;
        }
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
          width: 3rem;
          height: 3rem;
          background-color: #ededed;
          padding: 0.55rem;
          border-radius: 18px;
        }

        .card-label {
          font-size: 12px;
          font-weight: bold;
          text-align: right;
          color: #171717;
          margin-right: 3px;
        }
      }
      .percent {
        margin-left: 0.55rem;
        display: flex;
        gap: 0.75rem;
        .percent-wrapper {
          display: flex;
          width: 2rem;
          height: 2rem;
          font-size: 12px;
          border-radius: 12px;
          align-items: center;
          justify-content: center;
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
  button {
    position: fixed;
    background: $redish-background;
    width: 95%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 1rem auto;
    padding: 1rem 0;
    border: none;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #fff;

    i {
      position: absolute;
      right: 0;
      top: 25%;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.3rem;
      width: 28px;
      height: 28px;
      aspect-ratio: 1;
      background: rgb(168, 19, 19);
      border-radius: 50%;
    }
  }
}
</style>
