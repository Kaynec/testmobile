<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.title}` : 'تعریف فصل جدید' }}
    </h2>
    <form @submit.prevent="save" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="title">نام فصل:</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="model.title"
            @blur="v$.title.$touch()"
          />
          <span
            v-for="error in v$.title.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <!--  -->
        <div class="form-group col-md-4 col-sm-12">
          <label for="code"> کد فصل:</label>
          <input
            type="text"
            class="form-control"
            id="code"
            v-model="model.code"
            @blur="v$.code.$touch()"
          />
          <span
            v-for="error in v$.code.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <!--  !!!!   Courses   !!!! -->
      </div>
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12" v-if="!model._id">
          <label> درس مرتبط </label>
          <select
            v-model="model.course"
            class="form-select"
            aria-label="فصل را انتخاب کنید  "
          >
            <option
              v-for="course in courses"
              :key="course.title"
              @blur="v$.course.$touch()"
              :value="{ _id: course._id }"
            >
              {{ course.title }}
            </option>
          </select>
          <span
            v-for="error in v$.course.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.css';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.js';

import { CourseServiceApi } from '@/api/services/admin/course-service';
import { QuestionServiceApi } from '@/api/services/admin/question-service';
import { SessionServiceApi } from '@/api/services/admin/session-service';
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
const alertify = require('@/assets/alertifyjs/alertify');

export default defineComponent({
  props: {
    session: {
      type: String,
      default: '{}'
    }
  },

  setup(props) {
    let model = reactive(JSON.parse(props.session));

    model =
      JSON.stringify(model) === '{}'
        ? reactive({
            title: '',
            code: '',
            course: {}
          })
        : model;
    //
    (window as any).jalaliDatepicker.startWatch();

    // All The Questions And Courses
    const questions = ref([] as any);
    const courses = ref([] as any);
    // if it's the one we chose then it should be checked otherwise un checked
    if (model.course && typeof model.course === 'string') {
      model.course = reactive({ _id: model.course });
    }
    //////////////////////////////

    CourseServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        courses.value.push({
          title: data.title,
          _id: data._id
        });
      });
    });

    if (model._id) {
      QuestionServiceApi.getAll({ _id: model._id }).then((res) => {
        res.data.data.forEach((data: any) => {
          questions.value.push({ title: data.title, _id: data });
        });
      });
    }
    //
    const save = () => {
      /// error handeling
      v$.value.$touch();
      if (!v$.value.$invalid) {
        if (model._id) {
          let tmp: any = {
            title: model.title,
            code: model.code
          };
          SessionServiceApi.update(model._id, tmp).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'session'
            });
          });
        } else {
          SessionServiceApi.create(model).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'session'
            });
          });
        }
      }
    };

    // Validations
    const rules = computed(() => ({
      title: {
        required: helpers.withMessage('عتوان فصل را وارد کنید', required),
        minLength: helpers.withMessage(
          'عتوان باید حدقا 3 حرف باشد',
          minLength(3)
        )
      },
      code: {
        required: helpers.withMessage('کد فصل را وارد کنید', required),
        minLength: helpers.withMessage(
          'عتوان باید حدقا 2 حرف باشد',
          minLength(3)
        )
      },
      course: {
        required: helpers.withMessage(' لطفا یک درس را انتخاب کنید', required)
      }
    }));

    const v$ = useVuelidate(rules, model);
    // cancel //
    const cancel = () => {
      router.push({
        name: 'session'
      });
      alertify.notify('cancelled action');
    };
    let showCourse = ref<boolean>(false);
    //

    return {
      model,
      save,
      cancel,
      showCourse,
      questions,
      courses,
      v$
    };
  }
});
</script>

<style scoped lang="scss">
.customDiv {
  margin: 2rem auto;
  wordwrap: wrap;
}
.tag {
  margin: 0.5rem;
  font-weight: 600;
}
</style>
