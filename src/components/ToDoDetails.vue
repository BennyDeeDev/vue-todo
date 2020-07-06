<template>
	<div>
		<h2>To-Do Details</h2>
		<h2>To-Do Title</h2>
		<input
			v-if="todo"
			class="bg-white w-full items-center border-b p-4 mb-2 rounded-lg"
			type="text"
			v-bind:value="title"
			@keydown.enter="updateToDo"
			@keyup="saveTitle"
		/>

		<!--   <textarea
      class="bg-white w-full items-center border-b p-4 mb-2 rounded-lg"
      v-if="todo"
      type="text"
      v-on:keyup.enter="changeTitle"
    />

    <button>Save</button>-->
	</div>
</template>

<script>
	export default {
		methods: {
			saveTitle(e) {
				localStorage.title = e.target.value;
			},
			updateToDo(e) {
				this.$store.dispatch("updateToDo", {
					list: this.list,
					todo: {
						id: Number(this.$attrs.id),
						title: e.target.value,
					},
				});
			},
		},
		beforeDestroy() {
			localStorage.clear();
		},
		computed: {
			todo() {
				return this.$store.getters.getToDoById(Number(this.$attrs.id));
			},
			list() {
				return this.$store.getters.getListById(Number(this.$attrs.id));
			},
			title() {
				/* localStorage[this.todo.id] = JSON.stringify(this.todo);
		  console.log(JSON.parse(localStorage[this.todo.id]).title); */
				if (localStorage.title) {
					return localStorage.title;
				} else {
					return this.todo.title;
				}
			},
		},
	};
</script>

<style></style>
