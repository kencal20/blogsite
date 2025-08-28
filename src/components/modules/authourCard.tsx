import {CardComponent} from "../../constants/path";

type AuthorProps = {
  name: string;
  bio: string;
  avatar: string;
};

export default function AuthorCard({ name, bio, avatar }: AuthorProps) {
  return (
    <CardComponent className="w-full sm:w-[48%] lg:w-[30%]">
      <img
        src={avatar}
        alt={name}
        className="size-16 rounded-full object-cover sm:size-[72px]"
      />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">{bio}</p>
    </CardComponent>
  );
}
