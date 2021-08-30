<template>
  <div class="panel">
    <h2>
      {{ model._id ? `ویرایش ${model.title}` : 'تعریف محصول جدید' }}
    </h2>
    <form @submit.prevent="save" class="mt-5">
      <div class="form-row">
        <div class="form-group col-md-5 col-sm-12">
          <label for="title">نام محصول:</label>
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
        <div class="form-group col-md-5 col-sm-12">
          <label for="title">نوع محصول:</label>
          <select v-model="model.type" class="form-select">
            <option :key="1" @blur="v$.type.$touch()" value="book">کتاب</option>
            <!--  NO IDEA HOW TO WRITE آزمون IN ENGLISH -->
            <option :key="2" @blur="v$.type.$touch()" value="test">
              آزمون
            </option>
            <!--  -->
            <option :key="3" @blur="v$.type.$touch()" value="class">
              کلاس
            </option>
          </select>
          <span
            v-for="error in v$.type.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <!--  -->
      </div>

      <!--  -->
      <br />
      <h6>قیمت ها به تومان هست</h6>
      <br />
      <div class="form-row">
        <div class="form-group col-md-5 col-sm-12">
          <label for="title">قیمت :</label>
          <input
            type="number"
            class="form-control"
            id="title"
            v-model="model.price"
            @blur="v$.price.$touch()"
          />
          <span
            v-for="error in v$.price.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>

        <div class="form-group col-md-5 col-sm-12">
          <label for="title">قیمت ویژه:</label>
          <input
            type="number"
            class="form-control"
            id="title"
            v-model="model.specialPrice"
            @blur="v$.specialPrice.$touch()"
          />
          <span
            v-for="error in v$.specialPrice.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>

      <!--  -->
      <div class="form-row files">
        <div class="form-group col-md-5 col-sm-12">
          <label> پیش نمایش</label>
          <input type="file" @change="changeFile($event, 'demo')" />
          <span
            v-for="error in v$.demo.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <!--  -->
        <div class="form-group col-md-5 col-sm-12">
          <label> فایل اصلی</label>
          <input type="file" @change="changeFile($event, 'file')" />
          <span
            v-for="error in v$.file.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button type="submit" class="btn btn-default mt-4">ذخیره</button>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { StoreServiceApi } from '@/api/services/admin/store-service';
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
const alertify = require('@/assets/alertifyjs/alertify');
export default defineComponent({
  props: {
    item: {
      type: String,
      default: '{}'
    }
  },
  setup(props) {
    let model = reactive(JSON.parse(props.item));
    model =
      JSON.stringify(model) == '{}'
        ? reactive({
            type: 'book',
            title: '',
            price: '',
            specialPrice: '',
            demo: null,
            file: null
          })
        : model;
    // validation
    const rules = computed(() => ({
      type: { required },
      title: {
        required: helpers.withMessage('عنوان ضروری است', required),
        minLength: helpers.withMessage(
          'عنوان باید بیشتر از 2 جرف باشد',
          minLength(2)
        )
      },
      price: { required: helpers.withMessage('قیمت ضروری است', required) },
      specialPrice: {},
      //   Don't Handle With Them Currently
      demo: {},
      file: { required }
    }));

    const v$ = useVuelidate(rules, model);

    // Handle The File
    const changeFile = (e: any, description: string) => {
      const file = e.target.files[0];
      if (description == 'demo') {
        model.demo = file;
      } else if (description == 'file') {
        model.file = file;
      }
    };

    // Saving The File
    const save = () => {
      //   (v$.value as any).touch();

      if (!v$.value.$invalid) {
        if (model._id) {
          let tmp: any = {
            title: model.title,
            price: model.price,
            specialPrice: model.specialPrice,
            file: model.file,
            type: model.type
          };
          model.demo && (tmp.demo = model.demo);
          StoreServiceApi.update(model._id, tmp).then((result) => {
            alertify.success(result.data.message);
            console.log(result);
            router.push({
              name: 'store'
            });
          });
        } else {
          StoreServiceApi.create(model).then((result) => {
            alertify.success(result.data.message);
            console.log(result);
            router.push({
              name: 'store'
            });
          });
        }
      } else {
        console.log(model);
      }
    };
    //
    const cancel = () => {
      router.push({
        name: 'store'
      });
      alertify.notify('cancelled action');
    };
    //

    return { v$, model, changeFile, save, cancel };
  }
});
</script>
<style scoped lang="scss">
.files {
  margin: 2rem 5rem 1rem 0;
}
h6 {
  font-size: smaller;
  color: rgb(136, 133, 133);
}
</style>
