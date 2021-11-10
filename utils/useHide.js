import { useState, useEffect } from 'react'

export default function useHide(ref) {
    const [isOpen, setIsOpen] = useState(false)

    const handler = (e) => {
        if (ref.current && !ref.current.contains(e.target) && isOpen) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handler)
        }
        return () => {
            document.removeEventListener('click', handler)
        }
    }, [isOpen])

    return [isOpen, setIsOpen]
}
