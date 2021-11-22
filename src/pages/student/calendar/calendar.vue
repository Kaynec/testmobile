<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="calendar-page" v-else :style="styles">
    <SmallHeader />
    <!--  -->
    <div class="calendar">
      <div class="calendar-header">
        <h3 class="calendar-header-number">۱۲</h3>

        <h3 class="calendar-header-text">آبان ۱۴۰۰</h3>
      </div>
      <div class="days">
        <div ref="days" class="days-text">
          <span @click="onTouch"> شنبه </span>
          <span @click="onTouch"> یکشنبه </span>
          <span @click="onTouch"> دوشنبه </span>
          <span @click="onTouch"> سه شنبه </span>
          <span @click="onTouch"> چهار شنبه </span>
          <span @click="onTouch"> پنج شنبه </span>
          <span @click="onTouch"> جمعه </span>
        </div>
        <!-- Add Class Green For 'Green' Background And 'red' For a Red Background -->
        <div class="days-number">
          <span v-for="number in 31" :key="number">
            {{ toPersianNumbers(number) }}
          </span>
          <span class="grey"> ۱ </span>
          <span class="grey"> ۲ </span>
          <span class="grey"> ۳ </span>
          <span class="grey"> ۴ </span>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="events">
      <span class="count"> رویدادهای ماه (۴) </span>
      <span @touchstart="changeCalendarAddEvent" class="plus">
        <i class="fas fa-plus"></i>
        ثبت رویداد جدید
      </span>
      <!--  -->
      <div class="card">
        <p>حل ۲۰ تست ریاضیات</p>
        <div class="flex">
          <span class="right">
            <strong class="red">۲</strong>
            آبان ماه
          </span>
          <span class="left"> یکشنبه </span>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="card">
        <p>حل ۲۵ تست ریاضیات</p>
        <div class="flex">
          <span class="right">
            <strong class="red">۱۰</strong>
            آبان ماه
          </span>
          <span class="left">دوشنبه </span>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="card">
        <p>حل ۲۵ تست ریاضیات</p>
        <div class="flex">
          <span class="right">
            <strong class="green">۱۳</strong>
            آبان ماه
          </span>
          <span class="left"> پنجشنبه </span>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="card">
        <p>حل ۲۵ تست ریاضیات</p>
        <div class="flex">
          <span class="right">
            <strong class="green">۲۵</strong>
            آبان ماه
          </span>
          <span class="left"> سه شنبه </span>
        </div>
      </div>
      <!--  -->
    </div>
    <!--  -->
    <CalendarAddEvent
      v-if="showCalendarAddEvent"
      @convertBoolean="changeCalendarAddEvent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import CalendarAddEvent from '@/modules/student-modules/calendar/calendar-add-event.vue';

// Todo
// Change The Classes

export default defineComponent({
  components: { SmallHeader, CalendarAddEvent },
  setup() {
    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });
    // Converting To Persian Numbers
    const toPersianNumbers = (number: any) => {
      var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return number.toString().replace(/[0-9]/g, function (w: any) {
        return id[+w];
      });
    };

    const days = ref();
    const showCalendarAddEvent = ref(false);
    const changeCalendarAddEvent = () => {
      showCalendarAddEvent.value = !showCalendarAddEvent.value;
    };

    //
    const onTouch = (e: any) => {
      days.value.querySelectorAll('span').forEach((element: any) => {
        element.classList.remove('active');
      });
      e.target.classList.add('active');
    };
    return {
      styles,
      toPersianNumbers,
      days,
      onTouch,
      showCalendarAddEvent,
      changeCalendarAddEvent
    };
  }
});
</script>
<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.calendar-page {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  position: relative;

  .calendar {
    width: 90%;
    margin: 1.3rem auto;

    .calendar-header {
      width: 100%;
      border-radius: 9.4px;
      box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.1);
      background-image: linear-gradient(266deg, #ec3538 5%, #880e13);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      color: #fff;

      .calendar-header-text {
        font-size: 1rem;
        font-weight: bold;
        text-align: right;
      }
      .calendar-header-number {
        font-size: 1.75rem;
        font-weight: bold;
        text-align: right;
      }
    }
    .days {
      width: 100%;
      background-color: #fff;
      box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.1);
      border-bottom-left-radius: 9.4px;
      border-bottom-right-radius: 9.4px;
      //   padding: 1.5rem 0;
      .days-text {
        width: 100%;
        display: grid;
        grid-gap: 0.15rem;
        grid-template-columns: repeat(7, 1fr);
        font-size: 9px;
        text-align: center;
        color: #949494;
        padding: 1.8rem 0;
      }

      .active {
        color: #171717;
      }

      .days-number {
        width: 100%;
        grid-template-columns: repeat(7, 1fr);
        display: grid;
        font-size: 12px;
        text-align: center;
        color: #000;
        padding-bottom: 2.5rem;

        span {
          padding: 25% 0;
        }
      }
    }
  }
  //
  .events {
    width: 90%;
    margin: 0.5rem auto;

    .count {
      text-align: right;
      font-size: 12px;
      color: #171717;
      float: right;
      margin-right: 0.75rem;
      margin-bottom: 0.7rem;
    }
    .plus {
      text-align: left;
      font-size: 12px;
      color: #4ac367;
      font-weight: bold;
      float: left;
      margin-left: 0.75rem;
      margin-bottom: 0.7rem;
    }
  }
  .card {
    width: 100%;
    background-color: #fff;
    border-radius: 9.4px;
    margin: 0.4rem 0;
    position: relative;
    padding: 1rem 0.75rem;
    border: 3px solid #fff;
    p {
      font-size: 12px;
      text-align: right;
      color: #171717;
      margin-bottom: 1.2rem;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right {
        color: #646464;
        font-size: 12px;
        white-space: nowrap;
        strong {
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
          text-align: center;
          padding-top: 5px;
        }
      }
      .left {
        color: #646464;
        font-size: 12px;
      }
    }
  }
}
.grey {
  color: #949494;
}

.green {
  background-color: #4ac367;
  color: #fff;
  border-radius: 50%;
}

.red {
  color: #fff;
  background-color: #d21921;
  border-radius: 50%;
}
</style>
