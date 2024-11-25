export type MailDataList = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  subject: string;
  body: string;
  isRead: boolean;
  from: string;
  to: string;
  tag: string;
};

export const getMailsService = async (): Promise<MailDataList> => {
  const response = await fetch(`${process.env.BFF_URL}/mail`);
  return await response.json();
};
