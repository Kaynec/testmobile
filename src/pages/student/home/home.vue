<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="user-home" v-else>
    <!-- Header -->
    <Header />

    <div class="hero-container">
      <transition name="slide-left" mode="out-in">
        <img :key="currentImg" :src="currentImg" class="hero" />
      </transition>
      <div class="img-control">
        <span
          v-for="i in images.length"
          :key="i"
          :class="`${currentIndex + 1 == i ? 'rectangle' : 'dot'}`"
          @click="currentIndex = i - 1"
        >
        </span>
      </div>
    </div>
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
      return require('../../../assets/img/' +
        this.images[Math.abs(this.currentIndex) % this.images.length]);
    }
  }
})
export default class Login extends Vue {
  public showAzmoon = false;
  public showRoadMap = false;
  public timer = null as any;
  public currentIndex = 0;
  public images = ['tech-training-purple@2x.png', 'roadmap@3x.png'];
  mounted() {
    this.startSlide();
  }

  public startSlide() {
    this.timer = setInterval(this.next, 5000);
  }

  public next() {
    clearInterval(this.timer);
    this.timer = setInterval(this.next, 5000);
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  public prev() {
    this.currentIndex = (this.currentIndex - 1) % this.images.length;
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
  width: 100%;
  height: 100%;
  font-family: IRANSans;
  background-color: #f4f4f4;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 5vh;

  .hero-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    padding: 0;
    .hero {
      width: 95%;
      min-height: 27vh;
      max-height: 35vh;
      object-fit: contain;
      margin: 1rem 0 0;
    }
    .img-control {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      .dot {
        height: 12px;
        width: 12px;
        background-color: rgba(237, 27, 36, 0.4);
        border-radius: 50%;
        display: inline-block;
        margin: 0 5px;
      }
      .rectangle {
        width: 36px;
        border-radius: 10px;
        background-color: #d21921;
        height: 12px;
      }
    }
  }
}
.cart-container {
  width: 95%;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  max-height: 500px;
  padding-bottom: 4rem;

  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #efefef;
    border: 1px solid #b1b1b123;
    box-shadow: 0 5px 8px -3px gray;
    border-radius: 50%;
    margin: 0.2rem 0;
    width: 28vw;
    height: 15vh;
    aspect-ratio: 1;
    h5 {
      font-size: 0.65rem;
      font-weight: bold;
    }

    img {
      width: 30%;
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
