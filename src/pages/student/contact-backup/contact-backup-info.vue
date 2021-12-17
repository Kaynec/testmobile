<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="contact-backup-info" v-else>
    <MinimalHeader title="اطلاعات بیشتر" />
    <img :src="model.img" alt="hero img" class="hero" @click="goToChatPage" />
    <div class="text">
      <h4>پشتیبان {{ model.firstname + model.lastname }}</h4>
      <p v-html="model.resume"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import router from '@/router';
import { StudentMutationTypes } from '@/store/modules/student/mutation-types';
import { store } from '@/store';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';

export default defineComponent({
  components: { MinimalHeader },
  props: {
    data: { type: String, default: '{}' }
  },
  setup(props) {
    const model = ref(JSON.parse(props.data));

    if (props.data != '{}')
      store.commit(
        StudentMutationTypes.SET_CURRENT_SUPPORT_PERSON,
        model.value
      );

    model.value = store.getters.getCurrentSupportPerson;

    const goOnePageBack = () => router.go(-1);

    const goToChatPage = () =>
      router.push({
        name: 'ContactBackupChat',
        params: { data: JSON.stringify(props.data) }
      });

    return { goOnePageBack, goToChatPage, model };
  }
});
</script>

<style lang="scss" scoped>
.contact-backup-info {
  position: relative;
  background-color: #f4f4f4;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding-top: 8vh;

  .nav {
    width: 100%;
    height: 50px;
    padding: 10px 15px 10px 10px;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin: 7px 0 7px 2px;
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
    }
  }

  .hero {
    width: 100%;
    max-height: 35vh;
  }
  .text {
    width: 95%;
    margin: 20px auto;
    padding: 1.5rem;
    border-radius: 16.7px;
    box-shadow: 0 11px 17px 0 rgba(41, 94, 255, 0.05);
    background-color: #fff;
    font-family: IRANSans;

    h4 {
      font-size: 15.5px;
      font-weight: bold;
      text-align: right;
      color: #171717;
    }

    h5 {
      font-size: 13px;
      line-height: 1.43;
      text-align: right;
      color: #646464;
      margin: 25px 0 30px 0;
    }
    p {
      margin: 8.5px 0 0;
      font-size: 13px;
      line-height: 1.64;
      text-align: right;
      color: #646464;
    }
  }
}
</style>
