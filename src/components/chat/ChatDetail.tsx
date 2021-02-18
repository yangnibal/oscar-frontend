import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import WebSocketInstance from '../../api/WebSocket'
import { currentRoomId } from '../../store/currentState'
import { myUserData } from '../../store/myData'
import styles from '../../styles/chat/ChatDetail.module.css'
import { ChatMessage } from '../../types'
import MyChat from './MyChat'
import OtherChat from './OtherChat'

interface Props {
    messages: ChatMessage[]
    myUserId: number
}

const ChatDetail: React.FC<Props> = ({messages, myUserId}) => {

    const [ message, setMessage ] = useState("")

    const [ myData ] = useRecoilState(myUserData)
    const [ roomId ] = useRecoilState(currentRoomId)

    const sendMessage = () => {
        const data = {
            sender: myData.username,
            content: message,
            room: roomId
        }
        WebSocketInstance.newChatMessage(data)
        setMessage("")
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key==="Enter"){
            sendMessage()
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.message_container}>
                {messages.map((el: any, index: number) => {
                    if(el.authorId===myUserId){ 
                        return <MyChat key={index} message={el.content}/>
                    } else {
                        return <OtherChat key={index} message={el.content}/>
                    }
                })}
                <div className={styles.message_input_wrapper}>
                    <input 
                        className={styles.message_input} 
                        value={message} 
                        onKeyPress={onKeyPress} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="메시지를 입력해주세요..."
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatDetail