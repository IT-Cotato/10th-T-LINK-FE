import { HomeworkFile } from '../../models/homework.model';
import FileDetail from './FileDetail';

interface FileListProps {
  files: HomeworkFile[] | undefined;
}

const FileList = ({ files }: FileListProps) => {
  return (
    <div className="mt-2 mb-4 mx-4 gap-2 flex flex-col">
      {files?.map((file) => (
        <div>
          <FileDetail title={file.originalName} fileUrl={file.fileUrl} key={file.homeworkFileId} />
        </div>
      ))}
    </div>
  );
};

export default FileList;
