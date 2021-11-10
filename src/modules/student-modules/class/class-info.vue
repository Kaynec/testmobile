<template>
  <div class="class-info">
    <div
      style="z-index: 5; color: #fff"
      class="
        d-inline-flex
        flex-column
        justify-content-between
        align-items-center
        w-100
        flex-child
      "
    >
      <!-- Middle Div -->
      <div class="text-card">
        <h5>نوع برگزاری کلاس</h5>
        <div class="flex-container">
          <div class="right">
            <h6>نام درس</h6>
            <h6>نام استاد</h6>

            <h6>تعداد ساعات تدریس</h6>
          </div>

          <div>
            <h6>حسابداری</h6>
            <h6>آقای خان بابایی</h6>

            <h6>۳ ساعت و نیم</h6>
          </div>
        </div>
        <div class="btns">
          <button>آنلاین</button>
          <button>آفلاین</button>
        </div>
      </div>
      <!-- Img Icon -->
      <img
        src="../../../assets/img/icons-raw-close.png"
        class="x-icon"
        @touchstart="touchstart"
      />
      <!--  -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup(_, { emit }) {
    const touchstart = () => {
      setTimeout(() => {
        emit('convertBoolean');
      }, 150);
    };

    return { touchstart };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';

.class-info {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.x-icon {
  padding: 4px;
  background: white;
  border-radius: 45%;
  display: block;
  position: fixed;
  margin-bottom: 7vh;
  margin-top: 3rem;
  bottom: 0;
}
.text-card {
  padding: 18px 25px 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.97);
  width: 90%;

  h5 {
    font-family: IRANSans;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #171717;
    margin-bottom: 1rem;
  }
  .flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;

    h6 {
      font-size: 12px;
      line-height: 2.36;
      color: #000;
      font-family: IRANSans;
      font-weight: bolder;
    }
    .right {
      font-weight: lighter;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    gap: 0.3rem;

    button {
      border-radius: 15px;
      border: none;
      font-size: 14px;
      font-weight: bold;
      background-color: #4ac367;
      color: #fff;
      padding: 14px 44px 16px 45px;

      &:last-child {
        background-image: $redish-background;
      }
    }
  }
}
.flex-child {
  min-height: 60vh;
  max-height: 90%;
  overflow: scroll;
}
</style>
