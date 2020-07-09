import React from 'react'

function Announcement({announcement}) {
    return (
        <div className="announcement-card grid-2">
            <p>Date:</p>
            <p>{announcement.date_created}</p>
            <p>Details:</p>
            <p>{announcement.information}</p>
        </div>
    )

}

export default Announcement