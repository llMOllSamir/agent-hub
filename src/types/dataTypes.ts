export type Agent = {
    id: number;
    name: string;
    profile_image?: string;
    role: string;
    department: string;
    status: "Active" | "Inactive";
    shifts: string[];
    hire_date: string;
    experience: string;
    supervisor: string;
    location: string;
    contact: {
      email: string;
      phone: string;
      extension: string;
    };
    performance: {
      avg_call_duration: string;
      total_calls: number;
      missed_calls: number;
      resolved_calls: number;
      call_rating_avg: number;
      call_distribution: {
        morning: number;
        evening: number;
      };
    };
    activity: {
      last_login: string;
      last_call_time: string;
      break_time_today: string;
      active_time_today: string;
    };
    skills: string[];
    notes: {
      date: string;
      added_by: string;
      content: string;
    }[];
    call_history: {
      call_id: string;
      date: string;
      duration: string;
      status: "Resolved" | "Missed" | "Ongoing";
      rating: number | null;
    }[];
  };
  

  export  type CallStage = {
    stage: string;
    start_timestamp: string;
    end_timestamp: string;
  };
  
  export  type TranscriptSummary = {
    order: number;
    content: string;
  };
  
   export type SessionTopic = {
    topic_name: string;
    topic_value: string;
  };
  
  export  type SessionTranscript = {
    start_timestamp: string;
    end_timestamp: string;
    stage_name: string;
    agent: string;
    customer: string;
  };
  
export type CallRecord = {
    sid: number;
    start_time: string;
    end_time: string;
    duration: number;
    direction: number;
    media_type: string;
    ani: string;
    dnis: string;
    call_Sentiment:"Positive" | "Neutral" | "Negative";
    call_Quality:"Excellent" | "Good" | "Average" | "Poor";
    call_Resolution:"Resolved" | "Unresolved" | "Follow-up Required";
    queue_name: string;
    agent_id: string;
    contact_id: string;
    call_journey: CallStage[];
    transcript_score: string;
    evaluation_score: string;
    is_escalated: number;
    transcript_summary: TranscriptSummary[];
    session_topics: SessionTopic[];
    session_transcript: SessionTranscript[];
  };

