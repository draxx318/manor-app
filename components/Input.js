
const Input = ({
    handler = () => { },
    value = '',
    type = '',
    label = ''

}) => {
    return (
        <div>
            {
                label && (
                    <div className="mb-2">{label}</div>
                )
            }
            <input
                className="w-full px-2 py-1 bg-gray-100 rounded"
                onChange={(e) => handler(e.target.value)}
                value={value}
                type={type}
                min={0}
                step={1}
            />
        </div>
    )
}

export default Input
