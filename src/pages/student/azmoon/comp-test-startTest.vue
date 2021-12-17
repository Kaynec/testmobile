<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Spinner -->
  <div
    class="loader-parent"
    v-else-if="!orientationTitleInformation.length || !timeInformation"
  >
    <div class="loading1"></div>
  </div>
  <!--  -->
  <div class="start" v-else>
    <MinimalHeader title="شروغ آزمون" />
    <!--  -->
    <div class="label">
      <!-- Count -->
      <p>{{ timeInformation.title }}</p>
      <!-- Info -->
      <h6>
        عمومی {{ toPersianNumbers(timeInformation.texts.year) }} -
        {{ toPersianNumbers(+timeInformation.texts.year + 1) }}
      </h6>
      <h6 class="second-h6">پایه {{ timeInformation.grade.title }}</h6>
    </div>

    <div class="budget">
      <div class="budget-img">
        <h5>درس مورد نظر را انتخاب کنید</h5>
        <img src="../../../assets/img/start-test.png" />
      </div>

      <div
        class="budget-label"
        v-for="item in orientationTitleInformation"
        :key="item"
        @click="goToquestions(item)"
      >
        <p class="budget-label-first-p">{{ item.orientation }}</p>
        <p class="budget-label-second-p">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { StudentExamApi } from '@/api/services/student/student-exam-service';
import router from '@/router';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { store } from '@/store';
import { StudentMutationTypes } from '@/store/modules/student/mutation-types';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
const moment = require('moment-jalaali');

export default defineComponent({
  props: {
    id: { type: String }
  },
  components: { MinimalHeader },
  setup(props) {
    const orientationTitleInformation = reactive([] as any),
      timeInformation = ref({} as any);

    const addMinutes = (time, minsToAdd) => {
      function D(J) {
        return (J < 10 ? '0' : '') + J;
      }
      let piece = time.split(':');
      let mins = piece[0] * 60 + +piece[1] + +minsToAdd;

      return D(((mins % (24 * 60)) / 60) | 0) + ':' + D(mins % 60);
    };
    //
    if (props.id)
      store.commit(StudentMutationTypes.SET_CURRENT_ID_OF_EXAM, props.id);
    StudentExamApi.get(props.id || store.getters.getCurrentIdOfExam).then(
      (res) => {
        console.log(res.data.data);
        timeInformation.value = res.data.data;
        let mDate = moment(timeInformation.value.date, 'jYYYY/jM/jD');
        let currentDate = new Date(mDate.format('YYYY/M/D')).toLocaleDateString(
          'fa-FA',
          {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          }
        ) as any;

        currentDate = currentDate.split(',');
        let monthInText = currentDate[0].split(' ')[0],
          dayInText = currentDate[0].split(' ')[1],
          weekDay = currentDate[1];

        timeInformation.value.texts = {
          monthInText,
          weekDay,
          dayInText,
          year: timeInformation.value.date.split('/')[0]
        };

        res.data.data.budgeting.forEach((item: any) => {
          console.log(item);
          orientationTitleInformation.push({
            orientation: item.course.orientation,
            title: item.course.title,
            ...item
          });
        });
      }
    );

    const goOnePageBack = () => router.go(-1);

    const goToquestions = (item) =>
      router.push({
        name: 'CompTestQuestions',
        params: { item: JSON.stringify(item) }
      });

    return {
      goOnePageBack,
      goToquestions,
      orientationTitleInformation,
      timeInformation,
      toPersianNumbers,
      addMinutes
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.start {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 8vh;
  height: 100%;

  .time {
    width: 95%;
    margin: 1rem auto;
    background: linear-gradient(268deg, #ff545b 6%, #a50d14);
    border-radius: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.66rem 0;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      min-width: 33%;
      color: #fff;
      padding: 0.5rem 0;

      &:nth-of-type(2) {
        border-right: 1px dashed #fff;
      }
      &:nth-of-type(3) {
        border-right: 1px dashed #fff;
      }

      p {
        font-size: 13.2px;
        margin: 0;
      }
      h5 {
        font-size: 11.2px;
        margin: 0;
        margin-top: 0.7rem;
      }
    }
  }

  .budget {
    width: 95%;
    margin: 1rem auto;
    border-radius: 18px;
    padding: 0.5rem;
    background: #fff;

    .budget-img {
      width: 100%;
      align-items: center;
      justify-content: flex-end;
      display: flex;
      flex-direction: row-reverse;
      position: relative;
      padding: 0.5rem 0;

      img {
        margin-left: 0.5rem;
        border: 2px solid red;
        border-radius: 50%;
        margin-bottom: 0.2rem;
      }

      h5 {
        font-size: 14px;
        text-align: right;
        font-weight: bold;
      }
    }

    .budget-img::before {
      content: '';
      position: absolute;
      width: 1px;
      top: 80%;
      right: 3px;
      height: 40%;
      margin-right: 10.5px;
      background: #d21921;
    }

    .budget-label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 0.3rem 1.5rem;

      .budget-label-first-p {
        font-size: 12px;
        font-weight: bold;
        text-align: right;
        color: #646464;
      }

      .budget-label-second-p {
        font-size: 12px;
        text-align: left;
        color: #646464;
      }
    }
    .budget-label::after {
      content: '';
      position: absolute;
      right: 0;
      top: 30%;
      width: 0.5rem;
      height: 0.5rem;
      background: #d21921;
      border-radius: 50%;
      margin-right: 10px;
    }
    .budget-label::before {
      content: '';
      position: absolute;
      width: 1px;
      top: 55%;
      height: 20px;
      right: 0;
      margin-right: 13px;
      background: #d21921;
    }
  }

  .label {
    width: 100%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    background-color: #fff;
    margin-bottom: 1rem;
    padding: 0.5rem;

    p {
      font-size: 11px;
      text-align: right;
      color: #ed1b24;
    }

    h6 {
      font-size: 14px;
      font-weight: bold;
      color: #171717;
      display: inline-flex;
    }
    .second-h6 {
      margin-right: 1.25rem;
    }
  }

  button {
    background: $redish-background;
    padding: 1rem 0;
    border: none;
    width: 80%;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 1rem auto;
    position: fixed;

    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.7rem;
      // background: rgb(255, 0, 0);
      background: rgb(207, 8, 8);
      border-radius: 50%;
      position: absolute;
      right: 0;
      top: 20%;
      padding: 0.7rem;
    }
  }
}
</style>
