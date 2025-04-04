"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { parseEther } from "viem";

function extractYoutubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}

export function CompetitionEntryDialog() {
  const [open, setOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const [gamePrize, setGamePrize] = useState("");
  const router = useRouter();

  const account = useAccount();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const videoId = extractYoutubeId(youtubeUrl);
      if (!videoId) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid YouTube URL",
          variant: "destructive",
        });
        return;
      }

      const deadlineTimestamp = Math.floor(Date.now() / 1000) + (parseInt(deadline) * 60);
      
      // Convert gamePrize to BigInt using parseEther, then to string for serialization
      
      const betData = {
        youtubeUrl: videoId,
        deadline: deadlineTimestamp,
        gamePrize:gamePrize, // Convert BigInt to string
        creatorAddress: account.address,
      };
      
      const response = await axios.post("/api/contest", betData);
      console.log("data", response.data);

      router.push(`/contests/${response.data}`);
    } catch (error) {
      console.error("Error submitting bet:", error);
      toast({
        title: "Error",
        description: "Failed to create bet",
        variant: "destructive",
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Create New Bet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Bet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtubeUrl">YouTube URL</Label>
            <Input
              id="youtubeUrl"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (in mins)</Label>
            <Input
              id="deadline"
              type="number"
              min="1"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Enter deadline in minutes"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gamePrize">Game Prize (ETH)</Label>
            <Input
              id="gamePrize"
              type="number"
              step="0.001"
              value={gamePrize}
              onChange={(e) => setGamePrize(e.target.value)}
              placeholder="Enter prize amount in ETH"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Bet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}