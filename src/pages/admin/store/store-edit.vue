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
          <label for="title">توضیحات :</label>
          <input
            type="text"
            class="form-control"
            id="description"
            v-model="model.description"
            @blur="v$.description.$touch()"
          />
          <span
            v-for="error in v$.description.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <!--  -->
        <div class="form-group col-md-5 col-sm-12">
          <label for="title">نوع محصول:</label>
          <select v-model="model.category" class="form-select">
            <option :key="1" @blur="v$.category.$touch()" value="book">
              کتاب
            </option>
            <!--  NO IDEA HOW TO WRITE آزمون IN ENGLISH -->
            <option :key="2" @blur="v$.category.$touch()" value="exam">
              آزمون
            </option>
            <!--  -->
            <option :key="3" @blur="v$.category.$touch()" value="class">
              کلاس
            </option>
          </select>
          <span
            v-for="error in v$.category.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <!--  -->
      </div>

      <!--  -->

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
          <br />
          <h6>قیمت ها به تومان هست</h6>
          <br />
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
        <div v-if="!model._id" class="form-group col-md-5 col-sm-12">
          <label> پیش نمایش</label>
          <input
            :value="model.demo"
            name="demo"
            @change="changeFile($event, 'demo')"
            type="file"
            @blur="v$.demo.$touch()"
          />
          <span
            v-for="error in v$.demo.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
        <!--  -->
        <div v-if="!model._id" class="form-group col-md-5 col-sm-12">
          <label> فایل اصلی</label>
          <input
            name="original"
            :value="model.original"
            type="file"
            @change="changeFile($event, 'original')"
            @blur="v$.original.$touch()"
          />
          <span
            v-for="error in v$.original.$errors"
            :key="error.id"
            class="form-text text-danger"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>

      <button class="btn btn-default ml-3 mt-4" @click="cancel()">برگشت</button>
      <button category="submit" class="btn btn-default mt-4">ذخیره</button>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { StoreServiceApi } from '@/api/services/admin/store-service';
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import {
  helpers,
  minLength,
  required,
  requiredIf
} from '@vuelidate/validators';
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
            title: '',
            description: '',
            category: 'book',
            price: '',
            specialPrice: '',
            demo: '',
            original: ''
          })
        : model;
    // validation
    const rules = computed(() => ({
      category: { required },
      title: {
        required: helpers.withMessage('عنوان ضروری است', required),
        minLength: helpers.withMessage(
          'عنوان باید بیشتر از 2 جرف باشد',
          minLength(2)
        )
      },
      description: {
        required: helpers.withMessage('توضیحات ضروری است', required)
      },
      price: { required: helpers.withMessage('قیمت ضروری است', required) },
      specialPrice: {},
      demo: {},
      original: {
        required: helpers.withMessage(
          'فایل اصلی ضروری است',
          requiredIf(() => {
            return !model._id;
          })
        )
      }
    }));

    const v$ = useVuelidate(rules, model);

    // Handle The File
    const changeFile = async (e: any, description: string) => {
      const file = await e.target.files[0];
      if (description == 'demo') model.demo = await file;
      else if (description == 'original') model.original = await file;
    };

    // Saving The File
    const save = () => {
      console.log(model, v$.value.$errors);
      v$.value.$touch();
      //
      if (!v$.value.$invalid) {
        const temp: any = new FormData();

        temp.append('title', model.title);
        temp.append('price', model.price);
        temp.append('specialPrice', model.specialPrice);
        temp.append('category', model.category);
        temp.append('description', model.description);

        //
        if (model._id) {
          const tmp = {
            title: model.title,
            price: model.price,
            specialPrice: model.specialPrice,
            category: model.category
          };
          StoreServiceApi.update(model._id, tmp).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'store'
            });
          });
        } else {
          model.demo && temp.append('demo', model.demo);
          model.original && temp.append('original', model.original);
          StoreServiceApi.create(temp).then((result) => {
            alertify.success(result.data.message);
            router.push({
              name: 'store'
            });
          });
        }
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
