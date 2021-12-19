<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="roadmap" v-else>
    <SmallHeader />
    <!-- BackGround Image -->

    <img
      src="../../../assets/img/roadmap/3-d-space-scene@3x.png"
      class="bg"
      ref="imgRef"
    />

    <!--  -->
    <div class="middle-card">
      <h1>کتاب درسی</h1>
      <h3>فصل اول</h3>
      <p>ماتریس و اعمال روی ماتریس ها</p>
      <button>شروع</button>
    </div>
    <!-- back And Forth Images -->
    <img
      src="../../../assets/img/roadmap/angle-left.svg"
      class="shape1"
      @click="moveImg(1)"
    />
    <img
      src="../../../assets/img/roadmap/angle-right.svg"
      class="shape2"
      @click="moveImg(-1)"
    />
    <!--  -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
export default defineComponent({
  components: {
    SmallHeader
  },
  setup() {
    const imgRef = ref();
    const numberOfSlides = 5;
    //
    const moveImg = (position) => {
      const style =
        imgRef.value.currentStyle || window.getComputedStyle(imgRef.value);

      const screenWidth = window.screen.width;

      if (position === -1 && parseInt(style.left) + screenWidth < 0) {
        imgRef.value.style.left = parseInt(style.left) + screenWidth + 'px';
      } else if (
        position === 1 &&
        Math.abs(parseInt(style.left) - screenWidth) <
          screenWidth * numberOfSlides
      ) {
        imgRef.value.style.left = parseInt(style.left) - screenWidth + 'px';
      }
    };
    return { imgRef, moveImg };
  }
});
</script>
<style lang="scss" scoped>
.roadmap {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding-top: 8vh;
  position: relative;
  font-family: IRANSans;
  .bg {
    width: 500%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .btn {
    width: 25%;
    z-index: 9999;
    background: red;
    padding: 4rem;
    position: fixed;
    top: 37%;

    &:last-child {
      left: 0;
    }
  }
  .middle-card {
    z-index: 9999;
    top: 27%;
    left: 0;
    right: 0;
    margin-inline: auto;
    padding: 1.5rem;
    position: absolute;
    width: 55%;
    max-width: 15rem;
    height: 30%;
    max-height: 14rem;
    padding: 1rem 0.7rem;
    border-radius: 3rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.72);
    background-color: #fff;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 14px;
      font-weight: bold;

      text-align: center;
      color: #171717;
    }

    h3 {
      font-size: 11px;
      color: #d21921;
    }
    p {
      color: #000000;
      font-size: 12px;
    }

    button {
      background-color: #4ac367;
      border: none;
      padding: 7% 25%;
      color: #fff;
      border-radius: 10px;
    }
  }

  .shape1 {
    width: 1.2rem;
    margin-inline: 1.7rem;
    top: 35%;
    left: 0;
    position: absolute;
  }
  .shape2 {
    width: 1.2rem;
    margin-inline: 1.7rem;
    top: 35%;
    right: 0;
    position: absolute;
  }
}
</style>
