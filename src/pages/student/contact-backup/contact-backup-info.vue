<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="contact-backup-info" :style="styles" v-else>
    <!-- <img :src="getImgUrl(img)" alt="" /> -->
    <div class="nav">
      <span> اطلاعات بیشتر </span>
      <img
        src="../../../assets/img/arrow-left.png"
        alt="arrow left icon"
        @click="MoveOnePageBack"
      />
    </div>
    <img
      src="../../../assets/img/contact/PictureOfFirstGuy-1.png"
      alt="hero img"
      class="hero"
    />
    <div class="text">
      <h4>پشتیبان علیرضا خوش بیان</h4>
      <h5>مشاوره تحصیلی</h5>
      <p>
        مشاور چندین رتبه تک رقمی و دورقمی طراح و ایده پرداز سبک مطالعاتی
        ITDEPEND مشاور پروازی کنکور مدیر کلینیک مشاوره سابقه بیش از 15 سال
        مشاوره تخصصی کنکور" استاد تولایی فعالیت مشترک خود را با از سال 1395 با
        ارائه مقالات مشاوره ای و کلیپ های تصویری شروع کرده و در سال 1399 وظیفه
        مدیریت کلینیک مشاوره را همزمان با تدریس در مدارس تیزهوشان کشور بعهده
        گرفتند ؛ دفتر برنامه ریزی روبیک کنکور که از بروز ترین روشهای نوین برنامه
        ریزی دنیا مانند بولت ژورنال الهام گرفته ، یکی از بزرگترین و موفقترین
        تالیفات استاد بوده که توسط انتشارات بین المللی منتشر و در دسترس عموم
        قرار گرفته است
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import router from '@/router';

export default defineComponent({
  props: {
    name: { type: String },
    img: { type: String }
  },
  setup() {
    const getImgUrl = (src: string) => {
      return require('../../../assets/img/contact/' + src + '.png');
    };

    const MoveOnePageBack = () => router.go(-1);

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    return { getImgUrl, MoveOnePageBack, styles };
  }
});
</script>

<style lang="scss" scoped>
.contact-backup-info {
  position: relative;
  background-color: #f4f4f4;
  overflow-x: hidden;

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
      margin: 7px 0 7px 242px;
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
    }
  }

  .hero {
    width: 100%;
    max-height: 35vh;
  }
  .text {
    width: 95%;
    margin: 20px auto;
    padding: 1.5rem;
    border-radius: 16.7px;
    box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
    background-color: #fff;
    font-family: IRANSans;

    h4 {
      font-size: 15.5px;
      font-weight: bold;
      text-align: right;
      color: #171717;
    }

    h5 {
      font-size: 13px;
      line-height: 1.43;
      text-align: right;
      color: #646464;
      margin: 25px 0 30px 0;
    }
    p {
      margin: 8.5px 0 0;
      font-size: 13px;
      line-height: 1.64;
      text-align: right;
      color: #646464;
    }
  }
}
</style>
