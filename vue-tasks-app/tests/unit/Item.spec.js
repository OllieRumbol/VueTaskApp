import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Item from '../../src/components/Item.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

let actions
let store

beforeEach(() => {
    actions = {
        moveTask: jest.fn(),
        deleteTask: jest.fn()
    }
    store = new Vuex.Store({
        actions
    })
})

const factory = () => {
    return mount(Item, {
        propsData: {
            task: {
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
            },
            colour: "primary"
        },
        store, localVue
    })
}

describe('Item.vue', () => {
    it('Displays the correct styling for button 1', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Assert values
        expect(wrapper.vm.button1Style).toMatch("btn btn-primary w-100")
    })

    it('Displays the correct styling for button 2', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Assert values
        expect(wrapper.vm.button2Style).toMatch("btn btn-primary dropdown-toggle dropdown-toggle-split")
    })

    it('Displays the correct styling for button 3', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Assert values
        expect(wrapper.vm.button3Style).toMatch("btn btn-primary dropdown w-100")
    })
})