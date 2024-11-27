import { useState } from "react";
import { Tag } from "../../services/mails/mails-services";
import { useLoaderData } from "@remix-run/react";
import { getTagsService } from "../../services/tags/tags-services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { SelectTags } from "./select-tags";

type TagsListProps = {
  tags: Tag[];
  onUpdateTags: (tags: Tag[]) => void;
};

export const loader = async () => {
  const values = {
    tags: await getTagsService(),
  };
  return values;
};

export default function TagsList({ tags, onUpdateTags }: TagsListProps) {
  const { tags: allTag } = useLoaderData<typeof loader>();

  const [currentTags, setCurrentTags] = useState(tags);

  const handleSave = () => {
    onUpdateTags(currentTags);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircleIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tags</DialogTitle>
          <DialogDescription />

          <div className="flex items-center gap-2">
            <SelectTags
              availableTags={allTag}
              setSelectedTags={setCurrentTags}
              tags={currentTags}
              disable={false}
            />
          </div>
        </DialogHeader>

        <div className="flex justify-end items-center space-x-2 gap-2">
          <Button onClick={handleSave} size="sm" className="px-3">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
