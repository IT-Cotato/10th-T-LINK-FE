import { useNavigate, useParams } from 'react-router-dom';
import AddFile from '../../components/AddFile';
import LongButton from '../../components/LongButton';
import Input from '../../components/Room/Input';
import PickDate from '../../components/Room/PickDate';
import { useEffect, useState } from 'react';
import { getHomeworkInfo, patchHomework } from '../../api/homework.api';
import { HomeworkFile, HomeworkFileBoxDetail } from '../../models/homework.model';
import { downloadFile } from '../../utils/DownloadFiles';

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

  // 수정을 위한 상세 조회
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
      } catch (error) {
        console.log('숙제 상세 페이지를 불러오는데 실패했습니다.', error);
      }
    };
    getHomeworkDetail();
  }, [roomId, homeworkId]);

  // 수정 완료
  const handleSubmit = async () => {
    const payload = {
      homeworkName: description,
      deadline: deadline,
      addHomeworkFiles: addList,
      removeHomeworkFiles: removeList,
    };

    try {
      const data = await patchHomework(roomId!, homeworkId!, payload);
      console.log('숙제 업로드 성공:', data);
      nav(-1);
    } catch (error) {
      console.error(error);
    }
  };
  const isAble = userRole == 'TEACHER' ? true : false;

  // 기존 파일 삭제
  const handleFileDelete = (file: HomeworkFile, index: number) => {
    removeList.push(file.homeworkFileId!);
    console.log(removeList);
    setFileList(fileList.filter((_, i) => i !== index));
  };

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
        <AddFile setFileList={setAddList} fileList={addList} />
      </div>
      <div>
        <p>기존 파일</p>
        <div>
          {fileList.map((file, index) => (
            <div className="flex gap-2">
              <li onClick={() => downloadFile(file.fileUrl)}>{file.originalName}</li>
              <button className="text-red-500" onClick={() => handleFileDelete(file, index)}>
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* 버튼 */}
      <div className="py-6 mt-auto">
        <LongButton
          enable={!!((fileList.length > 0 || addList.length > 0) && description.length > 0 && deadline.length > 0)}
          onClick={handleSubmit}
          text="수정 완료"
        />
      </div>
    </div>
  );
};

export default EditHomework;
