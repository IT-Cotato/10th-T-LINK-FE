import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import ShareLinkModal from '../../components/Modal/ShareLinkModal';
import { getShareCode } from '../../api/roomList.api';
import { getUserInfo } from '../../api/mypage.api';

const ShareCode = () => {
  const location = useLocation();
  const roomId = location.state.roomId;
  const [modalOpen, setModalOpen] = useState(true);
  const [link, setLink] = useState('');

  useEffect(() => {
    getUserInfo().then((userRes) => {
      getShareCode(Number(roomId)).then((codeRes) => {
        const shareCode = codeRes.shareCode;
        setLink(
          `${userRes.username} 선생님이 참여 코드를 보내셨어요!
아래 링크로 들어가서 참여 코드를 입력해주세요.
https://t-link.site/user/roomlist/invite/${roomId}
참여 코드: ${shareCode}`,
        );
        setModalOpen(true);
      });
    });
  }, []);

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
