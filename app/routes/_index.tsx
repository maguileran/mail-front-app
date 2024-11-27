import type { MetaFunction } from "@remix-run/node";
import {
  getMailsService,
  markAsReadUnreadService,
  removeMailService,
  Tag,
  tagToMailService,
} from "../services/mails/mails-services";
import MailList from "../layout/mails";
import { useLoaderData } from "@remix-run/react";
import { getTagsService } from "../services/tags/tags-services";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const values = {
    mails: await getMailsService(),
    tags: await getTagsService(),
  };
  return values;
};

export default function Index() {
  const { mails, tags } = useLoaderData<typeof loader>();

  const handleUpdateMail = (id: number, isRead: boolean) => {
    markAsReadUnreadService(id, isRead);
  };

  const handleRemoveMail = (id: number) => {
    removeMailService(id);
  };

  const handleTagToMail = (id: number, tags: Tag[]) => {
    tagToMailService(id, tags);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome
          </h1>
        </header>
        <nav className="min-w-[800px] gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <MailList
            data={mails}
            handleRemoveMail={handleRemoveMail}
            handleUpdateMail={handleUpdateMail}
            handleTagToMail={handleTagToMail}
          />
        </nav>
      </div>
    </div>
  );
}
