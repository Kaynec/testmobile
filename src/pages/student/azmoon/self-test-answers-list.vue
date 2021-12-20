<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="self-test" v-else>
    <MinimalHeader :title="`پاسخنامه تشریحی ${title}`" />
    <div
      class="Card"
      v-for="(question, idx) in questions[currentChunk]"
      :key="question._id"
      @click="openAnswerForTheQuestion(idx)"
    >
      <span>
        {{ toPersianNumbers(idx + 1) }}.
        {{ question.text }}
      </span>
      <i class="fas fa-angle-left fa-2x"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';
import router from '@/router';
import { store } from '@/store';

export default defineComponent({
  components: { MinimalHeader },
  setup() {
    const { title, questions, currentChunk } =
      store.getters.getCurrentQuestionsList;

    const openAnswerForTheQuestion = (idx) => {
      router.push({
        name: 'SelfTestQuestionsAnswer',
        params: { idx }
      });
    };

    return {
      title,
      questions,
      currentChunk,
      toPersianNumbers,
      openAnswerForTheQuestion
    };
  }
});
</script>

<style lang="scss" scoped>
.self-test {
  width: 100%;
  background-color: #f4f4f4;
  height: 100%;
  padding-top: 8vh;
  font-family: IRANSans;

  .Card {
    width: 92%;
    margin: 10px auto;
    padding: 1.35rem;
    border-radius: 10px;
    box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
    background-color: #fff;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
