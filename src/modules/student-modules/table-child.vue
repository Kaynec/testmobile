<template>
  <div
    @touchstart="changeShowContent"
    :class="`${showContent ? 'active details' : 'details'}`"
  >
    <div class="label">
      <span>
        {{ model._id.substr(0, 10) }}
      </span>
      <span>{{ toPersianNumbers(model.totalIncludingTax) }} تومان</span>
      <span>
        {{ formatDate(model.createdAt)[3] }}
        {{ formatDate(model.createdAt)[1] }}
        {{ formatDate(model.createdAt)[0] }}
      </span>
      <!-- Arrow Up or Down -->
      <i
        :class="`${
          showContent ? 'fas fa-sort-up arrow' : 'fas fa-sort-down arrow'
        }`"
      ></i>
    </div>

    <div class="content" v-if="showContent">
      <p v-for="item in model.items" :key="item">
        <i class="fas fa-check img"></i>
        {{ item.product.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';

export default defineComponent({
  props: {
    data: { type: String, default: '{}' }
  },
  setup(props) {
    const model = JSON.parse(props.data);

    const showContent = ref(false);
    const changeShowContent = () => (showContent.value = !showContent.value);

    const formatDate = (date) => {
      let myDate = new Date(date)
        .toLocaleDateString('fa-Fa', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        })
        .split(' ');

      let year = myDate[0],
        month = myDate[1],
        weekday = myDate[3],
        day = myDate[2].split(',')[0];

      console.log([year, month, weekday, day]);

      return [year, month, weekday, day];
    };

    formatDate('2021-11-29T09:01:41.688Z');

    return {
      showContent,
      changeShowContent,
      model,
      toPersianNumbers,
      formatDate
    };
  }
});
</script>

<style lang="scss" scoped>
.details {
  background-color: #fff;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0.2rem;
  color: #646464;

  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px;
    padding-left: 2.5rem;
    border-radius: 4px;
    position: relative;

    .arrow {
      position: absolute;
      left: 0;
      margin-left: 0.5rem;
      top: 30%;
    }

    span {
      font-size: 10px;
    }
  }

  .content {
    line-height: 2;
    text-align: right;
    padding: 12px 10px;
    p {
      margin: 0;
      font-size: 10px;
      line-height: 1.9;
      color: #000;
      .img {
        color: #fff;
        background-color: #4ac367;
        border-radius: 50px;
        padding: 3px;
      }
    }
  }
}
.active {
  color: #fff;

  .label {
    background-color: #d21921;
  }
}
</style>
