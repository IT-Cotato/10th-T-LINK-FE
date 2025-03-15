import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import link from '../../assets/images/link.png';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ShareLinkProps {
  setModalOpen: (value: boolean) => void;
  shareLink: string;
  nav: boolean;
}

const ShareLinkModal = ({ setModalOpen, shareLink, nav }: ShareLinkProps) => {
  const navigation = useNavigate();
  const [toast, setToast] = useState(false);

  const handleCopy = async () => {
    setToast(true);
    setTimeout(() => {
      nav ? navigation('/user/roomlist') : setModalOpen(false);
    }, 700);
  };

  return (
    <>
      <div className="w-[320px] p-4 flex flex-col rounded-2xl items-center justify-center gap-8 bg-white">
        <div className="flex flex-col items-center">
          <p className="font-semibold text-lg leading-8">과외방 링크</p>
          <p className="font-normal text-sm leading-[22px] text-gray-600">
            학생에게 참여 링크를 공유해주세요.
          </p>
        </div>
        <CopyToClipboard text={shareLink} onCopy={handleCopy}>
          <button className="flex flex-col items-center gap-1">
            <div className="bg-gray-50 rounded-full p-2 ">
              <img src={link} className="w-8 h-8" />
            </div>
            <p className="text-gray-500 text-xs font-normal leading-[22px]">링크 복사하기</p>
          </button>
        </CopyToClipboard>
        <button
          className="flex-1 w-full text-[16px] font-semibold py-[14px] bg-white border border-gray-500 rounded-full box-border text-center"
          onClick={() => (nav ? navigation('/user/roomlist') : setModalOpen(false))}
        >
          완료
        </button>
      </div>

      {toast && <Toast setToast={setToast} title="클립보드에 복사되었습니다." />}
    </>
  );
};

export default ShareLinkModal;
