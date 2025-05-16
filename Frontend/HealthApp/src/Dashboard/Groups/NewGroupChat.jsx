import { useState } from "react";

export function NewGroupChat({groupAdded}) {
    const [groupName, setGroupName] = useState("")
    const [desc, setDesc] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(groupName === "") return

        try {
        await axios.post('http://localhost:5000/api/v1/groups', {
        name: groupName,
        }, { withCredentials: true })
      }catch (err) {
      console.error('Error creating group:', err);
      };

        groupAdded(groupName, desc) 

        setGroupName("")
        setDesc("")
      }
    
      
   return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input value={groupName} onChange={e => setGroupName(e.target.value)} 
        type="text"
        placeholder="Group Name" 
        id="item" 
        />
        <input value={desc} onChange={e => setDesc(e.target.value)} 
        type="text" 
        placeholder="Description"
        id="item" 
        />
        <button type="submit">Create Group</button>
      </div>
      
    </form>
   ) 
}