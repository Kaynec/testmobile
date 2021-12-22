<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="self-test-questions">
    <MinimalHeader title="سوالات برگزیده" />
    <!-- Progress Bar And Count -->

    <div class="progress-count">
      <div class="count">
        <span> </span>
        <span>
          <!-- {{ toPersianNumbers(allCount) }}/{{ toPersianNumbers(idx + 1) }} -->
        </span>
      </div>
      <div class="progress" style="height: 5px">
        <!-- <div
          class="progress-bar bg-success"
          role="progressbar"
          :style="`width: ${
            (allData[currentChunk].length + (currentChunk * 20) / allCount) *
            100
          }%`"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div> -->
      </div>
    </div>

    <div
      class="quiz-card shadow"
      v-if="allData[currentChunk] && allData[currentChunk][idx]"
    >
      <p class="number-of-question">
        سوال شماره <span> {{ toPersianNumbers(+idx + 1) }} </span>
      </p>
      <h5>
        {{ allData[currentChunk][idx].question.text }}
      </h5>
      <div v-if="allData[currentChunk]" class="quiz-card-container">
        <div
          v-for="(item, index) in allData[currentChunk][idx].question.options"
          :key="item._id"
          @click="changeQuestionsAnswer(index)"
          class="card"
        >
          {{ item.text }}
          <img src="../../../assets/img/vpn-key-white.png" class="img" />
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div
      class="btns"
      v-if="allData[currentChunk] && allData[currentChunk][idx]"
    >
      <button
        class="red"
        @click="showNextQuestion"
        v-if="idx + 1 < allData[currentChunk].length"
      >
        سوال بعدی
      </button>

      <button class="red" @click="showPreviousQuestion" v-if="idx - 1 >= 0">
        سوال قبلی
      </button>
      <img
        src="../../../assets/img/bookmark-light@2x.png"
        @click="bookmarkQuestion(allData[currentChunk][idx])"
        class="img"
        v-if="!isBookmarked()"
      />
      <img
        src="../../../assets/img/bookmark@2x.png"
        @click="bookmarkQuestion(allData[currentChunk][idx])"
        class="img"
        v-else
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import router from '@/router';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import { useRoute } from 'vue-router';
import { StudentSelfTestApi } from '@/api/services/student/student-selftest-service';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
export default defineComponent({
  components: { MinimalHeader },
  setup() {
    const route = useRoute();

    const allData = ref([] as any);

    const allCount = ref(0);

    const idx = ref(route.params.idx);

    const currentChunk = ref(+route.params.currentChunk) as any;

    (async () => {
      const res = await StudentSelfTestApi.AllBookmarkQuestions();

      const tmpArray = [] as any;

      res.data.data.forEach((question) => {
        if (question.question != null) {
          tmpArray.push(question);
        }
      });

      allCount.value = tmpArray.length;

      for (let i = 0, j = tmpArray.length; i < j; i += 20)
        allData.value.push(tmpArray.slice(i, i + 20));
    })();

    const goOnePageBack = () => router.go(-1);

    // Push All Bookmarked Questions

    const isBookmarked = () => {
      return allData.value.find((item) => {
        return item._id == allData.value[currentChunk.value][+idx.value]._id;
      });
    };

    const bookmarkQuestion = (question) => {
      const isBookmark = isBookmarked();
      // If The Question Is Not Bookmarked
      if (!isBookmark) {
        StudentSelfTestApi.bookmarkQuestion({
          question: {
            _id: question._id
          },
          session: {
            _id: question.session
          },
          course: {
            _id: question.course
          }
        }).then(() => {
          // Re Fill The Bookmarked Array
          StudentSelfTestApi.AllBookmarkQuestions().then((res) => {
            res.data.data.forEach((item) => {
              if (item.question != null) {
                allData.value.push(item);
              }
            });
          });
        });
      } else if (isBookmark) {
        StudentSelfTestApi.unBookmarkQuestion(isBookmark._id).then(() => {
          // Re Fill The Bookmarked Array
          StudentSelfTestApi.AllBookmarkQuestions().then((res) => {
            res.data.data.forEach((item) => {
              if (item.question != null) {
                allData.value.push(item);
              }
            });
          });
        });
      }
    };

    // Make The Answer the clicked one 1 based instead of zero

    const changeQuestionsAnswer = (id: number) =>
      (allData.value[currentChunk.value][+idx.value].answer = id + 1);

    return {
      goOnePageBack,
      idx,
      currentChunk,
      allData,
      toPersianNumbers,
      isBookmarked,
      bookmarkQuestion,
      allCount,
      changeQuestionsAnswer
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.self-test-questions {
  height: 100%;
  position: relative;
  width: 100%;
  padding-top: 8vh;
  background: #f4f4f4;
  overflow: hidden;

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
    margin: 1rem auto 0;
    background-color: #fff;
    padding: 1rem;
    border-radius: 25px;
    overflow-y: scroll;
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
    margin: 0.9rem auto 0.4rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 0.5rem;

    .img {
      width: 22%;
      height: 22%;
    }

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
      color: white;
    }
  }
}
</style>
