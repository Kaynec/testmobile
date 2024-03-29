<template>
  <div class="panel panel-default">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">دروس</h1>
          </div>
          <div class="col-sm-6">
            <button
              class="m-0 float-left btn btn-success"
              @click="createCourse()"
            >
              جدید
            </button>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <grid :columns="columns" :options="options" ref="grid"></grid>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { baseUrl } from '@/api/apiclient';
import grid from '@/modules/shared/grid.vue';
import router from '@/router';
const $ = require('jquery');
const alertify = require('../../../assets/alertifyjs/alertify');
import { CourseServiceApi } from '@/api/services/admin/course-service';
import { SessionServiceApi } from '@/api/services/admin/session-service';
// import { string } from 'yup/lib/locale';

export default defineComponent({
  components: { grid },
  setup() {
    // ref
    const grid = ref();
    // Data

    const columns = reactive([
      {
        label: 'نام درس',
        data: 'title',
        responsivePriority: 1,
        // type: () => {
        //   return typeof string;
        // },
        searchPanes: {
          orthogonal: 'sp',
          show: true
        }
      },
      { label: 'کد', data: 'code', responsivePriority: 3 },
      { label: 'رشته', data: 'orientation', responsivePriority: 3 },
      {
        className: 'edit-control',
        orderable: false,
        defaultContent: '',
        label: '',
        data: '_id',
        width: 100,
        action: 'read',
        render: function (data: any) {
          return `<button type="button" data-session-id="${data}" class="btn btn-default edit-button">فصل ها</button>`;
        },
        responsivePriority: 2
      },
      {
        className: 'edit-control',
        orderable: false,
        defaultContent: '',
        label: '',
        data: '_id',
        action: 'update',
        width: 100,
        render: function (data: any) {
          return `<button type="button" data-edit-id="${data}" class="btn btn-default edit-button">ویرایش</button>`;
        },
        responsivePriority: 1
      },
      {
        label: '',
        data: '_id',
        action: 'delete',
        width: 100,
        render: function (data: any) {
          return `<button type="button" data-delete-id="${data}" class="btn btn-danger edit-button">حذف</button>`;
        },
        responsivePriority: 1
      }
    ]);

    const options = reactive({
      gridName: 'course-grid',
      url: `${baseUrl}course`,
      type: 'GET'
      // data: (d: any) =< {
      //   d.extra = 111;
      // }
    });

    const editCourse = (course: any) => {
      router.push({
        name: 'course-edit',
        params: { course: JSON.stringify(course) }
      });
    };

    const deleteCourse = (course: any) => {
      const allQuestions = async () => {
        const Questions = await SessionServiceApi.getAll({
          course: { _id: course._id }
        })
          .then((res) => {
            return res.data.data.length > 0;
          })
          .then((res) => {
            return res;
          });
        return await Questions;
      };
      allQuestions().then((res) => {
        if (res === true) {
          alertify.defaults.glossary.ok = 'بله';
          alertify.alert('هشدار', 'لطفا اول فصل های این درس را حذف کنید');
        } else {
          alertify.defaults.glossary.ok = 'خیر';
          alertify.defaults.glossary.cancel = 'بله';
          alertify.confirm('حذف', 'آیا اطمینان دارید؟', function (e: any) {
            if (e) {
              CourseServiceApi.delete(course._id).then((result) => {
                alertify.success(result.data.message);
                (grid.value as any).getDatatable().ajax.reload();
              });
            }
          });
        }
      });
    };

    const createCourse = () => {
      router.push({
        path: 'course-create',
        params: { course: JSON.stringify({}) }
      });
    };

    onMounted(() => {
      if (grid.value.getDatatable()) {
        grid.value
          .getDatatableBody()
          .on('click', '[data-edit-id]', (e: any) => {
            let id = $(e.currentTarget).data().editId;
            let filteredData = grid.value
              .getDatatable()
              .data()
              .filter(function (value: any) {
                return value._id == id;
              });
            if (filteredData.length > 0) editCourse(filteredData[0]);
          });
        grid.value
          .getDatatableBody()
          .on('click', '[data-session-id]', (e: any) => {
            let id = $(e.currentTarget).data().sessionId;
            let filteredData = grid.value
              .getDatatable()
              .data()
              .filter(function (value: any) {
                return value._id == id;
              });
            if (filteredData.length >= 0) {
              router.push({
                name: 'session',
                params: { course: JSON.stringify(filteredData[0]) }
              });
            }
          });
        grid.value
          .getDatatableBody()
          .on('click', '[data-delete-id]', (e: any) => {
            let id = $(e.currentTarget).data().deleteId;
            let filteredData = grid.value
              .getDatatable()
              .data()
              .filter(function (value: any) {
                return value._id == id;
              });
            if (filteredData.length > 0) deleteCourse(filteredData[0]);
          });
      }
    });

    return { options, columns, createCourse, deleteCourse, editCourse, grid };
  }
});
</script>
