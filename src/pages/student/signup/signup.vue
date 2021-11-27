<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="Sign-up" v-else :style="styles">
    <form @submit.prevent="register()">
      <h1 class="text-header">اطلاعات خود را وارد کنید</h1>
      <label class="floating-label">
        <input
          placeholder="نام کاربری"
          type="text"
          v-model="model.username"
          @blur="v$.name.$touch()"
        />
        <span> نام </span>
      </label>
      <p
        v-for="error in v$.username.$errors"
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
          type="text"
          placeholder="شماره همراه"
          v-model="model.phone"
          @blur="v$.phone.$touch()"
          style="appearance: none"
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
      <!--  -->

      <label class="floating-label">
        <input
          type="text"
          placeholder=" کد ملی"
          v-model="model.nationalId"
          @blur="v$.nationalId.$touch()"
          style="appearance: none"
        />
        <span> کد ملی </span>
      </label>

      <p
        v-for="error in v$.nationalId.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <label class="floating-label">
        <select
          v-model="model.province"
          class="select province"
          @blur="v$.province.$touch()"
        >
          <option
            v-for="province in provinces"
            :value="province.name"
            :key="province.name"
          >
            {{ province.name }}
          </option>
        </select>
        <span> استان </span>
      </label>

      <p
        v-for="error in v$.province.$errors"
        class="text-danger text-bold m-2"
        :key="error.$uid"
        style="font-family: IRANSans; font-size: 12px"
      >
        {{ error.$message }}
      </p>
      <!--  -->
      <label class="floating-label">
        <select
          class="select grade"
          v-model="model.grade"
          placeholder=" مقطع تحصیلی"
          @blur="v$.grade.$touch()"
        >
          <option v-for="grade in allGrades" :key="grade.__id">
            {{ grade.title }}
          </option>
        </select>
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
        <select
          class="select oriantation"
          v-model="model.oriantation"
          placeholder=" رشته تحصیلی"
          @blur="v$.oriantation.$touch()"
        >
          <option
            v-for="oriantation in allOrientations"
            :key="oriantation.__id"
          >
            {{ oriantation.title }}
          </option>
        </select>
        <span> رشته تحصیلی </span>
      </label>

      <p
        v-for="error in v$.oriantation.$errors"
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
import { provinces } from '@/assets/provinces';
import router from '@/router';
import { computed, defineComponent, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required, sameAs } from '@vuelidate/validators';
import { store } from '@/store';
import { StudentMutationTypes } from '@/store/modules/student/mutation-types';
import { StudentOrientationApi } from '@/api/services/student/student-orientation-service';
import { StudentGradeApi } from '@/api/services/student/student-grade-service';
import { StudentAuthServiceApi } from '@/api/services/student/student-auth-service';

export default defineComponent({
  setup() {
    const allGrades = reactive([]) as any;
    const allOrientations = reactive([]) as any;
    // Filling The Grades And Orientations
    StudentOrientationApi.getAll().then((res) => {
      res.data.data.forEach((orientation: any) => {
        allOrientations.push(orientation);
      });
    });

    StudentGradeApi.getAll().then((res) => {
      res.data.data.forEach((grade: any) => {
        allGrades.push(grade);
      });
    });
    const model = reactive({
      username: '',
      lastname: '',
      phone: '',
      province: '',
      nationalId: '',
      oriantation: {},
      grade: {}
    } as any);
    const register = async () => {
      v$.value.$touch();

      if (!v$.value.$invalid) {
        // router.push({
        //   name: 'StudentAuthentication',
        //   params: { phone: model.phone }
        // });
        StudentAuthServiceApi.signUp(model).then((res) => console.log(res));

        store.commit(StudentMutationTypes.SET_USER, model);
      }
    };

    const styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const cancel = () => {
      router.push({
        name: 'StudentLogin'
      });
    };
    //
    const mustBeValidPhone = (value: string) => value.length === 11;
    const mustBeValidNationalId = (value: string) => value.length === 10;

    const mustBeNumber = (value: string) => {
      let allAreNumbers = true;
      for (let i = 0; i < value.length; i++) {
        if (isNaN(+value[i])) allAreNumbers = false;
      }
      return allAreNumbers;
    };

    const rules = computed(() => ({
      username: {
        required: helpers.withMessage('لطفا نام خود را وارد کنید', required)
      },
      lastname: {
        required: helpers.withMessage(
          'لطفا نام خانوادگی خود را وارد کنید',
          required
        )
      },
      phone: {
        required: helpers.withMessage(
          'لطفا شماره همراه خود را وارد کنید',
          required
        ),
        mustBeNumber: helpers.withMessage(
          'شماره همراه نباید دارای حروف باشد',
          mustBeNumber
        ),
        mustBeValidPhone: helpers.withMessage(
          'شماره همراه باید 11 رقم باشد',
          mustBeValidPhone
        )
      },
      nationalId: {
        required: helpers.withMessage('لطفا کد ملی خود را وارد کنید', required),
        mustBeValidNationalId: helpers.withMessage(
          'کد ملی باید 10 رقم باشد',
          mustBeValidNationalId
        )
      },
      province: {
        required: helpers.withMessage('لطفا استان را وارد کنید', required)
      },
      oriantation: {
        required: helpers.withMessage(
          'لطفا رشته تحصیلی خود را وارد کنید',
          required
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
    const citiesOfCurrentprovince = computed(() => {
      const tmp: any = provinces.find((el: any) => el.name === model.province);
      return tmp && tmp.cities;
    });
    return {
      model,
      provinces,
      citiesOfCurrentprovince,
      register,
      cancel,
      v$,
      styles,
      allGrades,
      allOrientations
    };
  }
});
</script>
<style lang="scss" scoped>
.Sign-up {
  min-width: 100vw;
  background: #f6f8fa;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: IRANSans;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  form {
    width: 90%;
    max-width: 350px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.97);
    text-align: center;
    padding: 2.5rem 1.25rem;
    margin: 2rem 0;
    .select {
      width: 100%;
      padding: 10px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
    }
    .text-header {
      font-size: 1.35rem;
      font-weight: 500;
      letter-spacing: -2.09px;
      color: #171717;
      margin-bottom: 2rem;
    }
    .province {
      background-image: url('https://s4.uupload.ir/files/arrow-down-filled-triangle-svgrepo-com_cfk0.png');
      background-repeat: no-repeat;
      background-position: left 1.5em top 50%, 0 0;
      background-size: 0.85em auto, 100%;
    }
    .cancel {
      font-size: 13px;
      letter-spacing: -2px;
      text-align: center;
      color: #ed1b24;
    }
  }
}
</style>
