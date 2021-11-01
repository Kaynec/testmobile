<template>
  <div class="desktop" v-if="!isMobile()"></div>

  <div class="Forget-the-password" v-else>
    <img src="../../../assets/img/logo-mahan@2x.png" class="logo-mahan" />
    <!-- Main Part -->
    <form @submit.prevent="sendToStudentAuthentication()" class="Rectangle">
      <span class="Rectangle-header"> بازیابی رمز عبور </span>

      <span class="Rectangle-label"> لطفا شماره همراه خود را وارد کنید </span>

      <label class="floating-label">
        <input
          v-model="model.phone"
          placeholder="*********۰۹"
          @blur="v$.phone.$touch()"
          type="text"
          id="name"
        />
        <span> شماره تلفن</span>
      </label>
      <span
        v-for="(error, index) in v$.phone.$errors"
        :key="index"
        class="text-danger text-bold"
        style="font-family: IRANSans"
      >
        {{ error.$message }}
      </span>

      <button class="button-linear">
        <span> ارسال رمز عبور </span>
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
import { minLength, maxLength, required, helpers } from '@vuelidate/validators';

export default defineComponent({
  setup() {
    const model = reactive({
      phone: ''
    });

    const sendToStudentAuthentication = async () => {
      v$.value.$touch();

      if (!v$.value.$invalid) {
        router.push({
          name: 'StudentAuthentication',
          params: { phone: model.phone }
        });
      }
    };
    const cancel = () => {
      router.push({ name: 'StudentLogin' });
    };

    const rules = computed(() => ({
      phone: {
        required: helpers.withMessage(
          'لطفا کد ارسال شده را وارد کنید',
          required
        ),
        minLength: helpers.withMessage(
          'شماره همراه باید 11 رقم باشد',
          minLength(11)
        ),
        maxLength: helpers.withMessage(
          'شماره همراه باید 11 رقم باشد',
          maxLength(11)
        )
      }
    }));
    const v$ = useVuelidate(rules, model);
    return { cancel, model, v$, sendToStudentAuthentication };
  }
});
</script>
<style lang="scss" scoped>
.Forget-the-password {
  width: 100vw;
  height: 100vh;
  padding: 37px 24.6px 156px 24px;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Rectangle {
  width: 311px;
  height: 315px;
  padding: 26px 20px 14px 21px;
  border-radius: 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.97);
  margin: 2rem;
  text-align: center;
}
.Rectangle-header {
  width: 175px;
  height: 28px;
  margin: 0 47px 23px 48px;
  font-family: IRANSans;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #171717;
}

.Rectangle-label {
  margin: 5px auto;
  display: block;
  font-family: IRANSans;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: center;
  color: #000;
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

img.logo-mahan {
  margin: 60px;
  width: 190px;
  height: 90px;
  object-fit: contain;
}
</style>
