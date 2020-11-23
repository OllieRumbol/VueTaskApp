import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Modal from '../../src/components/Modal.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

let actions
let store

beforeEach(() => {
    actions = {
        renameTask: jest.fn(),
        editDescription: jest.fn(),
        editCompletedDate: jest.fn(),
        addJob: jest.fn(),
        deleteJob: jest.fn(),
        editJobStatus: jest.fn(),
    }
    store = new Vuex.Store({
        actions
    })
})

const factory = () => {
    return mount(Modal, {
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
}

describe('Modal.vue', () => {
    it('Renders the components with expect values', async () => {
        //Mount component to DOM
        const wrapper = factory();

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

    it('Edits the name of the task', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        const taskName = wrapper.find('#taskName');
        const taskNameSaveButton = wrapper.find("#taskNameSaveButton");

        //Perform Actions
        await taskName.setValue('New task name 1');
        await taskNameSaveButton.trigger('click');

        //Assert values
        expect(actions.renameTask).toHaveBeenCalled();
    })

    it('Displays an error when the name of the task is empty', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        const taskName = wrapper.find('#taskName');
        const taskNameSaveButton = wrapper.find("#taskNameSaveButton");

        //Perform Actions
        await taskName.setValue('');
        await taskNameSaveButton.trigger('click');
        const taskNameErrorMessage = wrapper.find("#taskNameErrorMessage");

        //Assert values
        expect(taskNameErrorMessage.text()).toMatch("Cannot have an empty task name, Please add value");
    })

    it('Edits the description of a task', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        const taskDescription = wrapper.find('#taskDescription');
        const taskDescriptionSaveButton = wrapper.find('#taskDescriptionSaveButton');

        //Perform Actions
        await taskDescription.setValue('New task description');
        await taskDescriptionSaveButton.trigger('click');

        //Assert values
        expect(actions.editDescription).toHaveBeenCalled();
    })

    it('Edits the completed date of the task', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        const taskCompletedDate = wrapper.find('#taskCompletedDate');
        const taskCompletedDateSaveButton = wrapper.find('#taskCompletedDateSaveButton');

        //Perform Actions
        await taskCompletedDate.setValue('2020-12-06T00:00:00');
        await taskCompletedDateSaveButton.trigger('click');

        //Assert values
        expect(actions.editCompletedDate).toHaveBeenCalled();
    })

    it('Displays an error message when adding a job with no value', async () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        const addJobButton = wrapper.find("#addJob");

        //Perform Actions
        await addJobButton.trigger('click');
        const jobErrorMessage = wrapper.find("#jobErrorMessage");

        //Assert values
        expect(jobErrorMessage.text()).toMatch("Cannot add empty job, please add a value");
    })

    it('Adds a new job to a task', async () => {
        const wrapper = factory();

        //Get parts of the page need for test
        const newJob = wrapper.find("#newJob");
        const addJobButton = wrapper.find("#addJob");

        //Perform Actions
        await newJob.setValue('Job 2');
        await addJobButton.trigger('click');

        //Assert values
        expect(actions.addJob).toHaveBeenCalled();
    })

    it('Deletes jobs', () => {
        //Mount component to DOM
        const wrapper = factory();

        //Get parts of the page need for test
        wrapper.find('#del0').trigger('click')

        //Assert values
        expect(actions.deleteJob).toHaveBeenCalled();
    })
})
