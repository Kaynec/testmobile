<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.title}` : 'تعریف درس جدید' }}
    </h2>
    <Form @submit="save" :validation-schema="validateSchema" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label for="username">نام درس:</label>
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
        <div class="form-group col-md-4 col-sm-12">
          <label for="code">کد درس:</label>
          <Field
            type="code"
            class="form-control"
            id="code"
            name="code"
            v-model="model.code"
          />
          <span class="form-text text-danger">
            <ErrorMessage name="code" />
          </span>
        </div>
        <div class="form-group col-md-4 col-sm-12">
          <label for="orientation"> رشته:</label>
          <Field
            type="text"
            class="form-control"
            id="orientation"
            name="orientation"
            v-model="model.orientation"
          />
          <span class="form-text text-danger">
            <ErrorMessage name="orientation" />
          </span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4 col-sm-12">
          <label> فصل ها </label>
          <div class="selectBox" @click="showSelect()">
            <select>
              <option>Select options</option>
            </select>
            <div class="overSelect"></div>
          </div>

          <div
            id="checkBoxes"
            :style="[show ? { display: 'none' } : { display: 'block' }]"
          >
            <label
              v-for="session in sessions"
              :for="session.title"
              :key="session.title"
            >
              <Field
                @change="setItem($event, session)"
                :checked="session.checked"
                name="sessions"
                type="checkbox"
              />
              {{ session.title }}
            </label>
          </div>
        </div>
        <span>
          <ErrorMessage name="sessions" />
        </span>
      </div>

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </Form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.css';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.js';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import locale from '../../../../lang/locale.json';
import router from '@/router';
import { CourseServiceApi } from '@/api/services/admin/course-service';
import { SessionServiceApi } from '@/api/services/admin/session-service';
const alertify = require('@/assets/alertifyjs/alertify');

export default defineComponent({
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    course: {
      type: String,
      default: '{}'
    }
  },

  setup(props) {
    let model = reactive(JSON.parse(props.course));
    if (model.sessions) {
      model.sessions = model.sessions.map((ses: any) => {
        if (typeof ses === 'string') return { _id: ses };
      });
    } else {
      model.sessions = [];
    }

    //
    (window as any).jalaliDatepicker.startWatch();
    //
    const sessions = reactive([] as any[]);
    let show = ref<any>(false);

    SessionServiceApi.getAll().then((res) => {
      res.data.data.forEach((ses: any) => {
        sessions.push(ses);
      });
      model.sessions.forEach((item: any) => {
        sessions.forEach((ses: any) => {
          if (ses._id === item._id) ses.checked = true;
          console.log(item.checked);
        });
      });
    });
    // check or not check of the input
    //
    const save = () => {
      console.log(model);
      // checking for duplicates
      function removeDuplicates(originalArray: any, prop: any) {
        let newArray: any = [];
        let lookupObject: any = {};

        for (var i in originalArray) {
          lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
          newArray.push(lookupObject[i]);
        }
        return newArray;
      }

      model.sessions = removeDuplicates(model.sessions, '_id');

      // if user has an id update it with the current model otherwise create one
      if (model._id) {
        let tmp = {
          title: model.title,
          code: model.code,
          orientation: model.orientation,
          sessions: model.sessions
        };
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
    // set the items

    const setItem = (e: any, object: any) => {
      const obj = { _id: object._id };
      if (e.target.checked == false) {
        model.sessions = model.sessions.filter((el: any) => el._id != obj._id);
      } else if (e.target.checked) {
        model.sessions = [...model.sessions, obj];
      }
      console.log(model);
    };

    // cancel
    const cancel = () => {
      router.push({
        name: 'course'
      });
      alertify.notify('cancelled action');
    };
    // showSelect
    const showSelect = () => {
      show.value = !show.value;
    };

    const validateSchema = computed(() => {
      yup.setLocale(locale);
      return yup.object({
        title: yup.string().required().label('نام درس'),
        code: yup.string().required().label('کد درس'),
        orientation: yup.string().required().label(' رشته'),
        sessions: yup
          .array()
          .of(
            yup.object({
              _id: yup.string().required()
            })
          )
          .optional()
          .nullable()
      });
    });
    return {
      model,
      save,
      validateSchema,
      cancel,
      sessions,
      showSelect,
      show,
      setItem
    };
  }
});
</script>

<style>
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
