import React, { useContext, useMemo } from 'react'
import { agentsContext } from '../../../context/AgentsContext'
import { callsContext } from '../../../context/callsContext'
import { useParams } from 'react-router-dom'
import image from "../../../../public/assets/images/profile.jpg"
import { Activity, Clock8, Lightbulb, MessageSquareText } from 'lucide-react'
import CallDurationChart from '../../../components/calls/CallDurationChart'
import AudioPlayer from '../../../components/AudioRecorderPlayer'
import audio from "../../../../public/assets/audios/audio.wav"
import CallScriptTable from '../../../components/calls/CallScriptTable'
export default function CallDetails() {
    const { agents } = useContext(agentsContext)
    const { callRecord } = useContext(callsContext)
    const { callTagId } = useParams<{ callTagId: string }>()
    const call = useMemo(() => callRecord.find((call) => call.sid === Number(callTagId)), [callTagId, callRecord])
    const agent = useMemo(() => agents.find((agent) => agent.id === Number(call?.agent_id)), [agents, call])
    const wordsUsed = useMemo(() => call?.session_transcript.map((s) => s.agent.concat(s.customer)).join(" ").split(" ").length, [call])


    if (!call) return null
    return (
        <section className='p-5 flex flex-col gap-4'>
            <h2 className='text-2xl font-bold text-blue-700'>Call Details</h2>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-4'>
                <div className='bg-gray-100 shadow col-span-1 xl:col-span-2 py-10 rounded flex  flex-col gap-10   '>
                    <div className='flex justify-center items-center gap-4'>
                        <img src={image} alt='profile' className='size-20 object-cover rounded-2xl' />
                        <h2 className='text-xl font-bold'>{agent?.name}</h2>
                    </div>
                    <div className='flex flex-col gap-2   '>

                        <div className='flex justify-between  items-center odd:bg-gray-200 px-10 py-1  '>
                            <h3 className='text-sm text-gray-500 font-bold'>Words Used</h3>
                            <h3 className='text-sm   font-bold'>{wordsUsed} Words</h3>
                        </div>

                        <div className='flex justify-between items-center odd:bg-gray-200 px-10 py-1 '>
                            <h3 className='text-sm text-gray-500 font-bold'>Caller Number</h3>
                            <h3 className='text-sm  font-bold'>{call.ani}</h3>
                        </div>

                        <div className='flex justify-between items-center odd:bg-gray-200 px-10 py-1 '>
                            <h3 className='text-sm text-gray-500 font-bold'>Destination</h3>
                            <h3 className='text-sm  font-bold'>{call.dnis}</h3>
                        </div>

                        <div className='flex justify-between items-center odd:bg-gray-200 px-10 py-1 '>
                            <h3 className='text-sm text-gray-500 font-bold'>Date Time</h3>
                            <h3 className='text-sm  font-bold'>{new Date(call.start_time).toLocaleDateString()}</h3>
                        </div>

                        <div className='flex justify-between items-center odd:bg-gray-200 px-10 py-1 '>
                            <h3 className='text-sm text-gray-500 font-bold'>Duration</h3>
                            <h3 className='text-sm  font-bold'>{`${Math.floor(call.duration / 60)}:${call.duration % 60 < 10 ? `0${call.duration % 60}` : call.duration % 60} min`}</h3>
                        </div>

                        <div className='flex justify-between items-center odd:bg-gray-200 px-10 py-1 '>
                            <h3 className='text-sm text-gray-500 font-bold'>Escalated</h3>
                            <h3 className='text-sm  font-bold'>{call.is_escalated ? "Yes" : "No"}</h3>
                        </div>

                        <div className='flex justify-between items-center odd:bg-gray-200 px-10 py-1 '>
                            <h3 className='text-sm text-gray-500 font-bold'>Quality</h3>
                            <h3 className={`text-sm  font-bold ${call.call_Quality === "Excellent" ? "text-green-600" : call.call_Quality === "Poor" ? "text-red-600" : "text-yellow-600"}`}>{call.call_Quality}</h3>
                        </div>

                    </div>
                </div>
                <div className=' col-span-1 lg:col-span-2  xl:col-span-6 grid grid-cols-1 gap-4 '>
                    <div className='grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4'>
                        <div className='bg-blue-600 shadow text-white  min-h-42 min-w-72 p-5 flex flex-col justify-center gap-4 '>
                            <div className='flex justify-between px-2 items-center'>
                                <p className='flex justify-center items-center size-12 bg-blue-300  shadow-xl rounded-full'> <MessageSquareText size={25} color='blue' /></p>
                                <Activity size={40} color='white' /></div>
                            <h3 className='text-5xl font-semibold px-5 '>{wordsUsed} <span className='text-lg'>Words</span></h3>
                        </div>
                        <div className='bg-purple-500  shadow text-white  min-h-42 min-w-72 p-5 flex flex-col justify-center gap-4'>
                            <div className='flex justify-between px-2  items-center'>
                                <p className='flex justify-center items-center size-12 bg-purple-300  shadow-xl rounded-full'> <Lightbulb size={25} color='white' /></p>
                                <Activity size={40} color='white' /></div>
                            <h3 className='text-5xl font-semibold px-5 '>{call.session_topics.length} <span className='text-lg'>Total Topics</span></h3>
                        </div>
                        <div className='bg-yellow-500  shadow text-white  min-h-42 min-w-72 p-5 flex flex-col justify-center gap-4'>
                            <div className='flex justify-between px-2  items-center'>
                                <p className='flex justify-center items-center size-12   shadow-xl rounded-full'> <Clock8 size={25} color='white' /></p>
                                <Activity size={40} color='white' /></div>
                            <h3 className='text-5xl font-semibold px-5 '>{call.duration} <span className='text-lg'>Sec Call Duration</span></h3>
                        </div>
                    </div>
                    <div className='bg-gray-100 shadow    flex justify-center items-center '>
                        <CallDurationChart call={call} />
                    </div>
                </div>
            </div>
            <div className='my-10'>
                <AudioPlayer call={call} src={audio} />
            </div>
            <div>
                <h2 className='text-2xl font-bold my-5 text-blue-700'>Call Recording Script</h2>
                <CallScriptTable call={call} />
            </div>
        </section>
    )
}
