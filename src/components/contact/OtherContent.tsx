import React from 'react'
import styles from '../../styles/contact/Content.module.css'
import UserDefault from '../../assets/user-default.svg'
import { defaultUrl } from '../../api'

interface Props {
    profile_img: string | null
    username: string
    name: string
    onClick: () => void
    onClickAddButton: () => void
    onClickDeleteButton: () => void
}

const OtherContent: React.FC<Props> = ({profile_img, username, name, onClick, onClickAddButton, onClickDeleteButton}) => {
    return(
        <div className={styles.container} onClick={onClick}>
            <div className={styles.profile_img_wrapper}>
                <img src={profile_img ? defaultUrl+profile_img?.replace("/", "") : UserDefault} alt="" className={styles.profile_img}/>
            </div>
            <div className={styles.name_wrapper}>
                <div className={styles.username}>{username}</div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.button_wrapper}>
                
            </div>
        </div>
    )
}

export default OtherContent