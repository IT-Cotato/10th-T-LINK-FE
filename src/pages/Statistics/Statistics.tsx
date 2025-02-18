import { useState } from 'react';
import SubjectTag from '../../components/SubjectTag';
import Chart from '../../components/Chart';
import StatisticsButton from '../../components/StatisticsButton';

const Statistics = () => {
  // const [tags, setTags] = useState([{ id: 0, title: '전체', isClicked: true }]);
  const [tags, setTags] = useState([
    { id: 0, title: '국어', isClicked: true },
    { id: 1, title: '수학', isClicked: false },
    { id: 2, title: '영어', isClicked: false },
  ]);
  const [selectedTag, setSelectedTag] = useState(0);

  const onClickTag = (id: number, title: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        isClicked: tag.id === id,
      })),
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* 시험 종류 */}
      <div className="py-4 flex flex-col gap-[6px] px-4">
        <p className="text-body4 font-medium leading-[26px] tracking-[-0.042px] ">시험 종류</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <SubjectTag key={tag.id} tag={tag} onClick={onClickTag} isNoSharp={true} />
          ))}
        </div>
      </div>
      {/* 그래프 */}
      <div className="flex flex-col pt-4 pb-6 rounded-lg bg-gray-50 w-full justify-center items-center px-4 gap-6">
        <h1 className="text-body2 font-semibold leading-8 tracking-[-0.18px]">시험 종류명</h1>
        <div className="w-full h-full">
          <Chart />
        </div>
        <div>
          <StatisticsButton />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
