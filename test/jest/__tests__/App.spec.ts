import { createLocalVue, mount } from '@vue/test-utils'
import * as All from 'quasar'
import { VueConstructor } from 'vue'

import Conversor from 'components/Conversor.vue'
import TimeToPayment from 'components/TimeToPayment.vue'

// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(

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

// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(

describe('Conversor', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const dummyComponentData = {
    localVue,
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

  const dummyProps = {
    options: new Map<string, Map<string, number>>([
      [
        '011',
        new Map([
          [
            '016',
            1.90
          ]
        ])
      ]
    ])
  }

  test('mounts without any errors', async () => {
    const wrapper = mount(Conversor, dummyComponentData)
    await wrapper.setProps(dummyProps)

    expect(wrapper).toBeTruthy()
  })

  test('conversor has the needed inputs', async () => {
    const wrapper = mount(Conversor, dummyComponentData)
    await wrapper.setProps(dummyProps)

    it('has a conversor', () => {
      expect(wrapper.contains(TimeToPayment)).toBe(true)
    })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    it('passes options to the conversor', () => {
      expect(wrapper.find(TimeToPayment).attributes('options')).toBeTruthy()
    })
  })
})
