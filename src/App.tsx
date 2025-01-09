import './App.css';
import { router } from './routes/Router';
import { RouterProvider } from 'react-router-dom';
import { RoomProvider } from './context/RoomContext';

function App() {
  return (
    <RoomProvider>
      <RouterProvider router={router} />
    </RoomProvider>
  );
}

export default App;
