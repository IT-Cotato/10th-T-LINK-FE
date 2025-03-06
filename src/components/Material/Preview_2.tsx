import vector_gray from '../../assets/images/vector_gray.png';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/images/RoomDetail/homework.svg?react';

interface PreviewProps {
  title: string;
  deadline: string;
  id: number;
  onClick?: () => void;
  isPassed: boolean;
  dDay?: number;
}

const Preview_2 = ({ title, deadline, id, isPassed, dDay }: PreviewProps) => {
  const nav = useNavigate();

  return (
    <div className="flex gap-3 py-4 items-center" onClick={() => nav(`${id}`)}>
      <div className={`p-[12px] rounded-2xl ${isPassed ? 'bg-gray-300 bg-opacity-50' : ' bg-primary_100'}`}>
        <Icon className={isPassed ? 'filter grayscale' : ''} />
      </div>
      <div className="flex gap-4 items-center flex-1">
        <img src={vector_gray} className="w-[3px] h-[24px]" />
        <div className="tracking-[-0.048px]">
          <p className="text-body3 font-semibold leading-7 text-gray-900">{title}</p>
          <div className="flex gap-[6px] text-body4 leading-[25px] text-gray-500 items-center">
            <span>마감 날짜 {deadline}</span>
          </div>
        </div>
      </div>
      {!isPassed && (
        <p className="px-3 border-2 border-sub1_40 rounded-full text-body4 font-medium leading-[26px] text-sub1_40">
          D-{dDay}
        </p>
      )}
      <MdKeyboardArrowRight size={28} fill="#C6C4C1" />
    </div>
  );
};

export default Preview_2;
