import { HomeworkFile } from '../../models/homework.model';
import FileDetail from './FileDetail';

interface FileListProps {
  files: HomeworkFile[] | undefined;
  onDelete?: (file: HomeworkFile, index: number) => void;
  type?: boolean; // false면 삭제 버튼이 있어야함 -> fileURL 넘기지 말것.
}

const FileList = ({ files, onDelete, type }: FileListProps) => {
  return (
    <div className="mt-2 mb-4 gap-2 flex flex-col">
      {files?.map((file, index) => {
        const fileDetailProps = {
          title: file.originalName,
          ...(type !== false ? { fileUrl: file.fileUrl ?? '' } : {}), // fileUrl이 있을 때만 전달
          ...(onDelete ? { onDelete: () => onDelete(file, index) } : {}), // onDelete가 있을 때만 전달
        };
        return <FileDetail key={file.homeworkFileId} {...fileDetailProps} />;
      })}
    </div>
  );
};

export default FileList;
