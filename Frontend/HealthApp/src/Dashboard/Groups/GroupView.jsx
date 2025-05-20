import { useEffect, useState,useContext } from "react"
import "./GroupView.css"
import { NewGroupChat } from "./NewGroupChat"
import { GroupLists } from "./GroupList"
import { AppContext } from "../../Contexts"
import { ChatApp } from "./ChatApp"
import MenuBar from "../menu/menu"
import axios from "axios"


export default function GroupView(){
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('groups');
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [groupMessage, setGroupMessage] = useState({});  
  const [groupList, setGroupList] = useState([])

  const {user, setUser,metrics,setMetrics,groups,setGroups,goals,setGoals,logoutHandler} = useContext(AppContext)

  useEffect(() => {

      const getGroups = async () => {
        try {
          const response = await axios.get('http://localhost:2556/api/v1/groups', {}, { withCredentials: true });
          setGroups(response.data);
          console.log(response.data)
        } catch (error) {
          if (error?.response?.status === 401) {
            return logoutHandler();
          }
        }
      };
      if (!user) {
        getGroups();
      }

  }, []);

  // useEffect(() => {
  //   axios.get(`http://localhost:5173/api/v1/groups/${groupId}/messages`, {}, { withCredentials: true })
  //     .then((response) => {
  //       setGroupMessage(response.data)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  // }, [groupMessage]);


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
      const deleteResponse = await axios.delete(`http://localhost:2556/api/v1/groups/${activeGroupId}/leave`);
      if (deleteResponse.status === 200) {
        setGroupList(prevGroupList => prevGroupList.filter(group => group.id !== activeGroupId));
        setActiveGroupId(null);
        setCurrentPage('groups');
      }
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
  const activeGroup = groups.find(g => g.id === activeGroupId);
  const activeMessages = groupMessage[activeGroupId] || [];

  return (
    <>
      {currentPage === 'groups' ? (
        <div className="group-list">
        <MenuBar pageName={"Groups"} />
          <h1>
            Community Groups
          </h1>
          <NewGroupChat groupAdded={addGroup} /> 
          <h1 className="header">All Groups</h1>
          <GroupLists groupList={groups} joinChat={joinChat} deleteChat={deleteChat} />
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