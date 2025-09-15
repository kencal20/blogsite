import { AuthProvider, BlogProvider, RouterComponent } from "./constants/path"
type Props = {}


export default function App({ }: Props) {

  return (
    <div>
      <AuthProvider>
        <BlogProvider>
          <RouterComponent />
        </BlogProvider>
      </AuthProvider>

    </div>

  )
}