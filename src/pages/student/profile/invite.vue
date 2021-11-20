<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="invite" :style="styles" v-else>
    <nav class="nav">
      <span> پروفایل من </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!--  -->
    <div class="container">
      <img
        src="../../../assets/img/invite.png"
        alt="invite"
        class="container-img"
      />
      <h5>ما را به دوستان خود معرفی کنید</h5>
      <p>
        شما می توانید با معرفی کد دعوت خود به دیگران هم خود و هم دعوت شده در
        باشگاه امتیاز کسب کنید.
      </p>
      <div class="border-dashed">
        <span> ۰۹۲۰۲۲۲۵۰۶۰ </span>
      </div>
      <button class="button-linear">اشتراک گذاری</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const goOnePageBack = () => router.go(-1);

    return { styles, goOnePageBack };
  }
});
</script>

<style lang="scss" scoped>
.invite {
  width: 100%;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: IRANSans;

  .nav {
    width: 100%;
    height: 50px;
    padding: 10px 15px 10px 10px;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    position: fixed;

    span {
      margin: 7px 0 7px 2px;
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
      display: inline-block;
    }
  }
  //
  .container {
    width: 90%;
    margin: 2rem auto;
    background: #fff;
    position: relative;
    padding: 3rem;
    color: #1c1c1c;
    border-radius: 15px;

    .container-img {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
      top: -30%;
    }

    h5 {
      margin-top: 3rem;
      font-family: IRANSans;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
    }
    p {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -1.86px;
      text-align: center;
      color: #646464;
      margin: 1.5rem 0;
    }

    .border-dashed {
      padding: 15px 25px;
      border-radius: 30px;
      border: dashed 1px #ff5960;
      text-align: center;

      span {
        font-size: 20px;
        letter-spacing: 1.5px;
        color: #333;
      }
    }
    .button-linear {
      padding: 0.9rem 1.75rem;
      color: #fff;
    }
  }
}
</style>
