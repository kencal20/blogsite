import { UserForm } from "../constants/path"

type Props = {}

export default function UpdateUser({}: Props) {
  return (
    <UserForm isEdit={true} />
  )
}