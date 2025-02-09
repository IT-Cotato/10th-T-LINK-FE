import { ChangeEvent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { uploadHomework } from '../../api/homework.api';
import LongButton from '../../components/LongButton';

import AddFile from '../../components/AddFile';
import Input from '../../components/Room/Input';
import PickDate from '../../components/Room/PickDate';

const CreateHomework = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [fileList, setFileList] = useState<File[]>([]); // 파일 이름 목록
  const [deadline, setDeadline] = useState<string>(''); // 선택된 숙제 마감 날짜
  const [desc, setDesc] = useState<string>(''); // 숙제 설명

  // 마감날짜와 설명 있는지 확인
  const validateForm = (): boolean => {
    if (!deadline) {
      alert('마감 날짜를 선택해주세요');
      return false;
    }

    if (!desc.trim()) {
      alert('숙제 설명을 입력해주세요');
      return false;
    }

    return true;
  };

  // 숙제 업로드
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      homeworkName: desc,
      deadline: deadline,
      homeworkFiles: fileList,
    };

    try {
      const data = await uploadHomework(roomId!, payload);
      console.log('숙제 업로드 성공:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 flex flex-col h-full">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">업로드 숙제의 정보를 입력하세요.</p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">언제든지 수정할 수 있어요!</p>
      </div>
      {/* 날짜 고르기 */}
      <PickDate deadline={deadline} setDeadline={setDeadline} isAble={true} />
      {/* 파일첨부 */}
      <div className="py-4 gap-6 flex flex-col">
        <Input setDesc={setDesc} desc={desc} name="숙제명" placeholder="숙제명을 입력해주세요" isAble={true} />
        <AddFile setFileList={setFileList} fileList={fileList} />
      </div>
      {/* 버튼 */}
      <div className="py-6 mt-auto">
        <LongButton
          enable={!!(fileList.length > 0 && desc.length > 0 && deadline.length > 0)}
          onClick={handleSubmit}
          text="업로드 하기"
        />
      </div>
    </div>
  );
};

export default CreateHomework;
