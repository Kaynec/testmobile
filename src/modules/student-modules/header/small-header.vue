<template>
  <nav class="sm-nav">
    <div>
      <img :src="imageUrl" class="profile-image" />
      <span class="user-parts">
        {{ currentUser.username }} | امتیاز شما:
        {{ toPersianNumbers(`${point}`) }}
      </span>
    </div>
    <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { store } from '@/store';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';

export default defineComponent({
  setup() {
    const goOnePageBack = () => router.go(-1);

    const currentUser = ref(store.getters.getCurrentStudent);

    const point = ref(0);

    const imageUrl =
      `https://www.api.devnirone.ir/api/student/getProfileImage/${currentUser.value.profileImage}` ||
      'https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png';

    if (currentUser.value && currentUser.value.point)
      point.value = currentUser.value.point;

    return {
      router,
      goOnePageBack,
      toPersianNumbers,
      currentUser,
      point,
      store,
      imageUrl
    };
  }
});
</script>

<style lang="scss" scoped>
.sm-nav {
  background-color: #171717;
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  height: 8vh;
  margin-bottom: 8vh;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 2;
  div {
    img {
      width: 29px;
      height: 28px;
      margin: 0 10px 0 0;
      border-radius: 8px;
      border: solid 2px #ddd;
      margin-left: 0.5rem;
    }

    span {
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
    }
  }
}
</style>
