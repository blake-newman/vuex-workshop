<template>
  <div class="error">
    <h1>{{ status }}</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'ErrorView',

  props: {
    message: { type: String, required: true },
    status: { type: Number, required: true },
  },
}
</script>

<style scoped>
.error {
  padding-top: 100px;
  text-align: center;
}

.error >>> h1 {
  font-size: 8rem;
}

.error >>> h2 {
  font-size: 5rem;
}
</style>
