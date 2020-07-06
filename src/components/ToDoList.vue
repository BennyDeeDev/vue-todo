<template>
	<div>
		<div class="mb-8">
			<input
				class="border border-vue-green rounded-full w-full 
				shadow-sm p-3 outline-none border"
				type="text"
				v-on:keyup.enter="addToDo"
				placeholder="Add To-Do"
			/>
		</div>

		<h2>Active Todos</h2>
		<draggable v-model="activeToDos" group="todos">
			<ToDoItem
				v-for="todo in activeToDos"
				v-bind:key="todo.id"
				v-bind:todo="todo"
				v-bind:list="'activeToDos'"
			/>
		</draggable>

		<h2>Done Todos</h2>
		<draggable v-model="doneToDos" group="todos">
			<ToDoItem
				v-for="todo in doneToDos"
				v-bind:key="todo.id"
				v-bind:todo="todo"
				v-bind:done="true"
				v-bind:list="'doneToDos'"
			/>
		</draggable>
	</div>
</template>

<script>
	import ToDoItem from "./ToDoItem";
	import draggable from "vuedraggable";
	export default {
		components: {
			ToDoItem,
			draggable,
		},
		methods: {
			addToDo(e) {
				if (e.target.value) {
					this.$store.dispatch("addToDo", {
						list: "activeToDos",
						todo: { title: e.target.value },
					});
					e.target.value = null;
				}
			},
		},
		computed: {
			activeToDos: {
				get() {
					return this.$store.state.todo.todos.activeToDos;
				},
				set(value) {
					this.$store.commit("SET_ACTIVE_TODOS", value);
				},
			},
			doneToDos: {
				get() {
					return this.$store.state.todo.todos.doneToDos;
				},
				set(value) {
					this.$store.commit("SET_DONE_TODOS", value);
				},
			},
		},
	};
</script>
