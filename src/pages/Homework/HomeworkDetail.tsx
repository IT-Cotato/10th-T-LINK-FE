import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHomeworkDeatil } from '../../api/homework.api';
import { HomeworkFile } from '../../models/homework.model';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';

const HomeworkDetail = () => {
  const { roomId, homeworkId } = useParams<{ roomId: string; homeworkId: string }>();
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [teacherFiles, setTeacherFiles] = useState<HomeworkFile[]>([]);
  const [studentFiles, setStudentFiles] = useState<HomeworkFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();

  const userRole = localStorage.getItem('roleInfo');

  // 숙제 상세 조회
  useEffect(() => {
    const getHomeworkDetail = async () => {
      setLoading(true);
      try {
        setDescription('숙제명숙제명');
        setDeadline('2025.04.05');
        // const data = await getHomeworkDeatil(roomId!, homeworkId!);
        // setDescription(data.description);
        // setTeacherFiles(data.teacherFiles || []);
        // setStudentFiles(data.studentFiles || []);
      } catch (error) {
        console.log('숙제 상세 페이지를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    getHomeworkDetail();
  }, [roomId, homeworkId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="py-4 px-4">
        <div className="flex items-center justify-between">
          <p className="text-heading6 font-bold leading-10 text-gray-900">{description}</p>
          {userRole == 'TEACHER' ? <Edit onClick={() => nav(`edit`)} /> : ''}
        </div>
        <p className="text-body4 font-normal leading-7 tracking-[-0.048px] text-gray-600">마감날짜 {deadline}</p>
      </div>
      <div className="bg-gray-100 h-[100px] rounded-lg mt-2 mb-6 mx-4">
        <ul>
          {teacherFiles.map((file) => (
            <li>
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                {file.originalName}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4 px-4 border-t-2 border-gray-100">
        <p className="text-heading6 font-bold leading-10 text-gray-900">제출한 숙제</p>
        <p className="text-body4 font-normal leading-7 tracking-[-0.048px] text-gray-600">학생이 업로드한 숙제예요.</p>
      </div>
      <div className="bg-gray-100 h-[100px] rounded-lg mt-2 mb-6 mx-4">
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
    </div>
  );
};

export default HomeworkDetail;
