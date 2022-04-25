export const sandboxAttributes = 'allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals'

export const srcDoc = /*html*/`
<html>
<head></head>
    <body>
        <div id="root"></div>
        <script>
            // send console events to parent, while executing them
            ['error', 'log', 'warning'].forEach(level => {
                const tempConsoleMethod = console[level]
                console[level] = (...args) {
                    window.postMessage({ type: 'console', level, consoleArgs: args }, '*')
                    return tempConsoleMethod(...args)
                }
            })

            window.addEventListener('message', (e) => {
                try {
                    eval(e.data);
                } catch (err) {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                    console.error(err);
                }
            }, false);
        </script>
    </body>
</html>
`.trim()
