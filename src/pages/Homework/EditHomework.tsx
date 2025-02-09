import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddFile from '../../components/AddFile';
import LongButton from '../../components/LongButton';
import Input from '../../components/Room/Input';
import PickDate from '../../components/Room/PickDate';
import { useEffect, useState } from 'react';
import { getHomeworkInfo } from '../../api/homework.api';
import { HomeworkFile } from '../../models/homework.model';

const EditHomework = () => {
  const { roomId, homeworkId } = useParams<{ roomId: string; homeworkId: string }>();
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const nav = useNavigate();
  const [fileList, setFileList] = useState<File[]>([]); // 파일 이름 목록
  const [homeworkList, setHomeworkList] = useState<HomeworkFile[]>([]); // 파일 이름 목록
  const userRole = localStorage.getItem('roleInfo');

  useEffect(() => {
    const getHomeworkDetail = async () => {
      try {
        setDescription('숙제명숙제명');
        setDeadline('2025.04.05');

        const data = await getHomeworkInfo(roomId!, homeworkId!);
        if (data.status == 200) {
          setDescription(data.homeworkName);
          setDeadline(data.deadline);
          setHomeworkList(data.homeworkFiles);
        }
      } catch (error) {
        console.log('숙제 상세 페이지를 불러오는데 실패했습니다.', error);
      }
    };
    getHomeworkDetail();
  }, [roomId, homeworkId]);

  const handleSubmit = () => {};
  const isAble = userRole == 'TEACHER' ? true : false;

  return (
    <div className="px-4 flex flex-col h-full">
      {/* 날짜 고르기 */}
      <PickDate deadline={deadline} setDeadline={setDeadline} isAble={isAble} />
      {/* 파일첨부 */}
      <div className="py-4 gap-6 flex flex-col">
        <Input
          setDesc={setDescription}
          desc={description}
          name="숙제명"
          placeholder="숙제명을 입력해주세요"
          isAble={isAble}
        />
        <AddFile setFileList={setFileList} fileList={fileList} />
      </div>
      {/* 버튼 */}
      <div className="py-6 mt-auto">
        <LongButton
          enable={!!(fileList.length > 0 && description.length > 0 && deadline.length > 0)}
          onClick={handleSubmit}
          text="수정 완료"
        />
      </div>
    </div>
  );
};

export default EditHomework;
