export { EventContext };
export type EventListener<T = any> = (ctx: EventContext<T>) => void | Promise<void>;
export type EventBus = {
    on: (event: string, fn: EventListener) => void;
    off: (event: string, fn: EventListener) => void;
    emit: (event: string, data?: any) => Promise<EventContext<any>>;
};
import EventContext from "./EventContext.js";
