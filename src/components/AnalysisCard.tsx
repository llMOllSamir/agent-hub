import { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'


type AnalysisCardProps = {
    title: string,
    number: number,
    Icon: LucideIcon,
    unite: string
}
export default function AnalysisCard(props: AnalysisCardProps) {
    const { Icon, number, title, unite } = props
    const [displayNumber, setDisplayNumber] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            if (typeof number === "number" && displayNumber < Number(number)) {
                if (Number(number) > 50) {
                    setDisplayNumber(prev => prev + 50)
                } else {
                    setDisplayNumber(prev => prev + 1)
                }
            } else {
                clearInterval(timer)
            }
        }, 50)

        return () => {
            clearInterval(timer)
        }
    }, [number, displayNumber])

    return (

        <div className='bg-white  rounded-2xl shadow p-5 px-10  flex min-h-42   justify-between items-center gap-2'>
            <div className='flex justify-center items-start flex-col    gap-3 '>
                <h4 className='font-bold text-base text-gray-500 '>{title}</h4>
                <h5 className='text-3xl  font-bold hover:text-blue-500 transition-color duration-300'>{
                    displayNumber ? displayNumber : number
                } {unite}</h5>
            </div>
            <span className='flex justify-center items-center size-10 self-start  bg-blue-200 text-blue-500  rounded-xl'>
                <Icon size={20} strokeWidth={2.5} />
            </span>
        </div>
    )
}
