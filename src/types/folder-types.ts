import { IFiles } from "./filesTypes"

export interface IFolderTypes {
    _id: string
    name: string
    isDeleted: boolean
    published: boolean
    parentId: any
    subFolders: IFolderTypes[]
    files: IFiles[]
    userId: string
    createdAt: string
    slug: string
    updatedAt: string
    __v: number
  }