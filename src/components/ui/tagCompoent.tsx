type Props = {
  tag: string
}

export default function TagComponent({ tag }: Props) {
  return (
    <span
      className="rounded-full border border-purple-500 px-2 py-0.5 text-xs text-purple-700 hover:bg-purple-700 hover:text-white"
    >
      {tag}
    </span>
  )
}
