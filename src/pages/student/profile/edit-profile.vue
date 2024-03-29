<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Spinner -->
  <div class="loader-parent" v-else-if="showThisWhileUplading">
    <div class="loading1"></div>
  </div>
  <!--  -->
  <div class="edit" v-else>
    <MinimalHeader title="ویرایش اطلاعات" />
    <div class="img-container">
      <div class="img">
        <img :src="imageUrl" class="avatar" />

        <img
          src="../../../assets/img/camera@2x.png"
          class="camera"
          alt="camera"
          @click="openCamera"
        />
        <input
          type="file"
          accept="image/x-png,image/jpeg,image/gif,image/svg"
          style="display: none"
          ref="imgInput"
          name="image"
          @input="uploadImage"
        />
      </div>

      <!-- Error For img -->
      <p
        v-for="error in v$.img.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
      <!--  -->
    </div>
    <!-- Form -->
    <form @submit.prevent="onSubmit">
      <div class="input">
        <span style="white-space: nowrap; padding: 0"> نام کاربری </span>
        <input
          type="text"
          @blur="v$.username.$touch()"
          v-model="model.username"
          maxlength="20"
        />
      </div>
      <p
        v-for="error in v$.username.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
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
      <div class="select">
        <select @blur="v$.province.$touch()" v-model="model.province">
          <option
            v-for="province in provinces"
            :value="province.name"
            :key="province.name"
          >
            {{ province.name }}
          </option>
        </select>
      </div>
      <p
        v-for="error in v$.province.$errors"
        :key="error.id"
        class="small text-bold text-danger text-center"
      >
        {{ error.$message }}
      </p>
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
import { defineComponent, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers, maxLength } from '@vuelidate/validators';
import { StudentAuthServiceApi } from '@/api/services/student/student-auth-service';
import { StudentActionTypes } from '@/store/modules/student/action-types';
import { store } from '@/store';
import router from '@/router';
import { provinces } from '@/assets/provinces';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
const alertify = require('@/assets/alertifyjs/alertify');

export default defineComponent({
  compo: { MinimalHeader },
  setup() {
    const showThisWhileUplading = ref(false);

    const goOnePageBack = () => router.go(-1);

    const imgInput = ref(null) as any;

    const model = reactive({
      username: store.getters.getCurrentStudent.username,
      phone: store.getters.getCurrentStudent.phone,
      nationalId: `${store.getters.getCurrentStudent.nationalId}`,
      province: store.getters.getCurrentStudent.province,
      img: ''
    });

    const imageUrl =
      `https://www.api.devnirone.ir/api/student/getProfileImage/${store.getters.getCurrentStudent.profileImage}` ||
      'https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png';

    // limit for pic is 10 Mb
    const limitSize = (value) => !helpers.req(value) || value.size < 10485760;

    const rules = {
      username: {
        required: helpers.withMessage(
          'لطفا  نام کاربری خود را وارد کنید',
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
      nationalId: {
        required: helpers.withMessage('کد ملی خود را وارد کنید', required),
        minLength: helpers.withMessage(
          'کد ملی باید 10 رقم باشد',
          minLength(10)
        ),
        maxLength: helpers.withMessage('کد ملی باید 10 رقم باشد', maxLength(10))
      },
      province: {
        required: helpers.withMessage('استان خود را وارد کنید', required)
      },
      img: {
        limitSize: helpers.withMessage(
          'حجم تصویر باید کمتر از 10 مگابایت باشد',
          limitSize
        )
      }
    };

    const onSubmit = async () => {
      v$.value.$touch();
      // If Something isn't filled return
      if (v$.value.$invalid) return;
      else {
        showThisWhileUplading.value = true;

        const { img, ...restOfModel } = model as any;

        const temp = new FormData();

        const userEditedInfo = (await StudentAuthServiceApi.editStudent(
          restOfModel
        )) as any;

        // if user selected a img
        if (img != '') {
          temp.append('profile', img);
          const profileRes = await StudentAuthServiceApi.uploadProfile(temp);
        }

        // If The res is okay
        if (userEditedInfo.data) {
          showThisWhileUplading.value = false;
          // / Update The Current user
          store.dispatch(StudentActionTypes.CURRENT_STUDENT);
          alertify.success('کاربر با موفقیت ویرایش شد');
          router.push({ name: 'MyProfile' });
        }
      }
    };

    const v$ = useVuelidate(rules, model);
    // Open The Gallery On Click
    const openCamera = () => imgInput.value.click();
    // assign The File to a variable

    const uploadImage = async () => (model.img = await imgInput.value.files[0]);

    return {
      v$,
      onSubmit,
      model,
      goOnePageBack,
      provinces,
      imgInput,
      openCamera,
      uploadImage,
      StudentAuthServiceApi,
      store,
      showThisWhileUplading,
      imageUrl
    };
  }
});
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  height: 100%;
  position: relative;
  padding-top: 8vh;
  .img-container {
    width: 100%;
    margin: 3rem auto 1rem auto;
    display: flex;
    justify-content: center;
    // background: red;
    .img {
      position: relative;
      border: 0.4rem solid #d42527;
      border-radius: 50px;
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
      position: relative;
      width: 6rem;
      height: 6rem;
      border-radius: 50px;
      border: solid 4.4px white;
    }
  }

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
        display: inline-block;
        text-align: right;
        color: #949494;
        font-size: 10px;
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

    .radio {
      display: flex;
      align-items: center;

      input {
        margin-inline: 1rem;
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
        font-size: 11px;
        color: #949494;
        background: transparent;
      }

      option {
        font-size: 14px;
      }
    }
  }
}
</style>
