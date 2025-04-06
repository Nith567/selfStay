import { selfStayContract} from "../contract/abi";
import { walletClient, publicClient } from "@/components/Providers";
import { parseEther } from "viem";
import { WaitForTransactionReceiptData } from "wagmi/query";
import { hashEndpointWithScope, getPackedForbiddenCountries, countries } from "@selfxyz/core";
import { waitForTransactionReceipt } from "viem/actions";

function formatBlockedCountries(countries: string[]): string[] {
  return countries
      .filter(country => country !== '\x00\x00\x00')
      .map(country => country.trim());
}

const identityVerificationHub = "0x3e2487a250e2A7b56c7ef5307Fb591Cc8C83623D";
export async function deployContract(
  account: any,
  identityVerificationHub: string,
  scope: string,
  attestationId: number,
  token: string,
  boysBedPrice: any,
  girlsBedPrice: any,
  boysBeds: any,
  girlsBeds: any,
  forbiddenCountriesEnabled: any,
  forbiddenCountriesListPacked: any,
  ofacEnabled: any
) {
  try {
    const hash = await walletClient.deployContract({
      abi: selfStayContract.abi,
      account: account,
      args: [
        identityVerificationHub,
        scope,
        attestationId,
        token,
        boysBedPrice,
        girlsBedPrice,
        boysBeds,
        girlsBeds,
        forbiddenCountriesEnabled,
        forbiddenCountriesListPacked,
        ofacEnabled
      ],
      bytecode: selfStayContract.bytecode as `0x{string}`,
    });
    const tnx = await publicClient.waitForTransactionReceipt({ hash });
    console.log("gasused", tnx.gasUsed);
    console.log("hashed:deployedcontract", tnx, tnx.contractAddress);

    return tnx.contractAddress;
  } catch (error) {
    console.error("Error submitting contest:", error);
  }

}
