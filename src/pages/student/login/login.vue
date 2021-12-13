<template>
  <div class="desktop" v-if="!isMobile()">
    <div class="Login">
      <img src="../../../assets/img/logo-mahan.png" class="logo-mahan" />
      <div class="Rectangle">
        <span class="title"> ورود به حساب کاربری </span> <br />

        <input
          v-model="email"
          type="email"
          placeholder="نام کاربری"
          class="inputs email"
        />
        <br />

        <input
          v-model="password"
          type="password"
          placeholder="رمز عبور"
          class="inputs password"
        />
        <br />
        <button class="login-btn" @click="login"><span> ورود </span></button
        ><br />
        <span class="reset-password"> بازیابی رمز عبور </span><br />
        <span class="register"> ثبت نام در ماهان </span><br />
      </div>
    </div>
  </div>

  <div class="mobile" v-else>
    <div class="imgs">
      <img src="../../../assets/img/bitmap.png" class="bitmap" />
      <img src="../../../assets/img/logo-mahan.png" />
      <img src="../../../assets/img/mahan.png" />
    </div>
    <div class="Login">
      <div>
        <label class="floating-label">
          <input
            placeholder="نام کاربری"
            type="text"
            v-model="model.username"
            @blur="v$.username.$touch()"
          />
          <span>نام کاربری </span>
        </label>
        <p
          v-for="error in v$.username.$errors"
          class="text-danger text-bold m-2"
          :key="error.$uid"
          style="font-family: IRANSans; font-size: 12px"
        >
          {{ error.$message }}
        </p>

        <label class="floating-label">
          <input
            placeholder="رمز عبور"
            type="password"
            v-model="model.password"
            @blur="v$.password.$touch()"
          />
          <span> رمز عبور</span>
        </label>
        <p
          v-for="error in v$.password.$errors"
          class="text-danger text-bold m-2"
          :key="error.$uid"
          style="font-family: IRANSans; font-size: 12px"
        >
          {{ error.$message }}
        </p>

        <button @click="login" class="button-linear"><span> ورود </span></button
        ><br />
        <span class="register" @click="moveToSignUp"> ثبت نام در ماهان </span
        ><br />
        <span class="reset-password" @click="moveToPasswordRecover()">
          بازیابی رمز عبور
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { store } from '@/store';
import { StudentActionTypes } from '@/store/modules/student/action-types';
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { minLength, helpers, required } from '@vuelidate/validators';

export default defineComponent({
  setup() {
    const windowHeight = ref(window.innerHeight);
    const model = reactive({
      username: '',
      password: ''
    } as any);

    const login = async () => {
      v$.value.$touch();

      if (!v$.value.$invalid) {
        const authCheck = await store.dispatch(
          StudentActionTypes.AUTH_REQUEST_STUDENT,
          model
        );

        if (authCheck) {
          await store.dispatch(StudentActionTypes.CURRENT_STUDENT);
          router.push({ name: 'Home' });
        }
      }
    };

    const rules = computed(() => ({
      username: {
        required: helpers.withMessage(
          'لطفا نام کاربری خود را وارد کنید',
          required
        ),
        minLength: helpers.withMessage(
          'نام کاربری باید حداقل 6 رقم باشد',
          minLength(8)
        )
      },
      password: {
        required: helpers.withMessage('لطفا رمز خود را وارد کنید', required),
        minLength: helpers.withMessage(
          'رمز عبور باید حداقل 6 رقم باشد',
          minLength(8)
        )
      }
    }));

    const v$ = useVuelidate(rules, model);
    const moveToSignUp = () => {
      router.push({ name: 'StudentSignup' });
    };
    const moveToPasswordRecover = () => {
      router.push({ name: 'StudentPasswordRecover' });
    };

    const onResize = (): void => {
      (this as any).windowHeight = window.innerHeight;
    };

    const getMainStyle = (): { height: string } => {
      return { height: `${(this as any).windowHeight - 1}px` };
    };

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    return {
      windowHeight,
      model,
      v$,
      moveToPasswordRecover,
      moveToSignUp,
      onResize,
      getMainStyle,
      login
    };
  }
});
</script>
<style lang="scss" scoped>
.desktop {
  height: 100%;
  .Login {
    width: 100%;
    height: 100%;

    padding: 37px 24.6px 36px 24px;
    background-color: #f6f8fa;
    text-align: center;
    img.logo-mahan {
      margin-top: 38px;
      width: 190px;
      height: 90px;
      object-fit: contain;
    }
    .register {
      width: 99px;
      height: 24px;
      margin-top: 87px;
      margin-bottom: 36px;
      font-family: IRANSans;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -2px;
      text-align: center;
      color: #171717;
    }

    .title {
      width: 175px;
      height: 28px;
      margin-top: 25px;
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
    .password {
      margin-top: 10px;
    }
    .username {
      margin-top: 39px;
    }
    .inputs {
      width: 269px;
      height: 51px;
      border-radius: 15px;
      background: #f6f8fa;
      border: 2px solid #ddd;
    }
    .login-btn {
      width: 269px;
      height: 51px;
      border-radius: 15px;
      background: rgb(241, 24, 24);
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
    .reset-password {
      margin-top: 16px;
      font-family: 'IRANSans';
      font-size: 13px;
      text-align: center;
      color: #ed1b24;
    }
  }
}
// Mobile
.mobile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  background-color: white;

  overflow-y: scroll;
  overflow-x: hidden;
  .imgs {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-basis: clamp(40%, 52.5%, 60%);
    position: relative;
    margin: 0;

    .bitmap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      object-fit: cover;
    }

    img {
      z-index: 2;
      &:nth-of-type(2) {
        position: absolute;
        margin: 1.5rem auto 1.5rem auto;
        top: 0;
      }
      &:nth-of-type(3) {
        position: absolute;
        margin: 1.5rem auto 1.5rem auto;
        bottom: 0;
      }
    }
  }
  .Login {
    width: 100%;
    display: inline-block;
    text-align: center;
    margin: 0;
    display: flex;
    justify-content: center;

    div {
      width: 80%;
      margin: 1rem 0;
    }
    .register {
      display: block;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      color: #171717;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    .reset-password {
      color: #ed1b24;
      display: block;
      font-family: IRANSans;
      text-align: center;
      letter-spacing: -1.15px;
      text-align: center;
      margin: 0;
    }
  }
}
</style>
