export function GroupItem({title, desciption, id, joinChat, deleteChat}) {
    return (
        <div className="group-card">
            <div className="group-info">
                <h3>{title}</h3>
                <p>{desciption}</p>
            </div>
            <div className="button-sect">
                <button 
                onClick={() => joinChat(id)} 
                className="join-button"
                >Join
                </button>
                <button
                onClick={() => deleteChat(id)} 
                className="delete-button"
                >Delete
                </button>
            </div>
        </div>
    )
}