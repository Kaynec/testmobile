<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="shop-basket" v-else>
    <MinimalHeader title="سبد خرید شما" />

    <form @submit.prevent="onSubmit">
      <h3>آدرس خود را وارد کنید</h3>
      <label class="floating-label">
        <textarea
          type="text"
          placeholder=" کد ملی"
          v-model="model.address"
          @blur="v$.address.$touch()"
          style="appearance: none; min-height: 10rem"
          @focus="changeTextareaPlaceHolder('آدرس')"
          @focusout="changeTextareaPlaceHolder('آدرس خود را کامل وارد کنید  ')"
        ></textarea>
        <span> {{ textareaPlaceHolder }}</span>
      </label>

      <p
        v-for="error in v$.address.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>
      <!--  -->
      <label class="floating-label">
        <input
          type="text"
          placeholder=" تلفن "
          v-model="model.phone"
          @blur="v$.phone.$touch()"
          style="appearance: none"
        />
        <span> تلفن </span>
      </label>

      <p
        v-for="error in v$.phone.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>
      <!--  -->
    </form>
    <!-- Btn  -->
    <div class="continue">
      <i class="fas fa-arrow-right"></i>
      <span> ثبت و پرداخت نهایی </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import router from '@/router';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';

export default defineComponent({
  components: { MinimalHeader },
  setup() {
    const model = reactive({
      address: '',
      phone: ''
    });
    const textareaPlaceHolder = ref('آدرس کامل خود را بنویسید');
    const changeTextareaPlaceHolder = (text: string) =>
      (textareaPlaceHolder.value = text);

    const mustBeValidPhone = (value: string) => value.length === 11;
    const mustBeNumber = (value: string) => {
      let allAreNumbers = true;
      for (let i = 0; i < value.length; i++) {
        if (isNaN(+value[i])) allAreNumbers = false;
      }
      return allAreNumbers;
    };

    const rules = computed(() => ({
      address: {
        required: helpers.withMessage('لطفا آدرس خود را وارد کنید', required)
      },
      phone: {
        required: helpers.withMessage(
          'لطفا شماره همراه خود را وارد کنید',
          required
        ),
        mustBeNumber: helpers.withMessage(
          'شماره همراه نباید دارای حروف باشد',
          mustBeNumber
        ),
        mustBeValidPhone: helpers.withMessage(
          'شماره همراه باید 11 رقم باشد',
          mustBeValidPhone
        )
      }
    }));

    const v$ = useVuelidate(rules, model);
    const goOnePageBack = () => router.go(-1);

    return {
      goOnePageBack,
      model,
      v$,
      textareaPlaceHolder,
      changeTextareaPlaceHolder
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
  width: 100%;
  height: 100%;
  padding-top: 8vh;
  form {
    width: 95%;
    margin: 1rem auto;
    border-radius: 15px;
    background: #fff;
    padding: 1.3rem 1.5rem;

    h3 {
      font-size: 16px;
      font-weight: bold;
      letter-spacing: -1.76px;
      text-align: center;
      color: #171717;
      margin-block: 2.25rem;
    }
  }
  .continue {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
    background-image: $redish-background;
    width: 95%;
    height: 3.5rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 1.5rem auto;

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
</style>
