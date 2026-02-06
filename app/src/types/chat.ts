export interface GroupItem {
  name: string;
  groupLastMessage: string;
  lastMessageTime: string;
  isActive: boolean;
  isAdmin: boolean;
  inviteStatus: string;
  isTwoWay: boolean;
  isOneToOne: boolean;
  personalChatName?: string;
}


export interface ChatApiResponse {
  ChatToken: string;
  Name: string;
  Department: string;
  Category: string;
  avatar: string;
  UserImageUrl: string;
  Groups: GroupItem[];
  CreateGroups: boolean;
  OnetoOne: boolean;
}
