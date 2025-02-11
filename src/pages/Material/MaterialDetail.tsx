import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../api/axios';
import { deleteLectureFile } from '../../api/materials.api';

interface File {
  lectureFileId: number;
  originalName: string;
  fileUrl: string;
}

const MaterialDetail = () => {
  const nav = useNavigate();
  const { roomId, materialId } = useParams<{ roomId: string; materialId: string }>();
  const [name, setName] = useState<string>('');
  const [lectureFiles, setLectureFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMaterialDetail();
  }, [roomId, materialId]);

  const getMaterialDetail = async () => {
    setLoading(true);
    try {
      // mock data
      setName('쎈 2-1');
      setLectureFiles([
        {
          lectureFileId: 1,
          originalName: '쎈 2-1',
          fileUrl: 'https://cyber.ewha.ac.kr/mod/resource/view.php?id=2294701',
        },
      ]);
      //   const data = await getLectureFileDeatil(roomId!, materialId!)
      //     setName(data.lectureFileBoxName);
      //     setLectureFiles(data.lectureFiles || []);
    } catch (error) {
      console.log('강의 자료 페이지를 불러오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteLectureFile(roomId!, materialId!);
      if (response.status == 200) {
        console.log('강의자료가 삭제되었습니다.');
        nav(-1);
      }
    } catch (error) {
      console.log('강의 자료 삭제 실패', error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>1주차 강의자료</h1>
      <p>{name}</p>
      <h2>강의 자료 파일들</h2>
      <ul>
        {lectureFiles.map((file) => (
          <li>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {file.originalName}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={handleDelete} className="bg-primary_400">
        삭제
      </button>
    </div>
  );
};

export default MaterialDetail;
