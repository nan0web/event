/**
 * Main event factory function
 * @param {EventTarget} [target] - Optional DOM target (e.g. window, document)
 * @returns {import("./types/index.js").EventBus}
 */
export default function event(target?: EventTarget | undefined): import("./types/index.js").EventBus;
export { EventContext };
import EventContext from "./types/EventContext.js";
