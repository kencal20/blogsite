import { AuthProvider, RouterComponent } from "./constants/path"
type Props = {}


export default function App({ }: Props) {

  return (
    <div>
      <AuthProvider>
        <RouterComponent />
      </AuthProvider>

    </div>

  )
}