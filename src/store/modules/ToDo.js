import ToDoService from "../../services/ToDoService";
import router from "./../../router";

export default {
	state: {
		loadingToDos: false,
		todos: {
			activeToDos: [],
			doneToDos: [],
		},
		searchQuery: "",
	},
	mutations: {
		SET_ACTIVE_TODOS(state, data) {
			state.todos.activeToDos = data;
		},
		SET_DONE_TODOS(state, data) {
			state.todos.doneToDos = data;
		},
		ADD_TODO(state, { list, todo }) {
			state.todos[list].unshift(todo);
		},
		DELETE_TODO(state, { list, id }) {
			state.todos[list].splice(
				state.todos[list].findIndex((todo) => todo.id === id),
				1
			);
		},
		UPDATE_SEARCH_QUERY(state, query) {
			state.searchQuery = query;
		},
		UPDATE_TODO(state, { list, todo }) {
			state.todos[list][
				state.todos[list].findIndex((item) => item.id === todo.id)
			].title = todo.title;
		},
		IS_LOADING(state, loading) {
			state.loadingToDos = loading;
		},
	},
	actions: {
		fetchDoneToDos({ commit }) {
			commit("IS_LOADING", true);
			ToDoService.getToDos("doneToDos")
				.then(({ data }) => {
					commit("SET_DONE_TODOS", data);
				})
				.catch((Error) => console.log(Error))
				.finally(() => commit("IS_LOADING", false));
		},
		fetchActiveToDos({ commit }) {
			ToDoService.getToDos("activeToDos")
				.then(({ data }) => {
					commit("SET_ACTIVE_TODOS", data);
				})
				.catch((Error) => console.log(Error));
		},
		addToDo({ commit }, { list, todo }) {
			ToDoService.addToDo(list, { title: todo.title })
				.then(({ data }) => {
					commit("ADD_TODO", { list, todo: data });
				})
				.catch((Error) => console.log(Error));
		},
		deleteToDo({ commit }, { list, id }) {
			ToDoService.deleteToDo(list, id)
				.then(() => {
					commit("DELETE_TODO", { list, id });
				})
				.catch((Error) => console.log(Error));
		},
		updateToDo({ commit }, { list, todo }) {
			ToDoService.updateToDo(list, todo)
				.then(() => {
					commit("UPDATE_TODO", { list, todo });
					router.push({ name: "Home" });
				})
				.catch((Error) => console.log(Error));
		},
		updateSearchQuery({ commit, state }, query) {
			commit("UPDATE_SEARCH_QUERY", query);
			if (!state.searchQuery) router.push({ name: "Home" });
			else router.push({ name: "To-Do-Search", query: { query } });
		},
		moveToDo({ dispatch }, { todo, from, to }) {
			dispatch("deleteToDo", { list: from, id: todo.id });
			dispatch("addToDo", { list: to, todo });
		},
	},
	getters: {
		todos: (state) => {
			return state.todos.activeToDos.concat(state.todos.doneToDos);
		},
		filterToDos: (state, getters) => {
			return getters.todos.filter((todo) =>
				todo.title
					.toLowerCase()
					.startsWith(state.searchQuery.toLowerCase())
			);
		},
		getToDoById: (state, getters) => (id) => {
			return getters.todos.find((todo) => id === todo.id);
		},
		getListById: (state) => (id) => {
			if (state.todos.activeToDos.some((todo) => id === todo.id)) {
				return "activeToDos";
			} else if (state.todos.doneToDos.some((todo) => id === todo.id))
				return "doneToDos";
		},
	},
};
