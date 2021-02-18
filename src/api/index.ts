import axios from 'axios'
import { GetMethodProps, HttpErrorType, HttpResponseType, PostMethodProps } from '../types'

export const defaultUrl = "http://localhost:8000/"
export const defaultSocketUrl = "ws://localhost:8000/ws/"

export const getToken = () => {
    const token = localStorage.getItem("token")
    return token
}

export const Get = (props: GetMethodProps) => {
    axios.get(defaultUrl+props.endpoint, {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    })
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Post = (props: PostMethodProps) => {
    axios.post(defaultUrl+props.endpoint, props.data, {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    })
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Put = (props: PostMethodProps) => {
    axios.put(defaultUrl+props.endpoint, props.data, {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    })
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Patch = (props: PostMethodProps) => {
    axios.patch(defaultUrl+props.endpoint, props.data, {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    })
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}

export const Delete = (props: GetMethodProps) => {
    axios.delete(defaultUrl+props.endpoint, {
        headers: {
            Authorization: `Token ${getToken()}`
        }
    })
    .then((res: HttpResponseType) => {
        props.onSuccess(res)
    })
    .catch((err: HttpErrorType) => {
        props.onFailure(err)
    })
}