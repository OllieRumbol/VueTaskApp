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
        expect(wrapper.vm.button1Style).toMatch("btn btn-primary w-100");
    })

    it('Displays the correct styling for button 2', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Assert values
        expect(wrapper.vm.button2Style).toMatch("btn btn-primary dropdown-toggle dropdown-toggle-split");
    })

    it('Displays the correct styling for button 3', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Assert values
        expect(wrapper.vm.button3Style).toMatch("btn btn-primary dropdown w-100");
    })

    it('Calculates the correct status', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Assert values
        expect(wrapper.vm.getStatus(2)).toEqual(0);
        expect(wrapper.vm.getStatus(1)).toEqual(2);
        expect(wrapper.vm.getStatus(0)).toEqual(1);

    })

    it('Moves a task', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        const moveTask = wrapper.find('#moveTask');

        //Perform actions
        await moveTask.trigger('click');

        //Assert values
        expect(actions.moveTask).toBeCalled();
    })

    it('Deletes a task', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        const deleteTask = wrapper.find('#deleteTask');

        //Perform actions
        await deleteTask.trigger('click');

        //Assert values
        expect(actions.deleteTask).toBeCalled();
    })
})