<template>
  <div class="desktop" v-if="!isMobile()"></div>

  <div class="mobile" v-else>
    <div class="Sign-up">
      <form @submit.prevent="register()" class="Rectangle">
        <span class="text-header"> اطلاعات خود را وارد کنید </span>
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
          class="text-danger text-bold small m-2"
          :key="error.$uid"
          style="font-family: IRANSans"
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
<style lang="scss" scoped>
.mobile {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f6f8fa;

  .Sign-up {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .text-header {
      width: 192px;
      height: 30px;
      margin: 0 38px 26px 40px;
      font-family: IRANSans;
      font-size: 1.35rem;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -2.09px;
      text-align: center;
      color: #171717;
    }
    .Rectangle {
      margin: 0 auto;
      width: 311px;
      max-width: 450px;
      padding: 19px 20px 16px 21px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.97);
      .select {
        width: 100%;
        padding: 10px;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
      }

      .estate {
        background-image: url('https://s4.uupload.ir/files/arrow-down-filled-triangle-svgrepo-com_cfk0.png');
        background-repeat: no-repeat;
        background-position: left 1.5em top 50%, 0 0;
        background-size: 0.85em auto, 100%;
      }
      .cancel {
        width: 109px;
        height: 21px;
        margin: 18px 80px 0 81px;
        font-family: IRANSans;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -2px;
        text-align: center;
        color: #ed1b24;
      }
    }
  }
}
</style>
