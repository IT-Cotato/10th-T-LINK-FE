import { CounselingLogs } from '../../models/counseling.model';
import Preview_1 from '../Material/Preview_1';

interface CounselingListProps {
  logs: CounselingLogs[];
}

const CounselingList = ({ logs }: CounselingListProps) => {
  return (
    <>
      {logs.map((log) => (
        <Preview_1
          title={log.title}
          updatedAt={log.updatedAt}
          type="counseling"
          id={log.id}
          key={log.id}
        />
      ))}
    </>
  );
};

export default CounselingList;
