import { mount } from '@vue/test-utils'
import Input from '../../src/components/Input.vue'

describe('Input.vue', () => {
  it('Renders the components with empty values', () => {
    //Mount component to DOM
    const wrapper = mount(Input);

    //Perform actions and get values with Component
    const taskNameInput = wrapper.find("#taskNameInput");
    const taskDescriptionInput = wrapper.find("#taskDescriptionInput");
    const taskDateInput = wrapper.find("#taskDateInput");

    //Assert values
    expect(taskNameInput.text()).toMatch("");
    expect(taskDescriptionInput.text()).toMatch("");
    expect(taskDateInput.text()).toMatch("");
  })

  it('Clears values within input fields', async() => {
    //Mount component to DOM
    const wrapper = mount(Input);

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

  it('Displays error message when the name of the task is empty', async() => {
    //Mount component to DOM
    const wrapper = mount(Input);

    //Get parts of the page need for test
    const addButton = wrapper.find("#addButton");

    //Perform actions
    await addButton.trigger('click');
    const errorMessage = wrapper.find('#errorMessage')

    //Assert values
    expect(errorMessage.text()).toMatch('Input box cannot be empty, please add task')
  })
})
