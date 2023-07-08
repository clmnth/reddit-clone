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

export interface CommunitySnippet {
   communityId: string;
   isModerator?: boolean;
   imageURL?: string; 
}

interface CommunityState {
   MySnippets: CommunitySnippet[];
   // visitedCommunities
}

const defaultCommunityState: CommunityState = {
   MySnippets: []
}

export const communityState = atom<CommunityState>({
   key: 'communitiesState',
   default: defaultCommunityState
});