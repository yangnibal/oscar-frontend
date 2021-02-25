import React from 'react'
import styles from '../../styles/contact/Content.module.css'

interface Props {
    profile_img: string | null
    username: string
    onClick: () => void
    onClickAddButton: () => void
    onClickDeleteButton: () => void
}

const OtherContent: React.FC<Props> = ({profile_img, username, onClick, onClickAddButton, onClickDeleteButton}) => {
    return(
        <div></div>
    )
}

export default OtherContent