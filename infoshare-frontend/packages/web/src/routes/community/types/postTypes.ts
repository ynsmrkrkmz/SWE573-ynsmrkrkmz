export type NewPostFormInput = {
  title: string;
  content: string;
  communityId: string | undefined;
  postTemplateId: number | null;
};
