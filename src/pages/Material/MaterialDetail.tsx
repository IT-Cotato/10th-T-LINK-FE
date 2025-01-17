import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../api/axios';

interface File {
  lectureFileId: number;
  originalName: string;
  fileUrl: string;
}

const MaterialDetail = () => {
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
      //   const response = await instance.get(`/api/v1/rooms/${roomId}/lectureFileBoxes/${materialId}`);
      //   if (response.status == 200) {
      //     setName(response.data.lectureFileBoxName);
      //     setLectureFiles(response.data.lectureFiles || []);
      //   }
    } catch (error) {
      console.log('강의 자료 페이지를 불러오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
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
    </div>
  );
};

export default MaterialDetail;
