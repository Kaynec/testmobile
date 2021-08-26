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
        <div class="form-group col-md-4 col-sm-12">
          <label> سوالات مرتبط </label>
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
                @blur="v$.questions.$touch()"
                type="checkbox"
              />
              {{ question.text }}
            </label>
          </div>
        </div>
        <span
          v-for="error in v$.questions.$errors"
          :key="error.id"
          class="form-text text-danger"
        >
          {{ error.$message }}
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
                type="radio"
                v-model="model.course"
                @blur="v$.course.$touch()"
                :value="{ _id: course._id }"
              />

              {{ course.title }}
            </label>
          </div>
        </div>
        <span
          v-for="error in v$.course.$errors"
          :key="error.id"
          class="form-text text-danger"
        >
          {{ error.$message }}
        </span>
      </div>
      <!--  -->

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
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
            course: {},
            questions: []
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
    /////////////////////////////////////////////////////////////////////////

    CourseServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        courses.value.push({
          title: data.title,
          _id: data._id
        });
      });
    });

    ///////////////////////////////////////////////////////////////////////////
    QuestionServiceApi.getAll({ session: { _id: model._id } }).then((res) => {
      res.data.data.forEach((question: any) => {
        questions.value.push(
          reactive({
            text: question.text,
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
          model.questions = reactive([]);
        });
      });
    }
    //

    const save = () => {
      // looping through the courses and questions to set the data of model
      questions.value.forEach((question: any) => {
        if (question.checked) model.questions.push({ _id: question._id });
      });
      /// error handeling
      v$.value.$touch();
      if (!v$.value.$invalid) {
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
      },
      questions: {
        $each: {
          _id: {
            required: helpers.withMessage(
              'id سوال انتخابی صحیح نیست ',
              required
            )
          }
        }
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
    // UI :: SHOW THE QUESTIONS AND COURSES OR NOT /////
    let showQuestion = ref<boolean>(false);
    let showCourse = ref<boolean>(false);
    //

    return {
      model,
      save,
      cancel,
      showQuestion,
      showCourse,
      questions,
      courses,
      v$
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
