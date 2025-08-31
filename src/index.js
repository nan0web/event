import { createNodeAdapter } from './adapters/node.js'
import { createDomAdapter } from './adapters/dom.js'
import { createMemoryAdapter } from './adapters/memory.js'
import EventContext from "./types/EventContext.js"

/**
 * Checks if we are in a browser environment
 * @returns {boolean}
 */
function isBrowser() {
	return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}

/**
 * Checks if we are in a Node.js environment
 * @returns {boolean}
 */
function isNode() {
	return typeof process !== 'undefined' && !!process.versions?.node
}

export {
	EventContext,
}

/**
 * Main event factory function
 * @param {EventTarget} [target] - Optional DOM target (e.g. window, document)
 * @returns {import("./types/index.js").EventBus}
 */
export default function event(target) {
	if (target || isBrowser()) {
		return createDomAdapter(target || window)
	}
	if (isNode()) {
		return createNodeAdapter()
	}
	return createMemoryAdapter()
}
