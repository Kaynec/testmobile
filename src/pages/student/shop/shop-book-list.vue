<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Spinner -->
  <div
    class="loader-parent"
    v-else-if="JSON.stringify(data) === JSON.stringify({})"
  >
    <div class="loading1"></div>
  </div>
  <!--  -->
  <div class="shop-book-list" :style="styles" v-else>
    <nav class="nav">
      <span
        >لیست محصولات کتاب ({{ toPersianNumbers(`${data.data.length}`) }})</span
      >
      <img
        @click="goOnePageBack"
        src="../../../assets/img/arrow-left.png"
        alt="arrow left icon"
      />
    </nav>

    <div class="card-container">
      <div
        class="card"
        v-for="product in data.data"
        :key="product"
        @click="openSingleBookPage(product._id)"
      >
        <img
          src="../../../assets/img/shop/noun-cart-1844738.png"
          alt="book img"
        />
        <div class="text">
          <p class="name">{{ product.name || 'کارشناسی ارشد حقوق' }}</p>
          <p class="text-detail">
            {{ product.description || ' حقوق بین الملل خصوصی' }}
          </p>
          <p class="price">قیمت : {{ product.price || '۱۰۴،۰۰۰' }} تومان</p>
          <p class="special-price">
            تخفیف ۱۰٪ : {{ product.specialPrice || '۹۳،۶۰۰' }} تومان
          </p>
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
      <span @touchstart="moveToBasket">مشاهده سبد خرید</span>
    </div>
  </div>
</template>

<script lang="ts">
// Get All The Books The Relate To This Genre And List It In The Template
import { defineComponent, computed, ref } from 'vue';
import { StudentproductApi } from '@/api/services/student/student-product';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { store } from '@/store';
import router from '@/router';
import { StudentMutationTypes } from '@/store/modules/student/mutation-types';

export default defineComponent({
  props: {
    id: { type: String }
  },
  setup(props) {
    const data = ref({} as any),
      id = ref(props.id);

    if (props.id)
      store.commit(StudentMutationTypes.SET_CURRENT_ID_OF_SHOP, id.value);
    id.value = store.getters.getCurrentIdOfShop;
    StudentproductApi.getAllProducts(id.value).then(
      (res) => (data.value = res.data)
    );

    const openSingleBookPage = (id) =>
      router.push({ name: 'SingleBookInfo', params: { id } });
    const goOnePageBack = () => router.go(-1);

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
      data,
      openSingleBookPage,
      goOnePageBack,
      styles,
      moveToBasket,
      toPersianNumbers
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop-book-list {
  position: relative;
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
      justify-content: flex-start;
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
