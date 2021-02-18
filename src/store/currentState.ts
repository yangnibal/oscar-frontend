import { atom } from "recoil";

export const currentRoomId = atom({
    key: "currentRoomId",
    default: 0 as number
})