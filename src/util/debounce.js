export function debounce(fn, ms) {
    let timerId;

    return function() {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, arguments), ms);
    }
}