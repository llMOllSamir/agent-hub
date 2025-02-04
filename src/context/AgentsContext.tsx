import { createContext, useEffect, useState, ReactNode } from "react";
import { Agent } from "../types/dataTypes";



type AgentsContextType = {
  agents: Agent[];
  editAgent: (agent: Agent) => void
  addAgent: (agent: Agent) => void
  deleteAgent: (agent: Agent) => void
};

export const agentsContext = createContext<AgentsContextType>({
  agents: [],
  editAgent: () => { },
  addAgent: () => { },
  deleteAgent: () => { }
});

export default function AgentsContextProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetch("/agents.json") // 👈 Fetch from the "public" folder
      .then((response) => response.json())
      .then((data) => setAgents(data))
      .catch((error) => console.error("Error loading agents:", error));
  }, []);


  const editAgent = (agent: Agent) => {
    const updatedAgents = agents.map((a) => {
      if (a.id === agent.id) {
        return agent;
      }
      return a;
    });
    setAgents(updatedAgents);
  }

  const addAgent = (agent: Agent) => {
    const updatedAgents = [...agents, { ...agent, agent }];
    setAgents(updatedAgents);
  }

  const deleteAgent = (agent: Agent) => {
    const findAgent = agents.find(a => a.id === agent.id)
    if (findAgent) {
      findAgent.status = agent.status === "Active" ? "Inactive" : "Active"
    }
    setAgents([...agents])
  }


  return (
    <agentsContext.Provider value={{ agents, editAgent, addAgent, deleteAgent }}>
      {children}
    </agentsContext.Provider>
  );
}
