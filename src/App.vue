<template>
  <div class="bg-gray-200 min-h-screen relative z-50">
    <NavBar />
    <div class="mx-auto max-w-xl px-4 py-8">
      <router-view />
    </div>
    <div
      v-show="loadingToDos"
      class="absolute bg-black opacity-75 h-full w-full flex top-0 left-0 right-0 bottom-0 z-10"
    >
      <div class="m-auto">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar
  },
  mounted() {
    this.$store.dispatch("fetchActiveToDos");
    this.$store.dispatch("fetchDoneToDos");
  },
  computed: {
    loadingToDos() {
      return this.$store.state.todo.loadingToDos;
    }
  }
};
</script>

<style src="./assets/css/tailwind.css"></style>

<style lang="scss">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>

<style lang="postcss">
h2 {
  @apply text-vue-blue text-2xl p-4;
}

button:focus {
  @apply outline-none;
}

.input-box {
  @apply rounded-full border-gray-300 shadow-sm p-3 outline-none border;
}
.input-box:focus {
  @apply border-vue-green transition ease-in duration-300;
}
</style>

<style scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
