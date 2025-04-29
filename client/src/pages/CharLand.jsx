import React from 'react'
import { useParams } from 'react-router-dom'
import { ProjectMessaging } from '../components/messeging/ProjectMessaging';

function ChatLand() {

    const{projectId}=useParams();

  return (
    <div>
    <div className="container mx-auto p-4">
      {/* Other project details */}
      <div className="mt-8">
        <ProjectMessaging projectId={projectId} />
      </div>
    </div>
    </div>
  )
}

export default ChatLand