import { Timestamp } from "firebase/firestore";

export interface Community {
   id: string,
   creatorId: string,
   numberOfMembers: number,
   privacyTyoe: 'public' | 'restricted' | 'private',
   createdAt?: Timestamp,
   imageURL?: string,
}