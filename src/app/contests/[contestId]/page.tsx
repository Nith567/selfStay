"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAccount } from "wagmi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  BaseError,
} from "wagmi";
import { chainQuestContract } from "../../../../contract/abi";
import { publicClient } from "@/components/Providers";
import { parseEther } from "viem";
import { ToastAction } from "@/components/ui/toast";
interface contestParams {
  params: {
    contestId: string;
  };
}
export default function ContestDetails({ params }: contestParams) {
  const [contestData, setContestData] = useState<any>(null);
  const [answer, setAnswer] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { contestId } = params;
  const { toast } = useToast();

  const account = useAccount();
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const estimateFee = async (): Promise<bigint> => {
    const data = await publicClient.readContract({
      address: contestData.contractAddress as `0x${string}`,
      abi: chainQuestContract.abi,
      functionName: "estimateFee",
      args: [11],
    });
    //@ts-ignore
    return data;
  };
  const checkScore = async () => {
    const data = await publicClient.readContract({
      address: contestData.contractAddress as `0x${string}`,
      abi: chainQuestContract.abi,
      functionName: "RiddleScore",
      args: [account?.address],
    });
    //@ts-ignore
    const formattedScore = data.toString(); // Convert BigInt to string
    console.log("score is", formattedScore);

    setScore(formattedScore); // Set the score as a string
    //@ts-ignore
    setScore(formattedScore);
    toast({
      title: "score ",
      description: `Your score is ${formattedScore}`,
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };

  async function Contest() {
    try {
      console.log(answer);
      const fee = await estimateFee();
      writeContract({
        address: contestData.contractAddress as `0x{string}`,
        abi: chainQuestContract.abi,
        functionName: "participateRiddle",
        args: [11, answer],
        value: fee,
      });
      toast({
        title: "Contest Entered",
        description: "You have successfully entered the contest.",
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  async function claimPrize() {
    try {
      writeContract({
        address: contestData.contractAddress,
        abi: chainQuestContract.abi,
        functionName: "claimPrize",
        args: [],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function deposit() {
    try {
      writeContract({
        address: contestData.contractAddress as `0x{string}`,
        abi: chainQuestContract.abi,
        functionName: "deposit",
        args: [],
        value: parseEther(contestData.entryCost),
      });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (!contestId) return;
    const fetchContestData = async () => {
      try {
        const response = await axios.get(`/api/contests/${contestId}`);
        setContestData(response.data);
      } catch (error) {
        console.error("Error fetching contest data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContestData();
  }, [contestId]);

  if (loading) return <div>Loading...</div>;

  if (!contestData) return <div>Contest not found</div>;

  return (
    <div className="max-w-4xl mx-auto min-h-screen min-w-max p-6 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 rounded-lg shadow-lg space-y-6 text-white">
      <h1 className="text-4xl font-extrabold text-center text-white">
        Ora-AI Competition
      </h1>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <strong className="text-lg">YoutubeUrl(yt):</strong>
          <span className="text-gray-200">{contestData.youtubeUrl}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="text-lg">Entry Cost:</strong>
          <span className="text-gray-200">`https://www.youtube.com/watch?v=${contestData.gamePrize}`</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="text-lg">Deadline:</strong>
          <span className="text-gray-200">{contestData.deadline}</span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-4">
          <Label htmlFor="answer">Enter your answer</Label>
          <Input
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            required
            className="px-4 py-2 border border-blue-500 rounded-lg"
          />
          <Button
            onClick={Contest}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-150"
          >
            Enter Contest
          </Button>
          <Button
            onClick={claimPrize}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-150"
          >
            Claim Prize
          </Button>
        </div>

        <div className="flex space-x-4 justify-center">
          <Button
            onClick={deposit}
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-150"
          >
            Deposit
          </Button>
          <Button
            onClick={checkScore}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-150"
          >
            Check Score : {score}
          </Button>
        </div>
      </div>
    </div>
  );
}

////loading states,
