import { useRef } from 'react'
import useHide from '../utils/useHide'
import arrow from '../images/arrow.svg'


const Dropdown = ({
    data = [],
    handler = () => { },
    value = '',
    label = ''
}) => {
    const ref = useRef()
    const [isOpen, setIsOpen] = useHide(ref)

    const dropdownItems = data.map((v, k) => (
        <div key={k} onClick={() => handler(k)} className="px-2 py-2 cursor-pointer select-none">
            {v.name}
        </div>
    ))
    return (
        <div ref={ref}>
            {
                label && (
                    <div className="mb-2">{label}</div>
                )
            }
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-2 py-1 bg-gray-100 rounded-t cursor-pointer select-none ${isOpen ? '' : 'rounded-b'}`}
            >
                <div>
                    {value}
                </div>
                <img src={arrow.src} alt="Arrow" className={`w-3 h-3 transform transition-transform ${isOpen ? '' : 'rotate-180'}`} />
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
