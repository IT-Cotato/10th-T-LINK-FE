interface ErrorPageProps {
  status: number;
  message: string;
}

const ErrorPage = ({ status, message }: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Error {status}</h1>
      <p className="text-lg mb-6">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-black text-white px-4 py-2 rounded"
      >
        새로고침
      </button>
    </div>
  );
};

export default ErrorPage;
