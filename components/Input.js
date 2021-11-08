
const Input = ({
    handler = () => { },
    value = '',
    type = ''
}) => {
    return (
        <input
            className="w-full px-2 py-1 bg-gray-100 rounded"
            onChange={(e) => handler(e.target.value)}
            value={value}
            type={type}
        />
    )
}

export default Input
