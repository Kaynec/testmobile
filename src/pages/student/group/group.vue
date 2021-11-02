<template>
  <div
    class="
      d-flex
      text-center
      w-100
      h-100
      bg-dark
      justify-content-center
      align-items-center
    "
  >
    <h1 class="text-primrary text-center w-100">Group Page</h1>
  </div>
  <Footer />
</template>

<script>
import { defineComponent } from 'vue';
import Footer from '@/modules/student-modules/footer/footer.vue';
export default defineComponent({
  components: {
    Footer
  }
});
</script>
