import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import App from '../../src/App.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

let getters
let store

beforeEach(() => {
    getters = {
        getError: () => true
    }

    store = new Vuex.Store({
        getters
    })
})

const factory = () => {
    return shallowMount(App, {
        store, localVue
    })
}

describe('App.vue', () => {
    it('Displays an api error message', () => {
        //Mount component to DOM
        const wrapper = factory();

        //Perform actions and get values with Component
        const apiErrorMessage = wrapper.find('#apiErrorMessage')

        //Assert values
        expect(apiErrorMessage.text()).toMatch('Unable to connect to the Tasks API and therefore unable to save task.\n    Please contact support for further details.');
    })
})
