<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.title}` : 'تعریف آزمون جدید' }}
    </h2>
    <form @submit.prevent="save" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-4 flex col-sm-12 center-block">
          <label for="title">عنوان :</label>
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
          <label for="birthdate">تاریخ :</label>
          <input
            type="text"
            class="form-control"
            v-model="model.date"
            data-jdp
          />
        </div>
        <span
          v-for="error in v$.date.$errors"
          :key="error.id"
          class="form-text text-danger"
        >
          {{ error.$message }}
        </span>

        <!--  -->
        <!--  -->
        <div class="form-group col-md-2 col-sm-12">
          <label>مدت زمان آزمون :</label>
          <input type="number" class="form-control" v-model="model.time" />
        </div>
        <span
          v-for="error in v$.time.$errors"
          :key="error.id"
          class="form-text text-danger"
        >
          {{ error.$message }}
        </span>
        <!--!!!!!!!!-->
      </div>

      <!--  -->

      <span class="span">سوالات آزمون</span>
      <div
        class="form-row"
        v-for="(course, index) in model.courses"
        :key="course.title"
      >
        <div class="form-group col-md-4 col-sm-12">
          <label for="birthdate"> درس :</label>
          <select class="form-select" v-model="course.course">
            <option
              v-for="Course in filteredCourses(Course)"
              :value="Course"
              :key="Course._id"
            >
              {{ Course.title }}
            </option>
          </select>
        </div>
        <!--  -->
        <div class="form-group col-md-4 col-sm-12">
          <label> تعداد سوالات این درس در آزمون :</label>
          <input type="number" class="form-control" v-model="course.number" />
        </div>
        <div class="div">
          <button
            type="button"
            class="btn btn-default"
            @click="deleteCourse(index)"
          >
            حذف درس
          </button>
        </div>
        <span
          v-for="error in v$.courses.$errors"
          :key="error.id"
          class="form-text text-danger"
        >
          {{ error.$message }}
        </span>
      </div>

      <!--  -->
      <div class="form-group col-md-4 col-sm-12">
        <button class="btn btn-primary ml-3 mt-4" @click="addCourse()">
          اضافه کردن درس
        </button>
      </div>

      <!--  -->

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, computed, ref } from 'vue';
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { CourseServiceApi } from '@/api/services/admin/course-service';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.css';
import '@majidh1/jalalidatepicker/dist/jalaliDatepicker.js';
import { ExamServiceApi } from '@/api/services/admin/exam-service';
const alertify = require('@/assets/alertifyjs/alertify');
export default defineComponent({
  props: {
    exam: {
      type: String,
      default: '{}'
    }
  },

  setup(props) {
    let model = reactive(JSON.parse(props.exam));
    (window as any).jalaliDatepicker.startWatch();
    model =
      JSON.stringify(model) === '{}'
        ? reactive({
            title: '',
            date: '',
            time: 0,
            courses: reactive([{ course: {}, number: 0 }])
          })
        : model;

    //
    let Courses = ref<any>([]);
    CourseServiceApi.getAll().then((res) => {
      res.data.data.forEach((el: any) => {
        Courses.value.push(el);
      });
    });

    //
    const addCourse = () => model.courses.push({ course: {}, number: 0 });
    const deleteCourse = (idx: number) =>
      (model.courses = model.courses.filter(
        (course: any, index: number) => index != idx
      ));
    //

    const save = () => {
      /// error handeling
      v$.value.$touch();
      if (!v$.value.$invalid) {
        if (model._id) {
          let tmp: any = {};
          ExamServiceApi.update(model._id, tmp).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'exam'
            });
          });
        } else {
          ExamServiceApi.create(model._id).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'exam'
            });
          });
        }
      }
    };

    // Validations
    const rules = computed(() => ({
      title: {
        required: helpers.withMessage('عنوان آزمون ضروری است', required),
        minLength: helpers.withMessage(
          'عنوان باید بیشتر از 3حرف باشد',
          minLength(3)
        )
      },
      date: {
        required: helpers.withMessage('لطفا تاریخ آزمون را مشخص کنید', required)
      },
      time: {
        required: helpers.withMessage(
          'لطفا مدت زمان آزمون را مشخص کنید',
          required
        )
      },
      courses: {
        required: helpers.withMessage('لطفا حداقل یک مورد مشخص کنید', required),
        $each: {
          course: { required },
          number: { required }
        }
      }
    }));
    const filteredCourses = (course: any) => {
      return Courses.value.filter((cours: any) => {
        const tmp = model.courses.find(
          (el: any) => el.course._id == cours._id && el._id != course._id
        );
        return tmp == null;
      });
    };

    const v$ = useVuelidate(rules, model);
    // cancel //
    const cancel = () => {
      router.push({
        name: 'exam'
      });
      alertify.notify('cancelled action');
    };

    return {
      model,
      save,
      cancel,
      v$,
      Courses,
      addCourse,
      deleteCourse,
      filteredCourses
    };
  }
});
</script>

<style lang="scss" scoped>
.span {
  display: inline-block;
  margin: 1.5rem 0.75rem 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  border-bottom: 10px #ddd solid;
}
.div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  transform: translateY(10%);
}
</style>
