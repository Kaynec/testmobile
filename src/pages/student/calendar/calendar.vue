<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="calendar-page" v-else :style="styles">
    <SmallHeader />
    <!--  -->
    <div class="calendar">
      <div class="calendar-header">
        <h3 class="calendar-header-number">{{ templateDate[0] }}</h3>
        <h3 class="calendar-header-text">
          {{ templateDate[1] + ' ' + templateDate[2] }}
        </h3>
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
          <span
            v-for="number in numberDays"
            :key="number"
            :class="`${number.class ? number.class : ''}`"
          >
            <!-- If Number Has  a class it means that it's a object  -->
            {{ number.class ? number['count'] : toPersianNumbers(number) }}
          </span>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="events">
      <span class="count"> رویدادهای ماه ({{ 0 || data.length }}) </span>
      <span @touchstart="changeCalendarAddEvent" class="plus">
        <i class="fas fa-plus"></i>
        ثبت رویداد جدید
      </span>
      <!--  -->
      <div class="card" v-for="item in data" :key="item._id">
        <p>{{ item.title }}</p>
        <div class="flex">
          <span class="right">
            <strong
              :class="`${
                toEnglishNumbers(templateDate[0]) >
                toEnglishNumbers(formatCardDate(item.date)[3])
                  ? 'red'
                  : 'green'
              }`"
            >
              {{ toPersianNumbers(formatCardDate(item.date)[3]) }}
            </strong>
            {{ formatCardDate(item.date)[1] }} ماه
          </span>
          <span class="left"> {{ formatCardDate(item.date)[2] }} </span>
        </div>
      </div>
    </div>
    <!--  -->
    <CalendarAddEvent
      :data="JSON.stringify({ ...currentDaysOfMonth })"
      v-if="showCalendarAddEvent"
      @convertBoolean="changeCalendarAddEvent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import { StudentEventApi } from '@/api/services/student/student-event-service';
import CalendarAddEvent from '@/modules/student-modules/calendar/calendar-add-event.vue';
import {
  toEnglishNumbers,
  toPersianNumbers
} from '@/utilities/to-persian-numbers';
const moment = require('moment-jalaali');
// Todo
// Change The Classes
export default defineComponent({
  components: { SmallHeader, CalendarAddEvent },
  setup() {
    let currentDay = ref(),
      currentMonth = ref();
    const days = ref();
    const showCalendarAddEvent = ref(false);
    const date = new Date();
    const faDate = new Intl.DateTimeFormat('fa', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);

    const dates = ref([] as any);

    let templateDate = faDate.split(' ');

    let isCurrentYearLeapYear = moment.jIsLeapYear(
      toEnglishNumbers(templateDate[2])
    );

    const monthsOfYear = [
      {
        name: 'فروردین',
        days: 31,
        monthNumber: '01',
        currentYear: templateDate[2]
      },
      {
        name: 'اردیبهشت',
        days: 31,
        monthNumber: '02',
        currentYear: templateDate[2]
      },
      {
        name: 'خرداد',
        days: 31,
        monthNumber: '03',
        currentYear: templateDate[2]
      },
      {
        name: 'تیر',
        days: 31,
        monthNumber: '04',
        currentYear: templateDate[2]
      },
      {
        name: 'مرداد',
        days: 31,
        monthNumber: '05',
        currentYear: templateDate[2]
      },
      {
        name: 'شهریور',
        days: 31,
        monthNumber: '06',
        currentYear: templateDate[2]
      },
      {
        name: 'مهر',
        days: 30,
        monthNumber: '07',
        currentYear: templateDate[2]
      },
      {
        name: 'آبان',
        days: 30,
        monthNumber: '08',
        currentYear: templateDate[2]
      },
      {
        name: 'آذر',
        days: 30,
        monthNumber: '09',
        currentYear: templateDate[2]
      },
      { name: 'دی', days: 30, monthNumber: '10', currentYear: templateDate[2] },
      {
        name: 'بهمن',
        days: 30,
        monthNumber: '11',
        currentYear: templateDate[2]
      },
      {
        name: 'اسفند',
        days: isCurrentYearLeapYear ? 30 : 29,
        monthNumber: '12'
      }
    ];

    const currentDaysOfMonth = monthsOfYear.find(
      (el) => el.name === templateDate[1]
    ) as any;

    // Get Data From Database
    let data = ref([]);

    const dateForDataBase = `${toEnglishNumbers(
      currentDaysOfMonth.currentYear
    )}/${currentDaysOfMonth.monthNumber}/${toEnglishNumbers(templateDate[0])}`;

    StudentEventApi.get({ date: dateForDataBase }).then((res) => {
      data.value = res.data.data;
      updateCalendarClasses();
    });

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const changeCalendarAddEvent = () => {
      showCalendarAddEvent.value = !showCalendarAddEvent.value;
      StudentEventApi.get({ date: dateForDataBase }).then((res) => {
        data.value = res.data.data;
        updateCalendarClasses();
      });
    };

    // Loop Through Dates And if It's passed give it a red class else green class

    const numberDays = ref([
      ...Array(currentDaysOfMonth.days + 1).keys()
    ]) as any;

    // Make The Numbers Start From 1
    numberDays.value.splice(0, 1);

    const updateCalendarClasses = () => {
      data.value.forEach((el: any) => {
        dates.value.push(+el.date.split('/')[2]);
      });

      dates.value.forEach((el) => {
        if (+toEnglishNumbers(templateDate[0]) > el)
          numberDays.value[el] = { class: 'red', count: el };
        else numberDays.value[el] = { class: 'green', count: el };

        console.log(numberDays.value[el]);
      });
    };

    const formatCardDate = (date) => {
      let m = moment(date, 'jYYYY/jM/jD');
      let myDate = m.format('YYYY/M/D');

      myDate = new Date(myDate)
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

      return [year, month, weekday, day];
    };

    return {
      styles,
      toPersianNumbers,
      toEnglishNumbers,
      days,
      showCalendarAddEvent,
      changeCalendarAddEvent,
      faDate,
      templateDate,
      currentDay,
      currentMonth,
      monthsOfYear,
      currentDaysOfMonth,
      data,
      formatCardDate,
      dates,
      numberDays
    };
  }
});
</script>
<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.calendar-page {
  max-width: 100vw;
  overflow-x: hidden;
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
      padding: 1.5rem 0;
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
          padding: 29% 0;
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
