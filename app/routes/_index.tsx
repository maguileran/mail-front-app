import type { MetaFunction } from "@remix-run/node";
import {
  getMailsService,
  markAsReadUnreadService,
  removeMailService,
} from "../services/mails/mails-services";
import MailList from "../layout/mails";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return await getMailsService();
};

export default function Index() {
  const mails = useLoaderData<typeof loader>();

  const handleUpdateMail = (id: number, isRead: boolean) => {
    markAsReadUnreadService(id, isRead);
  };

  const handleRemoveMail = (id: number) => {
    removeMailService(id);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
        </header>
        <nav className="min-w-[800px] gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <MailList
            data={mails}
            handleRemoveMail={handleRemoveMail}
            handleUpdateMail={handleUpdateMail}
          />
        </nav>
      </div>
    </div>
  );
}
