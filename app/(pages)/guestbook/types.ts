export type GuestbookEntry = {
  cid: string;
  userId: string | null;
  name: string;
  avatar: string | null;
  comment: string;
  createdAt: string;
};
