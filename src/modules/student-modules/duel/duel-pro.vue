<template>
  <div class="container">
    <div
      v-for="item in data"
      :key="item"
      :class="`
      card
        w-100
        d-inline-flex
        align-items-center
        m-1
        position-relative
        flex-row flex-wrap
        border border-white
        rounded-10
        customDiv
        ${item.class}
      `"
    >
      <!-- Todo
    Change Class Based On The Day
     -->
      <div class="d-flex flex-column mt-1 p-0 m-0">
        <span class="label text-dark text-right mb-2 text-bold">
          {{ item.label }}
        </span>
        <span class="text-detail text-right">
          <i class="far fa-clock"></i>
          {{ item.date }} |
          <strong> | </strong>
          {{ item.time }}
        </span>
      </div>

      <img
        @click="openDuelStart"
        src="../../../assets/img/shape.svg"
        class="position-absolute top-50 start-0 translate-middle ml-3"
        alt="angle left icon"
      />
    </div>

    <!--  -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const data = reactive([
      {
        label: 'دوئل مدیر شغلی مهندس عمران',
        date: '    آبان ۱۵ ۱۴۰۰ ',
        time: '۱۵:۳۰',
        class: 'danger'
      },

      {
        label: 'دوئل مدیر شغلی مهندس شیمی',
        date: '    آبان ۱۵ ۱۴۰۰ ',
        time: '۱۳:۰۰',
        class: 'warning'
      }
    ]);

    const openDuelStart = () =>
      router.push({
        name: 'DuelStart'
      });
    return { data, openDuelStart };
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 95.5%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: IRANSans;
  margin: 0 auto;
}
.card {
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;

  .fa-angle-left {
    color: black !important;
  }
  .label {
    font-size: 13px;
    font-weight: bold;
  }
  .text-detail {
    margin: 0 5px 0 0;
    font-size: 11.5px;
    color: #313131;

    strong {
      margin-inline: 0.4rem;
    }
    i {
      color: #948888;
      font-size: 14px;
    }
  }
}
.customDiv {
  position: relative;
  z-index: 1;
  padding: 0.6rem;

  &:last-child {
    margin-bottom: 4rem !important;
  }
}
.card.danger {
  .text-detail {
    color: #d26c34;
    strong {
      margin-inline: 0.4rem;
    }
    i {
      background-color: transparent;
      color: #d26c34;
      font-size: 14px;
    }
  }
}
.card.warning {
  .text-detail {
    color: #d21921;
    strong {
      margin-inline: 0.4rem;
    }
    i {
      color: #d21921;
      font-size: 14px;
    }
  }
}
</style>
