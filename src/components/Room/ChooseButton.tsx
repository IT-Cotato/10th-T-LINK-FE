import Happy from '../../assets/images/Counseling/happy.svg?react';
import HappyActive from '../../assets/images/Counseling/happy copy.svg?react';
import Sad from '../../assets/images/Counseling/Sad.svg?react';
import SadActive from '../../assets/images/Counseling/Sad copy.svg?react';
import Rofl from '../../assets/images/Counseling/Rofl.svg?react';
import RoflActive from '../../assets/images/Counseling/Rofl copy.svg?react';
import Check from '../../assets/images/Counseling/Check_ring.svg?react';
import CheckActive from '../../assets/images/Counseling/Check_ring copy.svg?react';
import No from '../../assets/images/Counseling/Close_round.svg?react';
import NoActive from '../../assets/images/Counseling/Close_round copy.svg?react';

import { useEffect, useState } from 'react';

interface ChooseButtonProps {
  text: string;
  type: string;
  setEngagement?: (value: string) => void;
  engagement?: string;
  homeworkSubmitted?: boolean | null;
  setHomeworkSubmitted?: (value: boolean) => void;
  isAble: boolean;
}

const ChooseButton = ({
  text,
  type,
  setEngagement,
  setHomeworkSubmitted,
  engagement,
  homeworkSubmitted,
  isAble,
}: ChooseButtonProps) => {
  const [selectedValue, setSelectedValue] = useState<string | boolean | null>(null);

  useEffect(() => {
    if (engagement) {
      setSelectedValue(engagement);
    } else if (homeworkSubmitted == false || homeworkSubmitted == true) {
      setSelectedValue(homeworkSubmitted);
    }
  }, []);

  const engage = [
    { icon: <Sad />, active: <SadActive />, value: '하', id: 1 },
    { icon: <Happy />, active: <HappyActive />, value: '중', id: 2 },
    { icon: <Rofl />, active: <RoflActive />, value: '상', id: 3 },
  ];
  const homework = [
    { icon: <No />, active: <NoActive />, value: false, id: 4 },
    { icon: <Check />, active: <CheckActive />, value: true, id: 5 },
  ];

  const icons = type == 'engage' ? engage : homework;

  const handleChoose = (value: string | boolean) => {
    if (!isAble) {
      return;
    }
    if (selectedValue == value && type == 'homework') {
      setSelectedValue(null);
      return;
    }
    setSelectedValue(value);
    if (type == 'engage' && setEngagement) {
      setEngagement(value as string);
    } else if (setHomeworkSubmitted) {
      setHomeworkSubmitted(value as boolean);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body4 gap-1 flex items-center">
        <span className="font-medium leading-[26px]">{text}</span>
        {type == 'homework' ? (
          <span className="leading-[25px] text-gray-500">(선택)</span>
        ) : (
          <span className="leading-[25px] text-primary_700">(필수)</span>
        )}
      </div>
      <div className="flex gap-4">
        {icons.map((icon) => (
          <div
            className={`w-10 h-10 rounded-full p-2 ${selectedValue == icon.value ? 'bg-primary_700' : 'bg-gray-100'}`}
            onClick={() => handleChoose(icon.value)}
            key={icon.id}
          >
            {selectedValue == icon.value ? icon.active : icon.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseButton;
