import Vue from "vue";
import VueRouter from "vue-router";
import ToDoList from "../components/ToDoList";
import ToDoDetails from "@/components/ToDoDetails.vue";
import SearchResults from "@/components/SearchResults.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: ToDoList
	},
	{
		path: "/todo/:id",
		name: "To-Do-Details",
		component: ToDoDetails,
		props: true
	},
	{
		path: "/search",
		name: "To-Do-Search",
		component: SearchResults
	}
];

const router = new VueRouter({
	routes,
	mode: "history"
});

export default router;
