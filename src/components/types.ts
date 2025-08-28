// src/constants/path.ts

export type BlogListProps = {
  id?: string;
  title: string;
  authour: string; // stores authorId
  description: string;
  image: string;
  date_published?: string;
  read_time?: string;
  tags?: string[];
  link?: string;
};

export type AuthorProps = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
};

export type ButtonProps = {
  content: string;
  className?: string;
  link?: string;
};

export type componentProps = {
  blogList: BlogListProps;
  buttonProps: ButtonProps;
  authorProps: AuthorProps;
};
