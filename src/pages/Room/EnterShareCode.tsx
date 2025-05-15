import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import EnterCodeModal from '../../components/Modal/EnterCodeModal';

const EnterShareCode = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    if (!modalOpen) navigate(-1);
  }, [modalOpen]);

  return (
    <>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <EnterCodeModal />
        </Modal>
      )}
    </>
  );
};

export default EnterShareCode;
