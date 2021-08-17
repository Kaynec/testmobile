<template>
  <div class="panel panel-default">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">کاربران (دانشجویان)</h1>
          </div>
          <div class="col-sm-6">
            <button
              class="m-0 float-left btn btn-success"
              @click="createStudent()"
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
import { defineComponent } from 'vue';
import { baseUrl } from '@/api/apiclient';
import grid from '@/modules/shared/grid.vue';
import router from '@/router';
const $ = require('jquery');
const alertify = require('../../../assets/alertifyjs/alertify');
import { StudentServiceApi } from '@/api/services/admin/student-service';
import { string } from 'yup/lib/locale';
export default defineComponent({
  data() {
    return {
      columns: [
        {
          label: 'نام کاربری',
          data: 'username',
          responsivePriority: 1,
          type: () => {
            return typeof string;
          },
          searchPanes: {
            orthogonal: 'sp',
            show: true
          }
        },
        { label: 'ایمیل', data: 'email' },
        { label: 'نام', data: 'firstname', responsivePriority: 3 },
        { label: 'نام خانوادگی', data: 'lastname', responsivePriority: 3 },
        {
          label: 'جنسیت',
          data: 'gender',
          render: function (data: string) {
            switch (data) {
              case 'male':
                return 'مرد';
              case 'female':
                return 'زن';
              default:
                return 'نا مشحص';
            }
          }
        },
        {
          label: 'تاریخ تولد',
          data: 'birthdate'
        },
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
          label: '',
          data: '_id',
          action: 'delete',
          render: function (data: any) {
            return `<button type="button" data-delete-id="${data}" class="btn btn-danger edit-button">حذف</button>`;
          },
          responsivePriority: 2
        }
      ],
      options: {
        gridName: 'student-grid',
        url: `${baseUrl}student`,
        type: 'GET'
        // data: function (d: any) {
        //   d.extra = 111;
        // }
      }
    };
  },
  methods: {
    editStudent(student: any) {
      console.log('edit', student);
      router.push({
        name: 'student-edit',
        params: { student: JSON.stringify(student) }
      });
    },
    deleteStudent(student: any) {
      console.log('delete', student);
      alertify.defaults.glossary.cancel = 'بله';
      alertify.defaults.glossary.ok = 'خیر';
      let that = this;
      alertify.confirm('حذف', 'آیا اطمینان دارید؟', function (e: any) {
        if (e) {
          StudentServiceApi.delete(student._id).then((result) => {
            alertify.success(result.data.message);
            (that.$refs.grid as any).getDatatable().ajax.reload();
          });
        }
      });
    },
    createStudent() {
      router.push({
        name: 'student-create',
        params: { student: JSON.stringify({}) }
      });
    }
  },
  mounted() {
    let gridRef = this.$refs.grid as any;
    if (gridRef.getDatatable()) {
      let that = this;
      gridRef.getDatatableBody().on('click', '[data-edit-id]', (e: any) => {
        let id = $(e.currentTarget).data().editId;
        let filteredData = gridRef
          .getDatatable()
          .data()
          .filter(function (value: any) {
            return value._id == id;
          });
        if (filteredData.length > 0) that.editStudent(filteredData[0]);
      });
      gridRef.getDatatableBody().on('click', '[data-delete-id]', (e: any) => {
        let id = $(e.currentTarget).data().deleteId;
        let filteredData = gridRef
          .getDatatable()
          .data()
          .filter(function (value: any) {
            return value._id == id;
          });
        if (filteredData.length > 0) that.deleteStudent(filteredData[0]);
      });
    }
  },
  components: { grid }
});
</script>
<style lang="scss"></style>
