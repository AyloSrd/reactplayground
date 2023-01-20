interface Props {
    height: string,
    width: string,
}

const AddSVG = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 50 50" {...props}>
        <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
    </svg>
)

export default AddSVG
