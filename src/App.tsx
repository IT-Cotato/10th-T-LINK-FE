import './App.css';
import { router } from './routes/Router';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import ErrorPage from './components/Fallback/ErrorPage';

function App() {
  const [errorInfo, setErrorInfo] = useState<{ status: number; message: string } | null>(null);

  useEffect(() => {
    const handleErrorEvent = (e: any) => {
      setErrorInfo(e.detail);
    };

    window.addEventListener('triggerErrorUI', handleErrorEvent);
    return () => window.removeEventListener('triggerErrorUI', handleErrorEvent);
  }, []);

  if (errorInfo) {
    return <ErrorPage status={errorInfo.status} message={errorInfo.message} />;
  }

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
