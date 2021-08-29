<template>
  <div class="panel panel-default">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">سوال ها</h1>
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

import { QuestionServiceApi } from '@/api/services/admin/question-service';
import { useRoute } from 'vue-router';
import router from '@/router';
const $ = require('jquery');
const alertify = require('../../../assets/alertifyjs/alertify');

export default defineComponent({
  components: { grid },

  setup() {
    const route = useRoute();
    // ref
    const grid = ref();
    // Data
    let session: any;
    if (route.params.session) session = JSON.parse(route.params.session as any);

    const columns = reactive([
      {
        label: 'عنوان سوال',
        data: 'text',
        responsivePriority: 1,
        searchPanes: {
          orthogonal: 'sp',
          show: true
        }
      },
      {
        label: 'تصویر',
        data: 'image',
        responsivePriority: 3,
        render(data: any) {
          return `<img src=${
            data ||
            'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
          }  width="100" height="100"/>`;
        }
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
        responsivePriority: 2
      }
    ]);

    const options = reactive({
      gridName: 'question-grid',
      url: `${baseUrl}question`,
      type: 'GET'
    } as any);
    session &&
      (options.data = (d: any) => {
        d.filter = { session: session ? { _id: session._id } : '' };
      });
    //

    const editQuestion = (question: any) => {
      router.push({
        name: 'question-edit',
        params: { question: JSON.stringify(question) }
      });
    };

    const deleteQuestion = (question: any) => {
      alertify.defaults.glossary.cancel = 'بله';
      alertify.defaults.glossary.ok = 'خیر';
      alertify.confirm('حذف', 'آیا اطمینان دارید؟', function (e: any) {
        if (e) {
          QuestionServiceApi.delete(question._id).then((result) => {
            alertify.success(result.data.message);
            (grid.value as any).getDatatable().ajax.reload();
          });
        }
      });
    };

    const createSession = () => {
      router.push({
        name: 'question-create',
        params: { question: JSON.stringify({}) }
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
            if (filteredData.length > 0) editQuestion(filteredData[0]);
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
            if (filteredData.length > 0) deleteQuestion(filteredData[0]);
          });
      }
    });

    return {
      options,
      columns,
      createSession,
      deleteQuestion,
      editQuestion,
      grid
    };
  }
});
</script>
