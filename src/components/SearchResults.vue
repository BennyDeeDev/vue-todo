<template>
	<div v-if="filterToDos.length !== 0">
		<h2>Search To-Do</h2>
		<ToDoItem v-for="todo in filterToDos" v-bind:list="filterToDos" v-bind:key="todo.id" v-bind:todo="todo" />
	</div>
	<div v-else class="flex flex-col items-center">
		<h2>Keine ToDos gefunden</h2>
		<img class="w-24 m-8 flex justify-center" src="../assets/shipping-and-delivery.svg" />
		<button
			v-on:click="handleOnClick"
			class="m-8 bg-white shadow-sm outline-none border border-gray-300 tracking-wide  hover:border-vue-green transition ease-in duration-100 p-2 rounded"
		>
			Neue hinzufügen?
		</button>
	</div>
</template>

<script>
	import router from "../router";
	import ToDoItem from "@/components/ToDoItem.vue";
	export default {
		components: {
			ToDoItem
		},
		methods: {
			handleOnClick() {
				router.push({ name: "Home" });
				this.$store.dispatch("updateSearchQuery", "");
			}
		},
		computed: {
			filterToDos() {
				return this.$store.getters.filterToDos;
			}
		}
	};
</script>

<style></style>
