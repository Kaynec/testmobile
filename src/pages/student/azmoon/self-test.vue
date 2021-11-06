<template>
  <div class="self-test">
    <SmallHeader />
    <div class="lessons">
      <LessonCard label="فارسی" imgSrc="farsi" />
      <LessonCard label="فیزیک" imgSrc="Physic" />
      <LessonCard label="ریاضی" imgSrc="math" />

      <LessonCard label="فارسی" imgSrc="farsi" />
      <LessonCard label="فیزیک" imgSrc="Physic" />
      <LessonCard label="ریاضی" imgSrc="math" />

      <LessonCard label="فارسی" imgSrc="farsi" />
      <LessonCard label="فیزیک" imgSrc="Physic" />
      <LessonCard label="ریاضی" imgSrc="math" />

      <LessonCard label="فارسی" imgSrc="farsi" />
      <LessonCard label="فیزیک" imgSrc="Physic" />
      <LessonCard label="ریاضی" imgSrc="math" />
    </div>
    <div class="chapters-list w-100">
      <LessionList text="فصل اول :نهاد ها" />
      <LessionList text="فصل دوم : بهداشت" />
      <LessionList text="فصل سوم : اخلاق فردی و اجتماعی" />

      <LessionList text="فصل اول :نهاد ها" />
      <LessionList text="فصل دوم : بهداشت" />
      <LessionList text="فصل سوم : اخلاق فردی و اجتماعی" />

      <LessionList text="فصل اول :نهاد ها" />
      <LessionList text="فصل دوم : بهداشت" />
      <LessionList text="فصل سوم : اخلاق فردی و اجتماعی" />

      <LessionList text="فصل اول :نهاد ها" />
      <LessionList text="فصل دوم : بهداشت" />
      <LessionList text="فصل سوم : اخلاق فردی و اجتماعی" />

      <LessionList text="فصل اول :نهاد ها" />
      <LessionList text="فصل دوم : بهداشت" />
      <LessionList text="فصل سوم : اخلاق فردی و اجتماعی" />
    </div>
    <div class="continue-wrapper">
      <div class="continue">
        <i class="fas fa-arrow-right"></i>
        <span> ادامه آزمون خودسنجی </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import LessonCard from '@/modules/student-modules/azmoon/lesson-card.vue';
import LessionList from '@/modules/student-modules/azmoon/chapter-list.vue';
export default defineComponent({
  components: {
    SmallHeader,
    LessonCard,
    LessionList
  },
  setup() {
    return { salam: 'salam' };
  }
});
</script>

<style lang="scss">
@import '@/css-variable//Global.scss';
.self-test {
  position: relative;
  min-height: 100%;
  background: #f4f4f4;
  overflow-x: hidden;

  .lessons {
    padding: 1rem 0.5rem;
    gap: 0.5rem;
    display: flex;
    overflow-x: auto;
  }

  .chapters-list {
    height: 100%;
    overflow: hidden;
    padding-bottom: 5em;
  }
  .continue-wrapper {
    width: 100%;
    margin: 0 auto 1.5rem auto;
    position: fixed;
    bottom: 0;
    .continue {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 15px;
      background-image: $redish-background;
      width: 80%;
      height: 3.5rem;
      margin: 0 auto;

      i {
        background-color: #d21921;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        padding: 5px;
      }

      span {
        font-family: IRANSans;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        align-self: center;
        width: 60%;
      }
    }
  }
}
</style>
