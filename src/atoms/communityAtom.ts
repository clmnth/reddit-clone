import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
   id: string,
   creatorId: string,
   numberOfMembers: number,
   privacyTyoe: 'public' | 'restricted' | 'private',
   createdAt?: Timestamp,
   imageURL?: string,
}

interface CommunitySnippet {
   community: string;
   isModerator?: boolean;
   imageURL?: string; 
}

interface CommunityState {
   MySnippets: CommunitySnippet[];
}

const defaultCommunityState: CommunityState = {
   MySnippets: []
}

export const CommunityState = atom<CommunityState>({
   key: 'communitiesState',
   default: defaultCommunityState
})