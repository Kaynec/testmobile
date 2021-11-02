<template>
  <div class="footer">
    <router-link
      :to="`home`"
      class="nav-link"
      exact
      exact-active-class="active"
    >
      <img src="../../../assets/img/home.png" class="footer-icon" />
    </router-link>

    <router-link
      :to="`group`"
      class="nav-link"
      exact
      exact-active-class="active"
    >
      <img src="../../../assets/img/group.png" class="footer-icon" />
    </router-link>

    <router-link
      :to="`shop`"
      class="nav-link"
      exact
      exact-active-class="active"
    >
      <img src="../../../assets/img/shop.png" class="footer-icon" />
    </router-link>
    <router-link
      :to="`setting`"
      class="nav-link"
      exact
      exact-active-class="active"
    >
      <img src="../../../assets/img/setting.png" class="footer-icon" />
    </router-link>
  </div>
</template>
<style scoped lang="scss">
// @import '@/css-variable/Global.scss';
.footer {
  width: 100%;
  height: clamp(3rem, 3.5rem, 4rem);
  flex-basis: clamp(10%, 12.5%, 17.5%);
  position: fixed;
  bottom: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-image: linear-gradient(to right, #880e13 20%, #ec3538);
  z-index: 10;
  .footer-icon {
    object-fit: contain;
    width: 5.2rem;
    min-width: 2.5rem;
  }
}
.nav-link {
  padding: 0;
  transition: ease 0.3s;
}
.active {
  transform: scale(1.25);
}
</style>
