<template>
  <div class="desktop" v-if="!isMobile()">
    <div class="Login">
      <img src="../../../assets/img/logo-mahan.png" class="logo-mahan" />
      <div class="Rectangle">
        <span class="title"> ورود به حساب کاربری </span> <br />
        <input
          v-model="email"
          type="text"
          placeholder="نام کاربری"
          class="inputs username"
        />
        <br />
        <input
          v-model="password"
          type="password"
          placeholder="رمز عبور"
          class="inputs password"
        />
        <br />
        <button class="login-btn" @click="login"><span> ورود </span></button>
        <br />
        <span class="reset-password"> بازیابی رمز عبور </span> <br />
      </div>
      <span class="register"> ثبت نام در ماهان </span> <br />
    </div>
  </div>

  <div class="mobile" v-else>
    <div class="imgs">
      <img src="../../../assets/img/bitmap.png" class="bitmap" />
      <img src="../../../assets/img/logo-mahan.webp" />
      <img src="../../../assets/img/mahan.png" />
    </div>
    <div class="Login">
      <input
        v-model="email"
        type="text"
        placeholder="نام کاربری"
        class="inputs username"
      />
      <br />
      <input
        v-model="password"
        type="password"
        placeholder="رمز عبور"
        class="inputs password"
      />
      <br />
      <button @click="login" class="login-btn"><span> ورود </span></button
      ><br />
      <span class="register" @click="moveToSignUp"> ثبت نام در ماهان </span
      ><br />
      <span class="reset-password" @click="moveToPasswordRecover()">
        بازیابی رمز عبور
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import { useStudentStore } from '@/store';
// import { StudentActionTypes } from '@/store/modules/student/action-types';
import router from '@/router';

@Options({})
export default class Login extends Vue {
  private appElement: HTMLElement | null = null;

  public email = '';
  public password = '';
  public windowHeight = window.innerHeight;

  public mounted(): void {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  }

  public async login(): Promise<any> {
    // console.log(this.email, this.password);
    // const res = await useStudentStore().dispatch(
    //   StudentActionTypes.AUTH_REQUEST_STUDENT,
    //   {
    //     username: this.email,
    //     password: this.password
    //   }
    // );
    // if (res) {
    //   await useStudentStore().dispatch(
    //     StudentActionTypes.CURRENT_STUDENT,
    //     undefined
    //   );
    //   router.push('/student');
    // }
    if (this.email && this.password) {
      router.push({ name: 'Home' });
    }
  }
  moveToSignUp() {
    router.push({ name: 'StudentSignup' });
  }
  moveToPasswordRecover() {
    router.push({ name: 'StudentPasswordRecover' });
  }
  onResize(): void {
    (this as any).windowHeight = window.innerHeight;
  }

  getMainStyle(): { height: string } {
    return { height: `${(this as any).windowHeight - 1}px` };
  }
}
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

      font-family: 'IRANSans';
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
      font-family: 'IRANSans';
      font-size: 19px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -2.09px;
      text-align: center;
      color: #171717;
    }
    .inputs {
      width: 270px;
      height: 50px;
      padding: 11px 101px 12px 102px;
      border-radius: 10px;
      border: solid 1px #c8c8c8;
      background-color: #fff;
    }
    .password {
      margin-top: 10px;
    }
    .username {
      margin-top: 39px;
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
.mobile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  overflow-y: scroll;
  overflow-x: hidden;
  .imgs {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-basis: clamp(40%, 45%, 50%);
    position: relative;

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
      // margin: 1.9rem;
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
    flex-basis: clamp(40%, 45%, 50%);
    height: clamp(40%, 45%, 50%);
    background-color: #f6f8fa;
    text-align: center;
    .register {
      display: block;
      width: 100%;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      color: #171717;
      // margin-top: 1.5rem;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    .inputs {
      width: 70%;
      height: 3.5rem;
      border-radius: 11px;
      border: solid 1px #e1bdba;
      background-color: #fff;
      font-family: IRANSans;
      font-size: 14px;
      text-align: center;
      color: #888;
    }
    .password {
      margin-top: 10px;
    }
    .username {
      margin-top: 39px;
    }
    .login-btn {
      width: 70%;
      height: 3.5rem;
      border-radius: 15px;
      background: rgb(241, 24, 24);
      border: none;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
      span {
        width: 250px;
        height: 24px;
        font-family: 'IRANSans';
        font-size: 15.3px;
        font-weight: bold;
        text-align: center;
        color: #fff;
      }
    }
    .reset-password {
      color: #ed1b24;
      display: block;
      font-family: IRANSans;
      font-size: 14px;
      text-align: center;
      letter-spacing: -1.15px;
      text-align: center;
    }
  }
}
</style>
