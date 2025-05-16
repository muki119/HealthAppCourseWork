import { GroupItem } from "./GroupItem"

export function GroupLists({groupList, joinChat, deleteChat}) {
    return (
    <div className="group-list">
      {groupList.length === 0 && "No groups created"}
      {groupList.map(group => {
        return <GroupItem {...group}  key={group.id} 
        joinChat={joinChat}
        deleteChat={deleteChat} />
        })}
    </div>
    )
}