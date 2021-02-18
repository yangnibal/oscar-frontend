import React from 'react'
import styles from '../../styles/chat/MyChat.module.css'

interface Props {
    message: string
}

const MyChat: React.FC<Props> = ({message}) => {
    return(
        <div className={styles.container}>
            <div className={styles.message_wrapper}>
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    )
}

export default MyChat