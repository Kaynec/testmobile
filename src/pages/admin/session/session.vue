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
const $ = require('jquery');
const alertify = require('../../../assets/alertifyjs/alertify');

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

      {
        className: 'edit-control',
        orderable: false,
        defaultContent: '',
        label: '',
        data: '_id',
        action: 'update',
        render: function (data: any) {
          return `<button type="button" data-edit-id="${data}" class="btn btn-default edit-button">ویرایش</button>`;
        },
        responsivePriority: 2
      },
      {
        className: 'edit-control',
        orderable: false,
        defaultContent: '',
        label: '',
        data: '_id',
        action: 'read',
        render: function (data: any) {
          return `<button type="button" data-question-id="${data}" class="btn btn-default edit-button">سوالات مربوطه</button>`;
        },
        responsivePriority: 2
      },
      {
        label: '',
        data: '_id',
        action: 'delete',
        render: function (data: any) {
          return `<button type="button" data-delete-id="${data}" class="btn btn-danger edit-button">حذف</button>`;
        },
        responsivePriority: 2
      }
    ]);

    const options = reactive({
      gridName: 'session-grid',
      url: `${baseUrl}session`,
      type: 'GET'
      // data: (d: any) =< {
      //   d.extra = 111;
      // }
    });

    const editSession = (session: any) => {
      router.push({
        name: 'session-edit',
        params: { session: JSON.stringify(session) }
      });
    };

    const deleteSession = (mentor: any) => {
      alertify.defaults.glossary.cancel = 'بله';
      alertify.defaults.glossary.ok = 'خیر';
      alertify.confirm('حذف', 'آیا اطمینان دارید؟', function (e: any) {
        if (e) {
          SessionServiceApi.delete(mentor._id).then((result) => {
            alertify.success(result.data.message);
            (grid.value as any).getDatatable().ajax.reload();
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
