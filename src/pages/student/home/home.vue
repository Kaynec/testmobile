<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="mobile" v-else>
    <div class="user-home">
      <div class="header">
        <img src="../../../assets/img/logo-copy.png" class="logo-mahan" />
        <div class="user-part">
          <span class="points"> امتیاز شما: ۲۰۱۸۵ </span>
          <div class="profile-image"></div>
        </div>
      </div>
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="overlay"></div>
        <div class="small-overlay"></div>
        <img
          src="../../../assets/img/asset-1-288-x@3x.png"
          class="hero-image"
        />

        <div class="heroDiv">
          <div class="hero-header">
            <p class="text-style-1">نقشه راه</p>
            <p class="text-style-2">آزمون های جامع</p>
            <p class="chevron">
              مشاهده
              <i class="fas fa-chevron-left"></i>
            </p>
          </div>
        </div>
      </div>
      <!--  User Home -->
      <div class="User---Home">
        <img src="../../../assets/img/pancil.png" class="Cart" />
        <img src="../../../assets/img/map.png" class="Cart" />
        <img src="../../../assets/img/book.png" class="Cart" />
        <img src="../../../assets/img/support.png" class="Cart" />
        <img src="../../../assets/img/exam.png" class="Cart" />
        <img src="../../../assets/img/calendar.png" class="Cart" />
      </div>
      <!--  -->
      <div class="footer">
        <img src="../../../assets/img/home.png" class="footer-icon" />
        <img src="../../../assets/img/group.png" class="footer-icon" />
        <img src="../../../assets/img/shop.png" class="footer-icon" />
        <img src="../../../assets/img/setting.png" class="footer-icon" />
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
<style lang="scss" scoped>
.desktop {
  height: 100%;
}

.mobile {
  height: 100%;
  .user-home {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09);
      background-color: black;
      z-index: 2;

      flex-basis: 10%;
      img.logo-mahan {
        width: 116px;
        height: 32px;
        margin-top: 13px;
        margin-right: 15px;
        object-fit: contain;
      }
      .user-part {
        display: flex;
        width: 100%;
        margin-top: 11px;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        margin-left: 0.5rem;
        z-index: 2;

        .points {
          font-family: IRANSans;
          font-size: 12px;
          font-weight: bold;
          color: #fff;
        }
        .profile-image {
          width: 2rem;
          height: 2rem;
          border-radius: 8px;
          border: solid 2px #ddd;
          margin-right: 10px;
        }
      }
    }
    .hero-section {
      position: relative;
      width: 100%;
      margin: 0;
      background-image: linear-gradient(to top right, #ec3538 -5%, #880e13);
      flex-basis: clamp(17%, 27%, 31%);

      .overlay {
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        background-color: #960c10;
        opacity: 0.6;
        height: 100%;
        width: 62.5%;
        overflow: hidden;
        -webkit-clip-path: polygon(0 0, 100% 0, 0% 166%, 0 100%);
        clip-path: polygon(0 0, 100% 0, 0% 166%, 0 100%);
      }

      .small-overlay {
        position: absolute;
        width: 0;
        height: 0;
        left: 0;
        bottom: 0;
        border-top: 70vw solid #a61a1e;
        border-right: 60vw solid transparent;
      }

      .hero-image {
        object-fit: cover;
        position: absolute;
        left: 0;
        bottom: 0;
        width: auto;
        max-width: 50%;
        height: 95%;
        z-index: 1;
      }
      .heroDiv {
        line-height: 1;
        // padding: 1rem;
        position: absolute;
        right: 5%;
        top: 15%;
        .text-style-1 {
          z-index: 25;
          font-family: DimaArsalan;
          font-size: clamp(2rem, 2.5rem, 3rem);
          margin: 0;
          color: #fff;
        }
        .text-style-2 {
          z-index: 25;
          text-shadow: 0 3px 4px rgba(0, 0, 0, 0.33);
          font-family: IRANSans;
          font-size: clamp(0.9rem, 1.25rem, 1.4rem);
          color: #fff;
        }
      }

      .chevron {
        display: block;
        margin-top: 2.25rem;
        font-family: IRANSans;
        font-size: 14px;
        font-weight: normal;
        color: #fff;

        i {
          color: white;
          font-size: 11px;
        }
      }
    }
    .User---Home {
      width: 100%;
      flex-basis: clamp(47%, 57%, 63%);
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 5px;
      padding-bottom: 35px;
      .Cart {
        width: 36%;

        &:nth-of-type(1) {
          margin-left: 15%;
        }

        &:nth-of-type(3) {
          margin-left: 15%;
        }

        &:nth-of-type(5) {
          margin-left: 15%;
        }
      }
    }
    .footer {
      width: 100%;
      height: clamp(3rem, 3.5rem, 4rem);
      flex-basis: clamp(10%, 12.5%, 17.5%);
      position: fixed;
      bottom: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      background-image: linear-gradient(to right, #880e13 20%, #ec3538);
      .footer-icon {
        object-fit: contain;
        width: 5rem;
        min-width: 2rem;
      }
    }
  }
}
// Make The Picture disapper on small phones
@media screen and (max-width: 320px) {
}
</style>
