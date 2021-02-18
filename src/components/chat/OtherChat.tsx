import React from 'react'
import styles from '../../styles/chat/OtherChat.module.css'

interface Props {
    message: string
}

const OtherChat: React.FC<Props> = ({message}) => {
    return(
        <div className={styles.container}>
            <div className={styles.message_wrapper}>
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    )
}

export default OtherChat