// 전화번호 11자리에서 010-0000-0000 형식으로 변환
export const formatPhoneNumber = (phoneNumber: string) => {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.length === 11) {
    return cleanNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phoneNumber;
};
