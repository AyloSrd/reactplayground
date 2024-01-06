export function runWhenBrowserIsIdle(callback: () => void) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
    }
    else {
        setTimeout(callback, 1);
    }
}