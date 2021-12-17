<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Spinner -->
  <div
    class="loader-parent"
    v-else-if="JSON.stringify(model) === JSON.stringify({})"
  >
    <div class="loading1"></div>
  </div>

  <!--  -->
  <div class="shop-book-list" v-else>
    <MinimalHeader :title="`${model.title}`" />

    <div class="card">
      <img ref="img" />
      <div class="text">
        <!-- <p class="name">کارشناسی ارشد حقوق</p> -->
        <p class="text-detail">{{ model.title }}</p>
        <p :class="`${model.specialPrice ? 'price line-through' : 'price'}`">
          قیمت : {{ toPersianNumbers(model.price) }} تومان
        </p>
        <p class="special-price" v-if="model.specialPrice">
          تخفیف %{{
            toPersianNumbers(
              Math.round(
                ((model.price - model.specialPrice) / model.price) * 100
              )
            )
          }}
          : {{ toPersianNumbers(model.specialPrice) }} تومان
        </p>
        <!-- Add This Item To List Of Sale -->
        <div class="img-add-div" v-if="AmountToShowInTemplate > 0">
          <span @touchstart="addToBasket(1)">➕ </span>
          <strong style="color: #fff">
            {{ toPersianNumbers(`${AmountToShowInTemplate}`) }}
          </strong>
          <span @touchstart="addToBasket(-1)"> ➖ </span>
        </div>
        <img
          v-else
          @touchstart="addToBasket(1)"
          class="img-add"
          src="../../../assets/img/shop/pluss.png"
          alt="plus icon "
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
        بخش سوم شامل 3 دوره آزمون‎های شبیه‎سازی شده ماهان می‎باشد که براساس
        تغییرات سال 98 کنکور تالیف شده است تا داوطلبین محترم نمونه سوالات بیشتری
        جهت آمادگی کنکور در اختیار داشته باشند.
      </p>
    </div>

    <ShopFooter @iHaveBeenTouched="iHaveBeenTouched" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import router from '@/router';
import ShopFooter from '@/modules/student-modules/footer/shop-footer.vue';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { store } from '@/store';
import { StudentBasketApi } from '@/api/services/student/student-basket-service';
import { StudentproductApi } from '@/api/services/student/student-product';
import { StudentMutationTypes } from '@/store/modules/student/mutation-types';
import displayProtectedImage from '@/utilities/get-image-from-url';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';

export default defineComponent({
  components: { ShopFooter, MinimalHeader },
  props: {
    title: { type: String },
    item: { type: String, default: '{}' },
    length: { type: String }
  },
  setup(props) {
    const model = ref(JSON.parse(props.item as any));
    if (props.item != '{}')
      store.commit(StudentMutationTypes.SET_CURRENT_SHOP_INFO, model.value);
    model.value = store.getters.getCurrentShopInfo;
    const shopBasket = ref();
    const img = ref();
    // The Previes Amount If Any
    const AmountToShowInTemplate = ref(0);
    // The Object That We Add To Basket
    const objectToAddToBasket = ref({
      item: { product: { _id: model.value._id }, quantity: 0 }
    });

    (async () => {
      const res = await StudentBasketApi.get();
      shopBasket.value = res.data.data;

      const imageUrl = `https://www.api.devnirone.ir/api/product/coverImage/${model.value._id}`;
      await displayProtectedImage(imageUrl, img.value);

      const itemExistsInBasket = shopBasket.value.items.find(
        (el: any) => el.product._id === model.value._id
      );

      itemExistsInBasket &&
        (AmountToShowInTemplate.value = itemExistsInBasket.quantity);
    })();

    const iHaveBeenTouched = async () =>
      await StudentBasketApi.add(objectToAddToBasket.value);

    const goOnePageBack = async () => {
      await StudentBasketApi.add(objectToAddToBasket.value);
      router.go(-1);
    };

    const addToBasket = (quantity: number) => {
      objectToAddToBasket.value.item.quantity += quantity;
      AmountToShowInTemplate.value += quantity;
      store.commit(
        StudentMutationTypes.SET_BASKET_COUNT,
        store.getters.getBasketCount + quantity
      );
    };

    return {
      goOnePageBack,
      addToBasket,
      toPersianNumbers,
      StudentproductApi,
      model,
      displayProtectedImage,
      store,
      img,
      iHaveBeenTouched,
      shopBasket,
      objectToAddToBasket,
      AmountToShowInTemplate
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop-book-list {
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #f4f4f4;
  width: 100%;
  height: 100%;
  padding-top: 8vh;
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
    .img-add-div {
      background: #d21921;
      border-radius: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      span {
        color: #171717;
        background-color: #fff;
        padding: 7px;
        border-radius: 15px;
        margin-inline: 1.5rem;
      }
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
    }
    .line-through {
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
</style>
