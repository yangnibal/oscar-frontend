import React from 'react'
import styles from '../../styles/contact/Content.module.css'
import UserDefault from '../../assets/user-default.svg'

interface Props {
    profile_img: string | null
    username: string
    onClick: () => void
    onClickDeleteButton: () => void
}

const MyContactContent: React.FC<Props> = ({onClick, onClickDeleteButton, profile_img, username}) => {
    return(
        <div className={styles.content} onClick={onClick}>
            <div className={styles.info_wrapper}>
                <div className={styles.profile_img_wrapper}>
                    <img src={profile_img || UserDefault} className={styles.profile_img} alt=""/>
                </div>
                <div className={styles.username}>{username}</div>
            </div>
            <div className={styles.icons_wrapper}>
                
            </div>
        </div>
    )
}

export default MyContactContent