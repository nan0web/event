import EventContext from '../types/EventContext.js'

/**
 * Creates a DOM-based event adapter
 * @param {EventTarget} [target] - DOM target (e.g. window, document)
 * @returns {import("../types/index.js").EventBus}
 */
export function createDomAdapter(target = window) {
	const fnsMap = new WeakMap()

	return {
		/**
		 * @param {string} event
		 * @param {EventListener} fn
		 */
		on(event, fn) {
			const wrapped = (e) => {
				const ctx = EventContext.from({ type: event, data: e.detail })
				// @ts-ignore
				fn(ctx)
			}
			fnsMap.set(fn, wrapped)
			target.addEventListener(event, wrapped)
		},

		/**
		 * @param {string} event
		 * @param {EventListener} fn
		 */
		off(event, fn) {
			const wrapped = fnsMap.get(fn)
			if (wrapped) {
				target.removeEventListener(event, wrapped)
				fnsMap.delete(fn)
			}
		},

		/**
		 * @param {string} event
		 * @param {any} data
		 * @returns {Promise<EventContext>}
		 */
		async emit(event, data) {
			const ctx = EventContext.from({ type: event, data })
			target.dispatchEvent(new CustomEvent(event, { detail: data }))
			return ctx
		}
	}
}
