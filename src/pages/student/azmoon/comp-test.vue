<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="comp-test">
    <SmallHeader />
    <img src="../../../assets/img/comptest.png" class="hero" />
    <div class="btns">
      <button
        @click="() => (currentState = 'future')"
        :class="{ active: currentState == 'future' }"
      >
        آزمون های آینده
      </button>
      <button
        @click="() => (currentState = 'past')"
        :class="{ active: currentState == 'past' }"
      >
        آزمون های گذشته
      </button>
    </div>

    <keep-alive>
      <CompTestFuture v-if="currentState == 'future'" />
    </keep-alive>
    <keep-alive>
      <CompTestPast
        v-if="currentState == 'past'"
        :data="JSON.stringify(pastExams)"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import CompTestPast from '@/modules/student-modules/azmoon/comp-test-past.vue';
import CompTestFuture from '@/modules/student-modules/azmoon/comp-test-future.vue';
import { StudentExamApi } from '@/api/services/student/student-exam-service';
const moment = require('moment-jalaali');
import { compareAsc } from 'date-fns';
export default defineComponent({
  components: {
    SmallHeader,
    CompTestPast,
    CompTestFuture
  },
  setup() {
    let pastExams = [] as any;
    let futureExams = [] as any;
    // if the past has been done than move it to the past section
    StudentExamApi.getAll().then((res) => {
      res.data.data.forEach((date: any) => {
        let mDate = moment(date.date, 'jYYYY/jM/jD');
        if (
          compareAsc(new Date(mDate.format('YYYY/M/D')), new Date()) === 1 ||
          compareAsc(new Date(mDate.format('YYYY/M/D')), new Date()) === 0
        )
          pastExams.push(date);
        else futureExams.push(date);
      });
    });
    const currentState = ref('past');
    return { currentState, futureExams, pastExams };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.comp-test {
  position: relative;
  background: #f4f4f4;
  overflow: hidden;
  height: 100%;
  padding-top: 8vh;
  width: 100%;

  .hero {
    width: 100%;
    max-height: 35vh;
  }
  .btns {
    margin: 1rem auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      font-family: IRANSans;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 10px;
      outline: none;
      border: none;
      width: 45%;
      box-shadow: 0 0 23px 0 rgba(0, 0, 0, 0.13);
      background: white;
      color: #171717;

      &:nth-child(2) {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
      &:nth-child(1) {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
  button.active {
    background-image: $redish-background;
    color: #fff;
  }
}
</style>
