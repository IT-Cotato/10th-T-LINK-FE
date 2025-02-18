import { ChangeEvent } from 'react';

interface InputProps {
  name?: string;
  placeholder: string;
  setDesc: (value: string) => void;
  desc: string;
  isAble: boolean;
}

const Input = ({ name, placeholder, setDesc, desc, isAble }: InputProps) => {
  const handleDesc = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      {name && (
        <div className="text-body4 leading-[26px] font-medium flex gap-1">
          <span className="text-gray-900  ">{name}</span>
          {name !== '입금 금액' && name !== '시험 이름' && name !== '점수' && (
            <span className="text-primary_700">(필수)</span>
          )}
        </div>
      )}
      <input
        placeholder={placeholder}
        className="py-2 px-3 border-gray-300 border-[1px] focus:outline-none focus:outline-2 focus:outline-gray-500 rounded-md text-body3"
        onChange={handleDesc}
        value={desc}
        disabled={!isAble}
      ></input>
    </div>
  );
};

export default Input;
