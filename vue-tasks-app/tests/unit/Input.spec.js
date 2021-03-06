import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Input from '../../src/components/Input.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let actions
let store

beforeEach(() => {
  actions = {
    addTask: jest.fn(),
  }
  store = new Vuex.Store({
    actions
  })
})

const factory = () => {
  return mount(Input, {
    store, localVue
  })
}

describe('Input.vue', () => {
  it('Renders the components with empty values', () => {
    //Mount component to DOM
    const wrapper = factory();

    //Perform actions and get values with Component
    const taskNameInput = wrapper.find("#taskNameInput");
    const taskDescriptionInput = wrapper.find("#taskDescriptionInput");
    const taskDateInput = wrapper.find("#taskDateInput");

    //Assert values
    expect(taskNameInput.text()).toMatch("");
    expect(taskDescriptionInput.text()).toMatch("");
    expect(taskDateInput.text()).toMatch("");
  })

  it('Clears values within input fields', async () => {
    //Mount component to DOM
    const wrapper = factory();

    //Get parts of the page need for test
    const taskNameInput = wrapper.find("#taskNameInput");
    const taskDescriptionInput = wrapper.find("#taskDescriptionInput");
    const taskDateInput = wrapper.find("#taskDateInput");
    const clearButton = wrapper.find("#clearButton")

    //Perform actions
    await taskNameInput.setValue('Task 1');
    await taskDescriptionInput.setValue('Task 1 description');
    await taskDateInput.setValue(new Date().toString());
    await clearButton.trigger('click');

    //Assert values
    expect(taskNameInput.text()).toMatch("");
    expect(taskDescriptionInput.text()).toMatch("");
    expect(taskDateInput.text()).toMatch("");
  })

  it('Displays error message when the name of the task is empty', async () => {
    //Mount component to DOM
    const wrapper = factory();

    //Get parts of the page need for test
    const addButton = wrapper.find("#addButton");

    //Perform actions
    await addButton.trigger('click');
    const errorMessage = wrapper.find('#errorMessage')

    //Assert values
    expect(errorMessage.text()).toMatch('Input box cannot be empty, please add task')
  })

  it('Adds a new task', async () => {
    //Mount component to DOM
    const wrapper = factory();

    //Get parts of the page need for test
    const taskNameInput = wrapper.find("#taskNameInput");
    const taskDescriptionInput = wrapper.find("#taskDescriptionInput");
    const taskDateInput = wrapper.find("#taskDateInput");
    const addButton = wrapper.find("#addButton");

    //Perform actions
    await taskNameInput.setValue('Task 1');
    await taskDescriptionInput.setValue('Task 1 description');
    await taskDateInput.setValue(new Date().toString());
    await addButton.trigger('click');

    //Assert values
    expect(actions.addTask).toHaveBeenCalled();
  })
})
