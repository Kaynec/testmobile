<template>Store Edit</template>
<script>
import { computed, reactive } from 'vue';
export default {
  props: {
    item: {
      type: String,
      default: '{}'
    }
  },
  setup(props) {
    let model = reactive(JSON.parse(props.item));

    const rules = computed(() => ({}));
  }
};
</script>
