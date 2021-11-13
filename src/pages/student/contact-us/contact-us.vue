<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="contact-us">
    <SmallHeader />
    <img src="@/assets/img/contact-us.png" alt="contact us img" class="hero" />
    <div class="contact-us-card">
      <div class="first-section">
        <h6>تلفن های تماس</h6>
        <p>
          شما می‌توانید برای دریافت اطلاعات بیشتر با ما تماس بگیرید. کارشناسان
          ما با شما همراه خواهند بود تا مراحل لازم را به راحتی هر چه طی کنید...
        </p>
        <div class="flex">
          <h6>کارشناسی ارشد و دکتری</h6>
          <h6>۰۲۱-۸۸۴۸۲۱۲۷ ۰۲۱-۸۵۰۶</h6>
        </div>
        <div class="flex">
          <h6>دفتر انقلاب:</h6>
          <h6>۰۲۱-۶۶۴۷۷۴۲۴</h6>
        </div>
      </div>
      <div class="second-section">
        <h6>آدرس های دفتر</h6>
        <p>
          تهران، تقاطع ولیعصر - مطهری، پشت ایستگاه بی آر تی مطهری ، پلاک 2050
          دفتر انقلاب :ضلع جنوب شرقی میدان انقلاب ، جنب قنادی سینا ، پلاک ۵ طبقه
          دوم واحد ۵ موسسه ماهان
        </p>
        <h6>ایمیل و سایت ماهان</h6>
        <a href="info@mahan.ac.ir" target="_blank"> info@mahan.ac.ir </a>
        <a href="www.mahan.ac.ir" target="_blank"> www.mahan.ac.ir </a>
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
    console.log('salam');
  }
});
</script>

<style lang="scss" scoped>
.contact-us {
  width: 100%;
  // min-height: 110%;
  height: calc(100%);
  background-color: #f4f4f4;

  .contact-us-card {
    margin: 15px 15px 0;
    box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
    h6 {
      font-weight: bold;
      font-family: IRANSans;
      font-size: 11px;
      color: #000;
    }
    p {
      font-size: 10px;
      text-align: right;
      color: #4a4f54;
    }

    .first-section {
      display: block;
      width: 100%;
      font-family: IRANSans;
      color: #000;
      background-color: #fff;
      margin-bottom: 0.3rem;
      padding: 10px 15px 49px 15px;
      border-radius: 16.7px;

      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .second-section {
      background-color: #fff;
      padding: 10px 15px 49px 15px;
      border-radius: 16.7px;

      h6 {
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1rem;
      }

      a {
        text-decoration: none;
        margin: 8px 0 9px 112px;
        font-family: Roboto;
        font-size: 11.4px;
        letter-spacing: 0.66px;
        text-align: right;
        color: #007bff;
      }
    }
  }

  .hero {
    width: 100%;
    max-height: 35vh;
    object-fit: contain;
  }
}
</style>
