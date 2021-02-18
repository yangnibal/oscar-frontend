import { atom } from 'recoil'

export const myUserData = atom({
    key: "myUserData",
    default: {
        email: "" as string,
        followers: [] as number[],
        id: 0 as number,
        name: "" as string,
        username: "" as string,
        profile_img: "" as string
    }
})