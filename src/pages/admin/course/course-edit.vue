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
            <label v-for="session in sessions" :key="session._id">
              <input
                name="sessions"
                v-model="session.checked"
                type="checkbox"
              />
              {{ session.title }}
            </label>
          </div>
        </div>
        <span
          v-for="error in v$.sessions.$errors"
          :key="error"
          class="form-text text-danger"
        >
          {{ error.$message }}
        </span>
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
            orientation: '',
            sessions: reactive([])
          })
        : model;
    // we push the sessions from database to this array
    const sessions = reactive([] as any[]);
    let show = ref<any>(false);
    // getting data from the database
    SessionServiceApi.getAll().then((res) => {
      res.data.data.forEach((ses: any) => {
        sessions.push(
          reactive({
            title: ses.title,
            _id: ses._id,
            checked: false
          })
        );
      });

      // model sessions get turned into a array of strings when passed to the component so we have to convert value to object
      if (model.sessions != []) {
        model.sessions.forEach((ses: any) => {
          sessions.forEach((sesion: any) => {
            if (sesion._id === ses) sesion.checked = true;
            // we empty the sessions of model since we fill it back up later
            model.sessions = reactive([]);
          });
        });
      }
    });
    //
    const save = () => {
      v$.value.$touch();
      sessions.forEach((ses: any) => {
        // if the session equals true we push it to the sessions of model
        if (ses.checked === true) model.sessions.push({ _id: ses._id });
      });

      // if user has an id update it with the current model otherwise create one

      if (model._id) {
        let tmp = {
          title: model.title,
          code: model.code,
          orientation: model.orientation,
          sessions: model.sessions
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
    // showSelect
    const showSelect = () => {
      show.value = !show.value;
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
      },
      sessions: {
        $each: {
          _id: {
            required: helpers.withMessage(' Id نمیتواند خالی باشد', required)
          }
        }
      }
    }));

    const v$ = useVuelidate(rules, model);

    return {
      model,
      save,
      cancel,
      sessions,
      showSelect,
      show,
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
