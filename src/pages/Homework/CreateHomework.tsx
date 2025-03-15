import { ChangeEvent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadHomework } from '../../api/homework.api';
import LongButton from '../../components/Common/LongButton';

import AddFile from '../../components/Material/AddFile';
import Input from '../../components/RoomDetail/Input';
import PickDate from '../../components/RoomDetail/PickDate';

const CreateHomework = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const nav = useNavigate();
  const [fileList, setFileList] = useState<File[]>([]); // 파일 목록
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
      const response = await uploadHomework(roomId!, payload);
      if (response.status == 201) {
        nav(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 flex flex-col h-full">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">
          업로드 숙제의 정보를 입력하세요.
        </p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          언제든지 수정할 수 있어요!
        </p>
      </div>
      <div className="flex flex-col gap-[6px]">
        <div className="text-body4 leading-[26px] font-medium flex gap-1">
          <span className="text-gray-900">숙제 마감 날짜</span>
          <span className="text-primary_700">(필수)</span>
        </div>
        {/* 날짜 고르기 */}
        <PickDate
          deadline={deadline}
          setDeadline={setDeadline}
          isAble={true}
          text="날짜를 선택해주세요."
          name=""
        />
      </div>
      {/* 파일첨부 */}
      <div className="py-4 gap-6 flex flex-col">
        <Input
          setDesc={setDesc}
          desc={desc}
          name="숙제명"
          placeholder="숙제명을 입력해주세요"
          isAble={true}
        />
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
