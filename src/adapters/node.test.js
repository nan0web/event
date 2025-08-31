import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { createNodeAdapter } from './node.js'

describe("node adapter", () => {
	it('should emit and listen to events', async () => {
		const adapter = createNodeAdapter()
		let receivedData

		adapter.on('test-event', (ctx) => {
			receivedData = ctx.data
		})

		await adapter.emit('test-event', { value: 'hello' })

		assert.deepStrictEqual(receivedData, { value: 'hello' })
	})

	it('should prevent default when context flag is set', async () => {
		const adapter = createNodeAdapter()
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
