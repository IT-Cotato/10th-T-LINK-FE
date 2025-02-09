import { useParams } from 'react-router-dom';
import AddFile from '../../components/AddFile';
import LongButton from '../../components/LongButton';
import Input from '../../components/Room/Input';
import PickDate from '../../components/Room/PickDate';
import { useEffect, useState } from 'react';
import { getHomeworkInfo, patchHomework } from '../../api/homework.api';
import { HomeworkFile, HomeworkFileBoxDetail } from '../../models/homework.model';

const EditHomework = () => {
  const { roomId, homeworkId } = useParams<{ roomId: string; homeworkId: string }>();
  const [homeworkList, setHomeworkList] = useState<HomeworkFileBoxDetail>();
  const [description, setDescription] = useState<string>(homeworkList?.homeworkName || '');
  const [deadline, setDeadline] = useState<string>(homeworkList?.deadline || '');
  const [fileList, setFileList] = useState<HomeworkFile[]>([]); // 기존 파일 이름 목록
  const [list, setList] = useState<File[]>([]);
  const [addList, setAddList] = useState<File[]>([]); // 추가하는 파일 목록 (File 형식의 객체)
  const [removeList, setRemoveList] = useState<string[]>([]); // 삭제 하는 파일 목록
  const userRole = localStorage.getItem('roleInfo');

  useEffect(() => {
    const getHomeworkDetail = async () => {
      try {
        const response = await getHomeworkInfo(roomId!, homeworkId!);
        if (response.status == 200) {
          setHomeworkList(response.data);
          setDeadline(response.data.deadline);
          setDescription(response.data.homeworkName);
          setFileList(response.data.homeworkFiles); // 기존 파일들 저장
        }
        // Mock 데이터로 설정 (예시)
        const mockData = {
          homeworkId: 1,
          homeworkName: '숙제 이름',
          deadline: '2024.07.14',
          homeworkFiles: [
            {
              homeworkFileId: 1,
              originalName: '숙제 자료 이름',
              fileUrl: '{ S3 File URL }',
            },
          ],
        };
        setHomeworkList(mockData);
        setDeadline(mockData.deadline);
        setDescription(mockData.homeworkName);
      } catch (error) {
        console.log('숙제 상세 페이지를 불러오는데 실패했습니다.', error);
      }
    };
    getHomeworkDetail();
  }, [roomId, homeworkId]);

  const handleSubmit = async () => {
    const payload = {
      homeworkName: description,
      deadline: deadline,
      addHomeworkFiles: [],
      removeHomeworkFiles: [],
    };

    try {
      const data = await patchHomework(roomId!, homeworkId!, payload);
      console.log('숙제 업로드 성공:', data);
    } catch (error) {
      console.error(error);
    }
  };
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
        {/* 파일 리스트 정하는 거: 생성에서는 전체였고 수정에서는 받아와서 이름을 비교해야하나? 이건 그냥 File[]임*/}
        <AddFile setFileList={setList} fileList={list} />
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
