interface Props {
    height: string,
    width: string,
}

const CodeSandboxLogoSVG = (props: Props) => (
  <svg  xmlns="http://www.w3.org/2000/svg" aria-label="CodeSandbox" viewBox="0 0 452 452" {...props}>
    <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 452h452V0H0v452zm405.773-46.227V46.227H46.227v359.546h359.546z"
        fill="currentColor"
    />
  </svg>
)

export default CodeSandboxLogoSVG