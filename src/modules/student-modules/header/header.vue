<template>
  <header>
    <img src="../../../assets/img/logo-copy@3x.png" class="logo-mahan" />
    <div class="user-part">
      <span class="points">
        امتیاز شما:
        {{ toPersianNumbers(`${point}`) }}
      </span>
      <img :src="imageUrl" class="profile-image" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { store } from '@/store';
import { toPersianNumbers } from '@/utilities/to-persian-numbers';

export default defineComponent({
  setup() {
    const currentUser = ref(store.getters.getCurrentStudent);
    const imageUrl =
      `https://www.api.devnirone.ir/api/student/getProfileImage/${currentUser.value.profileImage}` ||
      'https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png';

    const point = ref('0');
    if (currentUser.value && currentUser.value.point)
      point.value = currentUser.value.point;

    return { currentUser, toPersianNumbers, point, store, imageUrl };
  }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09);
  background-color: black;
  height: 8vh;
  max-height: 10vh;
  padding: 0.5rem;
  z-index: 2;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  img.logo-mahan {
    width: 5.5rem;
    max-width: 120px;
    object-fit: cover;
    background: rgba(0, 0, 0, 0.09);
  }
  .user-part {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    gap: 0.3rem;
    margin-left: 0.5rem;
    z-index: 2;

    .points {
      font-family: IRANSans;
      color: #fff;
      font-size: 11px;
      font-weight: bold;
    }
    .profile-image {
      width: 12vw;
      height: 6vh;
      aspect-ratio: 1;
      margin: 0 10px 0 0;
      border-radius: 50%;
      border: solid 2px #ddd;
    }
  }
}
</style>
