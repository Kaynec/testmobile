<template>
  <div class="taraz flex-column d-flex justify-content-end align-items-center">
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
        <div class="middle-card">
          <h5>لطفا تراز کاربری خود را وارد کنید</h5>

          <label class="floating-label">
            <input type="text" v-model="taraz" placeholder="00000" />
            <span> تراز کاربری </span>
          </label>

          <button
            class="button-linear"
            style="color: white; padding: 0.85rem"
            @click="calculateTaraz"
          >
            محاسبه شود
          </button>
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
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup(_, { emit }) {
    const taraz = ref('');

    const calculateTaraz = () => {
      // For now just return a number
      setTimeout(() => {
        taraz.value = '۱۵۲۲۱۵';
      }, 1000);
    };

    const touchstart = () => {
      setTimeout(() => {
        emit('convertBoolean');
      }, 150);
    };

    return { touchstart, taraz, calculateTaraz };
  }
});
</script>

<style lang="scss" scoped>
.taraz {
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 5;

  .middle-card {
    width: 90%;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.97);

    .floating-label {
      margin-bottom: 1.8rem;

      input {
        transition: all 0.3s ease;
      }
    }

    h5 {
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #171717;
      margin: 1rem 0 2rem;
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
