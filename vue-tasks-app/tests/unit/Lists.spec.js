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
        getInProgressTasks: () => [{
            completedDate: "2020-11-22T00:00:00",
            description: "Task 2 Description",
            id: 2,
            jobs: [
                {
                    done: false,
                    id: 1,
                    name: "Job 1"
                }
            ],
            name: "Task 2",
            status: 1
        },
        {
            completedDate: "2020-11-21T00:00:00",
            description: "Task 3 Description",
            id: 3,
            jobs: [
                {
                    done: false,
                    id: 1,
                    name: "Job 1"
                }
            ],
            name: "Task 3",
            status: 1
        }],
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

    it('Renders the correct in progress tasks', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Perform actions and get values with Component
        const inProgressTasks = wrapper.find("#inProgressTasks");

        //Assert values
        expect(inProgressTasks.text()).toMatch('In Progress2: Tasks');
    })

    it('Renders the correct done tasks', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Perform actions and get values with Component
        const doneTasks = wrapper.find("#doneTasks");

        //Assert values
        expect(doneTasks.text()).toMatch('Done0: Tasks');
    })
})