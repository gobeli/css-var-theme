import { store } from '../store'

const value = { foo: 'bar' }
const new_value = { foo: 'baz' }

it('should call once on subscribe', () => {
  // given
  const my_store = store(value)
  const subscriber = jest.fn()

  // when
  my_store.subscribe(subscriber)

  // then
  expect(subscriber).toBeCalledTimes(1)
  expect(subscriber).toBeCalledWith(value)
})

it('should call on set', () => {
  // given
  const my_store = store(value)
  const subscriber = jest.fn()
  my_store.subscribe(subscriber)

  // when
  my_store.set(new_value)

  // then
  expect(subscriber).toBeCalledTimes(2)
  expect(subscriber).toBeCalledWith(new_value)
})

it('should unsubscribe', () => {
  // given
  const my_store = store(value)
  const subscriber = jest.fn()
  const unsubscribe = my_store.subscribe(subscriber)

  // when
  unsubscribe()
  my_store.set(new_value)

  // then
  expect(subscriber).toBeCalledTimes(1)
  expect(subscriber).not.toBeCalledWith(new_value)
})
