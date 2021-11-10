import { useRef } from 'react'
import useHide from '../utils/useHide'


const Dropdown = ({
    data = [],
    handler = () => { },
    value = ''
}) => {
    const ref = useRef()
    const [isOpen, setIsOpen] = useHide(ref)

    const dropdownItems = data.map((v, k) => (
        <div key={k} onClick={() => handler(k)} className="px-2 py-2 cursor-pointer select-none">
            {v.name}
        </div>
    ))
    return (
        <div>
            <div ref={ref} onClick={() => setIsOpen(!isOpen)} className="px-2 py-1 bg-gray-100 rounded cursor-pointer select-none">
                {value}
            </div>
            {
                isOpen && (
                    <div className="relative">
                        <div className="absolute top-0 w-full overflow-y-auto bg-gray-100 max-h-72">
                            {dropdownItems}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Dropdown
