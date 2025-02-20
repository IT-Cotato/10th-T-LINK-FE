import { useState } from 'react';
import Frame from '../../assets/images/Frame.svg?react';
import Button from '../Button';
import StatisticsButton from '../StatisticsButton';
import Modal from '../Modal/Modal';
import CreateModal from '../Modal/CreateModal';

const Empty = () => {
  const userRole = localStorage.getItem('roleInfo');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4 flex flex-col justify-center gap-6 items-center">
      <Frame className="w-10 h-10" />
      <div className="flex flex-col items-center text-body2 font-semibold leading-8 tracking-[-0.18px]">
        <p>시험을 등록하지 않았어요.</p>
        <p>시험 종류를 추가하고</p>
        <p>성적 통계를 한번에 보세요!</p>
      </div>
      {userRole == 'TEACHER' ? <StatisticsButton type="시험" onClick={() => setModalOpen(true)} /> : ''}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <CreateModal type="시험" setModalOpen={setModalOpen} />
        </Modal>
      )}
    </div>
  );
};

export default Empty;
