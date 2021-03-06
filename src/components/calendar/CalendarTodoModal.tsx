import React from 'react'
import styles from '../../styles/calendar/Modal.module.css'

interface Props {
    height: number
    setIsModalOn: () => void
    mouseXPosition: number
    mouseYPosition: number
}

const CalendarTodoModal: React.FC<Props> = ({height, setIsModalOn, mouseXPosition, mouseYPosition}) => {

    const inEffect = `
        @keyframes showModal {
            0% {
                
            }
            50% {}
            100% {}
        }
    `

    const inlineStyles = {
        container: {
            height: `${height}px;`,
            top: `${mouseXPosition};`,
            left: `${mouseYPosition};`,
        }
    }

    return(
        <style children={inEffect}>
            <div className={styles.container} style={inlineStyles.container} onClick={setIsModalOn}></div>
        </style>
    )
}

export default CalendarTodoModal