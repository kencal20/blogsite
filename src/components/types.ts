// src/constants/path.ts

 type BlogListProps = {
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

 type BlogAuthorProps = BlogListProps & {
  authorName?: string;
  authorEmail?: string;
  authorAvatar?: string;
  authorUid?: string;
};
 type AuthorProps = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
};

 type ButtonProps = {
  content: string;
  className?: string;
  link?: string;
  onClick?:()=>void
  disabled?:boolean
};

type UserProps = {
  name: string
  email: string
  userType: "authour" | "default" | "admin"
  bio?: string
  avatar: string
  password?:string
}

export type componentProps = {
  blogAuthorProps:BlogAuthorProps
  blogList: BlogListProps;
  buttonProps: ButtonProps;
  authorProps: AuthorProps;
  userProps:UserProps

};
