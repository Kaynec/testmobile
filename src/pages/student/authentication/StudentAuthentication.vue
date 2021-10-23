<template>
  <div class="desktop" v-if="!isMobile()"></div>

  <div class="Forget-the-password" v-else>
    <img src="../../../assets/img/logo-mahan.png" class="logo-mahan" />

    <!-- Main Part -->
    <form @submit.prevent="sendToHome()" class="Rectangle">
      <span class="Rectangle-header"> ورود به حساب کاربری </span>

      <span class="Rectangle-label">
        پیامکی حاوی یک کد 4 رقمی برای شما ارسال شد
      </span>
      <br />
      <div class="phone-display" @click="sendToPasswordRecover()">
        <span> {{ phone }} </span>
        <i class="fas fa-angle-left"></i>
      </div>
      <input
        type="text"
        class="inputs"
        v-model="model.code"
        placeholder="_ _ _ _"
        @blur="v$.code.$touch()"
      />

      <span
        v-for="(error, index) in v$.code.$errors"
        :key="index"
        class="text-info"
      >
        {{ error.$message }}
      </span>

      <button class="btn-confirm">
        <span> تایید </span>
      </button>

      <span @click="cancel()" class="cancel"> برگشت به صفحه ورود </span>
    </form>
    <!--  -->
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { computed, defineComponent, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

export default defineComponent({
  props: {
    phone: { type: String }
  },
  setup(props) {
    // If Entered Without Authentication
    if (!props.phone) router.push({ name: 'StudentLogin' });
    //
    const model = reactive({
      code: ''
    });

    const sendToHome = async () => {
      console.log('SOMETHING');
    };
    const sendToPasswordRecover = () =>
      router.push({
        name: 'StudentPasswordRecover',
        params: { phone: props.phone }
      });
    const cancel = () => {
      router.push({ name: 'StudentLogin' });
    };

    const rules = computed(() => ({
      code: {
        required: helpers.withMessage(
          'لطفا کد ارسال شده را وارد کنید',
          required
        )
      }
    }));
    const v$ = useVuelidate(rules, model);
    return { cancel, model, v$, sendToHome, sendToPasswordRecover };
  }
});
</script>
<style lang="scss" scoped>
body {
  overflow-y: scroll;
  overflow-x: hidden;
}
#app {
  overflow-y: scroll;
  overflow-x: hidden;
}

.Forget-the-password {
  width: 100vw;
  height: 100vh;
  padding: 37px 24.6px 156px 24px;
  background-color: #f6f8fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.Rectangle {
  width: 311px;
  height: 315px;
  padding: 26px 20px 14px 21px;
  border-radius: 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.97);

  .btn-confirm {
    width: 270px;
    height: 52px;
    margin: 20px 0 18px;
    padding: 0 1px 1px 0;

    span {
      width: 85px;
      height: 24px;
      font-family: IRANSans;
      font-size: 15.3px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #fff;
    }
  }

  .Rectangle-header {
    width: 175px;
    height: 28px;
    margin: 0 47px 23px 48px;
    font-family: IRANSans;
    font-size: 19px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -2.09px;
    text-align: center;
    color: #171717;
  }

  .Rectangle-label {
    width: 253px;
    height: 50px;
    opacity: 0.8;
    font-family: IRANSans;
    font-size: 12px;
    text-align: center;
    color: rgba(28, 25, 57, 0.8);
  }

  .inputs {
    width: 270px;
    height: 50px;
    margin: 44px 0 20px;
    border-radius: 10px;
    border: solid 1px #c8c8c8;
    background-color: #fff;
    text-align: center;
    font-family: IRANSans;
    font-size: 17px;
    text-align: center;
    color: #888;
  }

  .cancel {
    width: 109px;
    height: 21px;
    margin: 18px 80px 0 81px;
    font-family: IRANSans;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -2px;
    text-align: center;
    color: #ed1b24;
  }
}
img.logo-mahan {
  margin: 60px;
  width: 190px;
  height: 90px;
  object-fit: contain;
}

.btn-confirm {
  width: 269px;
  height: 51px;
  padding: 13px 91px 14px 93px;
  border-radius: 15px;
  background-color: #d21921;
  border: none;

  span {
    width: 85px;
    height: 24px;
    font-family: IRANSans;
    font-size: 15.3px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
}
.phone-display {
  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  span {
    font-size: 15px;
    color: #009205;
  }
  i {
    font-size: 12.5px;
    color: #009205;
  }
}
</style>
