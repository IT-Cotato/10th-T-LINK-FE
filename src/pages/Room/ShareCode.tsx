import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import ShareLinkModal from '../../components/Modal/ShareLinkModal';
import { getShareCode } from '../../api/roomList.api';

const ShareCode = () => {
  const location = useLocation();
  const roomId = location.state.roomId;
  const [modalOpen, setModalOpen] = useState(true);
  const [link, setLink] = useState('');

  useEffect(() => {
    getShareCode(Number(roomId)).then((res) => {
      const shareCode = res.shareCode;
      setLink(`https://t-link.site/user/roomlist/invite/${roomId}/${shareCode}`);
      setModalOpen(true);
    });
  }, []);

  useEffect(() => {
    console.log(link);
  }, [link]);

  return (
    <div className="flex py-5 flex-col h-full justify-center items-center ">
      {modalOpen && (
        <Modal>
          <ShareLinkModal setModalOpen={setModalOpen} shareLink={link} nav={true} />
        </Modal>
      )}
    </div>
  );
};

export default ShareCode;
