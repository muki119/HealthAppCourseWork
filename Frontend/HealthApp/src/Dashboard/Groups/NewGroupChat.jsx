import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../Contexts";

export function NewGroupChat() {
    const [groupName, setGroupName] = useState("")
    const {logoutHandler,groups,setGroups} = useContext(AppContext)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(groupName === "") return
        try {
          const newGroupResponse = await axios.post(`${import.meta.env.VITE_API_URL}/groups`, {name: groupName,})
          const newGroup = {group_id:newGroupResponse.data.id,group:newGroupResponse.data}
          setGroups((currentGroupList) => {
            return [
            ...currentGroupList, 
            newGroup
            ]
          })
          setGroupName("")
        }catch (err) {
          if (err?.response?.status === 401) {
            return logoutHandler();
          }else if (err?.response?.data?.error){
            setError(err.response.data.error)
          }
        };

      }
    
      
   return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input value={groupName} onChange={e => setGroupName(e.target.value)} 
        type="text"
        placeholder="Group Name" 
        id="item" 
        />
        <button type="submit">Create Group</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
   ) 
}