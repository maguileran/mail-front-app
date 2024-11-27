import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { Tag } from "../../services/mails/mails-services";
import { TagDataList } from "../../services/tags/tags-services";

type SelectTagsProps = {
  availableTags: TagDataList[];
  tags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  disable: boolean;
};

export function SelectTags({
  availableTags,
  tags,
  setSelectedTags,
  disable,
}: SelectTagsProps) {
  const handleToggle = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.find(({ tag: _tag }) => _tag?.id == tag?.tag?.id)
        ? prev.filter(({ tag: _tag }) => _tag?.id != tag?.tag?.id)
        : [...prev, tag]
    );
  };

  const mapTagsToString = (tags: Tag[]): string[] => {
    return tags.map(({ tag }) => tag?.id + "");
  };

  const mapStringToTag = (values: string[]): void => {
    const tagsSelected = availableTags.filter((tag) =>
      values.includes(tag?.id + "")
    );
    setSelectedTags(tagsSelected.map((tag) => ({ tag })));
  };

  return (
    <ToggleGroup
      type="multiple"
      value={mapTagsToString(tags)}
      onValueChange={mapStringToTag}
      className="flex flex-wrap gap-2"
    >
      {availableTags.map((tag) => (
        <ToggleGroupItem
          disabled={disable}
          key={tag?.name}
          value={tag?.id + ""}
          onClick={() => handleToggle({ tag })}
          className={`btn ${
            tags.find(({ tag: _tag }) => _tag?.id == tag.id)
              ? "btn-primary"
              : "btn-outline"
          }`}
        >
          {tag?.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
