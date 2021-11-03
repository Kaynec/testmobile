<template>
  <div class="azmoon flex-column d-flex justify-content-end align-items-center">
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
      <div
        class="
          d-inline-flex
          flex-column
          justify-content-center
          align-items-center
          w-100
        "
      >
        <Dialog label="برترینهای آزمون" />
        <Dialog label="پاسخنامه" />
        <Dialog label="کارنامه" />
        <Dialog label="نمودار پیشرفت" />
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
import Dialog from '@/modules/student-modules/dialog.vue';
export default defineComponent({
  components: {
    Dialog
  },
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

<style language="scss">
.azmoon {
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 5;
}
.x-icon {
  padding: 3px;
  background: white;
  border-radius: 45%;
  display: block;
  margin-bottom: 6vh;
  margin-top: 3rem;
}

.flex-child {
  min-height: 60vh;
  max-height: 90%;
  overflow: scroll;
}
</style>
