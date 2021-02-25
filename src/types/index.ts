export type HttpResponseType = {
    data: any
}

export type HttpErrorType = {
    message: string
}

export type GetMethodProps = {
    endpoint: string
    onSuccess: (res: HttpResponseType) => void
    onFailure: (err: HttpErrorType) => void
}

export type PostMethodProps = {
    endpoint: string
    data: FormData
    onSuccess: (res: HttpResponseType) => void
    onFailure: (err: HttpErrorType) => void
}

export type ChatRoom = {
    title: string
    id: number
    participants: {
        username: string,
        profile_img?: string
    }[]
    description: string
    last_message?: {
        content: string
        timestamp: string
    }
}

export type ChatMessage = {
    id: number
    timestamp: string
    content: string
}

export interface DefaultInputType {
    placeholder?: string
    value?: string
    name?: string
    onChange?: () => void
    type?: string
}

export interface User {
    name: string
    email: string
    username: string
    id: number
    profile_img: string | null
}