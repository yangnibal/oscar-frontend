import axios from 'axios'
import { GetMethodProps, HttpErrorType, HttpResponseType, PostMethodProps } from '../types'

export const defaultUrl = "http://15.165.237.185:8000/"
export const defaultMediaUrl = "http://15.165.237.185:8000/media"
export const defaultSocketUrl = "ws://15.165.237.185:8000/ws/"

export const getToken = () => {
    const token = localStorage.getItem("token")
    return token
}

export const Get = (props: GetMethodProps) => {
    axios.get(defaultUrl+props.endpoint, getToken() ? {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    } : {})
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Post = (props: PostMethodProps) => {
    axios.post(defaultUrl+props.endpoint, props.data, getToken() ? {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    } : {})
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Put = (props: PostMethodProps) => {
    axios.put(defaultUrl+props.endpoint, props.data, getToken() ? {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    } : {})
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Patch = (props: PostMethodProps) => {
    axios.patch(defaultUrl+props.endpoint, props.data, getToken() ? {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    } : {})
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Delete = (props: GetMethodProps) => {
    axios.delete(defaultUrl+props.endpoint, getToken() ? {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    } : {})
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}