<template>
  <div class="z-10 fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class="relative bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-4">
          <p class="text-2xl font-bold text-vue-blue">
            <slot name="header"></slot>
          </p>
          <div class="cursor-pointer z-50" @click="close">
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
          </div>
        </div>

        <!--Body-->
        <slot name="content"></slot>
        <!--Footer-->
        <div class="flex justify-end pt-8">
          <slot name="footer" :modalData="'test'">
            <button class="m-1 bg-vue-green px-4 py-2 rounded-lg text-white hover:opacity-50">Save</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>


