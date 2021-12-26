<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="user-home" v-else>
    <!-- Header -->
    <Header />
    <transition name="fade">
      <img :src="currentImg" class="hero" alt="hero-img" :key="currentImg" />
    </transition>
    <!-- Main Container -->
    <div class="cart-container">
      <div class="cart long">
        <img src="../../../assets/img/home-icons/time-exam.png" />
      </div>

      <div class="cart long">
        <img
          src="../../../assets/img/home-icons/duel.png"
          @touchstart="MoveToDoul"
        />
      </div>

      <div class="cart">
        <img src="../../../assets/img/home-icons/book.svg" />
        <h5>کتب درسی</h5>
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/class.svg"
          @touchstart="MoveToCLassRoom"
        />
        <h5>کلاس ها</h5>
      </div>

      <div class="cart">
        <img src="../../../assets/img/home-icons/support.svg" />
        <h5>پشتیبانی</h5>
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/azmoon.svg"
          @touchstart="changeShowAzmoon(true)"
        />
        <h5>آزمون ها</h5>
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/group.svg"
          @touchstart="changeShowRoadMap(true)"
        />
        <h5>نقشه راه</h5>
      </div>

      <div class="cart">
        <img
          @touchstart="MoveToCalendar"
          src="../../../assets/img/home-icons/calendar.svg"
        />
        <h5>تقویم</h5>
      </div>
    </div>
    <Footer />
    <!--  -->
  </div>
  <!-- Azmoon -->
  <Azmoon v-if="showAzmoon" @convertBoolean="changeShowAzmoon(false)" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStudentStore } from '@/store';
import { StudentActionTypes } from '@/store/modules/student/action-types';
import router from '@/router';
import Footer from '@/modules/student-modules/footer/footer.vue';
import Header from '@/modules/student-modules/header/header.vue';
import Azmoon from '@/modules/student-modules/azmoon/azmoon.vue';
// import { StudentAuthServiceApi } from '@/api/services/student/student-auth-service';
// import { store } from '@/store';

@Options({
  components: {
    Footer,
    Header,
    Azmoon
  },
  computed: {
    currentImg: function () {
      return require('../../../assets/' +
        this.images[Math.abs(this.currentIndex) % this.images.length] +
        '.png');
    }
  }
})
export default class Login extends Vue {
  public showAzmoon = false;
  public showRoadMap = false;
  public timer = null as number | null;
  public currentIndex = 0;
  public images = [
    // '../../../assets/img/tech-training-purple.png'
    'duel.png',
    'img/tech-training-purple@2x',
    'roadmap@3x'
  ];
  mounted() {
    this.startSlide();
  }

  public startSlide() {
    this.timer = setInterval(this.next, 8000);
  }

  public next() {
    this.currentIndex += 1;
  }
  public prev() {
    this.currentIndex -= 1;
  }

  public MoveToCLassRoom(): void {
    setTimeout(() => {
      router.push({
        name: 'ClassRoom'
      });
    }, 100);
  }

  public MoveToDoul(): void {
    setTimeout(() => {
      router.push({
        name: 'Duel'
      });
    }, 100);
  }

  public MoveToCalendar(): void {
    setTimeout(() => {
      router.push({
        name: 'Calendar'
      });
    }, 100);
  }

  public changeShowRoadMap(boolean: boolean): void {
    this.showRoadMap = boolean;
  }
  public changeShowAzmoon(boolean: boolean): void {
    this.showAzmoon = boolean;
  }

  async logout() {
    await useStudentStore().dispatch(
      StudentActionTypes.LOG_OUT_STUDENT,
      undefined
    );
    this.$router.push('/student/login');
  }
}
</script>
<style lang="scss" scoped>
.desktop {
  height: 100%;
}

.user-home {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  position: relative;
  padding-top: 8vh;
  height: 100%;

  .hero {
    width: 95%;
    max-height: 40vh;
    object-fit: cover;
    margin: 1rem auto 0;
  }
}
.cart-container {
  width: 95%;
  margin-inline: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  max-height: 500px;

  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #efefef;
    border: 1px solid rgba(128, 128, 128, 0.192);
    box-shadow: 0 5px 5px -5px gray;
    margin: 0.2rem;
    border-radius: 50%;
    width: clamp(17%, 25%, 250px);
    // height: 25%;
    aspect-ratio: 1;
    padding: 0.5rem;

    h5 {
      font-size: 0.88rem;
      font-family: IRANSans;
      font-weight: bold;
    }

    img {
      padding-bottom: 0.7rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &:nth-of-type(7),
    &:nth-of-type(6),
    &:nth-of-type(8) {
      margin-bottom: 3.8rem;
    }
  }
  .long {
    flex-basis: 50%;
    height: 6.2rem;
    margin: 0.7rem auto 0 auto;
    padding: 0;
    box-shadow: none;
    border: none;

    img {
      padding: 3%;
      border-radius: 0%;
      width: 100%;
    }
  }
}
</style>
