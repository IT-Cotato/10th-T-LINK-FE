import Add from '../assets/images/Add.svg?react';
import { GrEdit } from 'react-icons/gr';

interface ButtonProps {
  text: string;
  onClick: () => void;
}
const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="fixed w-full max-w-[500px] mx-auto left-1/2 -translate-x-1/2 bottom-36">
      <div
        className="absolute right-[14px] rounded-full bg-gray-950 py-[10px] px-4 gap-1 items-center flex"
        onClick={onClick}
        style={{ boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.16)' }}
      >
        {text === '숙제 수정하기' ? <GrEdit className="stroke-white pr-1" size={20} /> : <Add />}
        <p className="text-white leading-[25px] tracking-[-0.042px]">{text}</p>
      </div>
    </div>
  );
};

export default Button;
