import { EventEmitter } from 'node:events'
import EventContext from '../types/EventContext.js'

/**
 * Creates a Node.js-based event adapter
 * @returns {import("../types/index.js").EventBus}
 */
export function createNodeAdapter() {
	const emitter = new EventEmitter()
	const listeners = new Map()

	return {
		/**
		 * @param {string} event
		 * @param {EventListener} fn
		 */
		on(event, fn) {
			const wrapped = (data) => {
				const ctx = EventContext.from({ type: event, data })
				// @todo fix: Argument of type 'EventContext' is not assignable to parameter of type 'Event'.
				// Type 'EventContext' is missing the following properties from type 'Event': bubbles, cancelBubble, cancelable, composed, and 15 more.ts(2345)
				fn(ctx)
			}
			listeners.set(fn, wrapped)
			emitter.on(event, wrapped)
		},

		/**
		 * @param {string} event
		 * @param {EventListener} fn
		 */
		off(event, fn) {
			const wrapped = listeners.get(fn)
			if (wrapped) {
				emitter.off(event, wrapped)
				listeners.delete(fn)
			}
		},

		/**
		 * @param {string} event
		 * @param {any} data
		 * @returns {Promise<EventContext>}
		 */
		async emit(event, data) {
			const ctx = EventContext.from({ type: event, data })
			emitter.emit(event, data)
			return ctx
		}
	}
}
