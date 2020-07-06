<template>
  <div
    class="group bg-white flex items-center p-4 mb-2 rounded-lg border-transparent border hover:border-vue-green transition ease-in duration-100 item"
    v-bind:class="[
			animate ? 'item-animate-done' : 'item-animate-undone',
			{ 'item-done': done },
		]"
  >
    <p-check
      class="p-svg p-round p-pulse"
      color="success"
      v-on:change="doneToDo(todo, list)"
      v-bind:checked="done"
    >
      <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
        <path
          d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
          style="stroke: white;fill:white"
        />
      </svg>
    </p-check>
    <div v-on:click="toggleEdit" class="item-link">{{ todo.title }}</div>

    <Modal v-if="edit" @close="edit = !edit">
      <template slot="header">{{todo.title}}</template>

      <template v-slot:content>
        <label for="title" class="text-gray-800 m-2 text-sm">Title</label>
        <input
          @keydown.enter="save"
          id="title"
          :value="todo.title"
          class="border border-vue-green rounded-full w-full h-8 shadow-sm p-3 outline-none border"
          type="text"
          placeholder="change your ToDo Title here"
        />
      </template>

      <template v-slot:footer="{modalData}">
        {{ modalData }}
        <button @click="save">Schließen</button>
      </template>
    </Modal>

    <button class="ml-auto" v-on:click="deleteToDo(todo.id, list)">
      <img
        class="w-4 hidden group-hover:block opacity-50 hover:opacity-100 transition ease-in duration-100"
        src="../assets/signs.svg"
      />
    </button>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal
  },
  data() {
    return {
      animate: this.done,
      edit: false
    };
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    done: {
      type: Boolean
    },
    list: {
      type: String,
      required: true
    }
  },
  methods: {
    animateItem(done) {
      this.animate = !done;
    },
    deleteToDo(id, list) {
      this.$store.dispatch("deleteToDo", { list, id });
    },
    doneToDo(todo, list) {
      this.animateItem(this.animate);
      window.setTimeout(() => {
        this.$store.dispatch("moveToDo", {
          todo: {
            id: todo.id,
            title: todo.title
          },
          from: list,
          to: list === "activeToDos" ? "doneToDos" : "activeToDos"
        });
      }, 300);
    },
    toggleEdit() {
      this.edit = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  .item-link {
    text-decoration: none;
    background-image: linear-gradient(currentColor, currentColor);
    background-position: 0% 50%;
    background-repeat: no-repeat;
    background-size: 0% 1px;
    transition: background-size 0.3s;
    background-size: 0% 1px;
  }

  &-done,
  &-animate-done {
    .item-link {
      background-size: 100% 1px;
    }
  }

  &-animate-undone {
    .item-link {
      background-size: 0% 1px;
    }
  }
}
</style>

<style lang="scss">
.item-done {
  .pretty.p-pulse:not(.p-switch) input:checked ~ .state label:before {
    animation: none;
  }
}
</style>
