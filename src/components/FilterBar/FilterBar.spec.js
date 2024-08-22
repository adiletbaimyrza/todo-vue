import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import FilterBar from './FilterBar.vue'
import { TodoFilter } from '@/constants'

/* global describe beforeEach jest expect it */
describe('FilterBar.vue', () => {
  let store
  let state
  let getters
  let mutations
  let wrapper

  beforeEach(() => {
    state = {
      currentFilter: TodoFilter.ALL,
    }

    getters = {
      activeCount: () => 5,
    }

    mutations = {
      setFilter: jest.fn(),
      deleteCompleted: jest.fn(),
    }

    store = createStore({
      state,
      getters,
      mutations,
    })

    wrapper = shallowMount(FilterBar, {
      global: {
        plugins: [store],
      },
    })
  })

  it('renders correctly with initial state', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('calls setFilter mutation when filter button is clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(mutations.setFilter).toHaveBeenCalled()
  })

  it('calls deleteCompleted mutation when clear button is clicked', async () => {
    const button = wrapper.find(`.container__clear`)
    await button.trigger('click')
    expect(mutations.deleteCompleted).toHaveBeenCalled()
  })
})
