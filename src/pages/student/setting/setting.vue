<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="w-100" style="min-height: 100vh">
    <Header />
    <!-- Main Content -->
    <div
      class="
        w-100
        d-flex
        justify-content-center
        align-items-center
        flex-column
        p-2
      "
    >
      <!-- Exams -->
      <Card label="آزمون ها" TextDetail="۲۲ آزمون برای رقابت" iconSrc="test" />
      <Card
        label=" تقویم آموزشی"
        TextDetail="رویدادها و وقایع مهم را ثبت کنید"
        iconSrc="calendar"
      />
      <Card
        label="ارتباط با پشتیبان"
        TextDetail="۴ پیام نخوانده نشده دارید"
        iconSrc="support"
      />
      <!-- Waiting For The Currect Picture -->
      <!-- <Card
        label="پروفایل"
        TextDetail="تکمیل اطلاعات حساب کاربری را انجام دهید"
        iconSrc="profile"
      /> -->
      <Card
        label="ارتباط با ما"
        TextDetail="کافیست ماهانی شوید"
        iconSrc="contact-us"
      />
      <Card
        label="محصولات آموزشی"
        TextDetail="کتابها و پادکست های جدید"
        iconSrc="educational-product"
      />
      <Card
        label="نقشه راه شما"
        TextDetail="۳۸ درصد از مسیر تا رسیدن به مقصد مانده!"
        iconSrc="roadmap"
      />
      <!--  -->
    </div>
    <!--  -->
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Footer from '@/modules/student-modules/footer/footer.vue';
import Header from '@/modules/student-modules/header/header.vue';
import Card from './card.vue';
export default defineComponent({
  components: {
    Header,
    Footer,
    Card
  }
});
</script>
<style scoped>
body {
  background: #f4f4f4;
  position: fixed;
}
</style>
