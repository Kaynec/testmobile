<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="mobile" v-else>
    <div class="user-home">
      <div class="header">
        <img
          src="../../../assets/img/logo-mahan-minimal.png"
          class="logo-mahan"
        />
        <div class="user-part">
          <span class="points"> امتیاز شما: ۲۰۱۸۵ </span>
          <div class="profile-image"></div>
        </div>
      </div>

      <div class="footer">
        <div class="footer-menu"><i class="fa fa-home"></i></div>
        <div class="footer-menu"><i class="fa fa-home"></i></div>
        <div class="footer-menu"><i class="fa fa-home"></i></div>
        <div class="footer-menu" @click="logout()">
          <i class="fa fa-arrow-left"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStudentStore } from '@/store';
import { StudentActionTypes } from '@/store/modules/student/action-types';

@Options({})
export default class Login extends Vue {
  public data(): any {
    return {
      windowHeight: window.innerHeight
    };
  }

  public mounted(): void {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  }

  onResize(): void {
    (this as any).windowHeight = window.innerHeight;
  }

  getMainStyle(): { height: string } {
    return { height: `${(this as any).windowHeight - 1}px` };
  }
  // eslint-disable-next-line
  async logout() {
    debugger;
    await useStudentStore().dispatch(
      StudentActionTypes.LOG_OUT_STUDENT,
      undefined
    );
    this.$router.push('/student/login');
  }
}
</script>
<style lang="scss">
.desktop {
  height: 100%;
}
.mobile {
  height: 100%;
  .user-home {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    .header {
      display: flex;
      width: 100%;
      height: 49px;
      box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09);
      background-color: #fff;
      justify-content: space-between;
      img.logo-mahan {
        width: 116px;
        height: 32px;
        margin-top: 13px;
        margin-right: 15px;
        object-fit: contain;
      }
      .user-part {
        display: flex;
        width: 127px;
        margin-top: 11px;
        margin-left: 17px;
        .points {
          width: 100px;
          font-family: IRANSans;
          font-size: 11px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: right;
          color: #171717;
          margin-top: 5px;
        }
        .profile-image {
          width: 27px;
          height: 27px;
          border-radius: 8px;
          border: solid 2px #ddd;
        }
      }
    }
    .footer {
      width: 100%;
      height: 62px;
      position: fixed;
      bottom: 0;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      .footer-menu {
        width: 25%;
        height: 100%;
        text-align: center;
        i {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
