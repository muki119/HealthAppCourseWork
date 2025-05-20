import React, { useState } from 'react';

export function ChatApp({groupId, groupName, messages, onSendMessage, onBack, currentUser, onLeave}) {
    const [text, setText] = useState('');

    const handleSend = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const message = {
        id: Date.now(),
        groupID: groupId,
        userID: currentUser.user_id,
        content: text,
        dateSent: new Date().toISOString()
      };
      onSendMessage(groupId, message);
      setText('');
    }
  };
      
    return (
    <div className="group-list">
    <button onClick={onBack}>← Back to Groups</button>
    <button onClick={()=>onLeave(groupId, currentUser)}>Leave</button>
    <h2>Group Chat: {groupName}</h2>
    <div className='chatBox'>
        {messages.map((info) => (
            <div key={info.id} style={{ marginBottom: '0.5rem' }}>
                <strong>User {info.userID}:</strong> {info.content}
                <br />
                <small>{new Date(info.dateSent).toLocaleString()}</small>
            </div>
        ))}
    </div>
    <form onSubmit={handleSend}>
        <input
            type='text'
            placeholder='Message'
            value={text}
            onChange={(e) => setText(e.target.value)}
          style={{ width: '75%' }}
        />
        <button type="submit">Send</button>
    </form>
    </div>
    )
}