import React from 'react'
import styles from '../../styles/account/RegisterButton.module.css'

interface Props{
    onClickPrev: () => void,
    onClickNext: () => void
    currentProcess: number
}

const RegisterButton: React.FC<Props> = ({onClickNext, onClickPrev, currentProcess}) => {
    return(
        <>
            <div 
                className={currentProcess!==0&&currentProcess!==4 ? styles.container + ' ' + styles.container_half : styles.container} 
                style={currentProcess===0 ? {width: "0"} : {}} 
                onClick={onClickPrev}
            >
                <div className={styles.label}>{currentProcess!==0 && "Prev"}</div>
            </div>
            <div 
                className={currentProcess!==0&&currentProcess!==4 ? styles.container + ' ' + styles.container_half : styles.container} 
                style={currentProcess===4 ? {width: "0"} : {}} 
                onClick={onClickNext}
            >
                <div className={styles.label}>{currentProcess!==4 && "Next"}</div>
            </div>
        </>
    )
}

export default RegisterButton