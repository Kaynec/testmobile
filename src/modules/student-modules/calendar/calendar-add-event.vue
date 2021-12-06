<template>
  <div
    class="
      calendar-add
      flex-column
      d-flex
      justify-content-center
      align-items-center
    "
  >
    <form @submit.prevent="onSubmit">
      <!-- Add Ability To Change The Stuff Later -->
      <label class="floating-label">
        <select
          v-model="model.date"
          class="select date"
          @blur="v$.date.$touch()"
        >
          <option v-for="date in 30" :value="date" :key="date">
            {{ date }} آبان
          </option>
        </select>
        <span> تاریخ </span>
      </label>

      <label class="floating-label">
        <input
          type="text"
          placeholder="عنوان"
          v-model="model.eventName"
          @blur="v$.eventName.$touch()"
          style="appearance: none"
        />
        <span> عنوان رویداد </span>
      </label>

      <p
        v-for="error in v$.eventName.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <button class="button-linear" style="color: #fff; padding: 0.7rem 1rem">
        محاسبه شود
      </button>
    </form>

    <!-- Img Icon -->
    <img
      src="../../../assets/img/icons-raw-close.png"
      class="x-icon"
      @touchstart="touchstart"
    />
    <!--  -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
const alertify = require('../../../assets/alertifyjs/alertify');

export default defineComponent({
  //   props: {
  //   },
  setup(_, { emit }) {
    const model = reactive({
      date: '12',
      eventName: ''
    });
    //
    const touchstart = () => {
      setTimeout(() => {
        emit('convertBoolean');
      }, 150);
    };

    const rules = computed(() => ({
      date: {
        required: helpers.withMessage('لطفا تاریخ عنوان را وارد کنید', required)
      },
      eventName: {
        required: helpers.withMessage(
          'لطفا عنوان رویداد را وارد کنید',
          required
        )
      }
    }));

    const onSubmit = () => {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        emit('convertBoolean', model);
        alertify.success('رویداد با موفقیت اضافه شد');
      }
    };

    const v$ = useVuelidate(rules, model);

    return { touchstart, v$, model, onSubmit };
  }
});
</script>

<style lang="scss" scoped>
.calendar-add {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 5;

  form {
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.97);
    font-family: IRANSans;
    padding: 2rem 0.7rem;

    .floating-label {
      width: 100%;
    }

    h5 {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #171717;
    }
    p {
      font-size: 12px;
      line-height: 2.17;
      letter-spacing: normal;
      text-align: center;
      color: #171717;
      margin: 1.5rem 0;
    }

    button {
      border-radius: 15px;
      background-color: #d3d7e0;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #646464;
      border: none;
      padding: 15px 5px;
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
}
</style>