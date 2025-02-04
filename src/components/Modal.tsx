import { X } from 'lucide-react'
import React, { useEffect } from 'react'



type ModalProps = {
    closeModel: () => void,
    children: React.ReactNode
}
export default function Modal({ closeModel, children }: ModalProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])
    return (
        <section className='fixed inset-0 z-10 bg-[rgba(0,0,0,0.4)] flex justify-center items-center ' onClick={() => { closeModel() }}>
            <div onClick={(e) => e.stopPropagation()} className='min-w-[450px] popUp md:min-w-[500px] shadow-2xl shadow-gray-600 rounded-2xl bg-[rgba(255,255,255,0.8)] relative  p-10 aspect-video'>
                <button
                    onClick={() => { closeModel() }}
                    className='absolute end-5 top-5 cursor-pointer rounded-full size-8 transition-all hover:bg-gray-400 flex justify-center items-center '>
                    <X /></button>
                {children}
            </div>
        </ section>
    )
}
