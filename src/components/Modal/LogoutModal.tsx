import { useEffect, useState } from 'react';
import { postLogout } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

interface LogoutModalProps {
  setModalOpen: (value: boolean) => void;
  type: (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];
}

interface DefaultType {
  text: string;
  buttonText: string;
  onClick: () => void;
}

export const MODAL_TYPE = {
  LOGOUT: 'logout',
  QUIT: 'quit',
} as const;

const LogoutModal = ({ setModalOpen, type }: LogoutModalProps) => {
  const navigate = useNavigate();
  const DEFAULT_TYPE = {
    text: '',
    buttonText: '',
    onClick: () => {},
  };
  const [modalType, setModalType] = useState<DefaultType>(DEFAULT_TYPE);

  useEffect(() => {
    switch (type) {
      case MODAL_TYPE.LOGOUT:
        setModalType({
          text: '로그아웃 하시겠습니까?',
          buttonText: '로그아웃',
          onClick: handleLogOut,
        });
        break;
      case MODAL_TYPE.QUIT:
        setModalType({
          text: '정말 탈퇴 하시겠습니까?',
          buttonText: '탈퇴',
          onClick: handleQuit,
        });
    }
  }, []);

  const handleLogOut = async () => {
    // 로그아웃 로직
    try {
      const res = await postLogout();
      console.log(res);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (e) {
      console.error(e);
    } finally {
      navigate('/');
    }
  };

  const handleQuit = () => {
    // 회원 탈퇴 로직
    console.log('탈퇴');
  };

  return (
    <>
      <div className="w-[320px] p-4 flex flex-col rounded-2xl items-center justify-center gap-8 bg-white">
        <p className="text-[18px] font-semibold">{modalType.text}</p>
        <div className="flex w-full gap-3 text-[16px] font-semibold">
          <button
            className="flex-1 py-[14px] bg-primary_700 text-white rounded-[4px] box-border text-center"
            onClick={modalType.onClick}
          >
            {modalType.buttonText}
          </button>
          <button
            className="flex-1 py-[14px] bg-white text-black border border-gray-500 rounded-[4px] box-border text-center"
            onClick={() => setModalOpen(false)}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
