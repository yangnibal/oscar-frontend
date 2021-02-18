import React from 'react'
import styles from '../../styles/chat/ChatRoomContent.module.css'

interface Props {
    title: string
    lastMessage?: string
    lastMessagedAt?: string
    profileImageUrl?: string
    onClick: () => void
    id: number
    roomId?: number
}

const ChatRoomContent: React.FC<Props> = ({title, lastMessage, lastMessagedAt, profileImageUrl, onClick, roomId, id}) => {
    return(
        <div className={id===roomId ? styles.container + ' ' + styles.container__selected : styles.container} onClick={onClick}>
            <div className={styles.profile_image_wrapper}>
                <img className={styles.profile_image} alt="" src={profileImageUrl}/>
            </div>
            <div className={styles.content_wrapper}>
                <div className={styles.title}>{title}</div>
                <div className={styles.last_message_wrapper}>
                    <div className={styles.last_message}>{lastMessage}</div>
                    <div className={styles.last_messaged}>{lastMessagedAt}</div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoomContent