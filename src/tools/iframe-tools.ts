import { colors } from "@/tools/style-tools";

export const sandboxAttributes =
  "allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin";

export const srcDoc = /*html*/ `
<html>
<head>
    <style id="1cfb7daf280bf1032de2669b673c918d9c398674">
        html{box-sizing:border-box;font-size:16px}*,:after,:before{box-sizing:inherit}body,h1,h2,h3,h4,h5,h6,ol,p,ul{margin:0;padding:0;font-weight:400}img{max-width:100%;height:auto}
    </style>
</head>
    <body>
        <div id="root"></div>
        <script type="module" id="395F50EBA2B1015DD2A0471C7B09295A8AD7E612E8CC104F311709BE22EEE6AA">
            let prevOutput = {}
            const unremovableElementsIdsList = [
                '395F50EBA2B1015DD2A0471C7B09295A8AD7E612E8CC104F311709BE22EEE6AA',
                '1cfb7daf280bf1032de2669b673c918d9c398674'
            ]

            window.addEventListener('message', e => {
                const { data } = e

                if (data.error
                    && prevOutput.error
                    && data.error === prevOutput.error
                ) {
                    return
                }

                if (data.code
                    && prevOutput.code
                    && data.code === prevOutput.code
                ) {
                    return
                }

                if (data.error) {
                    cleanDocWithoutReload()
                    displayErr({ err: e.data.error, type: 'bundleError'})
                    prevOutput = data
                    return
                }

                try {
                    cleanDocWithoutReload()
                    prevOutput = data
                    eval(e.data.code);
                } catch (err) {
                    displayErr({ err, type: 'runtimeError'})
                }
            }, false)

            // remove all script, link and style tags from head, (e.g. with styled-components)
            // and all elements except from this script from the document's body
            function cleanDocWithoutReload() {
                document.querySelectorAll('head script, head link, head style, body *')
                    .forEach(el => {
                        if (unremovableElementsIdsList.includes(el.id)) {
                            return
                        }
                        el.remove()
                    })
                const rootDiv = document.createElement('div')
                rootDiv.id = 'root'
                document.body.insertBefore(rootDiv, document.body.children[0])
            }

            function displayErr({ err, type }) {
                const root = document.getElementById('root')
                const errorTitle = type === 'runtimeError' ? 'Runtime ' : type === 'bundleError' ? 'Bundle ' : ''
                root.innerHTML = '<div style="color: red;"><h4>' + errorTitle + 'Error</h4><pre>' + err + '</pre></div>'
                if (type === 'runtimeError' && err.name && err.message) {
                    console.error( err.name + ': '  + err.message)
                }
            }
        </script>
    </body>
</html>
`.trim();

export const initialLoader = `
const style = document.createElement('style')

style.textContent = \`
#root {
    height: 90vh;
    width: 95vw;
    display: grid;
    place-content: center;
}

.lds-ellipsis {
    place-self: center;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${colors.$react};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
}
\`

document.head.appendChild(style)
const root = document.getElementById('root')
root.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div><h2>Creating the bundle</h2>'
`;

export const srcDocWithInternalConsole = /*html*/ `
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

                if (e.data.error) {
                    cleanDocWithoutReload()
                    displayErr({ err: e.data.error, type: 'bundleError'})
                    return
                }

                try {
                    cleanDocWithoutReload()
                    eval(e.data.code);
                } catch (err) {
                    displayErr({ err, type: 'runtimeError'})
                }
            }, false)


            function consoleArgsToString(consoleArgs) {
                const stringifiedArgs = consoleArgs.map(arg => {
                    let sanitizedArg

                    try {
                        sanitizedArg
                    }catch{

                    }
                    return (
                        arg instanceof Element ?
                            arg.outerHTML
                        : typeof arg === 'object' ?
                            // need to handle also BigInt case
                            stringifyAndPreventCircularDep(arg)
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

            function displayErr({ err, type }) {
                const root = document.getElementById('root')
                const errorTitle = type === 'runtimeError' ? 'Runtime ' : type === 'bundleError' ? 'Bundle ' : ''
                root.innerHTML = '<div style="color: red;"><h4>' + errorTitle + 'Error</h4><pre>' + err + '</pre></div>'
                if (type === 'runtimeError' && err.name && err.message) {
                    window.postMessage({ type: 'error', error: err }, '*')
                    console.error( err.name + ': '  + err.message)
                }
            }

            function stringifyAndPreventCircularDep(arg) {
                let sanitizedArg

                try {
                    sanitizedArg = JSON.stringify(arg)
                } catch {
                    sanitizedArg = "Impossible to log. Please check the developer tools."
                }

                return sanitizedArg
            }
        </script>
    </body>
</html>
`.trim();
