"use client";
import React, { useState, useEffect } from "react";
import { chainQuestContract } from "../../../contract/abi";
import { useRouter } from "next/navigation";
import axios from "axios";
interface ChainQuest {
  id: string;
  createdAt: Date;
  contractAddress: string;
  theme: string;
  entryCost: string;
  scoreToWin: number;
}

function Competitions() {
  const [users, setUsers] = useState<ChainQuest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/contest");
        const data = await response.data;
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleContests = async (contestId: string) => {
    try {
      router.push(`/contests/${contestId}`);
    } catch (error) {
      console.error("error", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          View All Competitions
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((chainQuest) => (
            <div
              key={chainQuest.id}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <p className="text-gray-700">Theme: {chainQuest.theme}</p>
              <p className="text-gray-500 text-sm">
                entryFee: {chainQuest.entryCost}ETH{" "}
              </p>
              Joined: {new Date(chainQuest.createdAt).toLocaleDateString()}
              <button
                onClick={() => handleContests(chainQuest.id)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Competitions;
