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
            id="text"
            name="text"
            v-model="model.text"
          />
          <span class="form-text text-danger">
            <ErrorMessage name="text" />
          </span>
        </div>
        <!--  -->

        <div class="form-group col-md-4 col-sm-12">
          <label for="image"> تصویر سوال:</label>
          <Field
            type="file"
            accept="image/png, image/jpeg , image/svg"
            class="form-control"
            id="image"
            name="image"
            @change="onFileChange($event)"
          />
          <span class="form-text text-danger">
            <ErrorMessage name="image" />
          </span>
        </div>
      </div>

      <!--  !!!!   Course    !!!!  -->
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
                required
                type="radio"
                :value="course"
                v-model="model.course"
              />

              {{ course.title }}
            </label>
          </div>

          <span>
            <ErrorMessage name="course" />
          </span>
        </div>
        <!-- Session -->
        <div class="form-group col-md-4 col-sm-12">
          <label> فصل مرتبط </label>
          <div class="selectBox" @click="() => (showSession = !showSession)">
            <select>
              <option>Select options</option>
            </select>
            <div class="overSelect"></div>
          </div>

          <div
            id="checkBoxes"
            :style="[showSession ? { display: 'block' } : { display: 'none' }]"
          >
            <label v-for="session in sessions" :key="session.title">
              <input
                type="radio"
                required
                :value="session"
                v-model="model.session"
              />

              {{ session.title }}
            </label>
          </div>

          <span>
            <ErrorMessage name="session" />
          </span>
        </div>
      </div>
      <!-- New Row -->

      <!--  -->
      <span class="span"> امکانات </span>
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">عنوان سوال :</label>
          <input
            type="text"
            class="form-control"
            v-model="model.options[0].text"
          />
        </div>
        <!-- first option img -->
        <div class="form-group col-md-4 col-sm-12">
          <label> تصویر :</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="form-control"
            :value="model.options[0].image"
            @change="onFileChange($event, 0)"
          />
        </div>
      </div>
      <!--  Second Option Text  -->
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">عنوان سوال :</label>
          <input
            type="text"
            class="form-control"
            id="text"
            v-model="model.options[1].text"
          />
        </div>
        <!--  Second Option Img -->
        <div class="form-group col-md-4 col-sm-12">
          <label for="image"> تصویر :</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="form-control"
            id="image"
            :value="model.options[1].image"
            @change="onFileChange($event, 1)"
          />
        </div>
      </div>
      <!--  -->
      <!-- Third Option Text  -->

      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">عنوان سوال :</label>
          <input
            type="text"
            class="form-control"
            id="text"
            v-model="model.options[2].text"
          />
        </div>
        <!--  Third Option Img -->
        <div class="form-group col-md-4 col-sm-12">
          <label for="image"> تصویر :</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="form-control"
            id="image"
            :value="model.options[2].image"
            @change="onFileChange($event, 2)"
          />
        </div>
      </div>
      <!--  -->

      <!--  -->
      <div class="form-row">
        <!-- Fourth Option Text  -->
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">عنوان سوال :</label>
          <input
            type="text"
            class="form-control"
            id="text"
            v-model="model.options[3].text"
          />
        </div>
        <!--  Fourth Option Img -->
        <div class="form-group col-md-4 col-sm-12">
          <label for="image"> تصویر :</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="form-control"
            id="image"
            :value="model.options[3].image"
            @change="onFileChange($event, 3)"
          />
        </div>
      </div>
      <span>
        <Errormessage name="options" />
      </span>
      <!--  -->
      <!-- End Of Row -->

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
    model.image = model.image ? model.image : '';
    // Setting The Options Array Of The Model
    model.options = model.options || [
      { image: '', text: '' },
      { image: '', text: '' },
      { image: '', text: '' },
      { image: '', text: '' }
    ];
    //
    model.course = model.course ? model.course : {};
    model.session = model.session ? model.session : {};
    (window as any).jalaliDatepicker.startWatch();

    // All The Questions And Courses
    let courses = reactive([] as any);
    let sessions = reactive([] as any);
    // // /// /// /// /// / / /  // / / / / / Change The Image to Base64
    const getBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    //
    CourseServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        if (data._id === model.course) model.course = { _id: model.course };
        else courses.push(data);
      });
    });
    // we use this syntax because the session and course are initially strings
    SessionServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        if (data._id === model.course) model.session = { _id: model.session };
        else sessions.push(data);
      });
    });

    // // // // // // /// /// /// // // /// /// /// /// /// Handle The Image
    const onFileChange = (e: any, idx: number | string = 'test') => {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      getBase64(files[0]).then((strFile) => {
        idx === 'test'
          ? (model.image = strFile)
          : console.log(
              model.options[idx].image,
              strFile,
              (model.options[idx].image = strFile)
            );
      });
      console.log(model);
      // (model.options[idx].image = strFile
    };

    const save = () => {
      // if user has an id update it with the current model otherwise create one
      //   model course right now is the full object of course , we just want the id

      if (model._id) {
        let tmp: any = {
          title: model.title,
          code: model.code,
          options: model.options
        };
        QuestionServiceApi.update(model._id, tmp).then((result) => {
          alertify.success(result.data.message);
          router.push({
            name: 'session'
          });
        });
      } else {
        QuestionServiceApi.create(model).then((result) => {
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

    let showSession = ref<boolean>(false);
    let showCourse = ref<boolean>(false);
    let showOptions = ref<boolean>(false);
    // setting item //
    const validateSchema = computed(() => {
      yup.setLocale(locale);
      return yup.object({
        text: yup.string().required(),
        image: yup.mixed().optional(),
        session: yup.object({ _id: yup.string().required() }).required(),
        course: yup.object({ _id: yup.string().required() }).required(),
        options: yup
          .array()
          .of(
            yup.object({
              text: yup.string().required(),
              image: yup.mixed().optional(),
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
      showSession,
      showOptions,
      showCourse,
      courses,
      onFileChange
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

.span {
  font-weight: 700;
  margin: 2rem 0;
  color: #010127 207, 236;
  font-family: helvetica, arial;
  font-size: 2rem;
  border-bottom: 4px solid gray;
}
</style>
