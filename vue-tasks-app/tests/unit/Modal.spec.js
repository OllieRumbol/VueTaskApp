import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Modal from '../../src/components/Modal.vue';

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

    it('Renders the components with expect values', async () => {
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
        const taskName = wrapper.find('#taskName');
        const taskDescription = wrapper.find("#taskDescription");
        const taskCompletedDate = wrapper.find("#taskCompletedDate");
        const numberOfJobs = wrapper.find('#numberOfJobs');
        const jobName = wrapper.find("#job0");
          
        //Assert values
        expect(taskName.element.value).toMatch("Task 1");
        expect(taskDescription.element.value).toMatch("Task 1 Description");
        expect(taskCompletedDate.element.value).toMatch("2020-11-29");
        expect(numberOfJobs.text()).toMatch("1");
        expect(jobName.text()).toMatch("Job 1");
    })

    it('Displays an error message when adding a job with no value', async () => {
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
        const addJobButton = wrapper.find("#addJob");

        //Perform Actions
        await addJobButton.trigger('click');
        const jobErrorMessage = wrapper.find("#jobErrorMessage");

        //Assert values
        expect(jobErrorMessage.text()).toMatch("Cannot add empty job, please add a value");
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
