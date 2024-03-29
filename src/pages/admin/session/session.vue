<template>
  <div class="panel panel-default">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">فصل ها</h1>
          </div>
          <div class="col-sm-6">
            <button
              class="m-0 float-left btn btn-success"
              @click="createSession()"
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
import { SessionServiceApi } from '@/api/services/admin/session-service';
import { QuestionServiceApi } from '@/api/services/admin/question-service';
import { useRoute } from 'vue-router';
const $ = require('jquery');
const alertify = require('../../../assets/alertifyjs/alertify');

// import { string } from 'yup/lib/locale';

export default defineComponent({
  components: { grid },
  props: {
    course: {
      type: String
    },
    salam: {
      type: String
    }
  },

  setup() {
    const route = useRoute();
    // ref
    const grid = ref();
    let course: any;
    if (route.params.course) {
      course = JSON.parse(route.params.course as any);
    }
    console.log(route.params);
    // Data
    const columns = reactive([
      {
        label: 'نام فصل',
        data: 'title',
        responsivePriority: 1,
        searchPanes: {
          orthogonal: 'sp',
          show: true
        }
      },
      { label: 'کد', data: 'code' },
      {
        className: 'edit-control',
        orderable: false,
        defaultContent: '',
        label: '',
        data: '_id',
        width: 100,
        action: 'read',
        render: function (data: any) {
          return `<button type="button" data-question-id="${data}" class="btn btn-default edit-button">سوالات</button>`;
        },
        responsivePriority: 3
      },
      {
        className: 'edit-control',
        orderable: false,
        defaultContent: '',
        label: '',
        data: '_id',
        width: 100,
        action: 'update',
        render: function (data: any) {
          return `<button type="button" data-edit-id="${data}" class="btn btn-default edit-button">ویرایش</button>`;
        },
        responsivePriority: 2
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
      gridName: 'session-grid',
      url: `${baseUrl}session`,
      type: 'GET'
    } as any);
    course &&
      (options.data = (d: any) => {
        d.filter = { course: course ? { _id: course._id } : '' };
      });

    const editSession = (session: any) => {
      router.push({
        name: 'session-edit',
        params: { session: JSON.stringify(session) }
      });
    };

    const deleteSession = (session: any) => {
      const allQuestions = async () => {
        const Questions = await QuestionServiceApi.getAll({
          session: { _id: session._id }
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
          alertify.alert('هشدار', 'لطفا اول سوالات این فصل را حذف کنید');
        } else {
          alertify.defaults.glossary.ok = 'خیر';
          alertify.defaults.glossary.cancel = 'بله';
          alertify.confirm('حذف', 'آیا اطمینان دارید؟', function (e: any) {
            if (e) {
              SessionServiceApi.delete(session._id).then((result) => {
                alertify.success(result.data.message);
                (grid.value as any).getDatatable().ajax.reload();
              });
            }
          });
        }
      });
    };

    const createSession = () => {
      router.push({
        name: 'session-create',
        params: { session: JSON.stringify({}) }
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
            if (filteredData.length > 0) editSession(filteredData[0]);
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
            if (filteredData.length > 0) deleteSession(filteredData[0]);
          });
        grid.value
          .getDatatableBody()
          .on('click', '[data-question-id]', (e: any) => {
            let id = $(e.currentTarget).data().questionId;

            let filteredData = grid.value
              .getDatatable()
              .data()
              .filter(function (value: any) {
                return value._id == id;
              })[0];
            router.push({
              name: 'question',
              params: { session: JSON.stringify(filteredData) }
            });
          });
      }
    });

    return {
      options,
      columns,
      createSession,
      deleteSession,
      editSession,
      grid
    };
  }
});
</script>
