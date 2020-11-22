import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Lists from '../../src/components/Lists.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

let actions
let getters
let store

beforeEach(() => {
    actions = {
        setTask: jest.fn()
    }

    getters = {
        getToDoTasks: () => [{
            completedDate: "2020-11-29T00:00:00",
            description: "Task 1 Description",
            id: 1,
            jobs: [
                {
                    done: false,
                    id: 1,
                    name: "Job 1"
                }
            ],
            name: "Task 1",
            status: 0
        }],
        getInProgressTasks: () => [],
        getDoneTasks: () => []
    }

    store = new Vuex.Store({
        actions,
        getters
    })
})

const factory = () => {
    return mount(Lists, {
        store, localVue
    })
}

describe('Lists.vue', () => {
    it('Renders correct to do tasks', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Perform actions and get values with Component
        const toDoTasks = wrapper.find("#toDoTasks");

        //Assert values
        expect(toDoTasks.text()).toMatch('To-Do1: Tasks');
    })
})