<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="shop-book-list" v-else>
    <nav class="nav">
      <span>لیست محصولات کتاب (۱۸۴)</span>
      <img src="../../../assets/img/arrow-left.png" alt="arrow left icon" />
    </nav>

    <div class="card-container">
      <div class="card" v-for="product in data" :key="product">
        <img :src="product.img" alt="book img" />
        <div class="text">
          <p class="name">کارشناسی ارشد حقوق</p>
          <p class="text-detail">حقوق بین الملل خصوصی</p>
          <p class="price">قیمت : ۱۰۴،۰۰۰ تومان</p>
          <p class="special-price">تخفیف ۱۰٪ : ۹۳،۶۰۰ تومان</p>
        </div>
      </div>
    </div>

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
// Get All The Books The Relate To This Genre And List It In The Template
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const data = [
      {
        name: 'حقوق',
        img: 'https://www.mahan.ac.ir/images/ProductCategory/sampleProductCat.gif'
      },
      {
        name: 'حقوق',
        img: 'https://www.mahan.ac.ir/images/ProductCategory/sampleProductCat.gif'
      },
      {
        name: 'حقوق',
        img: 'https://www.mahan.ac.ir/images/ProductCategory/sampleProductCat.gif'
      },
      {
        name: 'حقوق',
        img: 'https://www.mahan.ac.ir/images/ProductCategory/sampleProductCat.gif'
      },
      {
        name: 'حقوق',
        img: 'https://www.mahan.ac.ir/images/ProductCategory/sampleProductCat.gif'
      },
      {
        name: 'حقوق',
        img: 'https://www.mahan.ac.ir/images/ProductCategory/sampleProductCat.gif'
      }
    ];

    return { data };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop-book-list {
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
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
  .card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;

    .card {
      display: flex;
      flex-direction: row;
      justify-content: start;
      width: 90%;
      padding: 0.3rem;
      border: 1px solid #fff;
      border-radius: 10px;
      box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
      background-color: #fff;

      &:last-child {
        margin-bottom: 4rem;
      }

      img {
        width: 25%;
      }

      p {
        margin: 10px 10px;
      }

      .name {
        font-family: IRANSans;
        font-size: 10px;
        text-align: right;
        color: #646464;
      }
      .text-detail {
        font-family: IRANSans;
        font-size: 14px;
        font-weight: bold;
        text-align: right;
        color: #171717;
      }

      .price {
        font-family: IRANSans;
        font-size: 12px;
        text-align: right;
        color: #d21921;
        font-weight: bold;
        text-decoration: line-through;
      }

      .special-price {
        font-family: IRANSans;
        font-size: 14px;
        font-weight: bold;
        text-align: right;
        color: #ed1b24;
      }
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
}
</style>
