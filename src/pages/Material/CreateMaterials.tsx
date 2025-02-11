import { ChangeEvent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadLectureFile } from '../../api/materials.api';
import LongButton from '../../components/LongButton';
import AddFile from '../../components/AddFile';
import Input from '../../components/Room/Input';

const CreateMaterials = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [fileList, setFileList] = useState<File[]>([]); // 파일 이름 목록
  const [desc, setDesc] = useState<string>(''); // 강의 자료 설명
  const nav = useNavigate();

  // 강의 자료 설명 있는지 확인
  const validateForm = (): boolean => {
    if (!desc.trim()) {
      alert('강의자료 설명을 입력해주세요');
      return false;
    }

    return true;
  };

  // 업로드 하기
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      lectureFileBoxName: desc,
      lectureFiles: fileList,
    };

    // api 호출
    try {
      const response = await uploadLectureFile(roomId!, payload);
      if (response.status == 201) {
        nav(-1);
      }
    } catch (error) {
      console.log('강의 자료 업로드 실패', error);
    }
  };

  return (
    <div className="px-4 flex flex-col h-full">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">업로드 할 자료의 정보를 입력하세요.</p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">언제든지 수정할 수 있어요!</p>
      </div>
      {/* 파일첨부 */}
      <div className="py-4 gap-6 flex flex-col">
        <Input setDesc={setDesc} name="자료명" placeholder="자료명을 입력해주세요" desc={desc} isAble={true} />
        <AddFile fileList={fileList} setFileList={setFileList} />
      </div>

      <div className="py-6 mt-auto">
        <LongButton enable={!!(fileList.length > 0 && desc.length > 0)} onClick={handleSubmit} text="업로드 하기" />
      </div>
    </div>
  );
};

export default CreateMaterials;
