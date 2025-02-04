## JSON structure

```json
{
  "call_Key_points": ["string"], // Array of strings
  "call_Sentiment": "string", // Fixed values: ["Positive", "Neutral", "Negative"]
  "call_Action_items": ["string"], // Array of action items (strings)
  "call_Journey": [
    // list of call journey steps like Greeting, Issue Identification, Problem Solving, Confirmation, Closure
    {
      "stage": "string",
      "timestamp_from": "string",
      "timestamp_to": "string"
    }
  ],
  "call_Agent": "string", // Name of the agent
  "call_Client": "string", // Name of the caller
  "call_Tag": ["string"], // list of call tags like Emergency Assistance, Medical Consultation, Chronic Disease Management, Mental Health Support, Insurance Inquiry, Technical Support, Billing Inquiry, General Inquiry
  "call_Quality": "string", // Fixed values: ["Excellent", "Good", "Average", "Poor"]
  "call_Resolution": "string", // Fixed values: ["Resolved", "Unresolved", "Follow-up Required"]
  "call_Escalation": "string", // Fixed values: ["Yes", "No"]
  "call_Communication": "string", // Fixed values: ["Clear", "Unclear"]
  "Frequent_keywords": ["string"] // Array of frequently mentioned words
}
```

## Examples

Example 1

```json
{
  "call_Key_points": [
    "Caller's father is experiencing severe chest pain and shortness of breath",
    "Agent dispatches an ambulance",
    "Caller is advised to keep the father calm and seated",
    "Caller is instructed not to give any food or water",
    "Nitroglycerin may be given if previously prescribed"
  ],
  "call_Sentiment": "Positive",
  "call_Action_items": [
    "Ambulance dispatched to 145 Oak Street, Apartment 3B",
    "Caller to keep father calm and seated",
    "Caller to avoid giving food or water",
    "Caller to administer nitroglycerin if prescribed"
  ],
  "call_Journey": [
    {
      "stage": "Greeting",
      "timestamp_from": "00:00:00",
      "timestamp_to": "00:00:10"
    },
    {
      "stage": "Issue Identification",
      "timestamp_from": "00:00:10",
      "timestamp_to": "00:01:00"
    },
    {
      "stage": "Problem Solving",
      "timestamp_from": "00:01:00",
      "timestamp_to": "00:04:00"
    },
    {
      "stage": "Confirmation",
      "timestamp_from": "00:04:00",
      "timestamp_to": "00:06:00"
    },
    {
      "stage": "Closure",
      "timestamp_from": "00:06:00",
      "timestamp_to": "00:08:00"
    }
  ],
  "call_Agent": "Sarah",
  "call_Client": "John",
  "call_Tag": ["Emergency Assistance", "Medical Consultation"],
  "call_Quality": "Excellent",
  "call_Resolution": "Resolved",
  "call_Escalation": "No",
  "call_Communication": "Clear",
  "Frequent_keywords": [
    "chest pain",
    "shortness of breath",
    "ambulance",
    "emergency"
  ]
}
```

Example 2

```json
{
  "call_Key_points": [
    "Caller is seeking an update on their mother's condition",
    "Mother was admitted to ICU after a stroke",
    "Agent escalates the case to ICU nurse station for a real-time update",
    "ICU nurse confirms the mother is stable and the doctor will provide a full update",
    "Agent schedules a call with the doctor for the caller"
  ],
  "call_Sentiment": "Positive",
  "call_Action_items": [
    "Schedule a call with Dr. Patel for the caller",
    "Follow up to ensure the caller receives the update"
  ],
  "call_Journey": [
    {
      "stage": "Greeting",
      "timestamp_from": "00:00:00",
      "timestamp_to": "00:00:30"
    },
    {
      "stage": "Issue Identification",
      "timestamp_from": "00:00:30",
      "timestamp_to": "00:02:00"
    },
    {
      "stage": "Problem Solving",
      "timestamp_from": "00:02:00",
      "timestamp_to": "00:05:00"
    },
    {
      "stage": "Confirmation",
      "timestamp_from": "00:05:00",
      "timestamp_to": "00:07:00"
    },
    {
      "stage": "Closure",
      "timestamp_from": "00:07:00",
      "timestamp_to": "00:10:00"
    }
  ],
  "call_Agent": "Lisa",
  "call_Client": "John",
  "call_Tag": ["Emergency Assistance", "Medical Consultation"],
  "call_Quality": "Excellent",
  "call_Resolution": "Resolved",
  "call_Escalation": "Yes",
  "call_Communication": "Clear",
  "Frequent_keywords": ["update", "mother", "condition", "ICU", "stroke"]
}
```
