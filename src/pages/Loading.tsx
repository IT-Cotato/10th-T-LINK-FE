import loading_logo from '../assets/images/loading_logo.png';

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-11">
      <div className="bg-gray-50 rounded-full p-2">
        <img src={loading_logo} className="w-8 h-8" />
      </div>
      <div>
        <h1 className="font-bold text-2xl leading-10">{text}</h1>
        <h1 className="text-gray-600 font-normal text-base leading-7 ">잠시만 기다려주세요!</h1>
      </div>
    </div>
  );
};

export default Loading;
