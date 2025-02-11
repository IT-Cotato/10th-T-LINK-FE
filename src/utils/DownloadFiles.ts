// 파일 다운로드 유틸리티 함수
export const downloadFile = async (fileUrl: string) => {
  try {
    const res = await fetch(fileUrl);
    const blob = await res.blob();

    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = fileUrl.split('/').pop() || 'file';
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('파일 다운로드 실패', error);
  }
};
