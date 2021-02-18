import { defaultSocketUrl } from './index'

class WebSocketService{
    static instance: any = null
    callbacks: any = {}
    socketRef: any
    static getInstance(){
        if(!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService()
        }
        return WebSocketService.instance
    }

    constructor(){
        this.socketRef = null
    }

    connect(roomid: any){
        const path = defaultSocketUrl + roomid + "/"
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log("websocket opened")
        }
        this.socketRef.onmessage = (e: any) => {
            this.socketNewMessage(e.data)
        }   
        this.socketRef.onerror = (e: any) => {
            console.log(e)
        }
        this.socketRef.onclose = () => {
            console.log("websocket closed reopen")
            //this.connect()
        }
    }

    socketNewMessage(data: any){
        const parsedData = JSON.parse(data)
        const command = parsedData.command
        console.log(command)
        if(Object.keys(this.callbacks).length===0){
            return;
        }
        if(command==="messages"){
            this.callbacks[command](parsedData.messages)
        }
        if(command==="new_message"){
            this.callbacks[command](parsedData.message)
        }
    }

    initChatUser(username: any){
        this.sendMessage({ 
            command: "init_chat",
            username: username
        })
    }

    fetchMessages(room: any){
        this.sendMessage({
            command: "fetch_messages",
            room: room
        })
    }

    newChatMessage(message: any){
        this.sendMessage({
            command: "new_message",
            from: message.sender,
            text: message.content,
            room: message.room
        })
    }

    addCallbacks(messagesCallback: any, newMessageCallback: any){
        this.callbacks['messages'] = messagesCallback
        this.callbacks['new_message'] = newMessageCallback
    }

    sendMessage(data: any){
        try{
            this.socketRef.send(JSON.stringify({...data}))
        }
        catch(err){
            console.log(err.message)
        }
    }

    state(){
        return this.socketRef.readyState
    }

    waitForSocketConnection(callback: any){
        const socket = this.socketRef
        const recursion = this.waitForSocketConnection
        setTimeout(() => {
            if(socket.readyState===1){
                console.log("Connection is made")
                if(callback!==null){
                    callback()
                }
                return
            } else {
                console.log("wait for connection...")
                recursion(callback)
            }
        }, 1)
    }
}

const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance