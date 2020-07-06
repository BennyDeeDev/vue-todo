import axios from "axios";

const apiClient = axios.create({
	baseURL: `http://localhost:3000`,
	withCredentials: false, // This is the default
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

export default {
	getToDos(PATH) {
		return apiClient.get("/" + PATH);
	},
	addToDo(PATH, payload) {
		return apiClient.post("/" + PATH, payload);
	},
	deleteToDo(PATH, id) {
		return apiClient.delete(PATH + "/" + id);
	},
	updateToDo(PATH, payload) {
		return apiClient.put(PATH + "/" + payload.id, payload);
	},
};

//Alle done ToDos am Ende des Tages in eine andere Tabelle schmeißen --> Backend Task
