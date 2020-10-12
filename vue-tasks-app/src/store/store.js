import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const url = "https://localhost:44336/api/tasks";
const headers = { Accept: "*"};

export default new Vuex.Store({
    state: {
        //Data
        tasks: []
    },
    mutations: {
        // Sync
        setTasks(state, payload){
            state.tasks = payload;
        }
    },
    actions: {
        //Async
        async setTask(state){
            const tasks = await fetch(url, { headers });
            const tasksJson = await tasks.json();
            state.commit("setTasks",tasksJson);
        }
    },
    modules: {

    },
    getters: {
        getToDoTasks(state){
            return state.tasks.filter((task) => task.status == 0);
        },
        getInProgressTasks(state){
            return state.tasks.filter((task) => task.status == 1);
        },
        getDoneTasks(state){
            return state.tasks.filter((task) => task.status == 2);
        }
    }
});