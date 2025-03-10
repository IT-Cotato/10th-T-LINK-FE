// 검색어&날짜로 목록 필터링

// lectureFileBoxName: Materials 이름
// title: Counseling 제목
export const searchFilter = <T extends { updatedAt?: string; lectureFileBoxName?: string; title?: string }>(
  list: T[], // 필터링할 대상 목록
  options: {
    search?: string; // 검색어
    filterByDate?: boolean; // 날짜 기준 필터링 여부
    filterByTitle?: boolean; // 제목 기준 필터링 여부
  },
) => {
  const { search = '', filterByDate = true, filterByTitle = true } = options;

  return list.filter((item) => {
    if (search) {
      // 날짜 필터링
      if (filterByDate && search.length === 10 && search.includes('.')) {
        return item.updatedAt?.includes(search);
      }
      // 제목 필터링
      if (filterByTitle) {
        const titleToFilter = item.lectureFileBoxName ?? item.title;
        if (titleToFilter) {
          return titleToFilter.toLowerCase().includes(search.toLowerCase());
        }
      }
    }
    return true; // 검색어가 없으면 모든 항목 반환
  });
};
