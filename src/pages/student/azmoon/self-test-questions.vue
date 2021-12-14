<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="self-test-questions" :style="styles">
    <nav class="sm-nav">
      <div>
        <span class="user-parts">
          امتیازات کسب شده :
          {{ toPersianNumbers(store.getters.getCurrentStudent.point) }} &nbsp; |
          &nbsp; امتیاز این فصل : {{ toPersianNumbers(0) }}
        </span>
      </div>

      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
    <!-- Progress Bar And Count -->

    <div class="progress-count">
      <div class="count">
        <span>
          {{ model.title }}
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
          style="width: 100%"
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
          <img src="../../../assets/img/vpn-key-white.png" class="tick" />
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="btns">
      <button
        class="red"
        @click="currentQuestionIndex + 1 ? currentQuestionIndex++ : null"
        v-if="currentQuestionIndex <= 8"
      >
        سوال بعدی
      </button>
      <button class="red" v-else @click="submitSelfTest">
        سوالات بیشتر <i class="fas fa-arrow-right"></i>
      </button>
      <button
        class="red"
        @click="currentQuestionIndex - 1 >= 0 ? currentQuestionIndex-- : null"
        v-if="currentQuestionIndex - 1 >= 0"
      >
        سوال قبلی
      </button>
      <button class="green" v-else @click="openSelfTestQuestionsAnswers">
        پاسخنامه تشریحی
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { StudentSelfTestApi } from '@/api/services/student/student-selftest-service';
import { StudentExamApi } from '@/api/services/student/student-exam-service';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { store } from '@/store';
import router from '@/router';

export default defineComponent({
  props: {
    item: { type: String, default: '{}' }
  },
  setup(props) {
    const model = ref(JSON.parse(props.item));

    const questions = ref([] as any);
    // const currentQuestion = ref({} as any)
    const currentQuestionIndex = ref(0);

    const currentChunk = ref(0);

    // Check For Duplicate Exam And increase currentChunk if true
    StudentSelfTestApi.selfTestResult({
      course: model.value.course,
      session: model.value._id
    }).then((res) => {
      console.log(res);
    });

    // Get The Detail Of All Questions Inside of That Session
    const tmpArray = [] as any;

    const requests = model.value.questions.map((question) => {
      return new Promise((resolve) => {
        StudentExamApi.getOneQuestion(question).then((res) => {
          // Change The Correct Idx
          let index = null;
          res.data.data.options.forEach((option, idx) => {
            if (option.isAnswer) index = idx + 1;
          });
          resolve(
            tmpArray.push({ ...res.data.data, answer: null, correct: index })
          );
        });
      });
    });

    Promise.all(requests).then(() => {
      //  Split The Questions to array of 10
      for (let i = 0, j = tmpArray.length; i < j; i += 10)
        questions.value.push(tmpArray.slice(i, i + 10));
      console.log(questions.value);
    });

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
        }
      });
    };

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    const openSelfTestQuestionsAnswers = () =>
      router.push({
        name: 'SelfTestQuestionsAnswers'
      });

    // Make The Answer the clicked one 1 based instead of zero

    const changeQuestionsAnswer = (idx: number) =>
      (questions.value[currentChunk.value][currentQuestionIndex.value].answer =
        idx + 1);

    const goOnePageBack = () => router.go(-1);

    return {
      styles,
      goOnePageBack,
      openSelfTestQuestionsAnswers,
      model,
      toPersianNumbers,
      currentQuestionIndex,
      currentChunk,
      questions,
      submitSelfTest,
      changeQuestionsAnswer,
      store
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.self-test-questions {
  width: 100%;
  background: #f4f4f4;
  .sm-nav {
    width: 100%;
    background-color: #171717;
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem;
    max-height: 8vh;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);

    div {
      img {
        width: 29px;
        height: 28px;
        margin: 0 10px 0 0;
        border-radius: 8px;
        border: solid 2px #ddd;
      }

      span {
        font-family: IRANSans;
        font-size: 11px;
        font-weight: bold;
      }
    }
  }

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

        span {
          font-family: IRANSans;
          font-size: 13px;
          font-weight: bold;
          color: #646464;
        }

        .tick {
          width: 24px;
          height: 24px;
          object-fit: contain;
          border: solid 1px #c1c1c1;
          border-radius: 50px;
        }
      }
      // Success Class
      .success {
        border: solid 1px #3fca60;

        span {
          color: #3fca60;
        }
        .tick {
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
