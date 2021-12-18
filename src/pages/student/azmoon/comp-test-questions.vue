<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="self-test-questions">
    <MinimalHeader
      :title="`
    امتیازات کسب شده :
          ${toPersianNumbers(store.getters.getCurrentStudent.point)} &nbsp; |
          &nbsp; امتیاز این فصل : ۱۸۷
    `"
    />
    <!-- Progress Bar And Count -->
    <div class="progress-count">
      <div class="count">
        <!-- <span> {{ model.orientation }} {{ model.session.title }} </span> -->
        <!-- Change This And Width Of The Progress Bar Dynamically -->
        <span> {{ AllQuestions.length }}/{{ currentQuestion + 1 }} </span>
      </div>
      <div class="progress-container">
        <div class="progressbar">
          <div
            :style="`width : ${
              ((currentQuestion + 1) / AllQuestions.length) * 100
            }%`"
            class="progressbar-child"
            ref="progressbarChild"
          ></div>
        </div>
      </div>
      <div class="timer">
        <span>{{ toPersianNumbers(timeForTemplate) }}</span>
        <img src="../../../assets/img/time@2x.png" alt="time icon" />
      </div>
    </div>
    <!-- Quiz Card -->
    <div class="quiz-card shadow">
      <p class="number-of-question">
        سوال شماره <span> {{ currentQuestion + 1 }} </span>
      </p>

      <h5>
        <!-- Change This With Real Data Of Question -->
        {{
          AllQuestions[currentQuestion].text ||
          ' چرا برای نوشتن یک بند، موضوع کلی را به موضوع های کوچک تر تقسیم می کنیم؟'
        }}
      </h5>
      <div class="quiz-card-container" ref="container">
        <div
          class="card"
          @click.once="submitAnswer(question, $event)"
          v-for="question in AllQuestions[currentQuestion].options"
          :key="question._id"
        >
          <span>
            {{ question.text }}
          </span>
          <div class="tick">
            <i class="fas fa-check"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- Buttons -->
    <div class="btns">
      <button @click="endAzmoon" class="red end">
        <span> اتمام آزمون </span>
        <i class="fas fa-arrow-right"></i>
      </button>
      <button
        @click="showNextQuestion"
        :class="` ${AllQuestions[currentQuestion + 1] ? 'red' : 'grey'}  `"
      >
        بعدی
      </button>
      <button
        @click="showPreviousQuestion"
        :class="` ${AllQuestions[currentQuestion - 1] ? 'red' : 'grey'}  `"
      >
        قبلی
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, reactive } from 'vue';
import router from '@/router';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import { store } from '@/store';
import { StudentExamApi } from '@/api/services/student/student-exam-service';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';

export default defineComponent({
  components: { MinimalHeader },
  props: {
    label: { type: String, default: 'فصل دوم بهداشت' },
    item: { type: String, default: '{}' }
  },
  setup(props) {
    const model = ref(JSON.parse(props.item));

    const container = ref();

    const time = ref(7200);

    const currentQuestion = ref(0);
    const AllQuestions = ref([] as any);

    const userChoices = reactive({
      exam: {
        _id: model.value._id
      },
      answers: []
    });

    model.value.questions.forEach((item: any) => {
      StudentExamApi.getOneQuestion(item)
        .then((res) => {
          if (res.data.data) {
            AllQuestions.value.push(res.data.data);
          }
          return true;
        })
        .then((res) => {
          console.log(AllQuestions.value);
        });
    });

    const goOnePageBack = () => router.go(-1);

    const timeForTemplate = computed(() => {
      return new Date(time.value * 1000).toISOString().substr(11, 8);
    });

    const submitAnswer = (question, e) => {
      console.log(question);
      // if (questionIndex >= 0) {
      // }
      container.value.querySelectorAll('.card').forEach((element) => {
        element.classList.remove('active');
      });

      const tmp = {
        question: {
          _id: question._id
        },
        course: { _id: question.course._id }, //
        session: {
          _id: question.session._id
        }
      };

      e.target.classList.add('active');
    };

    const showPreviousQuestion = () => {
      console.log('PREVIOUS QUESTION');
    };

    const showNextQuestion = () => {
      console.log('NEXT Question');
    };

    const endAzmoon = () => {
      console.log('END AZMOON');
    };
    onMounted(() => {
      setInterval(() => {
        if (time.value >= 0) time.value = time.value - 1;
      }, 1000);
    });

    return {
      goOnePageBack,
      timeForTemplate,
      model,
      toPersianNumbers,
      store,
      currentQuestion,
      AllQuestions,
      submitAnswer,
      container,
      showPreviousQuestion,
      showNextQuestion,
      endAzmoon
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
    .timer {
      width: 100%;
      min-height: 2rem;
      max-height: 3rem;
      background: $redish-background;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      border-radius: 50px;
      padding: 5px 2px;

      span {
        background-image: linear-gradient(to left, #fad961 45%, #f76b1c);
        border-radius: 25px;
        display: inline-block;
        margin-left: 0.25rem;
        color: #fff;
        padding: 0.2rem 2rem;
        font-size: 18px;
        font-weight: bold;
      }
      img {
        width: 35px;
        height: 35px;
        object-fit: contain;
        margin-right: 0.75rem;
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
          width: 27px;
          height: 27px;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid #ccc;
          text-align: center;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
      }
      .active {
        border: 1px solid #3fca60;
        color: #3fca60;

        span {
          color: #3fca60;
        }

        .tick {
          background-color: #4ac367;
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
      padding: 1.22rem 1.5rem;
      border-radius: 15px;
      border: none;
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }

    .red {
      background: $redish-background;
      text-align: center;
      position: relative;

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.3rem;
        width: 24px;
        height: 24px;
        background: red;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 30%;
        margin-right: 0.7rem;
        margin-left: 0.7rem;
      }
    }

    .end {
      width: 50%;
    }

    .green {
      background-color: #3fca60;
      color: white;
    }
    // Give This Class When There isn't Anymore Question Left Back
    .grey {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      background-color: #d3d7e0;
      color: #646464;
    }
  }
}

.progress-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  .progressbar {
    flex-grow: 1;
    height: 6px;
    background-color: #171717;
    position: relative;
    margin-bottom: 1rem;
    border-radius: 5px;

    .progressbar-child {
      background-color: #3fca60;
      position: absolute;
      height: 100%;
      transition: ease 0.2s;
      width: 10%;
      left: 0;
    }
  }
}
</style>
