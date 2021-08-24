<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.title}` : 'تعریف فصل جدید' }}
    </h2>
    <Form @submit="save" :validation-schema="validateSchema" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">نام فصل:</label>
          <Field
            type="text"
            class="form-control"
            id="title"
            name="title"
            v-model="model.title"
          />
          <span class="form-text text-danger">
            <ErrorMessage name="title" />
          </span>
        </div>
        <!--  -->
        <div class="form-group col-md-4 col-sm-12">
          <label for="username"> کد فصل:</label>
          <Field
            type="text"
            class="form-control"
            id="code"
            name="code"
            v-model="model.code"
          />
          <span class="form-text text-danger">
            <ErrorMessage name="code" />
          </span>
        </div>
        <!--  -->
        <!--  !!!!   Courses   !!!! -->
      </div>
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label> سوال مرتبط </label>
          <div class="selectBox" @click="() => (showQuestion = !showQuestion)">
            <select>
              <option>Select options</option>
            </select>
            <div class="overSelect"></div>
          </div>

          <div
            id="checkBoxes"
            :style="[showQuestion ? { display: 'block' } : { display: 'none' }]"
          >
            <label v-for="question in questions" :key="question.text">
              <input
                name="questions"
                v-model="question.checked"
                type="checkbox"
              />
              {{ question.title }}
            </label>
          </div>
        </div>
        <span>
          <ErrorMessage name="questions" />
        </span>
      </div>
      <!--  !!!!   Questions    !!!!  -->
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label> درس مرتبط </label>
          <div class="selectBox" @click="() => (showCourse = !showCourse)">
            <select>
              <option>Select options</option>
            </select>
            <div class="overSelect"></div>
          </div>

          <div
            id="checkBoxes"
            :style="[showCourse ? { display: 'block' } : { display: 'none' }]"
          >
            <label v-for="course in courses" :key="course.title">
              <input
                name="course"
                required
                type="radio"
                v-model="model.course"
                :value="{ _id: course._id }"
              />

              {{ course.title }}
            </label>
          </div>
        </div>
        <span v-if="!!courseError" class="error">
          {{ courseError }}
        </span>
      </div>
      <!--  -->

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </Form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.css';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.js';

import { CourseServiceApi } from '@/api/services/admin/course-service';
import { QuestionServiceApi } from '@/api/services/admin/question-service';
import { SessionServiceApi } from '@/api/services/admin/session-service';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import locale from '../../../../lang/locale.json';
import router from '@/router';
const alertify = require('@/assets/alertifyjs/alertify');

export default defineComponent({
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    session: {
      type: String,
      default: '{}'
    }
  },

  setup(props) {
    let model = reactive(JSON.parse(props.session));

    model.questions = model.questions ? model.questions : [];
    model.course = model.course ? model.course : {};
    (window as any).jalaliDatepicker.startWatch();

    // All The Questions And Courses
    const questions = ref([] as any);

    let courses = ref([] as any);
    watch(model, function () {
      console.log(model);
    });
    // if it's the one we chose then it should be checked otherwise un checked
    if (model.course && typeof model.course === 'string') {
      model.course = { _id: model.course };
    }
    /////////////////////////////////////////////////////////////////////////

    CourseServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        if (data._id === model.course) {
          courses.value.push({
            title: data.title,
            _id: data._id,
            checked: true
          });
        } else
          courses.value.push({
            title: data.title,
            _id: data._id,
            checked: false
          });
      });
    });

    ///////////////////////////////////////////////////////////////////////////
    QuestionServiceApi.getAll().then((res) => {
      res.data.data.forEach((question: any) => {
        questions.value.push(
          reactive({
            title: question.title,
            _id: question._id,
            checked: false
          })
        );
      });
      // model sessions get turned into a array of strings in the database so we have to convert value to object
    });
    if (model.sessions) {
      model.sessions.forEach((ques: any) => {
        questions.value.forEach((question: any) => {
          if (question._id === ques) question.checked = true;
          // we empty the sessions of model since we fill it back up later
          model.questions = [];
        });
      });
    }
    //

    const save = () => {
      // looping through the courses and questions to set the data of model
      questions.value.forEach((question: any) => {
        if (question.checked) model.questions.push({ _id: question._id });
      });

      // choosing to update  or create a new model
      if (model._id) {
        let tmp: any = {
          title: model.title,
          code: model.code,
          questions: model.questions
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
    };
    // cancel //
    const cancel = () => {
      router.push({
        name: 'session'
      });
      alertify.notify('cancelled action');
    };
    // UI :: SHOW THE QUESTIONS AND COURSES OR NOT /////
    let showQuestion = ref<boolean>(false);
    let showCourse = ref<boolean>(false);
    let courseError = ref('');
    let questionError = ref('');
    //
    const validateSchema = computed(() => {
      yup.setLocale(locale);
      return yup.object({
        title: yup.string().min(3).max(255).required().label('عنوان فصل'),
        code: yup.string().required().label('کد'),
        course: yup
          .object({
            _id: yup.string().required()
          })
          .required()
          .label('درس'),
        questions: yup
          .array()
          .of(
            yup.object({
              _id: yup.string().required()
            })
          )
          .optional()
          .label('سوالات')
      });
    });

    return {
      model,
      save,
      validateSchema,
      cancel,
      showQuestion,
      showCourse,
      questions,
      courses,
      courseError,
      questionError
    };
  }
});
</script>

<style scoped>
.multipleSelection {
  width: 300px;
  background-color: #bcc2c1;
}

.selectBox {
  position: relative;
}

.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#checkBoxes {
  border: 1px #8df5e4 solid;
}
#checkBoxes label {
  display: block;
}

#checkBoxes label:hover {
  background-color: #4f615e;
}
</style>
