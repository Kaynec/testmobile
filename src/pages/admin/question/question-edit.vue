<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.text}` : 'تعریف سوال جدید' }}
    </h2>
    <form @submit.prevent="save" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="text">عنوان سوال:</label>
          <input
            type="text"
            class="form-control"
            id="text"
            v-model="model.text"
            @blur="v$.text.$touch()"
          />
          <span class="form-text text-danger" v-if="v$.text.$error">
            Error
          </span>
        </div>
        <!--  -->

        <div class="form-group col-md-4 col-sm-12">
          <label for="image"> تصویر سوال:</label>
          <input
            type="file"
            accept="image/png, image/jpeg , image/svg"
            class="form-control"
            id="image"
            name="image"
            @change="onFileChange($event)"
          />
          <span class="form-text text-danger">
            <!-- <ErrorMessage name="image" /> -->
          </span>
        </div>
      </div>

      <!--  !!!!   Course    !!!!  -->
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12" v-if="!model._id">
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
                type="radio"
                :value="{ _id: course._id }"
                v-model="model.course"
              />

              {{ course.title }}
            </label>
          </div>

          <span class="form-text text-danger" v-if="v$.course.$error">
            لطفا درس مورد نظر را انتخاب کنید
          </span>
        </div>
        <!-- Session -->
        <div class="form-group col-md-4 col-sm-12" v-if="!model._id">
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
                :value="{ _id: session._id }"
                v-model="model.session"
              />

              {{ session.title }}
            </label>
          </div>

          <span class="form-text text-danger" v-if="v$.session.$error">
            لطفا فصل مورد نظر را انتخاب کنید
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
            @change="onFileChange($event, 0)"
          />
        </div>

        <!-- is answer -->
        <!--  -->
        <div class="form-group col-md-4 col-sm-12 answer">
          <label> ? isAnswer </label> <br />
          <label>
            <input
              type="radio"
              name="model.options[0].isAnswer"
              :value="true"
              v-model="model.options[0].isAnswer"
            />

            true
          </label>

          <label>
            <input
              type="radio"
              :value="false"
              name="model.options[0].isAnswer"
              v-model="model.options[0].isAnswer"
            />

            false
          </label>
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
            @change="onFileChange($event, 1)"
          />
        </div>
        <!--  -->
        <div class="form-group col-md-4 col-sm-12 answer">
          <label> ? isAnswer </label> <br />
          <label>
            <input
              type="radio"
              name="model.options[1].isAnswer"
              :value="true"
              v-model="model.options[1].isAnswer"
            />

            true
          </label>

          <label>
            <input
              type="radio"
              :value="false"
              name="model.options[1].isAnswer"
              v-model="model.options[1].isAnswer"
            />

            false
          </label>
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
            @change="onFileChange($event, 2)"
          />
        </div>
        <!--  -->
        <!--  -->
        <div class="form-group col-md-4 col-sm-12 answer">
          <label> ? isAnswer </label> <br />
          <label>
            <input
              type="radio"
              name="model.options[2].isAnswer"
              :value="true"
              v-model="model.options[2].isAnswer"
            />

            true
          </label>

          <label>
            <input
              type="radio"
              :value="false"
              name="model.options[2].isAnswer"
              v-model="model.options[2].isAnswer"
            />

            false
          </label>
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
            @change="onFileChange($event, 3)"
          />
        </div>
        <!--  -->
        <div class="form-group col-md-4 col-sm-12 answer">
          <label> ? isAnswer </label> <br />
          <label>
            <input
              type="radio"
              name="model.options[3].isAnswer"
              :value="true"
              v-model="model.options[3].isAnswer"
            />

            true
          </label>

          <label>
            <input
              type="radio"
              :value="false"
              name="model.options[3].isAnswer"
              v-model="model.options[3].isAnswer"
            />

            false
          </label>
        </div>
        <!--  -->
      </div>
      <br />
      <span>
        <!-- <ErrorMessage class="form-text text-danger" name="options" /> -->
      </span>
      <br />
      <!--  -->
      <!-- End Of Row -->

      <button class="btn btn-default ml-3 mt-4" @click="cancel">برگشت</button>
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
// import { Form, input, ErrorMessage } from 'vee-validate';
// import * as yup from 'yup';
// import locale from '../../../../lang/locale.json';
import router from '@/router';
const alertify = require('@/assets/alertifyjs/alertify');

import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

export default defineComponent({
  props: {
    question: {
      type: String,
      default: '{}'
    }
  },

  setup(props) {
    let model = reactive(JSON.parse(props.question));

    model =
      JSON.stringify(model) === '{}'
        ? {
            text: '',
            image: '',
            session: {},
            course: {},
            options: [
              {
                text: '',
                image: '',
                isAnswer: false
              },
              {
                text: '',
                image: '',
                isAnswer: false
              },
              {
                text: '',
                image: '',
                isAnswer: false
              },
              {
                text: '',
                image: '',
                isAnswer: false
              }
            ]
          }
        : model;
    //
    const imageRule = helpers.regex('image', /\.(gif|jpe?g|tiff|png)$/);
    const rules = computed(() => ({
      text: { required, minLength: minLength(3) },
      image: { imageRule },
      course: { required, _id: { required } },
      session: { required, _id: { required } },
      options: {
        required,
        each: {
          text: { required, minLength: minLength(3) },
          image: { imageRule },
          isAnswer: {}
        }
      }
    }));
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
        if (data._id === model.course || data._id === model.course._id)
          model.course = { _id: model.course };
        else courses.push(data);
      });
    });
    // we use this syntax because the session and course are initially strings
    SessionServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        if (data._id === model.course || data._id === model.session._id)
          model.session = { _id: model.session };
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
          : (model.options[idx] = {
              text: model.options[idx].text,
              image: strFile,
              isAnswer: model.options[idx].isAnswer
            });
      });
    };

    const save = () => {
      // if user has an id update it with the current model otherwise create one
      //   model course right now is the full object of course , we just want the id
      model.options = model.options.map((el: any) => {
        if (!el.image) return { text: el.text, isAnswer: el.isAnswer };
        return { text: el.text, image: el.image, isAnswer: el.isAnswer };
      });
      const createObject = () => {
        if (!model.image) {
          return {
            text: model.text,
            options: model.options,
            course: model.course,
            session: model.session
          };
        }
      };
      console.log(model);
      if (model._id) {
        let tmp: any = {
          text: model.text,
          image: model.image,
          options: model.options
        };
        QuestionServiceApi.update(model._id, tmp).then((result) => {
          alertify.success(result.data.message);
          router.push({
            name: 'question'
          });
        });
      } else {
        QuestionServiceApi.create(createObject() as any).then((result) => {
          alertify.success(result.data.message);
          router.push({
            name: 'question'
          });
        });
      }
    };
    // cancel //
    const cancel = () => {
      router.push({
        name: 'question'
      });
      alertify.notify('cancelled action');
    };

    let showSession = ref<boolean>(false);
    let showCourse = ref<boolean>(false);

    // validation

    const v$ = useVuelidate(rules, model);

    //

    // setting item //

    return {
      model,
      save,
      cancel,
      showSession,
      showCourse,
      courses,
      sessions,
      onFileChange,
      v$
    };
  }
});
</script>
<style lang="scss" scoped>
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
.answer {
  position: relative;
  right: 4rem;
  transform: translateY(50%);

  input {
    margin-inline: 5px;
  }
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
