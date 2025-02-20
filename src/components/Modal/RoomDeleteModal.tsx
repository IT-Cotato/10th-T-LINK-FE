import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRoom } from '../../api/roomList.api';
import { deleteHomework } from '../../api/homework.api';
import { deleteCounselingLog } from '../../api/counseling.api';
import { deleteLectureFile } from '../../api/materials.api';
import { deleteGrade, deleteTest } from '../../api/statistics.api';

interface RoomDeleteProps {
  setModalOpen: (value: boolean) => void;
  what: string;
  examBoxId?: number;
  examId?: number;
}

const RoomDeleteModal = ({ setModalOpen, what, examBoxId, examId }: RoomDeleteProps) => {
  const { roomId, homeworkId, counselingId, materialId } = useParams();
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();

  const handleDeleteRoom = async () => {
    if (!roomId) return;
    try {
      const res = await deleteRoom(roomId);
      console.log(res);
      if (res.status === 200) {
        setModalOpen(false);
        navigate('/user/roomlist', { state: { toast: true } });
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleDeleteFiles = async () => {
    if (!roomId || !materialId) return;
    try {
      const res = await deleteLectureFile(roomId, materialId);
      console.log(res);
      if (res.status === 200) {
        setModalOpen(false);
        navigate(`/user/${roomId}/materials`, { state: { toast: true } });
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleDeleteHomework = async () => {
    if (!roomId || !homeworkId) return;
    try {
      const res = await deleteHomework(roomId, homeworkId);
      console.log(res);
      if (res.status === 200) {
        setModalOpen(false);
        navigate(`/user/${roomId}/homework`, { state: { toast: true } });
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleDeleteCounseling = async () => {
    if (!roomId || !counselingId) return;

    try {
      const res = await deleteCounselingLog(roomId, counselingId);
      console.log(res);
      if (res.status === 200) {
        setModalOpen(false);
        navigate(`/user/${roomId}/diary`, { state: { toast: true } });
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleDeleteTest = async () => {
    if (!roomId || !examBoxId) return;

    try {
      const res = await deleteTest(roomId, examBoxId);
      console.log(res);
      if (res.status === 200) {
        setModalOpen(false);
        navigate(`/user/${roomId}/stats`);
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleDeleteGrade = async () => {
    if (!roomId || !examBoxId || !examId) return;

    try {
      const res = await deleteGrade(roomId, examBoxId, examId);
      console.log(res);
      if (res.status === 200) {
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleDelete = () => {
    if (what.includes('과외방')) handleDeleteRoom();
    else if (what.includes('자료')) handleDeleteFiles();
    else if (what.includes('숙제')) handleDeleteHomework();
    else if (what.includes('일지')) handleDeleteCounseling();
    else if (what.includes('시험')) handleDeleteTest();
    else if (what.includes('성적')) handleDeleteGrade();
  };

  return (
    <>
      <div className="w-[320px] p-4 flex flex-col rounded-2xl items-center justify-center gap-8 bg-white">
        <div className="font-semibold text-lg leading-8">
          <p>{what} 삭제하시겠습니까?</p>
          <p>삭제 시 저장하셨던 정보가 사라집니다.</p>
        </div>
        <div className="flex w-full gap-3 text-[16px] font-semibold">
          <button
            className="flex-1 py-[14px] bg-sub1_40 text-white rounded-[4px] box-border text-center"
            onClick={handleDelete}
          >
            삭제
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

export default RoomDeleteModal;
