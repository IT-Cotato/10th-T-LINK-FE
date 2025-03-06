import Frame from '../../assets/images/Frame.svg?react';
import StatisticsButton from './StatisticsButton';

interface EmptyProps {
  setModalOpen: (value: boolean) => void;
}

const Empty = ({ setModalOpen }: EmptyProps) => {
  const userRole = localStorage.getItem('roleInfo');

  return (
    <div className="p-4 flex flex-col justify-center gap-6 items-center">
      <Frame className="w-10 h-10" />
      <div className="flex flex-col items-center text-body2 font-semibold leading-8 tracking-[-0.18px]">
        <p>시험을 등록하지 않았어요.</p>
        <p>시험 종류를 추가하고</p>
        <p>성적 통계를 한번에 보세요!</p>
      </div>
      {userRole == 'TEACHER' && (
        <StatisticsButton
          type="시험"
          onClick={() => {
            setModalOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default Empty;
