import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InviteModal from '../../components/Modal/InviteModal';
import Modal from '../../components/Modal/Modal';

const Invite = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    if (!modalOpen) navigate(-1);
  }, [modalOpen]);

  return (
    <div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <InviteModal />
        </Modal>
      )}
    </div>
  );
};

export default Invite;
