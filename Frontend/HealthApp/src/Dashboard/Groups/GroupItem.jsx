export function GroupItem({group,groupId,joinChat,deleteChat}) {
    console.log(group)
    return (
        <div className="group-card">
            <div className="group-info">
                <h3>{group.name}</h3>
            </div>
            <div className="button-sect">
                <button
                onClick={() => joinChat(groupId)} 
                className="join-button"
                >Join
                </button>
                <button
                onClick={() => deleteChat(groupId)} 
                className="delete-button"
                >Delete
                </button>
            </div>
        </div>
    )
}