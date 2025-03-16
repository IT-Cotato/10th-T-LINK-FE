import { HomeworkFile } from '../../models/homework.model';
import { LectureFile } from '../../models/materials.model';
import FileDetail from './FileDetail';

interface FileListProps<T> {
  files: T[] | undefined;
  onDelete?: (file: T, index: number) => void;
  type?: boolean;
}

const FileList = <T extends HomeworkFile | LectureFile>({
  files,
  onDelete,
  type,
}: FileListProps<T>) => {
  return (
    <div className="mt-2 mb-4 gap-2 flex flex-col">
      {files?.map((file, index) => {
        const fileDetailProps = {
          title: file.originalName,
          ...(type !== false ? { fileUrl: file.fileUrl ?? '' } : {}), // fileUrl이 있을 때만 전달
          ...(onDelete ? { onDelete: () => onDelete(file, index) } : {}), // onDelete가 있을 때만 전달
        };
        return (
          <FileDetail
            key={(file as HomeworkFile).homeworkFileId || (file as LectureFile).lectureFileId}
            {...fileDetailProps}
          />
        );
      })}
    </div>
  );
};

export default FileList;
