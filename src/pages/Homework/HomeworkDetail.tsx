import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHomeworkDeatil } from '../../api/homework.api';
import { HomeworkFile } from '../../models/homework.model';

const HomeworkDetail = () => {
  const { roomId, homeworkId } = useParams<{ roomId: string; homeworkId: string }>();
  const [description, setDescription] = useState<string>('');
  const [teacherFiles, setTeacherFiles] = useState<HomeworkFile[]>([]);
  const [studentFiles, setStudentFiles] = useState<HomeworkFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getHomeworkDetail();
  }, [roomId, homeworkId]);

  // 숙제 상세 조회
  const getHomeworkDetail = async () => {
    setLoading(true);
    try {
      const data = await getHomeworkDeatil(roomId!, homeworkId!);

      setDescription(data.description);
      setTeacherFiles(data.teacherFiles || []);
      setStudentFiles(data.studentFiles || []);
    } catch (error) {
      console.log('숙제 상세 페이지를 불러오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>숙제</h1>
      <p>{description}</p>
      <h2>선생님이 올린 파일</h2>
      <ul>
        {teacherFiles.map((file) => (
          <li>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
              {file.originalName}
            </a>
          </li>
        ))}
      </ul>
      <h2>학생이 올린 파일</h2>
      <ul>
        {studentFiles.map((file) => (
          <li>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
              {file.originalName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeworkDetail;
