import { FaRegFileAlt } from 'react-icons/fa';
import vector_gray from '../../assets/images/vector_gray.png';
import { RiDownloadLine } from 'react-icons/ri';
import { downloadFile } from '../../utils/DownloadFiles';
import { FiTrash2 } from 'react-icons/fi';

interface FileDetailProps {
  title: string;
  fileUrl?: string;
  onDelete?: () => void;
}

const FileDetail = ({ title, fileUrl, onDelete }: FileDetailProps) => {
  return (
    <div className="p-5 flex gap-3 items-center bg-gray-100 rounded-lg">
      <div className="p-1">
        <FaRegFileAlt size={24} fill="#242421" />
      </div>
      <div className="flex gap-4 items-center flex-1 overflow-hidden">
        <img src={vector_gray} className="w-[3px] h-[24px]" />
        <p className="truncate tracking-[-0.048px] text-body3 font-semibold leading-7 text-gray-900">
          {title}
        </p>
      </div>
      <div>
        {fileUrl ? (
          <RiDownloadLine size={22} fill="#242421" onClick={() => downloadFile(fileUrl)} />
        ) : (
          <FiTrash2 size={22} onClick={onDelete} />
        )}
      </div>
    </div>
  );
};

export default FileDetail;
