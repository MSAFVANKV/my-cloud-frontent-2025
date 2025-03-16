export interface IUser {
    _id: string;
    avatar: string;
    userName: string;
    email: string;
    unread_Count: number;
    last_Message_Time: Date;
    createdAt: Date;
    role: "full-stack" | "back-end" | "data-science" | "ux-ui" | "front-end" | "other"
}