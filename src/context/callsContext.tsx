import React, { createContext, useEffect, useState } from "react";
import { CallRecord } from "../types/dataTypes";




type CallsContext = {
    callRecord: CallRecord[]
    callTags: string[]
    setCallTags: React.Dispatch<React.SetStateAction<string[]>>
    setCheckedTags: React.Dispatch<React.SetStateAction<string[]>>
    checkedTags: string[]
}



export const callsContext = createContext<CallsContext>({
    callRecord: [],
    callTags: [],
    setCallTags: () => { }
    , setCheckedTags: () => { }
    , checkedTags: []
});



export default function CallsContextProvider({ children }: { children: React.ReactNode }) {
    const [callsDetails, setCallsDetails] = useState<CallRecord[]>([])
    const [callTags, setCallTags] = useState<string[]>([
        "Emergency Assistance", "Medical Consultation", "Chronic Disease Management",
        "Mental Health Support", "Insurance Inquiry", "Technical Support",
        "Billing Inquiry", "General Inquiry"
    ])
    const [checkedTags, setCheckedTags] = useState<string[]>(["Emergency Assistance", "Medical Consultation", "Chronic Disease Management",
        "Mental Health Support", "Insurance Inquiry", "Technical Support",
        "Billing Inquiry", "General Inquiry"])


    useEffect(() => {
        fetch("/sample_interactions_v1.json").then((response) => response.json()).then((data) => setCallsDetails(data?.sessions || [])) // 👈 Fetch from the "public" folder
    }, [])

    return <callsContext.Provider value={{ callRecord: callsDetails, callTags, setCallTags, setCheckedTags, checkedTags }}>
        {children}
    </callsContext.Provider>
}