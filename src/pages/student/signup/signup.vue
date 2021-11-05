<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="Sign-up" v-else>
    <form @submit.prevent="register()" class="Rectangle">
      <h1 class="text-header">اطلاعات خود را وارد کنید</h1>
      <label class="floating-label">
        <input
          placeholder="نام"
          type="text"
          v-model="model.name"
          @blur="v$.name.$touch()"
        />
        <span> نام </span>
      </label>
      <p
        v-for="error in v$.name.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <label class="floating-label">
        <input
          type="text"
          placeholder="نام خانوادگی"
          v-model="model.lastname"
          @blur="v$.lastname.$touch()"
        />
        <span> نام خانوادگی </span>
      </label>

      <p
        v-for="error in v$.lastname.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <label class="floating-label">
        <input
          type="number"
          placeholder="شماره همراه"
          v-model="model.phone"
          @blur="v$.phone.$touch()"
        />
        <span> شماره همراه </span>
      </label>

      <p
        v-for="error in v$.phone.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <label class="floating-label">
        <select
          v-model="model.estate"
          class="select estate"
          @blur="v$.estate.$touch()"
        >
          <option
            v-for="estate in estates"
            :value="estate.name"
            :key="estate.name"
          >
            {{ estate.name }}
          </option>
        </select>
        <span> استان </span>
      </label>

      <p
        v-for="error in v$.estate.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <!--  -->
      <label class="floating-label">
        <select v-model="model.city" class="select" @blur="v$.city.$touch()">
          <option
            v-for="city in citiesOfCurrentEstate"
            :value="city.name"
            :key="city.name"
          >
            {{ city.name }}
          </option>
        </select>
        <span> شهر </span>
      </label>

      <p
        v-for="error in v$.city.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <!--  -->
      <label class="floating-label">
        <input
          type="text"
          v-model="model.nationalCode"
          placeholder="کد ملی"
          @blur="v$.nationalCode.$touch()"
        />
        <span> کد ملی </span>
      </label>

      <p
        v-for="error in v$.nationalCode.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <label class="floating-label">
        <input
          type="text"
          v-model="model.grade"
          placeholder=" مقطع تحصیلی"
          @blur="v$.grade.$touch()"
        />
        <span> مقطع تحصیلی </span>
      </label>

      <p
        v-for="error in v$.grade.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <label class="floating-label">
        <input
          type="text"
          v-model="model.orientation"
          placeholder="رشته تحصیلی"
          @blur="v$.grade.$touch()"
        />
        <span> رشته تحصیلی </span>
      </label>

      <p
        v-for="error in v$.orientation.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>

      <button type="submit" class="button-linear">
        <span> ثبت اطلاعات </span>
      </button>

      <span @click="cancel()" class="text-bold cancel">
        برگشت به صفحه ورود
      </span>
    </form>
  </div>
</template>

<script lang="ts">
const estates = [
  {
    name: 'تهران',
    cities: [
      {
        name: 'ورامین'
      },
      {
        name: 'شهر ری'
      }
    ]
  },
  {
    name: 'کرج',
    cities: [
      {
        name: 'البرز'
      },
      {
        name: 'هشتگرد'
      }
    ]
  }
];

import router from '@/router';
import { computed, defineComponent, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, maxLength, helpers, required } from '@vuelidate/validators';
import { store } from '@/store';
import { StudentMutationTypes } from '@/store/modules/student/mutation-types';
export default defineComponent({
  setup() {
    const model = reactive({
      name: '',
      lastname: '',
      phone: '',
      estate: '',
      city: '',
      nationalCode: '',
      orientation: '',
      grade: ''
    } as any);
    const register = async () => {
      v$.value.$touch();

      if (!v$.value.$invalid) {
        console.log(model);
        router.push({
          name: 'StudentAuthentication',
          params: { phone: model.phone }
        });

        store.commit(StudentMutationTypes.SET_USER, model);
      }
    };
    const cancel = () => {
      router.push({
        name: 'StudentLogin'
      });
    };
    const rules = computed(() => ({
      name: {
        required: helpers.withMessage('لطفا نام خود را وارد کنید', required)
      },
      lastname: {
        required: helpers.withMessage('لطفا فامیلی خود را وارد کنید', required)
      },
      phone: {
        required: helpers.withMessage(
          'لطفا شماره همراه خود را وارد کنید',
          required
        ),
        minLength: helpers.withMessage(
          'شماره همراه باید 11 رقم باشد',
          minLength(11)
        ),
        maxLength: helpers.withMessage(
          'شماره همراه باید 11 رقم باشد',
          maxLength(11)
        )
      },
      estate: {
        required: helpers.withMessage('لطفا استان را وارد کنید', required)
      },
      city: {
        required: helpers.withMessage('لطفا شهر را وارد کنید', required)
      },
      orientation: {
        required: helpers.withMessage(
          'لطفا رشته تحصیلی خود را وارد کنید',
          required
        )
      },
      nationalCode: {
        required: helpers.withMessage('لطفا کد ملی خود را وارد کنید', required),
        minLength: helpers.withMessage(
          'کد ملی باید دقیقا 10 رقم باشد',
          minLength(10)
        ),
        maxLength: helpers.withMessage(
          'کد ملی باید دقیقا 10 رقم باشد',
          maxLength(10)
        )
      },
      grade: {
        required: helpers.withMessage(
          'لطفا مقطع تحصیلی خود را وارد کنید',
          required
        )
      }
    }));

    const v$ = useVuelidate(rules, model);
    const citiesOfCurrentEstate = computed(() => {
      const tmp: any = estates.find((el) => el.name === model.estate);
      return tmp && tmp.cities;
    });
    return { model, estates, citiesOfCurrentEstate, register, cancel, v$ };
  }
});
</script>
<style lang="scss">
.Sign-up {
  width: 100vw;
  height: 100vh;
  background: rgb(247, 244, 244);
  overflow-x: hidden;
  .Rectangle {
    margin: 0 auto;
    margin-top: 5%;
    width: 88vw;
    padding: 9px 20px 16px 21px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.97);
    text-align: center;
    .select {
      width: 100%;
      padding: 10px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
    }
    .text-header {
      font-family: IRANSans;
      font-size: 1.35rem;
      font-weight: 500;
      letter-spacing: -2.09px;
      color: #171717;
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
    .estate {
      background-image: url('https://s4.uupload.ir/files/arrow-down-filled-triangle-svgrepo-com_cfk0.png');
      background-repeat: no-repeat;
      background-position: left 1.5em top 50%, 0 0;
      background-size: 0.85em auto, 100%;
    }
    .cancel {
      font-weight: normal;
      font-family: IRANSans;
      font-size: 13px;
      letter-spacing: -2px;
      text-align: center;
      color: #ed1b24;
    }
  }
}
</style>
