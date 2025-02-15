import Add from '../assets/images/Add.svg?react';
import { GrEdit } from 'react-icons/gr';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div
      className="flex bottom-24 right-[14px] fixed rounded-full bg-gray-950 py-[10px] px-4 gap-1 items-center"
      onClick={onClick}
    >
      {text == '숙제 수정하기' ? <GrEdit className="stroke-white pr-1" size={20} /> : <Add />}
      <p className="text-white leading-[25px] tracking-[-0.042px]">{text}</p>
    </div>
  );
};

export default Button;
