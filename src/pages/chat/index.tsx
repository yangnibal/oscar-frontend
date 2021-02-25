import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/chat/Chat.module.css'
import ChatRoomContent from '../../components/chat/ChatRoomContent'
import ChatDetail from '../../components/chat/ChatDetail'
import { Get } from '../../api'
import { ChatMessage, ChatRoom } from '../../types'
import { useRecoilState } from 'recoil'
import { myUserData } from '../../store/myData'
import withAuthRequest from '../../hocs/withAuthRequest'
import WebSocketInstance from '../../api/WebSocket'
import { currentRoomId } from '../../store/currentState'
import AddChatRoomModal from '../../components/chat/AddChatRoomModal'
import Plus from '../../assets/plus.svg'

function Chat(){

    const [ chatList, setChatList ] = useState<ChatRoom[]>([])
    const [ messages, setMessages ] = useState<ChatMessage[]>([])
    const [ isAddChatRoomModalOn, setIsAddChatRoomModalOn ] = useState(false)

    const [ myData ] = useRecoilState(myUserData)
    const [ roomId, setRoomId ] = useRecoilState(currentRoomId)

    const waitForSocketConnection = (callback: any) => {
        setTimeout(() => {
            if(WebSocketInstance.state()===1){
                console.log("connection is made")
                callback()
                return
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(callback)
            }
        }, 100)
    }

    const setInitalMessage = (data: ChatMessage[]) => {
        setMessages(data)
    }

    const addMessage = (data: ChatMessage) => {
        setMessages(messages => [...messages, data])
    }

    const onClickChatRoom = (roomId: number) => {
        setRoomId(roomId)
        WebSocketInstance.connect(roomId)
        waitForSocketConnection(() => {
            WebSocketInstance.initChatUser(myData.username)
            WebSocketInstance.fetchMessages(roomId)
            WebSocketInstance.addCallbacks(setInitalMessage, addMessage)
        })
    }

    const onClickAddChatRoom = () => {
        setIsAddChatRoomModalOn(isAddChatRoomModalOn => !isAddChatRoomModalOn)
    }

    useEffect(() => {
        Get({
            endpoint: "rooms/my/",
            onSuccess: (res) => {
                setChatList(res.data)
            },
            onFailure: (err) => console.log(err)
        })
    }, [])

    return (
        <Layout>
            {isAddChatRoomModalOn && <AddChatRoomModal setModalHide={onClickAddChatRoom}/>}
            <div className={styles.container}>
                <div className={styles.list_container}>
                    <div className={styles.top_wrapper}>
                        <div className={styles.title}>Chats</div>
                        <div className={styles.plus_img_wrapper} onClick={onClickAddChatRoom}>
                            <img src={Plus} alt="" className={styles.plus_img}/>
                        </div>
                    </div>
                    <div className={styles.search_input_wrapper}>
                        <input className={styles.search_input} placeholder="Search Contact..."/>
                    </div>
                    <div className={styles.list}>
                        {chatList.map((el: ChatRoom, index: number) => (
                            <ChatRoomContent 
                                key={index} 
                                title={el.title} 
                                lastMessage={el.last_message?.content} 
                                lastMessagedAt={el.last_message?.timestamp} 
                                profileImageUrl={el.participants.filter((el: any) => el.username!==myData.username)[0]?.profile_img}
                                onClick={() => onClickChatRoom(el.id)}
                                id={el.id}
                                roomId={roomId}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.message_container}>
                    <ChatDetail messages={messages} myUserId={myData.id}/>
                </div>
            </div>
        </Layout>
    )
}

export default withAuthRequest(Chat)