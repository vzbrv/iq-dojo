export interface MockBaseAccount {
  address: string;
  network: "Base";
  iqBalance: number;
}

export const MOCK_BASE_ACCOUNT: MockBaseAccount = {
  address: "0xIQ...Dojo",
  network: "Base",
  iqBalance: 2500,
};

export async function connectMockBaseAccount() {
  await new Promise(resolve => setTimeout(resolve, 350));
  return MOCK_BASE_ACCOUNT;
}
