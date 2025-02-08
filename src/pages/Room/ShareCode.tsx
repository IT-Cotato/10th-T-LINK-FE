import { useEffect, useState } from 'react';
import { getShareCode } from '../../api/roomList.api';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import Modal from '../../components/Modal/Modal';
import ShareLinkModal from '../../components/Modal/ShareLinkModal';

const ShareCode = () => {
  const location = useLocation();
  const roomId = location.state.roomId;

  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="flex py-5 flex-col h-full justify-center items-center ">
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ShareLinkModal setModalOpen={setModalOpen} roomId={roomId} />
        </Modal>
      )}
    </div>
  );
};

export default ShareCode;
