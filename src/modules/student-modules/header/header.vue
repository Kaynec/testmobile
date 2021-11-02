<template>
  <div class="header">
    <img src="../../../assets/img/logo-copy@3x.png" class="logo-mahan" />
    <div class="user-part">
      <span class="points"> امتیاز شما: ۲۰۱۸۵ </span>
      <img
        src="https://image.shutterstock.com/image-vector/portrait-elegant-business-man-dressed-260nw-1744646150.jpg"
        class="profile-image"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09);
  background-color: black;
  z-index: 2;
  height: 8vh;
  padding: 0.3rem 0.2rem 0.9rem 0.2rem;
  flex-basis: 10%;

  img.logo-mahan {
    width: clamp(5.5rem, 6.5rem, 7.5rem);
    height: 32px;
    margin-top: 13px;
    margin-right: 15px;
    object-fit: contain;
  }
  .user-part {
    display: flex;
    width: 100%;
    margin-top: 11px;
    justify-content: flex-end;
    align-items: center;
    gap: 0.3rem;
    margin-left: 0.5rem;
    z-index: 2;

    .points {
      font-family: IRANSans;
      color: #fff;
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
    }
    .profile-image {
      // width: 2rem;
      // height: 2rem;
      // border-radius: 8px;
      // border: solid 2px #ddd;
      // margin-right: 10px;

      width: 27px;
      height: 28px;
      margin: 0 10px 0 0;
      border-radius: 8px;
      border: solid 2px #ddd;
    }
  }
}
</style>
