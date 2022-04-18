<template>
  <button
    type="button"
    class="btn btn-primary m-1"
  >
    {{ memberName }}
  </button>
</template>

<script>
export default {
  props: {
    memberName: { type: String, required: true },
  },
};
</script>
