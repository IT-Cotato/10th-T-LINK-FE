import { FaRegFileAlt } from 'react-icons/fa';
import vector_gray from '../assets/images/vector_gray.png';
import { RiDownloadLine } from 'react-icons/ri';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllLectureFile } from '../api/materials.api';

interface PreviewProps {
  type: string;
  title: string;
  updatedAt: string;
  id: number;
  onClick?: () => void;
}

const Preview_1 = ({ type, title, updatedAt, id }: PreviewProps) => {
  const nav = useNavigate();
  let date = type == 'materials' ? `업로드 날짜 ${updatedAt}` : `상담 날짜 ${updatedAt}`;
  const { roomId } = useParams<{ roomId: string }>();

  const downloadFiles = async (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    const response = await getAllLectureFile(roomId!, id!);
    if (response.status == 200) {
      console.log('다운로드 성공');
    }
  };

  return (
    <div className="flex gap-3 py-4 items-center" onClick={() => nav(`${id}`)}>
      <div className="p-[6px]">
        <FaRegFileAlt size={24} fill="#242421" />
      </div>
      <div className="flex gap-4 items-center flex-1">
        <img src={vector_gray} className="w-[3px] h-[24px]" />
        <div className="tracking-[-0.048px]">
          <p className="text-body3 font-semibold leading-7 text-gray-900">{title}</p>
          <p className="text-body4 font-normal leading-[25px] text-gray-500">{date}</p>
        </div>
      </div>
      {type == 'materials' ? (
        <div>
          <RiDownloadLine size={22} fill="#242421" onClick={downloadFiles} />
        </div>
      ) : (
        ''
      )}
      <MdKeyboardArrowRight size={28} fill="#C6C4C1" />
    </div>
  );
};

export default Preview_1;
