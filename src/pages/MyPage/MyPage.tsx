import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import LogoutModal, { MODAL_TYPE } from '../../components/Modal/LogoutModal';
import { getUserInfo } from '../../api/mypage.api';
import CreateModal from '../../components/Modal/CreateModal';
import RoleSection from '../../components/MyPage/RoleSection';
import { MyPageUserInfo } from '../../models/user.model';
import ProfileSection from '../../components/MyPage/ProfileSection';
import UserInfoSection from '../../components/MyPage/UserInfoSection';
import SettingsSection from '../../components/MyPage/SettingsSection';

const MyPage = () => {
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<MyPageUserInfo>({
    username: '',
    role: '',
    statusMessage: '',
    phoneNumber: '',
    profileUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800',
  });

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, [messageOpen]);

  return (
    <div>
      {/* 학생/학부모/선생님 구분 */}
      <RoleSection userInfo={userInfo} />
      {/* 프로필 */}
      <ProfileSection userInfo={userInfo} onEdit={() => setMessageOpen(true)} />
      {/* 내 정보 */}
      <UserInfoSection userInfo={userInfo} />
      {/* 이용약관 및 로그아웃 */}
      <SettingsSection onLogout={() => setModalOpen(true)} onTerms={() => nav('terms')} />
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <LogoutModal setModalOpen={setModalOpen} type={MODAL_TYPE.LOGOUT} />
        </Modal>
      )}
      {messageOpen && (
        <Modal onClose={() => setMessageOpen(false)}>
          <CreateModal
            setModalOpen={setMessageOpen}
            type={'상태메세지'}
            message={userInfo.statusMessage}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyPage;
