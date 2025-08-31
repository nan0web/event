/**
 * @template [T=any]
 * @callback EventListener
 * @param {EventContext<T>} ctx
 * @returns {void | Promise<void>}
 * @exports EventListener
 */

/**
 * @typedef {Object} EventBus
 * @property {(event: string, fn: EventListener) => void} on
 * @property {(event: string, fn: EventListener) => void} off
 * @property {(event: string, data?: any) => Promise<EventContext>} emit
 * @exports EventBus
 */

import EventContext from "./EventContext.js"

export {
	EventContext
}

export {}
