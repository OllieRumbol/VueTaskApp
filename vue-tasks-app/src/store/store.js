import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const url = "https://localhost:44336/api/tasks";
const jobUrl = "https://localhost:44336/api/tasks/job";
const headers = { Accept: "*" };

export default new Vuex.Store({
    state: {
        //Data
        tasks: [],
        displayError: false
    },
    mutations: {
        // Sync
        setTasks(state, payload) {
            state.tasks = payload;
        },
        setError(state, payload) {
            state.displayError = payload;
        }
    },
    actions: {
        //Async
        async setTask(state) {
            state.commit("setError", false);

            try {
                const tasks = await fetch(url, { headers });
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async addTask(state, data) {
            state.commit("setError", false);

            const settings = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            };
            try {
                const tasks = await fetch(url, settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async moveTask(state, data) {
            state.commit("setError", false);

            const settings = {
                method: "PUT",
                headers: {
                    "Accept": "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            try {
                const tasks = await fetch(url + "/status", settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async deleteTask(state, id) {
            state.commit("setError", false);

            const settings = {
                method: "DELETE",
                headers: {
                    Accept: "*",
                }
            };
            try {
                const tasks = await fetch(url + "/" + id, settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async renameTask(state, data) {
            state.commit("setError", false);

            const settings = {
                method: "PUT",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            try {
                const tasks = await fetch(url, settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async editDescription(state, data) {
            state.commit("setError", false);

            const settings = {
                method: "PUT",
                headers: {
                    "Accept": "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            try {
                const tasks = await fetch(url + "/description", settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async editCompletedDate(state, data) {
            state.commit("setError", false);

            const settings = {
                method: "PUT",
                headers: {
                    "Accept": "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            try {
                const tasks = await fetch(url + "/complateddate", settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async addJob(state, data) {
            state.commit("setError", false);

            const settings = {
                method: "POST",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data
            };
            try {
                const tasks = await fetch(jobUrl, settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async deleteJob(state, data) {
            state.commit("setError", false);

            const settings = {
                method: "DELETE",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data
            };
            try {
                const tasks = await fetch(jobUrl, settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        },
        async editJobStatus(state, data) {
            state.commit("setError", false);

            const settings = {
                method: "PUT",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            try {
                const tasks = await fetch(jobUrl + "/done", settings);
                const tasksJson = await tasks.json();
                state.commit("setTasks", tasksJson);
            }
            catch {
                state.commit("setError", true);
            }
        }
    },
    modules: {

    },
    getters: {
        getToDoTasks(state) {
            return state.tasks.filter((task) => task.status == 0);
        },
        getInProgressTasks(state) {
            return state.tasks.filter((task) => task.status == 1);
        },
        getDoneTasks(state) {
            return state.tasks.filter((task) => task.status == 2);
        },
        getError(state) {
            return state.displayError;
        }
    }
});