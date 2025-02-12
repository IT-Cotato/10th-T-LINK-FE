import { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  placeholder: string;
  setContent: (value: string) => void;
  content: string;
  isAble: boolean;
}

const TextArea = ({ name, placeholder, setContent, content, isAble }: InputProps) => {
  const handleDesc = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="text-body4 leading-[26px] font-medium flex gap-1">
        <span className="text-gray-900  ">{name}</span>
        <span className="text-primary_700">(필수)</span>
      </div>
      <textarea
        placeholder={placeholder}
        className="h-[180px] py-2 px-3 bg-white border-[1px] focus:outline-none focus:outline-2 focus:outline-gray-500 rounded-md text-body3"
        onChange={handleDesc}
        value={content}
        disabled={!isAble}
      ></textarea>
    </div>
  );
};

export default TextArea;
