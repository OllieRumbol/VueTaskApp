import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Modal from '../../src/components/Modal.vue';
import ModalInput from '../../src/components/ModalInput.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Modal.vue', () => {
    let actions
    let store

    beforeEach(() => {
        actions = {
            renameTask: jest.fn(),
            deleteJob: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    it('Renders the components with expect values', () => {
        //Mount component to DOM
        const wrapper = mount(Modal, {
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
                }
            }
        })

        //Get parts of the page need for test
        const numberOfJobs = wrapper.find('#numberOfJobs');
        const numberOfModalInputComponents = wrapper.findAllComponents(ModalInput);
          
        //Assert values
        expect(numberOfJobs.text()).toMatch("1");
        expect(numberOfModalInputComponents.length).toEqual(4);
    })

    it('Deletes jobs', () => {
        //Mount component to DOM
        const wrapper = mount(Modal, {
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
                }
            },
            store, localVue
        })

        //Get parts of the page need for test
        wrapper.find('#del0').trigger('click')
          
        //Assert values
        expect(actions.deleteJob).toHaveBeenCalled();
    })
})
