<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="class" v-else>
    <SmallHeader />
    <ClassInfo v-if="classInfo" @convertBoolean="toggleClassInfo" />
    <img src="../../../assets/img/class/hero.png" alt="hero img" class="hero" />
    <div class="grid">
      <div class="card" @click="toggleClassInfo">
        <img src="../../../assets/img/class/purple@3x.png" alt="colored img" />
        <span> نام درس </span>
      </div>

      <div class="card" @click="toggleClassInfo">
        <img src="../../../assets/img/class/orange@3x.png" alt="colored img" />
        <span> نام درس </span>
      </div>

      <div class="card" @click="toggleClassInfo">
        <img src="../../../assets/img/class/pink@3x.png" alt="colored img" />
        <span> نام درس </span>
      </div>

      <div class="card" @click="toggleClassInfo">
        <img src="../../../assets/img/class/green@3x.png" alt="colored img" />
        <span> نام درس </span>
      </div>

      <div class="card" @click="toggleClassInfo">
        <img src="../../../assets/img/class/pink@3x.png" alt="colored img" />
        <span> نام درس </span>
      </div>
    </div>
    <img
      src="../../../assets/img/class/pencil.png"
      alt="pencil icon"
      class="pencil"
      @click="openNote"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import router from '@/router';
import ClassInfo from '@/modules/student-modules/class/class-info.vue';

export default defineComponent({
  components: { SmallHeader, ClassInfo },
  setup() {
    const classInfo = ref(false);
    const toggleClassInfo = () => (classInfo.value = !classInfo.value);

    const openNote = () => {
      router.push({
        name: 'ClassRoomNote'
      });
    };

    return { classInfo, toggleClassInfo, openNote };
  }
});
</script>

<style lang="scss" scoped>
.class {
  width: 100%;
  min-height: 110%;
  overflow-x: hidden;
  background-color: #f4f4f4;
  position: relative;

  .hero {
    width: 100%;
    max-height: 35vh;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: repeat(auto-fit, minmax(180px, 1fr));
    grid-gap: 0.7rem;
    padding: 0.9rem;

    .card {
      padding: 11px 36px 16.6px 38px;
      border-radius: 14.7px;
      box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.08);
      background-color: #fff;
      display: flex;
      flex-direction: column;
      font-family: IRANSans;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
      }

      span {
        margin: 7px 0 0;
        font-family: IRANSans;
        font-size: 14.7px;
        line-height: 1.25;
        color: #646464;
      }
    }
  }
  .pencil {
    position: absolute;
    bottom: 0;
    left: 0;
    max-width: 52px;
    max-height: 52px;
    margin-bottom: 1rem;
    margin-left: 1rem;
    object-fit: contain;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
}
</style>
