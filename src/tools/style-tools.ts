export function makeClassName(classNames: string[]): string {
    return classNames.join(' ')
}

export const colors = {
    $bg: '#1b2426',
    $bgNav: '#2e3d51',
    $blue: '#5ba1cf',
    $javascript: '#f7df1e',
    $scrollbarThumb:'#2e4b52',
    $silver100: '#fff',
    $silver200: '#b9bdb6',
    $silver300: '#8c8e8a',
    $purple: '#ce61fb',
    $react: '#61dafb',
    $red: '#e24a4a',
    $redConsole: '#3c0303',
    $yellow: '#e6d238',
    $yellowConsole: '#524104',
}

// CE61FB => viola
// FB8161 => coomplementare react

export const fixedSizes: Record<string, string> = {
    navbarHeight: '50px',
    editorTabsContainerHeight: '40px',
}

export const generalBorderStyle = `1px solid ${colors.$silver300}`

export const responsiveBreakpoint = 540;

export const transitionDuration = {
    fast: '100ms',
    medium: '300ms',
}

export const languageToColor: Record<string,string> = {
    js: colors.$javascript,
    jsx: colors.$react,
}