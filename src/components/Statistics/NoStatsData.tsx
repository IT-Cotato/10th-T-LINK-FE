import Question from '../../assets/images/Question.svg?react';

interface ModalProps {
  onClose?: () => void;
}

const NoStatsData = ({ onClose }: ModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };
  return (
    <div
      className="absolute flex items-center justify-center inset-0 bg-transparent max-w-[500px] mx-auto z-10"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col gap-1 items-center">
        <div className="p-2 bg-gray-50 rounded-full">
          <Question />
        </div>
        <p className="text-[12px] text-gray-500 leading-[22px]">성적을 추가해 성적 통계 그래프를 만들어 보세요!</p>
      </div>
    </div>
  );
};

export default NoStatsData;
