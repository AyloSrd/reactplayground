interface Props {
    height: string,
    width: string,
}

const StackblitzLogoSVG = (props: Props) => (
  <svg  xmlns="http://www.w3.org/2000/svg" aria-label="Stackblitz" viewBox="0 0 27 27" {...props}>
    <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z" fill="currentColor" />
  </svg>
)

export default StackblitzLogoSVG