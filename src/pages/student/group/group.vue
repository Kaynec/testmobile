<template>
  <div class="h-100 bg-dark">
    <h1 class="text-primrary">Group Page</h1>
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
