<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="shop" v-else>
    <SmallHeader />
    <div class="grid">
      <img src="../../../assets/img/shop/book.png" alt="book img" />
      <img
        src="../../../assets/img/shop/online-classes.png"
        alt="online classes icon"
      />
      <img
        src="../../../assets/img/shop/eduaction-package.png"
        alt="education package icon"
      />
      <img src="../../../assets/img/shop/azmoons.png" alt="azmoons icon " />
    </div>
    <div class="btns">
      <button
        @click="() => (currentState = 'yourProduct')"
        :class="{ active: currentState == 'yourProduct' }"
      >
        محصولات شما
      </button>
      <button
        @click="() => (currentState = 'newsetProduct')"
        :class="{ active: currentState == 'newsetProduct' }"
      >
        تازه ترین محصولات
      </button>
    </div>
    <!--  -->
    <div class="Cards">
      <template v-if="currentState == 'yourProduct'">
        <!-- Empty Right Now But We Will Fill It Later With Database Data -->
        <div
          class="Card"
          @click="sendToBookShopList"
          v-for="product in yourData"
          :key="product"
        >
          <img :src="product.img" alt="Card img" />
          <p>{{ product.name }}</p>
        </div>
      </template>

      <template v-if="currentState == 'newsetProduct'">
        <div
          class="Card"
          @click="sendToBookShopList"
          v-for="product in newsetData"
          :key="product"
        >
          <img :src="product.img" alt="Card img" />
          <p>{{ product.name }}</p>
        </div>
      </template>
    </div>

    <!-- Footer -->
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

<script>
import { defineComponent, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import router from '@/router';
export default defineComponent({
  components: {
    SmallHeader
  },
  setup() {
    const currentState = ref('yourProduct');
    const yourData = [
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

    const newsetData = [
      {
        name: 'ادبیات',
        img: '  https://arga-mag.com/file/img/2020/08/Book-profile-picture-38.jpg'
      },
      {
        name: 'ادبیات',
        img: '  https://arga-mag.com/file/img/2020/08/Book-profile-picture-38.jpg'
      },
      {
        name: 'ادبیات',
        img: '  https://arga-mag.com/file/img/2020/08/Book-profile-picture-38.jpg'
      },
      {
        name: 'ادبیات',
        img: '  https://arga-mag.com/file/img/2020/08/Book-profile-picture-38.jpg'
      },
      {
        name: 'ادبیات',
        img: '  https://arga-mag.com/file/img/2020/08/Book-profile-picture-38.jpg'
      },
      {
        name: 'ادبیات',
        img: '  https://arga-mag.com/file/img/2020/08/Book-profile-picture-38.jpg'
      }
    ];
    const sendToBookShopList = () => {
      router.push({
        name: 'ShopBookList',
        params: {}
      });
    };

    return { currentState, yourData, newsetData, sendToBookShopList };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop {
  position: relative;
  min-height: 110%;
  background-color: #f4f4f4;
  overflow-x: hidden;

  .grid {
    display: grid;
    position: relative;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 0.25rem;
    padding: 0.5rem;
    justify-items: center;
    align-items: center;
    margin-bottom: 0.5rem;
    img {
      object-fit: contain;
      width: 88%;
      max-width: 100%;
    }
  }

  .btns {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      font-family: IRANSans;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 10px;
      outline: none;
      border: none;
      width: 45%;
      box-shadow: 0 0 23px 0 rgba(0, 0, 0, 0.13);
      background: white;
      color: #171717;

      &:nth-child(2) {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
      &:nth-child(1) {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
  button.active {
    background-image: $redish-background;
    color: #fff;
  }
  //
  .Cards {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
    margin: 0;
    padding: 0;
    min-height: 35vh;
    margin-top: 0.7rem;
    justify-items: center;
    align-items: center;

    .Card {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 125px;
      max-height: 128px;
      padding: 3px 4px;
      border-radius: 14.7px;
      box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.08);
      background-color: #fff;

      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        margin-bottom: 5rem;
      }
      img {
        width: 70%;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 2px 18px 0;
        font-family: IRANSans;
        font-size: 12px;
        text-align: center;
        color: #171717;
      }
    }
  }
  //
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
