import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import MaterialIcon from '../assets/images/RoomDetail/materials.svg?react';
import HomeworklIcon from '../assets/images/RoomDetail/homework.svg?react';
import StatisticsIcon from '../assets/images/RoomDetail/statistics.svg?react';
import CounselingIcon from '../assets/images/RoomDetail/counseling.svg?react';
import Modal from './Modal/Modal';
import { useState } from 'react';
import AccessFail from './Modal/AccessFail';

interface DetailButtonProps {
  type: string;
  isPermission: boolean;
}

const DetailButton = ({ type, isPermission }: DetailButtonProps) => {
  let title = '';
  let description = '';
  let icon = <MaterialIcon />;
  let bg = 'gray-300';
  const [modalOpen, setModalOpen] = useState(false);
  const nav = useNavigate();

  switch (type) {
    case 'materials':
      title = '강의 자료함';
      description = '필요한 강의 자료를 한곳에!';
      icon = <MaterialIcon />;
      bg = 'bg-second_5';
      break;
    case 'homework':
      title = '숙제';
      description = '숙제를 한눈에 확인해요.';
      icon = <HomeworklIcon />;
      bg = 'bg-primary_50';
      break;
    case 'stats':
      title = '성적 통계';
      description = '성적을 쉽게 확인해보세요!';
      icon = <StatisticsIcon />;
      bg = 'bg-primary_50';
      break;
    case 'diary':
      title = '상담 일지';
      description = '상담 내용을 모아보아요.';
      icon = <CounselingIcon />;
      bg = 'bg-second_5';
      break;
  }

  const handleClick = async () => {
    if (isPermission) nav(type);
    else setModalOpen(true);
  };

  return (
    <div
      className={clsx(
        'py-4 px-3 rounded-[12px] flex-col items-start flex gap-5',
        isPermission ? `${bg} cursor-pointer` : 'bg-gray-300 opacity-50 cursor-not-allowed',
      )}
      onClick={handleClick}
    >
      <div className="w-[60px] h-[60px] bg-white rounded-full p-3">{icon}</div>
      <div className="m-0">
        <h3 className="text-[18px] font-semibold leading-8 tracking-[-0.18px]">{title}</h3>
        <p className="text-[13px] font-normal text-gray-600 leading-[22px]">{description}</p>
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AccessFail setModalOpen={setModalOpen} />
        </Modal>
      )}
    </div>
  );
};

export default DetailButton;
