<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.title}` : 'تعریف سوال جدید' }}
    </h2>
    <Form @submit="save" :validation-schema="validateSchema" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">عنوان سوال:</label>
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
          <label for="username"> کد سوال:</label>
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
            <label
              v-for="question in questions"
              :for="question.title"
              :key="question.title"
            >
              <Field
                name="questions"
                :id="question.title"
                :value="JSON.stringify(question)"
                type="checkbox"
                @change="setItem"
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
              <Field
                name="course"
                type="radio"
                :value="course"
                v-model="model.course"
              />

              {{ course.title }}
            </label>
          </div>
        </div>
        <span>
          <ErrorMessage name="course" />
        </span>
      </div>
      <!--  -->

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </Form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
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
    let questions = [
      { title: 'One', _id: '1' },
      { title: 'Two', _id: '2' },
      { title: 'Three', _id: '3' },
      { title: 'Four', _id: '4' },
      { title: 'Five', _id: '5' }
    ] as any;
    let courses = [] as any;
    //
    CourseServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        courses.push(data);
      });
    });
    QuestionServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        questions.push(data);
      });
    });
    // // // // // // /// /// /// // // /// /// /// /// ///

    const save = () => {
      // if user has an id update it with the current model otherwise create one
      //   model course right now is the full object of course , we just want the id
      model.course = { _id: model.course._id };
      console.log(model);

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

    let showQuestion = ref<boolean>(false);
    let showCourse = ref<boolean>(false);
    // setting item
    const setItem = (e: any) => {
      let object = JSON.parse(e.target.value);
      object = { _id: object._id };
      if (e.target.checked == false) {
        model.questions = model.questions.filter(
          (el: any) => el._id != object._id
        );
      } else if (e.target.checked) {
        model.questions = [...model.questions, object];
      }
    };
    const validateSchema = computed(() => {
      yup.setLocale(locale);
      return yup.object({
        text: yup.string().required(),
        image: yup.string().optional(),
        session: yup.object({ _id: yup.string().required() }).required(),
        course: yup.object({ _id: yup.string().required() }).required(),
        options: yup
          .array()
          .of(
            yup.object({
              text: yup.string().required(),
              image: yup.string().optional(),
              isAnswer: yup.boolean().optional()
            })
          )
          .length(4)
          .required()
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
      setItem
    };
  }
});
</script>
