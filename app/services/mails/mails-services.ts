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

function getBrowserEnv(key: string): string | undefined {
  if (typeof window !== "undefined" && window.ENV) {
    return window.ENV?.[key];
  }
  return undefined;
}

export const getMailsService = async (): Promise<MailDataList[]> => {
  const response = await fetch(`${process.env.BFF_URL}/mail`);
  return response.json();
};

export const markAsReadUnreadService = async (
  id: number,
  isRead: boolean
): Promise<MailDataList[]> => {
  const response = await fetch(`${getBrowserEnv("BFF_URL")}/mail/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      isRead: isRead,
    }),
  });
  return response.json();
};

export const removeMailService = async (
  id: number
): Promise<MailDataList[]> => {
  const response = await fetch(`${getBrowserEnv("BFF_URL")}/mail/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
