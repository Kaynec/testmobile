<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="edit" v-else :style="styles">
    <nav class="nav">
      <span> ویرایش اطلاعات </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!--  -->
    <div class="img-container">
      <div class="img">
        <img
          src="data:image/jpeg;base64,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"
          class="avatar"
          alt="avatar img"
        />
        <img
          src="../../../assets/img/camera@2x.png"
          class="camera"
          alt="camera"
        />
      </div>
    </div>
    <!-- Form -->
    <form @submit.prevent="onSubmit">
      <div class="input">
        <span> نام </span>
        <input
          type="text"
          @blur="v$.name.$touch()"
          v-model="model.name"
          maxlength="20"
        />
      </div>
      <p
        v-for="error in v$.name.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->
      <div class="input">
        <span> نام خانوادگی </span>
        <input
          type="text"
          @blur="v$.lastname.$touch()"
          v-model="model.lastname"
          maxlength="20"
        />
      </div>
      <p
        v-for="error in v$.lastname.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <!--  -->
      <div class="input">
        <span> شماره همراه </span>
        <input
          type="text"
          @blur="v$.phone.$touch()"
          v-model="model.phone"
          maxlength="50"
        />
      </div>
      <p
        v-for="error in v$.phone.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <!--  -->
      <div class="select">
        <select
          type="text"
          @blur="v$.estate.$touch()"
          v-model="model.estate"
          maxlength="35"
        >
          <option value="تهران">تهران</option>
          <option value="خراسان رضوی">خراسان رضوی</option>
          <option value="اصفهان">اصفهان</option>
          <option value="آذربایجان">آذربایجان</option>
        </select>
      </div>
      <p
        v-for="error in v$.estate.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <!--  -->
      <div class="select">
        <select
          type="text"
          @blur="v$.city.$touch()"
          v-model="model.city"
          maxlength="35"
        >
          <option value="تهران">تهران</option>
          <option value=" مشهد">مشهد</option>
          <option value="ساری">ساری</option>
          <option value="یزد">یزد</option>
        </select>
      </div>
      <p
        v-for="error in v$.city.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <!--  -->
      <div class="input">
        <span> کد ملی </span>
        <input
          type="text"
          @blur="v$.nationalId.$touch()"
          v-model="model.nationalId"
          maxlength="11"
        />
      </div>
      <p
        v-for="error in v$.nationalId.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <!--  -->
      <div class="input">
        <span> مقطع تحصیلی</span>
        <input
          type="text"
          @blur="v$.grade.$touch()"
          v-model="model.grade"
          maxlength="25"
        />
      </div>
      <p
        v-for="error in v$.grade.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <!--  -->
      <div class="input">
        <span> رشته تحصیلی </span>
        <input
          type="text"
          @blur="v$.orientation.$touch()"
          v-model="model.orientation"
          maxlength="25"
        />
      </div>
      <p
        v-for="error in v$.orientation.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->

      <!--  -->
      <button
        type="submit"
        class="button-linear"
        style="padding: 1rem; color: #fff"
      >
        ثبت اطلاعات
      </button>
    </form>
    <!--  -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers, maxLength } from '@vuelidate/validators';
import router from '@/router';

export default defineComponent({
  setup() {
    const styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const goOnePageBack = () => router.go(-1);

    const model = reactive({
      name: 'احسان',
      lastname: 'امینی',
      phone: '۰۹۲۰۲۲۲۵۰۶۰',
      estate: 'تهران',
      city: 'تهران',
      nationalId: '۰۳۳۸۴۸۴۸۴',
      grade: 'پایه دوازدهم',
      orientation: ' ریاضی فیزیک'
    });

    const rules = {
      name: {
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
        minLength: helpers.withMessage(
          'شماره همراه  باید 11 رقم باشد',
          minLength(11)
        ),
        maxLength: helpers.withMessage(
          'شماره همراه باید 11 رقم باشد',
          maxLength(11)
        )
      },
      estate: {
        required: helpers.withMessage('استان را انتخاب کنید', required)
      },
      city: { required: helpers.withMessage('شهر را انتخاب کنید', required) },
      nationalId: {
        required: helpers.withMessage('کد ملی خود را وارد کنید', required),
        minLength: helpers.withMessage(
          'کد ملی باید 10 رقم باشد',
          minLength(10)
        ),
        maxLength: helpers.withMessage('کد ملی باید 10 رقم باشد', maxLength(10))
      },
      grade: {
        required: helpers.withMessage(
          'لطفا مفطع تحصیلی خود را وارد کنید',
          required
        )
      },
      orientation: {
        required: helpers.withMessage(
          'لطفا رشته تحصیلی خود را وارد کنید',
          required
        )
      }
    };

    const onSubmit = () => {
      // For Now Just Console.log The Data

      if (!v$.value.$invalid) {
        console.log('Everything Working Correctly');
      } else {
        console.log('Something is Wrong');
      }
    };
    const v$ = useVuelidate(rules, model);
    return { styles, v$, onSubmit, model, goOnePageBack };
  }
});
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;

  .nav {
    width: 100%;
    height: 50px;
    padding: 10px 15px 10px 10px;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin: 7px 0 7px 2px;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
      display: inline-block;
    }
  }
  .img-container {
    width: 100%;
    margin: 3rem auto 1rem auto;
    display: flex;
    justify-content: center;
    .img {
      position: relative;
    }
    .camera {
      position: absolute;
      bottom: 0;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      background: #d21921;
      border-radius: 15px;
      padding: 2px;
      width: 32.5px;
      height: 32.5px;
      transform: translateY(50%);
    }
    .avatar {
      border: solid 6.2px rgba(210, 25, 33, 0);
      max-width: 104px;
      max-height: 104px;
      padding: 10px;
      border-style: solid;
      border-width: 5.6px;
      border-image-slice: 1;
      border-radius: 50px;
      padding: 2px;
      border: solid 4.4px white;
      outline: 0.4rem solid #d42527;
    }
  }

  //
  form {
    width: 80%;
    max-width: 500px;
    margin: 2rem auto 1rem auto;

    .input {
      width: 100%;
      border-radius: 10px;
      background-color: #fff;
      margin: 1rem 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'span input input';
      align-items: center;
      padding: 0.5rem;
      span {
        text-align: right;
        color: #949494;
        font-size: 14px;
        grid-area: Span;
        min-width: 5rem;
      }

      input {
        border: none;
        outline: none;
        padding-right: 0.5rem;
        grid-area: input;
      }
    }

    .select {
      width: 100%;
      border-radius: 10px;
      background-color: #fff;
      margin: 1rem 0;
      padding: 0.5rem;

      select {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        color: #949494;
        background: transparent;
      }
    }
  }
}
</style>