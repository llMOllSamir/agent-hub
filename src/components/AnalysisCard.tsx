import { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'


type AnalysisCardProps = {
    title: string,
    number: number | string,
    Icon: LucideIcon
}
export default function AnalysisCard(props: AnalysisCardProps) {
    const { Icon, number, title } = props
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

        <div className='bg-yellow-400  h-52 rounded-2xl shadow p-5 px-10 lg:min-w-56 flex flex-col justify-center items-center gap-2'>
            <div className='flex justify-center items-center flex-col   gap-3 '>
                <span className='flex justify-center items-center size-10  bg-white bg-opacity-25 rounded-full'>
                    <Icon size={20} strokeWidth={2.5} />
                </span>
                <h5 className='text-2xl  font-bold'>{
                    displayNumber ? displayNumber : number
                } </h5>
            </div>
            <h4 className='font-bold text-base '>{title}</h4>
        </div>
    )
}
