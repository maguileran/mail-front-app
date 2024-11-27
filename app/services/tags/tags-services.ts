export type TagDataList = {
  name: string;
  id: number;
};

export const getTagsService = async (): Promise<TagDataList[]> => {
  const response = await fetch(`${process.env.BFF_URL}/tag`);
  return response.json();
};
