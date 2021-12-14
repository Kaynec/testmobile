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
            عنوان سوال باید بیشتر از سه حرف باشد
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
            @blur="v$.image.$touch()"
            @change="onFileChange($event)"
          />
          <span class="form-text text-danger" v-if="v$.image.$error"> </span>
        </div>
      </div>

      <!--  !!!!   Course    !!!!  -->
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12" v-if="!model._id">
          <label> درس مرتبط </label>
          <select
            v-model="model.course"
            class="form-select"
            aria-label="درس را انتخاب کنید "
            placeholder="Choose a course"
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
          <span class="form-text text-danger" v-if="v$.course.$error">
            لطفا یک گزینه را انتخاب کنید
          </span>
        </div>
        <div class="label" v-else>
          <h3>درس مرتبط</h3>
          <span v-if="currentCourse.title == null">Loading...</span>
          <span v-else-if="currentCourse.title">
            {{ currentCourse.title }}
          </span>
        </div>
        <!-- Session -->
        <div class="form-group col-md-4 col-sm-12" v-if="!model._id">
          <label> فصل مرتبط </label>

          <select
            v-model="model.session"
            class="form-select"
            aria-label="فصل را انتخاب کنید  "
          >
            <option
              v-for="session in filteredSessions"
              :key="session.title"
              @blur="v$.session.$touch()"
              :value="{ _id: session._id }"
            >
              {{ session.title }}
            </option>
          </select>

          <span class="form-text text-danger" v-if="v$.session.$error">
            لطفا یک گزینه را انتخاب کنید
          </span>
        </div>
        <div class="label" v-else>
          <h3>فصل مرتبط</h3>
          <span v-if="currentSession.title == null">Loading...</span>
          <span v-else-if="currentSession.title">
            {{ currentSession.title }}
          </span>
        </div>
      </div>
      <!-- New Row -->
      <h3 class="span">گزینه صحیح</h3>

      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username"> پاسخ 1 :</label>
          <textarea
            type="text"
            class="form-control"
            v-model="model.options[0].text"
          >
          </textarea>
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
        <span class="info"> گزینه صحیح ؟ </span>
        <div class="form-group col-md-4 p-5 col-sm-12 answer">
          <input
            class="form-check-input"
            type="radio"
            :value="true"
            name="isAnswer"
            v-model="model.options[0].isAnswer"
          />
        </div>
      </div>
      <hr class="mobile" />
      <!--  Second Option Text  -->
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username"> پاسخ 2 :</label>
          <textarea
            type="text"
            class="form-control"
            v-model="model.options[1].text"
          >
          </textarea>
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
        <span class="info"> گزینه صحیح ؟ </span>
        <div class="form-group col-md-4 p-5 col-sm-12 answer">
          <input
            class="form-check-input"
            type="radio"
            :value="true"
            name="isAnswer"
            v-model="model.options[1].isAnswer"
          />
        </div>
      </div>
      <hr class="mobile" />
      <!--  -->
      <!-- Third Option Text  -->
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username"> پاسخ 3 :</label>
          <textarea
            type="text"
            class="form-control"
            v-model="model.options[2].text"
          >
          </textarea>
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
        <span class="info"> گزینه صحیح ؟ </span>
        <div class="form-group col-md-4 p-5 col-sm-12 answer">
          <input
            class="form-check-input"
            type="radio"
            :value="true"
            name="isAnswer"
            v-model="model.options[2].isAnswer"
          />
        </div>
      </div>
      <hr class="mobile" />
      <!--  -->
      <!--  -->
      <div class="form-row">
        <!-- Fourth Option Text  -->
        <div class="form-group col-md-4 col-sm-12">
          <label for="username"> پاسخ 4 :</label>
          <textarea
            type="text"
            class="form-control"
            v-model="model.options[3].text"
          >
          </textarea>
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
        <span class="info"> گزینه صحیح ؟ </span>
        <div class="form-group col-md-4 p-5 col-sm-12 answer">
          <input
            class="form-check-input"
            type="radio"
            :value="true"
            name="isAnswer"
            v-model="model.options[3].isAnswer"
          />
        </div>
        <!--  -->
      </div>
      <br />
      <span
        class="form-text text-danger"
        v-for="error in v$.options.$errors"
        :key="error.id"
      >
        {{ error.$message }}
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
import { CourseServiceApi } from '@/api/services/admin/course-service';
import { QuestionServiceApi } from '@/api/services/admin/question-service';
import { SessionServiceApi } from '@/api/services/admin/session-service';
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
    // INCASE OF UPDATE SHOW THE ASSOCIATED SESSION AND COURSE
    let currentCourse = ref({});
    let currentSession = ref({});
    if (model._id) {
      SessionServiceApi.get(model.session).then((res) => {
        currentSession.value = res.data.data;
      });

      CourseServiceApi.get(model.course).then((res) => {
        currentCourse.value = res.data.data;
      });
    }
    // // // // // // // // // // // // // // // // // // // //

    model =
      JSON.stringify(model) === '{}'
        ? reactive({
            text: '',
            image: '',
            session: {},
            course: {},
            options: [
              {
                text: '',
                image: '',
                isAnswer: true
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
          })
        : model;
    //
    const imageRule = helpers.regex('image', /\.(gif|jpe?g|tiff|png)$/);
    const rules = computed(() => ({
      text: { required, minLength: minLength(3) },
      image: { imageRule },
      course: { required, _id: { required } },
      session: { required, _id: { required } },
      options: {
        required: helpers.withMessage('لطفا تمام موارد را کامل کنید', required),
        minLength: helpers.withMessage(
          'لطفا تمام موارد را کامل کنید',
          minLength(4)
        ),
        $each: {
          text: { required, minLength: minLength(3) },
          image: { imageRule },
          isAnswer: {}
        }
      }
    }));
    // All The Questions And Courses
    let courses = ref([] as any);
    let sessions = ref([] as any);

    // Change The Image to Base64
    const getBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    /////////////
    CourseServiceApi.getAll().then((res) => {
      res.data.data.forEach((data: any) => {
        courses.value.push(data);
      });
    });
    SessionServiceApi.getAll({}).then((res) => {
      res.data.data.forEach((data: any) => {
        sessions.value.push(data);
      });
    });
    //
    const filteredSessions = computed(() => {
      return sessions.value.filter((el: any) => el.course == model.course._id);
    });

    /// Handle The Image
    const onFileChange = (e: any, idx: number | string = 'test') => {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      getBase64(files[0]).then((strFile) => {
        idx === 'test'
          ? (model.image = strFile)
          : (model.options[idx].image = strFile);
      });
    };
    // validation
    const v$ = useVuelidate(rules, model);
    //
    const save = () => {
      model.course =
        typeof model.course === 'string'
          ? (model.course = { _id: model.course })
          : model.course;
      model.session =
        typeof model.session === 'string'
          ? (model.session = { _id: model.session })
          : model.session;
      // if user has an id update it with the current model otherwise create one
      model.options = model.options.map((el: any) => {
        if (!el.image) return { text: el.text, isAnswer: el.isAnswer };
        return { text: el.text, image: el.image, isAnswer: el.isAnswer };
      });
      v$.value.$touch();

      if (!v$.value.$invalid) {
        let tmp: any = {};
        model.image && (tmp.image = model.image);
        model.options && (tmp.options = model.options);
        model.text && (tmp.text = model.text);

        if (model._id) {
          QuestionServiceApi.update(model._id, tmp).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'question'
            });
          });
        } else {
          model.course && (tmp.course = model.course);
          model.session && (tmp.session = model.session);
          QuestionServiceApi.create(tmp).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'question'
            });
          });
        }
      }
    };
    // cancel //
    const cancel = () => {
      router.push({ name: 'question' });
      alertify.notify('cancelled action');
    };

    let showSession = ref<boolean>(false);
    let showCourse = ref<boolean>(false);
    return {
      model,
      save,
      cancel,
      showSession,
      showCourse,
      courses,
      sessions,
      onFileChange,
      v$,
      filteredSessions,
      currentCourse,
      currentSession
    };
  }
});
</script>
<style lang="scss" scoped>
.info {
  display: none;
}

.mobile {
  display: none;
}

.span {
  font-weight: 700;
  margin: 1rem;
  margin-right: 2rem;
  width: 85%;
  color: #010127 207, 236;
  font-family: helvetica, arial;
  font-size: 2rem;
  position: relative;
  font-size: 1.5rem;
  transform: translateY(100%);
  text-align: left;
}
textarea {
  resize: none;
}
.answer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  width: 40%;
  margin: 5rem 0 2rem 0;
  text-align: center;
  border-bottom: 2px solid rgb(111, 104, 104);
  span {
    font-size: larger;
    font-weight: 600;
    display: block;
    padding: 1rem 0 1rem 0;
  }
}

@media screen and (max-width: 800px) {
  .span {
    display: none;
  }

  .label {
    h3 {
      font-size: 1.5rem;
    }
    span {
      font-size: 1rem !important;
      padding: 0;
    }
  }
  .info {
    display: block;
    transform: translateY(250%);
    margin-right: 1rem;
  }
  .answer {
    justify-content: space-evenly;
  }
  .mobile {
    display: block;
    margin: 2rem 0 1rem 0;
  }
}
</style>
