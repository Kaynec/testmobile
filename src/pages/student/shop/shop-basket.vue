<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="shop-basket" v-else :style="styles">
    <nav class="nav">
      <span> سبد خرید شما</span>
      <img
        @touchstart="goOnePageBack"
        src="../../../assets/img/arrow-left.png"
        alt="arrow left icon"
      />
    </nav>
    <!--  -->
    <div class="container">
      <!-- Change The Data -->
      <div class="text-flex">
        <span> شماره سفارش: {{ toPersianNumbers(784596) }} </span>
        <span> {{ faDate }} </span>
      </div>
      <!-- Card -->
      <div class="basket-card">
        <div class="right">
          <img
            src="../../../assets/img/shop/bitmap-copy-19.png"
            alt="  book img  "
          />
          <div class="label">
            <span>حقوق بین الملل خصوصی</span>
            <span class="red">حذف محصول</span>
          </div>
        </div>
        <div class="left">
          <p>۹۳،۶۰۰ تومان</p>
          <p class="red line-through">۹۳،۶۰۰ تومان</p>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="price">
        <div class="text">
          <p>هزینه سبد شما</p>
          <p>تخفیف</p>
        </div>
        <div class="number">
          <p>۴۵۶،۰۰۰ تومان</p>
          <p>۴۰،۰۰۰ تومان</p>
        </div>
      </div>
      <!--  -->
      <div class="paid-price">
        <span> مبلغ پرداختی شما </span>
        <span> ۴۱۶،۰۰۰ تومان </span>
      </div>
    </div>
    <!--  -->
    <div class="payment" ref="payment">
      <ChapterList
        :text="`پرداخت از امتیازات کسب شده : ${point}`"
        :chapterContainer="payment"
      />
      <ChapterList
        text="پرداخت از طریق درگاه بانکی"
        :chapterContainer="payment"
      />
    </div>
    <!-- Btn  -->
    <div class="continue" @click="moveToAddress">
      <i class="fas fa-arrow-right"></i>
      <span> ثبت و پرداخت نهایی </span>
    </div>
  </div>
</template>

<script language="ts">
import { defineComponent, computed, ref } from 'vue';
import ChapterList from '@/modules/student-modules/chapter-list.vue';
import router from '@/router';
import { StudentBasketApi } from '@/api/services/student/student-basket-service';
import { store } from '@/store';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';

export default defineComponent({
  components: {
    ChapterList
  },
  setup() {
    const date = new Date();

    const faDate = new Intl.DateTimeFormat('fa', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);

    const point = ref(store.getters.getCurrentStudent.point);

    const allPrice = ref(0);
    const allSpecialPrice = ref(0);

    if (store.getters.getBasketCount > 0) {
      StudentBasketApi.get().then((res) => console.log(res));
    }
    const payment = ref();

    const goOnePageBack = () => router.go(-1);

    const moveToAddress = () => router.push({ name: 'ShopAddress' });

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });
    return {
      goOnePageBack,
      styles,
      payment,
      moveToAddress,
      toPersianNumbers,
      point,
      faDate,
      store
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop-basket {
  position: relative;
  overflow-x: hidden;
  background: #f4f4f4;
  font-family: IRANSans;

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    color: white;
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
  .container {
    width: 95%;
    margin: 1rem auto;
    border-radius: 15px;
    background: #fff;
    padding: 0.7rem;

    .text-flex {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.8rem 0.25rem;
      border-bottom: solid 0.9px #eee;

      span {
        font-size: 12px;
        line-height: 1.67;
        color: #646464;
      }
    }

    .basket-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: solid 0.9px #eee;

      padding: 0.8rem 0.25rem;

      .right {
        display: flex;
        align-items: center;
        flex-basis: 65%;

        img {
          width: 20%;
        }
        span {
          font-size: 11.8px;
          color: #171717;
          display: inline-flex;
          margin: 0.6rem 0.2rem;
        }
      }
      .left {
        flex-basis: 35%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        margin-top: 0.8rem;

        p {
          font-size: 10.9px;
          font-weight: bold;
          color: #171717;
        }
      }
    }
    //
    .price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 0.9px #eee;
      padding: 0.8rem 0.25rem;

      p {
        margin: 0 0;
      }

      .text {
        font-size: 12px;
        line-height: 2.5;
        text-align: right;
        color: #313131;
      }

      .number {
        font-size: 12px;
        font-weight: bold;
        line-height: 2.5;
        color: #000;
        text-align: left;
      }
    }
    //
    .paid-price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      border-bottom: solid 0.9px #eee;
      padding: 0.8rem 0.25rem;
      color: #4ac367;
      font-size: 13px;
      font-weight: bold;
    }
  }
  //
  .payment {
    width: 95%;
    margin: 1rem auto;
    border-bottom: solid 0.9px #eee;
    //   The CapterList Component
    .chapter {
      width: 100%;
      margin-bottom: 0.5rem;
      box-shadow: none;
      border: 2px solid white;
    }
  }
  //
  .continue {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
    background-image: $redish-background;
    width: 95%;
    height: 3.5rem;
    margin: 0 auto;

    i {
      background-color: #d21921;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 10px;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      align-self: center;
      width: 50%;
    }
  }
}

.red {
  color: #ed1b24 !important;
}
.line-through {
  text-decoration: line-through;
}
.red.line-through {
  font-size: 9.1px !important;
}
</style>
