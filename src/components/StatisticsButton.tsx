interface ButtonProps {
  onClick: () => void;
  type: string;
}

const StatisticsButton = ({ onClick, type }: ButtonProps) => {
  return (
    <div
      className="px-4 py-[14px] bg-primary_700 w-[12.5rem] text-body3 flex items-center text-white justify-center font-semibold rounded-[4px]"
      onClick={onClick}
    >
      {type} 추가하기
    </div>
  );
};

export default StatisticsButton;
