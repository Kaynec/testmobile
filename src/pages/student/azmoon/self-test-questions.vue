<template>
  <div class="desktop" v-if="!isMobile()"></div>

  <!-- Spinner -->
  <div class="loader-parent" v-else-if="!questions.length">
    <div class="loading1"></div>
  </div>
  <!--  -->

  <div v-else class="self-test-questions">
    <MinimalHeader
      :title="`
     امتیازات کسب شده :
          ${toPersianNumbers(store.getters.getCurrentStudent.point)} &nbsp; |
          &nbsp; امتیاز این فصل : ${toPersianNumbers(`0`)}
    `"
    />

    <!-- Progress Bar And Count -->

    <div class="progress-count">
      <div class="count">
        <span>
          {{ title }}
        </span>
        <!-- Change This And Width Of The Progress Bar Dynamically -->
        <span>
          {{ toPersianNumbers(`${currentQuestionIndex + 1}`) }}/{{
            toPersianNumbers(`${questions[currentChunk].length}`)
          }}</span
        >
      </div>
      <div class="progress" style="height: 5px">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          :style="` width : ${
            (currentQuestionIndex / questions[currentChunk].length) * 100 + 10
          }% `"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>

    <!-- Quiz Card -->

    <div class="quiz-card shadow">
      <p class="number-of-question">
        سوال شماره <span> {{ currentQuestionIndex + 1 || '' }} </span>
      </p>

      <h5>
        <!-- Change This With Real Data Of Question -->
        {{ questions[currentChunk][currentQuestionIndex].text || '' }}
      </h5>
      <div class="quiz-card-container">
        <div
          :class="`${
            questions[currentChunk][currentQuestionIndex].answer - 1 === index
              ? 'card success'
              : 'card'
          }`"
          v-for="(option, index) in questions[currentChunk][
            currentQuestionIndex
          ].options"
          :key="option._id"
          @click="changeQuestionsAnswer(index)"
        >
          <span>
            <!-- Answer Text -->
            {{ option.text }}
          </span>

          <div class="img">
            <img
              src="../../../assets/img/accept-path-light.png"
              @click="changeShowDetail"
              alt="active"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="btns">
      <button
        class="red"
        @click="showNextQuestion"
        v-if="currentQuestionIndex + 1 < questions[currentChunk].length"
      >
        سوال بعدی
      </button>
      <button class="red" v-else @click="submitSelfTest">
        سوالات بیشتر <i class="fas fa-arrow-right"></i>
      </button>

      <button
        class="green"
        v-if="currentQuestionIndex + 1 == questions[currentChunk].length"
        @click="openSelfTestQuestionsAnswers"
      >
        پاسخنامه تشریحی
      </button>
      <button
        class="red"
        @click="showPreviousQuestion"
        v-else-if="currentQuestionIndex - 1 >= 0"
      >
        سوال قبلی
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import { StudentSelfTestApi } from '@/api/services/student/student-selftest-service';
import { StudentExamApi } from '@/api/services/student/student-exam-service';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { store } from '@/store';
import router from '@/router';
import { useRoute } from 'vue-router';
const alertify = require('@/assets/alertifyjs/alertify');

export default defineComponent({
  components: { MinimalHeader },
  setup(props) {
    const route = useRoute();
    const id = route.params.id as string;
    const title = ref('');

    const model = ref({} as any);

    const questions = ref([] as any);
    // const currentQuestion = ref({} as any)
    const currentQuestionIndex = ref(0);

    const currentChunk = ref(0);

    (async () => {
      const resForModel = await StudentSelfTestApi.getOneSession(id);
      console.log(resForModel);
      model.value = resForModel.data.data;
      // Get The Title
      const courseRes = await StudentSelfTestApi.getOneCourse(
        model.value.course
      );
      title.value = `${resForModel.data.data.title} ${courseRes.data.data.title}`;
      // Check For Duplicate Exam And increase currentChunk if true
      const res = await StudentSelfTestApi.selfTestResult({
        course: model.value.course,
        session: model.value._id
      });
      const amountToslice = res.data.data.totalQuestion;
      model.value.questions.splice(0, amountToslice);

      if (model.value.questions.length <= 0) {
        alertify.alert('شما قبلا این فصل را امتحان داده اید');
        router.push({
          name: 'SelfTest'
        });
      }

      // Get The Detail Of All Questions Inside of That Session
      const tmpArray = [] as any;

      const requests = model.value.questions.map(async (question) => {
        return new Promise((resolve) => {
          StudentExamApi.getOneQuestion(question).then((res) => {
            // Change The Correct Idx
            let index = null;
            res.data.data.options.forEach((option, idx) => {
              if (option.isAnswer) index = idx + 1;
            });

            resolve(
              tmpArray.push({
                ...res.data.data,
                answer: null,
                correct: index
              })
            );
          });
        });
      });

      //  Split The Questions to array of 10
      Promise.all(requests).then(() => {
        for (let i = 0, j = tmpArray.length; i < j; i += 10)
          questions.value.push(tmpArray.slice(i, i + 10));
      });
    })();

    const submitSelfTest = () => {
      const arrayToSend = questions.value[currentChunk.value].map(
        (question) => {
          return {
            question: { _id: question._id },
            answer: question.answer,
            correct: question.correct
          };
        }
      );

      StudentSelfTestApi.registerSelfTest({
        course: { _id: model.value.course },
        session: { _id: model.value._id },
        answers: arrayToSend
      }).then((res) => {
        if (res.data.status == 0 || res.data.status == 200 || res.data) {
          currentQuestionIndex.value = 0;
          currentChunk.value = 0;

          alertify.success(res.data.message);
          router.push({
            name: 'Home'
          });
        }
      });
    };

    const openSelfTestQuestionsAnswers = () =>
      router.push({
        name: 'SelfTestQuestionsAnswers',
        params: {
          title: title.value,
          questions: JSON.stringify(questions.value),
          currentChunk: currentChunk.value
        }
      });

    // Make The Answer the clicked one 1 based instead of zero

    const changeQuestionsAnswer = (idx: number) =>
      (questions.value[currentChunk.value][currentQuestionIndex.value].answer =
        idx + 1);

    const goOnePageBack = () => router.go(-1);
    const showNextQuestion = () => {
      if (
        currentQuestionIndex.value + 1 <
        questions.value[currentChunk.value].length
      )
        currentQuestionIndex.value++;
    };

    const showPreviousQuestion = () => {
      if (currentQuestionIndex.value - 1 >= 0) currentQuestionIndex.value--;
    };

    return {
      goOnePageBack,
      openSelfTestQuestionsAnswers,
      model,
      toPersianNumbers,
      currentQuestionIndex,
      currentChunk,
      questions,
      submitSelfTest,
      changeQuestionsAnswer,
      store,
      showNextQuestion,
      showPreviousQuestion,
      title
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.self-test-questions {
  width: 100%;
  background: #f4f4f4;
  height: 100%;
  position: relative;
  padding-top: 8vh;

  .progress-count {
    width: 100%;
    padding: 1rem;
    .count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.5rem;
      font-family: IRANSans;
      color: #171717;

      span {
        &:first-child {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }

  .quiz-card {
    width: 90%;
    margin: 1rem auto;
    background-color: #fff;
    padding: 1rem;
    border-radius: 25px;

    .number-of-question {
      font-family: IRANSans;
      font-size: 12px;
      text-align: right;
      color: #ed1b24;
      margin: 0.7rem 0;

      span {
        display: inline-block;
        margin-right: 0.25rem;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 11.8px;
        font-weight: bold;
        text-align: center;
        color: #fff;
        background: #c01a22;
        border-radius: 50%;
        padding: 0.4rem;
      }
    }

    h5 {
      margin: 25px 0 2.2rem;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      text-align: right;
      color: #171717;
      line-height: 1.4;
    }

    .quiz-card-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border: solid 1px #c1c1c193;
        background: #fff;
        width: 100%;
        flex-direction: row;
        border-radius: 18px;
        height: 4rem;
        max-height: 5.5rem;

        .img {
          width: 27px;
          height: 27px;
          padding: 7px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          border: solid 1px #c1c1c193;

          img {
            object-fit: contain;
          }
        }

        span {
          font-family: IRANSans;
          font-size: 13px;
          font-weight: bold;
          color: #646464;
        }
      }
      // Success Class
      .success {
        border: solid 1px #3fca60;

        span {
          color: #3fca60;
        }
        .img {
          background: #3fca60;
        }
      }
    }
  }

  .btns {
    width: 90%;
    margin: 2.5rem auto 0.8rem auto;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0.5rem;

    button {
      width: 50%;
      padding: 0.9rem 1.5rem;
      border-radius: 15px;
      border: none;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }

    .red {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $redish-background;
      flex-direction: row-reverse;
      color: #fff;

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.3rem;
        width: 24px;
        height: 24px;
        background: red;
        border-radius: 50%;
      }
    }

    .green {
      background-color: #3fca60;
      color: #fff;
    }
  }
}
</style>
