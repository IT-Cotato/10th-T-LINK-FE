import Add from '../assets/images/Add.svg?react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div
      className="flex bottom-6 right-[14px] absolute rounded-full bg-gray-950 py-[10px] px-4 gap-1 items-center"
      onClick={onClick}
    >
      <Add />
      <p className="text-white leading-[25px] tracking-[-0.042px]">{text}</p>
    </div>
  );
};

export default Button;
