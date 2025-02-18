import { useState } from 'react';
import Input from '../Room/Input';

interface ModalProps {
  setModalOpen: (value: boolean) => void;
}

const CreateModal = ({ setModalOpen }: ModalProps) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  return (
    <div className="w-[320px] p-4 flex flex-col rounded-2xl items-center justify-center gap-6 bg-white">
      <p className="text-[18px] font-semibold">성적 추가하기</p>
      <div className="flex flex-col gap-[10px] pb-8 w-full">
        <Input placeholder="시험 이름을 입력해주세요" name="시험 이름" desc={name} setDesc={setName} isAble={true} />
        <Input
          placeholder="시험에서 받은 점수를 입력해주세요"
          name="점수"
          desc={grade}
          setDesc={setGrade}
          isAble={true}
        />
      </div>
      <div className="w-full justify-between flex gap-3">
        <button className="flex-1 py-[14px] bg-primary_700 text-white rounded-[4px] box-border text-center">
          추가하기
        </button>
        <button
          className="flex-1 py-[14px] bg-white border-gray-500 border-[1px] text-gray-950 rounded-[4px] box-border text-center"
          onClick={() => setModalOpen(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default CreateModal;
