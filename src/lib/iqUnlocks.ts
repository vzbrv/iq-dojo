import { MOCK_BASE_ACCOUNT } from "./mockBaseAccount";

export const REQUIRED_IQ_BALANCE = 1000;
export const SIMULATED_IQ_BALANCE = MOCK_BASE_ACCOUNT.iqBalance;
export const SIMULATED_ADDRESS = MOCK_BASE_ACCOUNT.address;

export async function checkIQHolderStatus(address: string) {
  // TODO: implement with wagmi/viem readContract after Base integration
  return address === SIMULATED_ADDRESS && SIMULATED_IQ_BALANCE >= REQUIRED_IQ_BALANCE;
}
