export function debounce(fn: (...args: any[]) => unknown, ms: number) {
    let timerId: ReturnType<typeof setTimeout>;

    return function<T>(this: T, ...args: any[]) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), ms);
    }
}