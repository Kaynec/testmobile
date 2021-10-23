<template>
  <div class="desktop" v-if="!isMobile()">
    <div class="Login">
      <img src="../../../assets/img/logo-mahan.png" class="logo-mahan" />
      <div class="Rectangle">
        <span class="title"> ورود به حساب کاربری </span>
        <input
          v-model="email"
          type="text"
          placeholder="نام کاربری"
          class="inputs username"
        />
        <input
          v-model="password"
          type="password"
          placeholder="رمز عبور"
          class="inputs password"
        />
        <button class="login-btn" @click="login"><span> ورود </span></button>
        <span class="reset-password"> بازیابی رمز عبور </span>
      </div>
      <span class="register"> ثبت نام در ماهان </span>
    </div>
  </div>
  <div class="mobile" v-else>
    <div class="Login">
      <img src="../../../assets/img/logo-mahan.png" class="logo-mahan" />
      <div class="Rectangle">
        <span class="title"> ورود به حساب کاربری </span>
        <input
          v-model="email"
          type="text"
          placeholder="نام کاربری"
          class="inputs username"
        />
        <input
          v-model="password"
          type="password"
          placeholder="رمز عبور"
          class="inputs password"
        />
        <button @click="login" class="login-btn"><span> ورود </span></button>
        <span class="reset-password" @click="moveToPasswordRecover()">
          بازیابی رمز عبور
        </span>
      </div>
      <span class="register" @click="moveToSignUp"> ثبت نام در ماهان </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStudentStore } from '@/store';
import { StudentActionTypes } from '@/store/modules/student/action-types';
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
    console.log(this.email, this.password);
    const res = await useStudentStore().dispatch(
      StudentActionTypes.AUTH_REQUEST_STUDENT,
      {
        username: this.email,
        password: this.password
      }
    );
    if (res) {
      await useStudentStore().dispatch(
        StudentActionTypes.CURRENT_STUDENT,
        undefined
      );
      router.push('/student');
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img.logo-mahan {
      margin-top: 38px;
      width: 190px;
      height: 90px;
      object-fit: contain;
    }
    .Rectangle {
      width: 311px;
      height: 100%;
      margin: 32px auto;
      padding: 25px 20px 23px 21px;
      border-radius: 10px;
      background-color: #fff;
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
      background-color: #d21921;
      margin-top: 20px;
      span {
        font-family: 'IRANSans';
        font-size: 15.3px;
        font-weight: bold;
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
    .Rectangle {
      width: 311px;
      height: 333px;
      margin: 32px auto;
      padding: 25px 20px 23px 21px;
      border-radius: 10px;
      background-color: #fff;
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
      background-color: #d21921;
      margin-top: 20px;
      span {
        font-family: 'IRANSans';
        font-size: 15.3px;
        font-weight: bold;
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
</style>
