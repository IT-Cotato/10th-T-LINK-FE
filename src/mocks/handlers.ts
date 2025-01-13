import { http, HttpResponse } from 'msw';

interface Homework {
  homeworkId: number;
  createdAt: string;
  description: string;
  deadline: string;
  files: File[];
}

const allHomeworks = new Map<number, Homework>();

export const handlers = [
  // 숙제 생성
  http.post('https://api.t-link.site/api/v1/rooms/:roomId/homeworks', async ({ request, params }) => {
    const { roomId } = params;

    const formData = await request.formData();
    const description = formData.get('description') as string;
    const deadline = formData.get('deadline') as string;
    const files = formData.getAll('homeworkFiles') as File[];

    if (!description || !deadline) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Invalid Request Body',
      });
    }

    // 파일 정보 로그 출력
    files.forEach((file) => {
      console.log('Uploaded File Name:', file.name);
      console.log('Uploaded File Size:', file.size);
    });

    const newHomework: Homework = {
      homeworkId: Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString(),
      description,
      deadline: new Date(deadline).toISOString(),
      files,
    };

    allHomeworks.set(newHomework.homeworkId, newHomework);

    console.log(`Room ${roomId}: New homework added`, newHomework);

    return HttpResponse.json(
      { message: 'Homework added successfully' },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*', // 모든 출처 허용
        },
      },
    );
  }),

  // 숙제 조회
  http.get('https://api.t-link.site/api/v1/rooms/:roomId/homeworks', ({ params }) => {
    const { roomId } = params;

    // `allHomeworks`에서 특정 필드만 추출
    const homeworks = Array.from(allHomeworks.values()).map(({ homeworkId, createdAt, description, deadline }) => ({
      homeworkId,
      createdAt,
      description,
      deadline,
    }));

    console.log(`Room ${roomId}: Returning filtered homeworks`, homeworks);

    return HttpResponse.json(
      { homeworks },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  }),
];
