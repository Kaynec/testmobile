<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="self-test" v-else>
    <SmallHeader />
    <div class="lessons">
      <LessonCard
        :label="course.title"
        @click="changeCurrentCourse(course)"
        v-for="course in allCourses"
        :key="course._id"
        imgSrc="farsi"
      />
    </div>
    <div class="chapters-list w-100" ref="chapterContainer">
      <LessionList
        :chapterContainer="chapterContainer"
        v-for="session in currentSessions"
        @changeCurrentItem="toggleCurrentItem(session)"
        :key="session._id"
        :text="session.title"
      />
    </div>
    <div class="continue-wrapper">
      <div class="continue">
        <i class="fas fa-arrow-right"></i>
        <span @click="moveToQuestions"> ادامه آزمون خودسنجی </span>
      </div>
    </div>
    <!--  -->
    <SelfTestPopUp
      :id="currentItem._id"
      v-if="showPopUp"
      @convertBoolean="showPopUp = !showPopUp"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import LessonCard from '@/modules/student-modules/azmoon/lesson-card.vue';
import LessionList from '@/modules/student-modules/chapter-list.vue';
import { StudentSelfTestApi } from '@/api/services/student/student-selftest-service';
import SelfTestPopUp from '@/modules/student-modules/azmoon/self-test-pop-up.vue';
import router from '@/router';
export default defineComponent({
  components: {
    SmallHeader,
    LessonCard,
    LessionList,
    SelfTestPopUp
  },
  setup() {
    const currentItem = ref(null) as any;

    const chapterContainer = ref(null) as any;

    const showPopUp = ref(false);

    const allCourses = ref([] as any);
    const currentCourse = ref({} as any);

    StudentSelfTestApi.AllCourses().then((res) => {
      // Push Every Item to The Courses Array
      res.data.data.forEach((el) => allCourses.value.push(el));
      // Change the default current course to the first child of array
      currentCourse.value = allCourses.value[0];
    });

    const currentSessions = computed(() => {
      return currentCourse.value.sessions;
    });

    const toggleCurrentItem = (session) => {
      // Changing The CurrentItem To Send To Next Page
      currentItem.value = session;
    };

    const changeCurrentCourse = (el) => {
      currentCourse.value = el;
    };

    const moveToQuestions = () => {
      showPopUp.value = true;
      // if (currentItem.value) {
      //   router.push({
      //     name: 'SelfTestQuestions',
      //     params: { id: currentItem.value._id }
      //   });
      // }
    };

    return {
      toggleCurrentItem,
      chapterContainer,
      moveToQuestions,
      allCourses,
      changeCurrentCourse,
      currentSessions,
      currentItem,
      showPopUp
    };
  }
});
</script>

<style lang="scss">
@import '@/css-variable//Global.scss';
.self-test {
  position: relative;
  background: #f4f4f4;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding-top: 8vh;

  .lessons {
    padding: 1rem 0.5rem;
    gap: 0.5rem;
    display: flex;
    overflow-x: auto;
  }

  .chapters-list {
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
