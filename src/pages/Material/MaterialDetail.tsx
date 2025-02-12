import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLectureFileDeatil } from '../../api/materials.api';
import { LectureFileBoxDetail } from '../../models/materials.model';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';
import { downloadFile } from '../../utils/DownloadFiles';

const MaterialDetail = () => {
  const nav = useNavigate();
  const { roomId, materialId } = useParams<{ roomId: string; materialId: string }>();
  const [lectureFiles, setLectureFiles] = useState<LectureFileBoxDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const userRole = localStorage.getItem('roleInfo');

  useEffect(() => {
    getMaterialDetail();
  }, [roomId, materialId]);

  const getMaterialDetail = async () => {
    setLoading(true);
    try {
      const response = await getLectureFileDeatil(roomId!, materialId!);
      if (response.status == 200) {
        setLectureFiles(response.data);
      }
    } catch (error) {
      console.log('강의 자료 페이지를 불러오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!lectureFiles) {
    return <div>정보를 불러오지 못했습니다</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="py-4 px-4">
        <div className="flex items-center justify-between">
          <p className="text-heading6 font-bold leading-10 text-gray-900">{lectureFiles.lectureFileBoxName}</p>
          {userRole == 'TEACHER' ? <Edit onClick={() => nav(`edit`)} /> : ''}
        </div>
        <p className="text-body4 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          업로드 날짜 {lectureFiles.updatedAt}
        </p>
      </div>
      <div className="bg-gray-100 h-[100px] rounded-lg mt-2 mb-6 mx-4">
        <ul>
          {lectureFiles.lectureFiles.map((file) => (
            <li onClick={() => downloadFile(file.fileUrl)}>{file.originalName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaterialDetail;
