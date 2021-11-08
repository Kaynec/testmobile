<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="shop-book-list" v-else>
    <nav class="nav">
      <span>لیست محصولات کتاب (۱۸۴)</span>
      <img
        @click="goOnePageBack"
        src="../../../assets/img/arrow-left.png"
        alt="arrow left icon"
      />
    </nav>

    <div class="card">
      <img
        src="../../../assets/img/shop/bitmap-copy-19.png"
        alt="اضافه به سبد خرید "
      />
      <div class="text">
        <!-- <p class="name">کارشناسی ارشد حقوق</p> -->
        <p class="text-detail">حقوق بین الملل خصوصی</p>
        <p class="price">قیمت : ۱۰۴،۰۰۰ تومان</p>
        <p class="special-price">تخفیف ۱۰٪ : ۹۳،۶۰۰ تومان</p>
        <!-- Add This Item To List Of Sale -->
        <img
          class="img-add"
          src="../../../assets/img/shop/pluss.png"
          alt="book img"
        />
      </div>
    </div>

    <!-- Preview -->
    <div class="preview">
      <img
        class="purple-book"
        src="../../../assets/img/shop/bitmap.png"
        alt="purple book icon"
      />
      <span>مشاهده رایگان فصل اول کتاب</span>
      <img
        src="../../../assets/img/shop/right.svg"
        alt="back icon"
        class="back-img"
      />
    </div>
    <!-- Text Detail -->
    <div class="text">
      <div class="text-intro">
        <p>9 آزمون سراسری کنکور کارشناسی ارشد</p>
        <p>3 آزمون شبیه‌سازی کارشناسی ارشد</p>
        <p>مجموعه سوالات به همراه پاسخنامه تشریحی و تحلیل کنکور 3 سال اخیر</p>
      </div>

      <h5>8 آزمون شامل سه بخش اصلی است</h5>

      <p>
        در بخش اول، روند تغییرات و سرفصل‎های پراهمیت‌تر از نگاه طراحان کنکور
        تحلیل گردیده که با عنوان تحلیل کنکور کارشناسی ارشد در کتاب گنجانده شده
        است.
      </p>

      <p>
        در بخش دوم، مجموعه سوالات آزمون‎های ورودی دوره‎های کارشناسی ارشد در 9
        ساله اخیر ـ از سال 90 تا 98 ـ به همراه پاسخنامه تشریحی اساتید و مولفین
        محترم ماهان به این سوالات تدوین گردیده است.
      </p>

      <p>
        بخش سوم شامل 3 دوره آزمون‎های شبیه‎سازی شده ماهان می‎باشد که براساس
        تغییرات سال 98 کنکور تالیف شده است تا داوطلبین محترم نمونه سوالات بیشتری
        جهت آمادگی کنکور در اختیار داشته باشند.
      </p>
    </div>

    <!--  -->
    <div class="footer">
      <div>
        <!-- Fix THis Later With The Real Count of The User -->
        <img
          src="../../../assets/img/shop/noun-cart-1844738.png"
          alt="shop cart icon"
        />
        2 محصول
      </div>
      <span>مشاهده سبد خرید</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const goOnePageBack = () => router.go(-1);

    return { goOnePageBack };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop-book-list {
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #f4f4f4;
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    color: white;
    font-family: IRANSans;
    padding: 0.8rem;

    img {
      padding: 0;
      margin: 0;
    }
    span {
      font-size: 11px;
      font-weight: bold;
      padding: 0.4rem;
    }
  }

  .card {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    padding: 0.8rem 1rem;
    border: 1px solid #fff;
    border-radius: 10px;
    box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
    background-color: #fff;
    margin: 1rem auto 0.5rem auto;
    img {
      width: 99px;
      height: 143px;
      margin: 0 0 1px 10px;
      object-fit: contain;
    }

    p {
      font-family: IRANSans;
      margin: 10px 5px;
    }

    .img-add {
      width: 100%;
      height: 40px;
      object-fit: contain;
    }

    .text-detail {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 24px;
      color: #171717;
    }

    .price {
      font-size: 12px;
      text-align: right;
      color: #d21921;
      font-weight: bold;
      text-decoration: line-through;
    }

    .special-price {
      font-size: 12.5px;
      font-weight: bold;
      text-align: right;
      color: #ed1b24;
    }
  }
}

.preview {
  width: 95%;
  height: 57px;
  padding: 10px 10px 10px 13px;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  position: relative;
  align-items: center;

  .purple-book {
    width: 40px;
    height: 37px;
    margin: 0 0 0 5px;
    object-fit: contain;
  }

  span {
    font-family: IRANSans;
    font-size: 12px;
    margin-right: 0.25rem;
    font-weight: bold;
    color: #313131;
  }
  .back-img {
    position: absolute;
    left: 0;
    margin-left: 1em;
  }
}

.text {
  width: 100%;
  font-family: IRANSans;
  text-align: right;
  padding: 0.4rem 1rem;
  font-size: 0.825rem;
  margin-top: 1rem;

  .text-intro {
    p {
      margin: 5px 0;
    }
  }

  p {
    color: #646464;
    line-height: 1.43;
    margin: 1.75rem 0;

    &:last-child {
      margin-bottom: 3rem;
    }
  }

  h5 {
    font-size: 1rem;
    font-weight: bold;
    color: #171717;
  }
}

.footer {
  width: 100%;
  background-image: $redish-background;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: fixed;
  bottom: 0;

  div {
    font-family: IRANSans;
    font-size: 14px;
    text-align: right;
    color: #fff;
  }

  span {
    font-family: IRANSans;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border-radius: 18px;
    padding: 5px 10px;
    border: solid 1px #fff;
  }
}
</style>
