import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const url = "https://localhost:44336/api/tasks";
const jobUrl = "https://localhost:44336/api/tasks/job";
const headers = { Accept: "*" };

export default new Vuex.Store({
    state: {
        //Data
        tasks: []
    },
    mutations: {
        // Sync
        setTasks(state, payload) {
            state.tasks = payload;
        }
    },
    actions: {
        //Async
        async setTask(state) {
            const tasks = await fetch(url, { headers });
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
        },
        async addTask(state, task) {
            const settings = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task: task,
                }),
            };
            const tasks = await fetch(url, settings);
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
        },
        async moveTask(state, data) {
            const settings = {
                method: "PUT",
                headers: {
                    "Accept": "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            const tasks = await fetch(url + "/status", settings);
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
        },
        async deleteTask(state, id) {
            const settings = {
                method: "DELETE",
                headers: {
                    Accept: "*",
                }
            };
            const tasks = await fetch(url + "/" + id, settings);
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
        },
        async renameTask(state, data) {
            const settings = {
                method: "PUT",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            const tasks = await fetch(url, settings);
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
        },
        async addJob(state, data) {
            const settings = {
                method: "POST",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data
            };
            const tasks = await fetch(jobUrl, settings);
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
        },
        async deleteJob(state, data) {
            const settings = {
                method: "DELETE",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data
            };
            const tasks = await fetch(jobUrl, settings);
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
        },
        async editJobStatus(state, data) {
            const settings = {
                method: "PUT",
                headers: {
                    Accept: "*",
                    "Content-Type": "application/json",
                },
                body: data,
            };
            const tasks = await fetch(jobUrl + "/done", settings);
            const tasksJson = await tasks.json();
            state.commit("setTasks", tasksJson);
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
        }
    }
});