import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createDomAdapter } from './dom.js'

describe("dom adapter", () => {
	it('should emit and listen to events', async () => {
		const target = new EventTarget()
		const adapter = createDomAdapter(target)
		let receivedData

		adapter.on('test-event', (ctx) => {
			receivedData = ctx.data
		})

		await adapter.emit('test-event', { value: 'hello' })

		assert.deepStrictEqual(receivedData, { value: 'hello' })
	})

	it('should prevent default when context flag is set', async () => {
		const target = new EventTarget()
		const adapter = createDomAdapter(target)
		let callCount = 0

		adapter.on('test-event', (ctx) => {
			callCount++
			ctx.preventDefault()
		})

		adapter.on('test-event', (ctx) => {
			callCount++
		})

		const result = await adapter.emit('test-event', { value: 'hello' })

		assert.strictEqual(result.defaultPrevented, true)
		assert.strictEqual(callCount, 1)
	})
})
