import { useNavigate, useParams } from 'react-router-dom';
import AddFile from '../../components/Material/AddFile';
import LongButton from '../../components/Common/LongButton';
import Input from '../../components/RoomDetail/Input';
import PickDate from '../../components/RoomDetail/PickDate';
import { useEffect, useState } from 'react';
import { getHomeworkInfo, patchHomework } from '../../api/homework.api';
import { HomeworkFile, HomeworkFileBoxDetail } from '../../models/homework.model';
import FileList from '../../components/Material/FileList';
import Container from '../../components/Common/Container';

const EditHomework = () => {
  const { roomId, homeworkId } = useParams<{ roomId: string; homeworkId: string }>();
  const [homeworkList, setHomeworkList] = useState<HomeworkFileBoxDetail>();
  const [description, setDescription] = useState<string>(homeworkList?.homeworkName || '');
  const [deadline, setDeadline] = useState<string>(homeworkList?.deadline || '');
  const [fileList, setFileList] = useState<HomeworkFile[]>([]); // 기존 파일 이름 목록
  const [addList, setAddList] = useState<File[]>([]); // 추가하는 파일 목록 (File 형식의 객체)
  const [removeList, setRemoveList] = useState<number[]>([]); // 삭제 하는 파일 목록
  const userRole = localStorage.getItem('roleInfo');
  const nav = useNavigate();

  useEffect(() => {
    getHomeworkDetail();
  }, [roomId, homeworkId]);

  // 수정을 위한 상세 조회
  const getHomeworkDetail = async () => {
    const response = await getHomeworkInfo(roomId!, homeworkId!);
    setHomeworkList(response.data);
    setDeadline(response.data.deadline);
    setDescription(response.data.homeworkName);
    setFileList(response.data.homeworkFiles); // 기존 파일들 저장
  };

  // 수정 완료
  const handleSubmit = async () => {
    const payload = {
      homeworkName: description,
      deadline: deadline,
      addHomeworkFiles: addList,
      removeHomeworkFiles: removeList,
    };

    await patchHomework(roomId!, homeworkId!, payload);
    nav(-1);
  };

  const isAble = userRole == 'TEACHER' ? true : false;
  const text = userRole == 'TEACHER' ? '수정 완료' : '숙제 제출하기';

  // 기존 파일 삭제
  const handleFileDelete = (file: HomeworkFile, index: number) => {
    removeList.push(file.homeworkFileId!);
    console.log(removeList);
    setFileList(fileList.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 py-4">
        <Input
          setDesc={setDescription}
          desc={description}
          name="숙제명"
          placeholder="숙제명을 입력해주세요"
          isAble={isAble}
        />
        <PickDate
          deadline={deadline}
          setDeadline={setDeadline}
          isAble={isAble}
          text="숙제 마감 날짜를 선택하세요."
          name="숙제 마감 날짜"
        />
        {fileList.length > 0 && (
          <FileList files={fileList} onDelete={handleFileDelete} type={false} />
        )}
        <AddFile setFileList={setAddList} fileList={addList} />
        {/* 버튼 */}
        <LongButton
          enable={!!(description.length > 0 && deadline.length > 0)}
          onClick={handleSubmit}
          text={text}
        />
      </div>
    </Container>
  );
};

export default EditHomework;
