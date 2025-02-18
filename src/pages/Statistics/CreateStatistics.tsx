import { useState } from 'react';
import SubjectTag from '../../components/SubjectTag';
import Table from '../../components/Table';

const CreateStatistics = () => {
  const [tags, setTags] = useState([
    { id: 0, title: '국어', isClicked: true },
    { id: 1, title: '수학', isClicked: false },
    { id: 2, title: '영어', isClicked: false },
  ]);

  const onClickTag = (id: number, title: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        isClicked: tag.id === id,
      })),
    );
  };

  return (
    <div className="flex flex-col px-4">
      {/* 설명 */}
      <div className="py-4">
        <p className="text-heading6 font-bold leading-10 text-gray-900">성적을 추가해보세요.</p>
        <p className="text-body3 font-normal leading-7 tracking-[-0.048px] text-gray-600">
          시험 성적을 추가하고 그래프를 확인해보세요!
        </p>
      </div>
      {/* 시험 종류 */}
      <div className="py-4 flex flex-col gap-[6px]">
        <p className="text-body4 font-medium leading-[26px] tracking-[-0.042px] ">시험 종류</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <SubjectTag key={tag.id} tag={tag} onClick={onClickTag} />
          ))}
        </div>
      </div>
      {/* 그래프 */}
      <div className="py-4">
        <Table />
      </div>
    </div>
  );
};

export default CreateStatistics;
