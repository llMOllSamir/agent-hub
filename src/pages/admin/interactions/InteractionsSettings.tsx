import React, { useContext, useRef, useState } from 'react'
import { callsContext } from '../../../context/callsContext'
import { ChevronDown } from 'lucide-react'

export default function InteractionsSettings() {
    const { callTags, setCallTags, checkedTags, setCheckedTags } = useContext(callsContext)
    const [openTagsList, setOpenTagsList] = useState(false)
    const tagRef = useRef<HTMLInputElement>(null)

    const addTag = () => {
        if (tagRef.current) {
            const tag = tagRef.current.value || ""
            if (tag.length > 0) {
                if (callTags.includes(tag)) return
                setCallTags(prev => [...prev, tag])
            }
        }
    }

    const chooseTag = (tag: string) => {
        if (checkedTags.includes(tag)) {
            setCheckedTags(prev => prev.filter(t => t !== tag))
        } else {
            setCheckedTags(prev => [...prev, tag])
        }
    }

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-4 select-none'>
            <div className="p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800  mb-4">
                    Call Handling Preferences
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gr ay-100  rounded-lg">
                        <span className="text-gray-700 ">Default Call Duration</span>
                        <input
                            type="number"
                            className="px-4 py-2 w-24 rounded-md border border-gray-300  bg-white  text-gray-700 "
                            defaultValue={420}
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-100  rounded-lg">
                        <span className="text-gray-700 ">Allowed Call Directions</span>
                        <select className="px-4 py-2 rounded-md border border-gray-300  bg-white  text-gray-700 " defaultValue={"Both"}>
                            <option value={"Inbound"}>Inbound</option>
                            <option value={"Outbound"}>Outbound</option>
                            <option value={"Both"}>Both</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white  rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800  mb-4">Escalation Rules</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-100  rounded-lg">
                        <span className="text-gray-700 ">Escalation Level</span>
                        <select className="px-4 py-2 rounded-md border border-gray-300 bg-white  text-gray-700" defaultValue={"Supervisor"}>
                            <option value={"Manager"}>Manager</option>
                            <option value={"Supervisor"}>Supervisor</option>
                            <option value={"Agent"}>Agent</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white  rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800  mb-4">Agent Permissions</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                        <span className="text-gray-700 ">Can Edit Calls</span>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white  rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800  mb-4">Transcript Settings</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                        <span className="text-gray-700 ">Enable Sentiment Analysis</span>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>
                </div>
            </div>


            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Call Tags Settings</h2>
                <div className="space-y-4">
                    <div className="relative">
                        <button onClick={() => { setOpenTagsList(!openTagsList) }} className="px-4 py-2 cursor-pointer w-full rounded-md border border-gray-300 flex justify-between items-center   bg-white   text-gray-700  ">
                            Select Call Tags <ChevronDown className={`${openTagsList ? "rotate-180" : ""} transition-all duration-500`} />
                        </button>
                        {
                            openTagsList && <div className="absolute  z-10 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-300   rounded-md shadow-lg max-h-48 overflow-auto">
                                {callTags.map((tag) => (
                                    <label key={tag} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer  ">
                                        <input type="checkbox" className="mr-2 w-5 h-5" value={tag} checked={checkedTags.includes(tag)} onChange={() => { chooseTag(tag) }} />
                                        {tag}
                                    </label>
                                ))}
                            </div>
                        }

                    </div>
                    <div className="flex mt-4">
                        <input
                            ref={tagRef}

                            type="text"
                            className="flex-grow px-4 py-2 rounded-md border border-gray-300   bg-white  text-gray-700 "
                            placeholder="Add new tag"
                        />
                        <button type='button' onClick={() => { addTag() }} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
