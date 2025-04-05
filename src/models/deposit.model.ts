// 은행 목록 조회
export interface BankInfo {
  bankId: number;
  bankName: string;
  bankUrl: string;

  depositAmount?: string;
  depositAt?: string;
  accountNumber?: string;
}

// 입금일 생성 및 수정 및 조회
export interface DepositInfo {
  bankId?: number;
  accountNumber: string;
  depositAmount: number;
  depositAt: number;
  bankName?: string;
}
