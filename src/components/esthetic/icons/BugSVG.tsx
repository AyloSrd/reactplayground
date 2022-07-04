interface Props {
    height: string,
    width: string,
}

const BugSVG = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <path d="M24 42q-3.25 0-6.05-1.55T13.8 36H8v-3h4.6q-.35-1.3-.35-2.625V27.7h-4.3v-3h4.3q0-1.45.025-2.875T12.7 19H8v-3h6q.7-1.4 1.85-2.45Q17 12.5 18.4 11.8L14.55 8l2-2 4.7 4.7q1.4-.5 2.825-.5 1.425 0 2.825.5L31.6 6l2 2-3.8 3.8q1.4.7 2.475 1.775Q33.35 14.65 34.15 16h5.9v3H35.3q.45 1.4.425 2.825Q35.7 23.25 35.7 24.7h4.35v3H35.7q0 1.35.025 2.675Q35.75 31.7 35.4 33h4.65v3h-5.8q-1.3 2.95-4.125 4.475Q27.3 42 24 42Zm0-3q3.6 0 6.15-2.525 2.55-2.525 2.55-6.125V22q0-3.6-2.55-6.125T24 13.35q-3.6 0-6.15 2.525Q15.3 18.4 15.3 22v8.35q0 3.6 2.55 6.125T24 39Zm-4-7h8v-3h-8Zm0-8.65h8v-3h-8Zm4 2.85h.025H24h.025H24h.025H24h.025H24Z" />
  </svg>
)

export default BugSVG
