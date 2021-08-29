<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.title}` : 'تعریف درس جدید' }}
    </h2>
    <form @submit.prevent="save" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">نام درس:</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="model.title"
          />
          <span
            v-for="error in v$.title.$errors"
            :key="error"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <div class="form-group col-md-4 col-sm-12">
          <label for="code">کد درس:</label>
          <input
            type="code"
            class="form-control"
            id="code"
            v-model="model.code"
          />
          <span
            v-for="error in v$.code.$errors"
            :key="error"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <div class="form-group col-md-4 col-sm-12">
          <label for="orientation"> رشته:</label>
          <input
            type="text"
            class="form-control"
            id="orientation"
            v-model="model.orientation"
          />
          <span
            v-for="error in v$.orientation.$errors"
            :key="error"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>
      <!--  -->
      <div class="customDiv" v-if="model._id">
        <h3 class="h3 text-end">فصل ها</h3>

        <span class="tag" v-for="session in sessions" :key="session.title">
          {{ session.title }}
        </span>
      </div>

      <!--  -->
      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.css';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.js';
import router from '@/router';
import { CourseServiceApi } from '@/api/services/admin/course-service';
import { SessionServiceApi } from '@/api/services/admin/session-service';
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
//
const alertify = require('@/assets/alertifyjs/alertify');

export default defineComponent({
  props: {
    course: {
      type: String,
      default: '{}'
    }
  },

  setup(props) {
    let model = reactive(JSON.parse(props.course));
    // This decides if model should be the same thing or re created
    model =
      JSON.stringify(model) === '{}'
        ? reactive({
            title: '',
            code: '',
            orientation: ''
          })
        : model;
    // we push the sessions from database to this array
    const sessions = reactive([] as any[]);
    // getting data from the database
    if (model._id) {
      SessionServiceApi.getAll({ _id: model._id }).then((res) => {
        res.data.data.forEach((ses: any) => {
          sessions.push(ses);
        });
      });
    }
    //
    const save = () => {
      v$.value.$touch();
      // if user has an id update it with the current model otherwise create one
      if (model._id) {
        let tmp = {
          title: model.title,
          code: model.code,
          orientation: model.orientation
        };
        //
        CourseServiceApi.update(model._id, tmp).then((result) => {
          alertify.success(result.data.message);
          router.push({
            name: 'course'
          });
        });
      } else {
        CourseServiceApi.create(model).then((result) => {
          alertify.success(result.data.message);
          router.push({
            name: 'course'
          });
        });
      }
    };
    // cancel
    const cancel = () => {
      router.push({
        name: 'course'
      });
      alertify.notify('cancelled action');
    };

    const rules = computed(() => ({
      title: {
        required: helpers.withMessage('اسم نباید خالی باشد', required),
        minLength: helpers.withMessage(
          'اسم باید بیشتر از 3 حرف باشد ',
          minLength(3)
        )
      },
      code: {
        required: helpers.withMessage('کد نباید خالی باشد', required),
        minLength: helpers.withMessage(
          'کد باید بیشتر از 4 رقم باشد',
          minLength(4)
        )
      },
      orientation: {
        required: helpers.withMessage('لطفا رشته را وارد کنید', required),
        minLength: helpers.withMessage(
          'رشته باید بیشتر از 2 رقم باشد',
          minLength(2)
        )
      }
    }));

    const v$ = useVuelidate(rules, model);

    return {
      model,
      save,
      cancel,
      sessions,
      v$
    };
  }
});
</script>

<style scoped lang="scss">
.customDiv {
  width: 50;
  margin: 0 auto;
  wordwrap: wrap;
}
.tag {
  margin: 0.5rem;
  font-weight: 600;
}
</style>
