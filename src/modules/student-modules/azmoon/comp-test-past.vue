<template>
  <div class="container" v-if="azmoonData.length">
    <div
      class="
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
        warning
      "
      v-for="item in azmoonData"
      v-bind:key="item"
    >
      <div class="d-flex flex-column mt-1 p-0 m-0">
        <span class="label text-dark text-right mb-2 text-bold">
          <!-- {{ !item.passed ? 'تعداد آزمون' : 'رتبه شما' }} : {{ item.count }} -->
          {{ item.title }}
        </span>
        <span class="text-detail text-right">
          <i class="far fa-clock"></i>
          {{ item.date['weekDay'] }}
          {{ item.date['day'] }}
          {{ item.date['month'] }}

          <strong> | </strong>
          {{ `ساعت ${toPersianNumbers(item.time)}` }}
        </span>
      </div>
      <div class="img position-absolute top-50 start-0 ml-5 translate-middle">
        <img
          src="../../../assets/img/accept-path-light.png"
          class="img"
          @click="changeShowDetail"
          alt="active"
        />
      </div>
      <img
        src="../../../assets/img/shape.svg"
        class="position-absolute top-50 start-0 translate-middle ml-3"
        alt="angle left icon"
      />
    </div>
    <!--  -->
    <CompTestDetail v-if="showCompDetail" @convertBoolean="changeShowDetail" />
  </div>
  <!--  -->
  <div class="loader-parent" v-else>
    <div class="loading1"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import CompTestDetail from '@/modules/student-modules/azmoon/comp-test-detail.vue';
// import { StudentExamApi } from '@/api/services/student/student-exam-service';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { StudentExamApi } from '@/api/services/student/student-exam-service';
import { compareAsc } from 'date-fns';
const moment = require('moment-jalaali');
export default defineComponent({
  components: {
    CompTestDetail
  },
  setup() {
    const azmoonData = reactive([] as any);

    StudentExamApi.getAll().then((res) => {
      res.data.data.forEach((date: any) => {
        let mDate = moment(date.date, 'jYYYY/jM/jD');
        if (compareAsc(new Date(mDate.format('YYYY/M/D')), new Date()) === 1)
          azmoonData.push(date);
      });
    });

    azmoonData.forEach((child: any) => {
      let mDate = moment(child.date, 'jYYYY/jM/jD');
      let currentDate = new Date(mDate.format('YYYY/M/D')).toLocaleDateString(
        'fa-FA',
        {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        }
      ) as any;
      currentDate = currentDate.split(',');

      let month = currentDate[0].split(' ')[0];
      let day = currentDate[0].split(' ')[1];
      let weekDay = currentDate[1];

      child.date = {
        ...child.date,
        weekDay,
        day,
        month
      };
    });

    const showCompDetail = ref(false);
    const changeShowDetail = () =>
      (showCompDetail.value = !showCompDetail.value);

    return { azmoonData, changeShowDetail, showCompDetail, toPersianNumbers };
  }
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.card {
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  font-family: IRANSans;

  .img {
    width: 27px;
    height: 27px;
    padding: 7px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4ac367;

    img {
      object-fit: contain;
    }
  }

  .fa-angle-left {
    color: black !important;
  }
  .label {
    font-size: 13px;
    font-weight: bold;
  }
  .text-detail {
    margin: 0 5px 0 0;
    font-size: 11px;
    color: #313131;

    strong {
      margin-inline: 0.4rem;
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
</style>
