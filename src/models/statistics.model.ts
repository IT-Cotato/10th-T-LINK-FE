export interface Exam {
  id: number;
  name: string;
}

export interface Grade {
  examId: number;
  examName: string;
  grade: number;
}
