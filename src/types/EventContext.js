/**
 * Event context class with preventDefault support
 * @template T = any
 */
class EventContext {
	/** @type {string} */
	type = ""

	/** @type {string} */
	name = ""

	/** @type {Error | null} */
	error = null

	/** @type {any} */
	data = undefined

	/** @type {object} */
	meta = {}

	/** @type {boolean} */
	defaultPrevented = false

	/**
	 * @param {object} input
	 * @param {string} [input.type]
	 * @param {string} [input.name]
	 * @param {any} [input.data]
	 * @param {object} [input.meta]
	 * @param {Error | null} [input.error]
	 * @param {boolean} [input.defaultPrevented]
	 */
	constructor(input = {}) {
		const {
			type = this.type,
			name = this.name,
			error = this.error,
			data = this.data,
			meta = this.meta,
			defaultPrevented = this.defaultPrevented
		} = input

		this.type = String(type)
		this.name = String(name)
		this.error = error ? error : null
		this.data = data
		this.meta = meta
		this.defaultPrevented = Boolean(defaultPrevented)
	}

	/**
	 * Clone context
	 * @returns {EventContext}
	 */
	clone() {
		return new EventContext({
			type: this.type,
			data: this.data,
			defaultPrevented: this.defaultPrevented,
			meta: { ...this.meta }
		})
	}
	/**
	 * Prevents further event propagation
	 */
	preventDefault() {
		this.defaultPrevented = true
	}

	/**
	 * Creates EventContext from input
	 * @param {*} input
	 * @returns {EventContext}
	 */
	static from(input) {
		if (input instanceof EventContext) return input
		return new EventContext(input)
	}
}

export default EventContext
