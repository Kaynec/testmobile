<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="comp-test">
    <SmallHeader />
    <div class="hero">
      <h1 class="right">
        <span> ۶۴۸ </span><br />
        رتبه دوئلی شما
      </h1>
      <div class="left">
        <p>دوئل های گذشته <i class="fas fa-angle-left"></i></p>
        <p>مشاهده کل رتبه ها <i class="fas fa-angle-left"></i></p>
      </div>
    </div>
    <div class="points">
      <div>
        <span> دوئل های انجام شده </span>
        <p>۲۳</p>
      </div>
      <div>
        <span> امتیازهای بدست آمده </span>
        <p>۳،۳۹۴</p>
      </div>
    </div>
    <div class="card-container">
      <div class="card">
        <div class="right">
          <p>۲۰ آبان | ساعت ۱۵:۳۰</p>
          <h5>دوئل مدیران مهندس عمران</h5>
          <span> تعداد نفرات: ۱۰۰ نفر </span>
        </div>
        <img src="../../../assets/img/duel-left.png" class="left" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';

export default defineComponent({
  components: {
    SmallHeader
  },
  setup() {
    //  Compare Dates Once Data Is available   //
    const currentState = ref('past');

    return { currentState };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.comp-test {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  height: 100%;
  position: relative;
  padding-top: 8vh;

  .hero {
    background: $redish-background;
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4.3rem 1rem;
    position: relative;

    border-bottom-left-radius: 3.5rem;
    border-bottom-right-radius: 3.5rem;

    .right {
      font-size: 12px;
      font-weight: bold;
      text-align: right;
      color: #fff;
      margin-right: 1rem;
      z-index: 5;

      span {
        font-size: 40px;
        font-weight: bold;
        letter-spacing: 1.43px;
        text-align: right;
        color: #fff;
      }
    }

    .left {
      text-align: left;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      z-index: 5;
    }
  }
  .points {
    width: 92%;
    margin: 0 auto;
    background-color: #171717;
    display: flex;
    z-index: 5;
    color: #fff;
    border-radius: 20px;
    padding: 20px;
    transform: translateY(-56%);
    font-size: 10px;
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
    p {
      color: #4ac367;
      font-size: 20px;
      margin-top: 10px;
    }

    div:last-child {
      border-right: solid 0.5px rgba(255, 255, 255, 0.356);
      padding-right: 2.5rem;
    }
  }

  .card-container {
    width: 90%;
    margin: 0 auto;
    transform: translateY(-30%);

    .card {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding: 5px 10px;
      align-items: center;
      background: #fff;
      border-radius: 10px;
      border: 2px solid #fff;
      box-shadow: none;

      .right {
        display: flex;
        flex-direction: column;

        p {
          font-size: 9.6px;
          letter-spacing: -0.88px;
          text-align: right;
          color: #d26c34;
        }

        h5 {
          font-size: 15px;
          font-weight: bold;
          text-align: right;
          color: #171717;
        }

        span {
          display: inline-flex;
          width: fit-content;
          font-size: 11px;
          letter-spacing: -1.2px;
          text-align: center;
          color: #fff;
          background: #f3925d;
          border-radius: 25px;
          padding: 4px 25px;
        }
      }
    }
  }
}
</style>
