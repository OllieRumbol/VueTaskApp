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
})
