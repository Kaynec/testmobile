<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Spinner -->
  <div class="loader-parent" v-else-if="!productCategories.length">
    <div class="loading1"></div>
  </div>
  <!--  -->
  <div class="shop" v-else :style="styles">
    <SmallHeader />
    <div class="grid">
      <img
        :ref="setItemRef"
        v-for="item in productCategories"
        :key="item._id"
        @click="sendToBookShopList(item._id, item.title)"
      />
    </div>
    <!--  -->
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
        <div class="Card" v-for="product in newsetData" :key="product">
          <img :src="product.img" alt="Card img" />
          <p>{{ product.name }}</p>
        </div>
      </template>

      <template v-if="currentState == 'newsetProduct'">
        <div class="Card" v-for="product in newsetData" :key="product">
          <img :src="product.img" alt="Card img" />
          <p>{{ product.name }}</p>
        </div>
      </template>
    </div>
    <!-- Footer -->
    <ShopFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onUpdated } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import { StudentproductApi } from '@/api/services/student/student-product';
import router from '@/router';
import ShopFooter from '@/modules/student-modules/footer/shop-footer.vue';
import displayProtectedImage from '@/utilities/get-image-from-url';
import { store } from '@/store';

export default defineComponent({
  components: { SmallHeader, ShopFooter },
  setup() {
    let productCategories = reactive([] as any);
    StudentproductApi.getAllCategories().then((res) => {
      if (!res.data.data.length) res.data.data[0] = 'No Product';
      res.data.data.forEach(async (category) => {
        productCategories.push(category);
      });
    });
    const currentState = ref('yourProduct');
    // Images For The Categories
    let itemRefs = [] as any;
    const setItemRef = (el) => {
      if (el) itemRefs.push(el);
    };

    onUpdated(() => {
      productCategories.forEach((data, idx) => {
        const imageUrl = `https://www.api.devnirone.ir/api/product-category/coverImage/${data._id}`;
        displayProtectedImage(imageUrl, itemRefs[idx]);
      });
    });

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
    const sendToBookShopList = (id: string, title: string) => {
      router.push({
        name: 'ShopBookList',
        params: { id, title }
      });
    };

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });
    const moveToBasket = () => {
      router.push({
        name: 'ShopBasket'
      });
    };

    return {
      currentState,
      productCategories,
      newsetData,
      sendToBookShopList,
      styles,
      moveToBasket,
      StudentproductApi,
      store,
      setItemRef
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop {
  position: relative;
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
}
</style>
