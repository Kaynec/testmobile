<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="w-100" :style="styles">
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
        componentName="Calendar"
      />
      <Card
        label="ارتباط با پشتیبان"
        TextDetail="۴ پیام خوانده نشده دارید"
        iconSrc="support"
        componentName="ContactBackup"
      />
      <Card
        label="پروفایل"
        TextDetail="تکمیل اطلاعات حساب کاربری را انجام دهید"
        iconSrc="profile"
        componentName="MyProfile"
      />
      <Card
        label="ارتباط با ما"
        TextDetail="کافیست ماهانی شوید"
        iconSrc="contact-us"
        componentName="contactUs"
      />
      <Card
        label="محصولات آموزشی"
        TextDetail="کتابها و پادکست های جدید"
        iconSrc="education"
      />
      <Card
        label="نقشه راه شما"
        TextDetail="۳۸ درصد از مسیر تا رسیدن به مقصد مانده!"
        iconSrc="roadmap"
      />
    </div>
    <!--  -->
    <Footer />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import Footer from '@/modules/student-modules/footer/footer.vue';
import Header from '@/modules/student-modules/header/header.vue';
import Card from '@/modules/student-modules/card.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
    Card
  },
  setup() {
    const styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `,
        'background-color': 'rgba(33, 49, 84, 0.082)'
      };
    });
    return { styles };
  }
});
</script>
