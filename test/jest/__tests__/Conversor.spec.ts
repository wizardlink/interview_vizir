import { createLocalVue, mount } from '@vue/test-utils'
import { VueConstructor } from 'vue'

import * as All from 'quasar'

import Conversor from 'components/Conversor.vue'
import ConversorSelectors from 'components/ConversorSelectors.vue'
import Selector from 'components/Selector.vue'

const { Quasar } = All

function isComponent (value: unknown): value is VueConstructor {
  return (
    value &&
    (value as VueConstructor).component &&
    (value as VueConstructor).component.name != null
  )
}

const components = Object.keys(All).reduce<{ [index: string]: VueConstructor }>(
  (object, key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const val = (All as any)[key]
    if (isComponent(val)) {
      object[key] = val
    }
    return object
  },
  {}
)

const dummyConversorProps = {
  propsData: {
    options: {
      call: new Map<string, Map<string, number>>([
        [
          '011',
          new Map([
            [
              '016',
              1.90
            ]
          ])
        ]
      ]),
      plans: [30]
    }
  }
}

// Has to be instantiated outside due to internal scoping issues with Jest
const localVue = createLocalVue()
localVue.use(Quasar, { components })

describe('Conversor.vue', () => {
  const dummyComponentData = {
    localVue,
    ...dummyConversorProps,
    data () {
      return {
        origin: '011',
        destination: '016',
        time: 60,
        plan: 30,
        fixedFloat: 2
      }
    }
  }

  test('mounts without any errors', () => {
    const wrapper = mount(Conversor, dummyComponentData)

    expect(wrapper).toBeTruthy()
  })

  it('has the the necessary inputs for data', () => {
    const wrapper = mount(Conversor, dummyComponentData)
    const component = wrapper.getComponent(ConversorSelectors)

    expect(component.exists()).toBe(true)
    expect(component.props('options')).toBeTruthy()
  })
})

describe('ConversorSelectors.vue', () => {
  const dummyComponentData = {
    localVue,
    ...dummyConversorProps
  }

  test('mounts without any errors', () => {
    const wrapper = mount(ConversorSelectors, dummyComponentData)

    expect(wrapper).toBeTruthy()
  })

  it('has at least one selector', () => {
    const wrapper = mount(ConversorSelectors, dummyComponentData)
    const component = wrapper.findAllComponents(Selector)

    expect(component.length > 0).toBe(true)
  })
})

describe('Selector.vue', () => {
  const dummyComponentData = {
    localVue,
    propsData: {
      options: [10],
      icon: 'flight_takeoff',
      label: 'Test'
    }
  }

  test('mounts without any errors', () => {
    const wrapper = mount(Selector, dummyComponentData)

    expect(wrapper).toBeTruthy()
  })

  it('emits and updates the model', async () => {
    const wrapper = mount(Selector, dummyComponentData)

    expect(wrapper.vm.$data.model).toBeFalsy()

    await wrapper.setData({ model: '011' })
    expect(wrapper.vm.$data.model).toBe('011')
    expect(wrapper.emitted()['update-model']).toEqual([['011']])
  })
})
