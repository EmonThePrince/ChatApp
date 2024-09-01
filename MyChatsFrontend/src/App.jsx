import { Outlet } from 'react-router-dom'
import { UsernameProvider } from './components/usernameContext';
function App() {
  

  return (
    <>
      <UsernameProvider>
        <Outlet />
      </UsernameProvider>
    </>
  )
}


export default App
