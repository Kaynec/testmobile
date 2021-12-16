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
        >لیست محصولات {{ title }} ({{
          toPersianNumbers(`${data.data.length}`)
        }})</span
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
        @click="
          openSingleBookPage(JSON.stringify(product), title, data.data.length)
        "
      >
        <!-- Image  -->

        <div class="image-container">
          <div v-if="!product.img" class="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img
            :src="product.img"
            @click="sendToBookShopList(item._id, item.title)"
            v-else
          />
        </div>
        <!--  -->
        <div class="text">
          <!-- <p class="name">{{ product.name || 'کارشناسی ارشد حقوق' }}</p> -->
          <p class="text-detail">
            {{ product.title }}
          </p>
          <p class="price line-t">
            قیمت : {{ toPersianNumbers(product.price) }} تومان
          </p>
          <p class="special-price line-t" v-if="product.specialPrice">
            تخفیف %{{
              toPersianNumbers(
                Math.round(
                  ((product.price - product.specialPrice) / product.price) * 100
                )
              )
            }}
            : {{ toPersianNumbers(product.specialPrice) }} تومان
            <span></span>
          </p>
        </div>
      </div>
    </div>

    <ShopFooter />
  </div>
</template>

<script lang="ts">
// Get All The Books The Relate To This Genre And List It In The Template
import {
  defineComponent,
  computed,
  ref,
  onBeforeUpdate,
  onUpdated,
  onMounted
} from 'vue';
import { StudentproductApi } from '@/api/services/student/student-product';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { store } from '@/store';
import router from '@/router';
import { StudentMutationTypes } from '@/store/modules/student/mutation-types';
import ShopFooter from '@/modules/student-modules/footer/shop-footer.vue';
import { returnProtectedImage } from '@/utilities/get-image-from-url';

export default defineComponent({
  props: {
    id: { type: String },
    title: { type: String }
  },
  components: { ShopFooter },
  setup(props) {
    const data = ref({} as any),
      id = ref(props.id);
    if (props.id)
      store.commit(StudentMutationTypes.SET_CURRENT_ID_OF_SHOP, id.value);
    id.value = store.getters.getCurrentIdOfShop;
    StudentproductApi.getAllProducts(id.value).then((res) => {
      data.value = res.data;
    });

    const openSingleBookPage = (item, title, length) =>
      router.push({ name: 'SingleBookInfo', params: { item, title, length } });
    const goOnePageBack = () => router.go(-1);

    let itemRefs = [] as any;
    const setItemRef = (el) => {
      if (el) {
        itemRefs.push(el);
      }
    };
    onBeforeUpdate(() => {
      itemRefs = [];
    });
    onUpdated(() => {
      data.value.data.forEach((data) => {
        const imageUrl = `https://www.api.devnirone.ir/api/product/coverImage/${data._id}`;
        returnProtectedImage(imageUrl).then((res) => {
          data.img = res;
        });
      });
    });

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    return {
      data,
      openSingleBookPage,
      goOnePageBack,
      styles,
      toPersianNumbers,
      StudentproductApi,
      setItemRef
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
      align-items: center;

      width: 90%;
      padding: 0.3rem;
      min-height: 8rem;
      border: 1px solid #fff;
      border-radius: 10px;
      box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
      background-color: #fff;

      &:last-child {
        margin-bottom: 4rem;
      }

      .image-container {
        min-width: 30%;
        max-width: 40%;
        display: flex;
        align-items: center;
        justify-items: center;

        img {
          width: 100%;
          object-fit: contain;
        }
      }

      p {
        margin: 10px 10px;
      }

      .name {
        font-size: 10px;
        text-align: right;
        color: #646464;
      }
      .text-detail {
        font-size: 14px;
        font-weight: bold;
        text-align: right;
        color: #171717;
      }

      .price {
        font-size: 12px;
        text-align: right;
        color: #d21921;
        font-weight: bold;
      }
      .special-price {
        font-weight: bold;
      }
    }

    .line-t {
      position: relative;
      display: inline-block;
      font-size: 14px;
      color: #ed1b24;
      span {
        position: absolute;
        width: 100%;
        border-top: 2px solid red;
        left: 0;
        top: 50%;
        opacity: 0.2;
      }
    }
  }
}
</style>
