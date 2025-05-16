import { useEffect, useState } from "react"
import "./GroupView.css"
import { NewGroupChat } from "./NewGroupChat"
import { GroupLists } from "./GroupLists"
import { ChatApp } from "./ChatApp"
import axios from "axios"


export default function GroupView(){
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('groups');
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [groupMessage, setGroupMessage] = useState({});  
  const [groupList, setGroupList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/groups', {}, { withCredentials: true })
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

    useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/groups/${groupId}/messages`, {}, { withCredentials: true })
      .then((response) => {
        setGroupMessage(response.data)
      })
      .catch((error) => {
        console.error(error);
      })
  }, [groupMessage]);



  function addGroup(title, desciption){
    setGroupList((currentGroupList) => {
      return [
      ...currentGroupList, 
      {id: crypto.randomUUID(), title, 
        desciption, 
        completed: 
        false},
      ]
    })
  }

  function joinChat(id) {
    setActiveGroupId(id);
    setCurrentPage('chat');
  }
  
  function deleteChat(id) {
    setGroupList(currentGroup => {
      return currentGroup.filter(group => group.id !== id)
    })
  }

  const goBack = () => {
    setCurrentPage('groups');
    setActiveGroupId(null);
  }

  const leaveChat = async (activeGroupId, currentUser) => {

  try {
    await axios.delete(`http://localhost:5000/api/v1/groups/${groupId}/leave`, 
      {data: { currentUser } }, 
      { withCredentials: true }
    );

    console.log('Left group successfully');
  } catch (error) {
    console.error('Failed to leave group:', error);
  }
  
  }

  const sendMessage = (id, message) => {


    setGroupMessage(prevMessage => ({
      ...prevMessage,
      [id]: [...(prevMessage[id] || []), message]
    }));
  };


  const activeGroup = groupList.find(g => g.id === activeGroupId);
  const activeMessages = groupMessage[activeGroupId] || [];

  return (
    <>
      {currentPage === 'groups' ? (
        <div className="group-list">
        <h1>Community Groups</h1>
        <NewGroupChat groupAdded={addGroup} /> 
        <h1 className="header">All Groups</h1>
        <GroupLists groupList={groupList} joinChat={joinChat} deleteChat={deleteChat} />
        </div>
      ) : (
        <ChatApp 
          groupId={activeGroupId}
          groupName={activeGroup?.title}
          messages={activeMessages}
          onSendMessage={sendMessage}
          onBack={goBack}
          onLeave={leaveChat}
          currentUser={currentUser}
          />
      )}
    </>
  )
}