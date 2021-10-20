<template>
  <div class="desktop" v-if="!isMobile()"></div>

  <div class="mobile" v-else>
    <div class="Sign-up">
      <form @submit.prevent="register()" class="Rectangle">
        <span class="text-header"> اطلاعات خود را وارد کنید </span>
        <input
          type="text"
          placeholder="نام"
          class="inputs name"
          v-model="model.name"
          @blur="v$.name.$touch()"
        />
        <span
          v-for="error in v$.name.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>
        <input
          type="text"
          placeholder="نام خانوادگی"
          class="inputs lastname"
          v-model="model.lastname"
          @blur="v$.lastname.$touch()"
        />
        <span
          v-for="error in v$.lastname.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>

        <input
          type="number"
          placeholder="شماره همراه"
          class="inputs phone"
          v-model="model.phone"
          @blur="v$.phone.$touch()"
        />
        <span
          v-for="error in v$.phone.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>

        <select
          v-model="model.estate"
          class="inputs select estate"
          @blur="v$.estate.$touch()"
        >
          <option value="" hidden selected>استان</option>
          <option
            v-for="estate in estates"
            :value="estate.name"
            :key="estate.name"
          >
            {{ estate.name }}
          </option>
        </select>

        <span
          v-for="error in v$.estate.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>

        <!--  -->
        <select
          v-model="model.city"
          class="inputs select"
          @blur="v$.city.$touch()"
        >
          <option value="" hidden selected>شهر</option>
          <option
            v-for="city in citiesOfCurrentEstate"
            :value="city.name"
            :key="city.name"
          >
            {{ city.name }}
          </option>
        </select>

        <span
          v-for="error in v$.city.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>

        <!--  -->
        <input
          type="text"
          v-model="model.nationalCode"
          class="inputs nationalCode"
          placeholder="کد ملی"
          @blur="v$.nationalCode.$touch()"
        />

        <span
          v-for="error in v$.nationalCode.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>

        <input
          type="text"
          v-model="model.grade"
          class="inputs grade"
          placeholder="مقطع تحصیلی"
          @blur="v$.grade.$touch()"
        />

        <span
          v-for="error in v$.grade.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>

        <input
          type="text"
          v-model="model.orientation"
          class="inputs orientation"
          placeholder="رشته تحصیلی"
          @blur="v$.orientation.$touch()"
        />

        <span
          v-for="error in v$.orientation.$errors"
          class="text-danger small"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>

        <button type="submit" class="register-btn">
          <span> ثبت اطلاعات </span>
        </button>

        <span @click="cancel()" class="cancel"> برگشت به صفحه ورود </span>
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
      console.log(model);
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
  margin: 0;

  .Sign-up {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 10px;
    background-color: #f6f8fa;
    text-align: center;

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
      height: 100%;
      padding: 19px 20px 16px 21px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.97);

      .select {
        width: 100%;
        color: #7d8892;
        padding: 10px;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
      }

      .estate {
        background-image: url('https://s4.uupload.ir/files/arrow-down-filled-triangle-svgrepo-com_cfk0.png');
        background-repeat: no-repeat;
        // /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
        background-position: left 1.5em top 50%, 0 0;
        // /* icon size, then gradient */
        background-size: 0.85em auto, 100%;
        // position: relative;
      }

      .inputs {
        width: 270px;
        height: 40px;
        margin: 10px 0;
        padding: 5px;
        border-radius: 10px;
        border: solid 1px #dedede;
        background-color: #fff;
        font-size: smaller;
        font-weight: 500;
      }

      .register-btn {
        width: 269px;
        height: 51px;
        margin-top: 1rem;
        border-radius: 15px;
        background-color: #d21921;
        border: none;

        span {
          width: 79px;
          height: 24px;
          font-family: IRANSans;
          font-size: 15.3px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: center;
          color: #fff;
        }
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
