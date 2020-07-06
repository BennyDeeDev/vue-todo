<template>
	<div class="bg-gray-300 p-4 grid grid-cols-3 col-span-2 border-t-4 border-vue-green">
		<router-link to="/" class="flex col-start-2 items-center justify-center">
			<img class="w-12" src="./../assets/logo.png" />
			<h1 class="text-vue-green text-2xl hover:underline">ue To-Do App</h1>
		</router-link>
		<SearchBar />
	</div>
</template>

<script>
	import SearchBar from "@/components/SearchBar.vue";
	export default {
		components: {
			SearchBar
		}
	};
</script>

<style scoped></style>
