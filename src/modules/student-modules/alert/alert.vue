<template>
  <div class="alert flex-column d-flex justify-content-end align-items-center">
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
      <div class="content">
        <h5>{{ label }}</h5>
        <p class="paraghraph">
          {{ text }}
        </p>

        <div class="btns">
          <button>بله</button>
          <button>خیر</button>
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
  props: {
    label: { type: String, default: 'عنوان پیام' },
    text: { type: String, default: 'متن پیام' }
  },
  setup(_, { emit }) {
    const touchstart = () =>
      setTimeout(() => {
        // Run after a bit of time so we don't accidentally touch footer component
        emit('convertBoolean');
      }, 150);

    return { touchstart };
  }
});
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 5;
  font-family: IRANSans;

  .content {
    width: 90%;
    min-height: 15rem;
    margin-inline: auto;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    // padding: 1rem;

    h5 {
      font-size: 14px;
      font-weight: bold;
      color: #171717;
      margin-block: 1.5rem;
    }

    .paraghraph {
      font-size: 12px;
      line-height: 2.36;
      color: #000;
    }

    .btns {
      width: 95%;
      margin-inline: auto;
      margin-top: 4.5rem;
      button {
        padding: 5% 18%;
        border-radius: 1rem;
        border: none;

        &:first-child {
          background-color: #4ac367;
          color: #fff;
          margin-left: 0.3rem;
        }

        &:last-child {
          background-color: #d3d7e0;
          color: #646464;
        }
      }
    }
  }
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

.flex-child {
  min-height: 60vh;
  max-height: 90%;
  overflow: scroll;
}
</style>
