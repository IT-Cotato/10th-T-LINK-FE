import { useState } from 'react';
import Input from '../Room/Input';
import { postGrade, postTest } from '../../api/statistics.api';
import { useParams } from 'react-router-dom';
import { patchMessage } from '../../api/mypage.api';

interface ModalProps {
  setModalOpen: (value: boolean) => void;
  type: string;
  id?: number;
}

export interface GradeType {
  examName: string;
  grade: number;
}

const CreateModal = ({ setModalOpen, type, id }: ModalProps) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [test, setTest] = useState('');
  const { roomId } = useParams<{ roomId: string }>();
  const [msg, setMsg] = useState('');

  const handleCreate = () => {
    if (type == '시험') {
      postTest(roomId!, test).then((data) => {
        setModalOpen(false);
      });
    } else if (type == '성적') {
      const payload = { examName: name, grade: parseInt(grade) };
      postGrade(roomId!, id?.toString()!, payload).then((data) => {
        console.log(data);
        setModalOpen(false);
      });
    } else {
      patchMessage(msg).then((data) => {
        setModalOpen(false);
      });
    }
  };

  return (
    <div className="w-[320px] p-4 flex flex-col rounded-2xl items-center justify-center gap-6 bg-white">
      <div className="flex flex-col gap-2 items-center text-center">
        <p className="text-[18px] font-semibold">{type !== '상태메세지' ? `${type} 추가하기` : `${type} 수정`}</p>
        {type == '시험' ? (
          <p className="text-body4 text-gray-600 leading-[25px] tracking-[-0.042px]">
            시험명을 입력하면
            <br /> 새로운 성적 통계 그래프를 만들 수 있어요!
          </p>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-col gap-[10px] pb-8 w-full">
        {type == '시험' ? (
          <Input placeholder="시험 종류를 입력해주세요" name="시험 종류" desc={test} setDesc={setTest} isAble={true} />
        ) : type == '성적' ? (
          <>
            <Input
              placeholder="시험 이름을 입력해주세요"
              name="시험 이름"
              desc={name}
              setDesc={setName}
              isAble={true}
            />
            <Input
              placeholder="시험에서 받은 점수를 입력해주세요"
              name="점수"
              desc={grade}
              setDesc={setGrade}
              isAble={true}
            />
          </>
        ) : (
          <Input placeholder="상태메세지를 입력해주세요" name="" desc={msg} setDesc={setMsg} isAble={true} />
        )}
      </div>
      <div className="w-full justify-between flex gap-3">
        <button
          className="flex-1 py-[14px] bg-primary_700 text-white rounded-[4px] box-border text-center"
          onClick={handleCreate}
        >
          {type !== '상태메세지' ? '추가하기' : '수정하기'}
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
