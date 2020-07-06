<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      class="flex input-box w-64 bg-white col-start-3 self-center"
    />
  </div>
</template>

<script>
export default {
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.todo.searchQuery;
      },
      set(value) {
        this.$store.dispatch("updateSearchQuery", value);
      }
    }
  }
};
</script>

<style>
</style>