export const sandboxAttributes = 'allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals'

export const srcDoc = /*html*/`
<html>
<head></head>
    <body>
        <div id="root"></div>
        <script type="module" id="395F50EBA2B1015DD2A0471C7B09295A8AD7E612E8CC104F311709BE22EEE6AA">
            // send console events to parent, while executing them
            ['error', 'log', 'warn'].forEach(level => {
                const tempConsoleMethod = console[level]
                console[level] = (...args) => {
                    parent.postMessage({ type: 'console', level, consoleArgs: consoleArgsToString(args) }, '*')
                    return tempConsoleMethod(...args)
                }
            })

            window.addEventListener('message', (e) => {
                try {
                    cleanDocWithoutReload()
                    eval(e.data);
                } catch (err) {
                    window.postMessage({ type: 'error', error: err }, '*')
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                    console.error(err);
                }
            }, false)


            function consoleArgsToString(consoleArgs) {
                const stringifiedArgs = consoleArgs.map(arg => {
                    return (
                        arg instanceof Element ?
                            arg.outerHTML
                        : typeof arg === 'object' ?
                            // add trycatch to deal with JSON.stringify BigInt or Object with circular reference
                            JSON.stringify(arg)
                        :
                            arg + ""
                    )
                }).join('    ')

                return stringifiedArgs
            }
            // remove all script, link and style tags from head, (e.g. with styled-components)
            // and all elements except from this script from the document's body
            function cleanDocWithoutReload() {
                document.querySelectorAll('head script, head link, head style, body *')
                    .forEach(el => {
                        if (el.id === '395F50EBA2B1015DD2A0471C7B09295A8AD7E612E8CC104F311709BE22EEE6AA') {
                            return
                        }
                        el.remove()
                    })
                const rootDiv = document.createElement('div')
                rootDiv.id = 'root'
                document.body.insertBefore(rootDiv, document.body.children[0])
            }
        </script>
    </body>
</html>
`.trim()
