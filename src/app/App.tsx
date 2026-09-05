import {RouterProvider} from "react-router-dom"
import {router} from "@/app"

const App=()=>{
  return(
    <RouterProvider router={router} />
  )
}

export default App;