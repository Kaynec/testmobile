<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="user-home bg" v-else>
    <!-- Header -->
    <Header />
    <img
      src="../../../assets/img/tech-training-purple@2x.png"
      class="hero"
      alt="hero-img"
    />
    <!-- Main Container -->
    <div class="cart-container">
      <div class="cart long">
        <img src="../../../assets/img/home-icons/time-exam.svg" />
      </div>

      <div class="cart long">
        <img
          src="../../../assets/img/home-icons/duel.png"
          @touchstart="MoveToDoul"
        />
      </div>

      <div class="cart">
        <img src="../../../assets/img/home-icons/bill-of-document.svg" />
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/pencil.svg"
          @touchstart="MoveToCLassRoom"
        />
      </div>

      <div class="cart">
        <img src="../../../assets/img/home-icons/archive.svg" />
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/azmoon.svg"
          @touchstart="changeShowAzmoon(true)"
        />
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/google-maps-icon-256.svg"
          @touchstart="changeShowRoadMap(true)"
        />
      </div>

      <div class="cart">
        <img
          @touchstart="MoveToCalendar"
          src="../../../assets/img/home-icons/system-calendar-icon-256.svg"
        />
      </div>
    </div>
    <Footer />
    <!--  -->
  </div>
  <!-- RoadMap  Add a Link as A Prop And Open That On Click -->
  <RoadMap v-if="showRoadMap" @convertBoolean="changeShowRoadMap(false)" />
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
import RoadMap from '@/modules/student-modules/roadmap/roadmap.vue';
import Azmoon from '@/modules/student-modules/azmoon/azmoon.vue';

import { store } from '@/store';

@Options({
  components: {
    Footer,
    Header,
    RoadMap,
    Azmoon
  },
  computed: {}
})
export default class Login extends Vue {
  public windowHeight = window.innerHeight;
  public showAzmoon = false;
  public showRoadMap = false;
  public mounted(): void {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
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

  // get styles() {
  //   return {
  //     'min-height': `calc( 1vh * 100) `
  //   };
  // }
  public changeShowRoadMap(boolean: boolean): void {
    this.showRoadMap = boolean;
  }
  public changeShowAzmoon(boolean: boolean): void {
    this.showAzmoon = boolean;
  }
  onResize(): void {
    (this as any).windowHeight = window.innerHeight;
  }
  getMainStyle(): { height: string } {
    return { height: `${(this as any).windowHeight - 1}px` };
  }
  async logout() {
    debugger;
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
  max-height: 500px;

  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 33.33%;
    width: 33.33%;

    img {
      border-radius: 43%;
      width: 80%;
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

    img {
      padding: 3%;
      border-radius: 0%;
      width: 100%;
    }
  }
}
</style>
