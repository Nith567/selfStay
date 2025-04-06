"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SelfQRcodeWrapper, { SelfApp, SelfAppBuilder,countries } from '@selfxyz/qrcode';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useAccount } from "wagmi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  BaseError,
} from "wagmi";

import { abi } from "../../../../utils/abi";
import { publicClient } from "@/components/Providers";
import { parseEther } from "viem";
interface contestParams {
  params: {
    address: string;
  };
}

interface VerificationEvent {
  status: string;
  proof?: any;
  publicSignals?: any;
  error_code?: string;
  reason?: string;
}

export default function ContestDetails({ params }: contestParams) {
  const [hotelData, setHotelData] = useState<any>(null);
  const [bedImages, setBedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [bedNumber, setBedNumber] = useState<string>("");
  const [proof, setProof] = useState<any>(null);
  const [publicSignals, setPublicSignals] = useState<any>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [success, setSuccess] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [selfApp, setSelfApp] = useState<any>(null);
  const router = useRouter();
  const { address } = params;
  const { toast } = useToast();
  const account = useAccount();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  });


  useEffect(() => {
    const fetchHotelData = () => {
      try {
        
        const savedData = localStorage.getItem('hotelFormData');
        const savedImages = localStorage.getItem('bedImages');
        
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setHotelData({
            name: parsedData.formData.name,
            description: parsedData.formData.description,
            boysPrice: parsedData.boysPrice,
            girlsPrice: parsedData.girlsPrice,
            beds: parsedData.beds
          });
        }
        if (savedImages) {
          const parsedImages = JSON.parse(savedImages);
          setBedImages(parsedImages);
        }
      } catch (error) {
        console.error("Error loading hotel data:", error);
        toast({
          title: "Error",
          description: "Failed to load hotel data from storage",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [address]);


  useEffect(() => {
    if (account.address) {
      const savedCountries = localStorage.getItem('selectedCountries');
      const excludedCountries = savedCountries ? JSON.parse(savedCountries) : [];
      const app = new SelfAppBuilder({
        appName: "Hotel Booking",
        scope: "Self-Hotel-Booking",
        endpoint: "https://ba1e-2a09-bac1-7420-38-00-50-18e.ngrok-free.app/api/verify",
        userId: account.address,
        userIdType: "hex",
        disclosures: { 
          gender: true,
          nationality: true,
          date_of_birth: false,
          excludedCountries: excludedCountries,
          ofac: true
        },
        devMode: true,
        endpointType: "https",
        header: "",
        logoBase64: "",
        sessionId: uuidv4() // Generate a unique session ID
      } as Partial<SelfApp>).build();
      setSelfApp(app);
    }
  }, [account.address]);

  const handleVerificationSuccess = (event: any) => {
    console.log('Verification event:', event);
    if (event.status === 'proof_generation_failed') {
      setVerificationError('Proof generation failed. Please try again.');
      return;
    }
    
    if (event.proof && event.publicSignals) {
      setProof(event.proof);
      setPublicSignals(event.publicSignals);
      setVerificationStatus('QR code scanned successfully. Please verify your identity.');
    }
  };

  // const verifyProof = async () => {
  //   try {
  //     if (!proof || !publicSignals) {
  //       setVerificationError('No proof data available');
  //       return;
  //     }

  //     const response = await fetch('/api/verify', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         proof,
  //         publicSignals
  //       }),
  //     });

  //     const data = await response.json();
      
  //     if (data.status === 'success') {
  //       // Store proof and signals in localStorage
  //       localStorage.setItem('verificationProof', JSON.stringify(data.proof));
  //       localStorage.setItem('verificationSignals', JSON.stringify(data.publicSignals));
        
  //       setIsVerified(true);
  //       setSuccess('Identity verified successfully! You can now book a bed.');
  //       setVerificationError(null);
  //     } else {
  //       setVerificationError(data.message || 'Verification failed');
  //     }
  //   } catch (error) {
  //     console.error('Error verifying proof:', error);
  //     setVerificationError('Failed to verify identity');
  //   }
  // };

  const handleBookBed = async () => {
    try {
      if (!bedNumber) {
        setVerificationError('Please enter a bed number');
        return;
      }

      // Get stored proof and signals
      const storedProof = localStorage.getItem('verificationProof');
      const storedSignals = localStorage.getItem('verificationSignals');

      if (!storedProof || !storedSignals) {
        setVerificationError('Please verify your identity first');
        return;
      }

      const proof = JSON.parse(storedProof);
      const publicSignals = JSON.parse(storedSignals);

      // Call contract's verifyUser function
      await writeContract({
        address: address as `0x{string}`,
        abi: abi,
        functionName: "verifyUser",
        args: [{
          a: proof.a,
          b: [
            [proof.b[0][1], proof.b[0][0]],
            [proof.b[1][1], proof.b[1][0]],
          ],
          c: proof.c,
          pubSignals: publicSignals,
        }],
      });

      setSuccess('Bed booked successfully!');
      setVerificationError(null);
    } catch (error) {
      console.error('Error booking bed:', error);
      setVerificationError('Failed to book bed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading hotel information...</p>
        </div>
      </div>
    );
  }

  if (!hotelData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Hotel not found</h2>
          <p className="mt-2 text-gray-600">No hotel data found in storage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto min-h-screen p-6 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 rounded-lg shadow-lg space-y-6 text-white">
      <h1 className="text-4xl font-extrabold text-center text-white">
        {hotelData.name}
      </h1>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <strong className="text-lg">Description:</strong>
          <span className="text-gray-200">{hotelData.description}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="text-lg">Boys Bed Price:</strong>
          <span className="text-gray-200">{hotelData.boysPrice} USDC</span>
        </div>
        <div className="flex justify-between items-center">
          <strong className="text-lg">Girls Bed Price:</strong>
          <span className="text-gray-200">{hotelData.girlsPrice} USDC</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Boys Beds</h3>
          <div className="space-y-2">
            {hotelData.beds
              .filter((bed: any) => bed.gender === "M")
              .map((bed: any) => (
                <div key={bed.bedNumber} className="flex flex-col p-2 bg-blue-600 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span>Bed #{bed.bedNumber}</span>
                    <Button onClick={() => setBedNumber(bed.bedNumber)}>Select</Button>
                  </div>
                  {bedImages[bed.bedNumber] && (
                    <img 
                      src={bedImages[bed.bedNumber]} 
                      alt={`Bed ${bed.bedNumber}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Girls Beds</h3>
          <div className="space-y-2">
            {hotelData.beds
              .filter((bed: any) => bed.gender === "F")
              .map((bed: any) => (
                <div key={bed.bedNumber} className="flex flex-col p-2 bg-pink-600 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span>Bed #{bed.bedNumber}</span>
                    <Button onClick={() => setBedNumber(bed.bedNumber)}>Select</Button>
                  </div>
                  {bedImages[bed.bedNumber] && (
                    <img 
                      src={bedImages[bed.bedNumber]} 
                      alt={`Bed ${bed.bedNumber}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {!isVerified ? (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Step 1: Verify Your Identity</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please scan the QR code to verify your identity.
            </p>
            <div className="flex justify-center">
              <SelfQRcodeWrapper
                selfApp={selfApp}
                type='websocket'
                onSuccess={() => {
                  setVerificationStatus('QR code scanned successfully. Please verify your identity.');
                }}
              />
            </div>
            
            {verificationStatus && (
              <div className="mt-4">
                <p className="text-green-500 mb-2">{verificationStatus}</p>
                <Button 
                  onClick={verifyProof}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Verify Identity
                </Button>
              </div>
            )}
            
            {verificationError && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                {verificationError}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Step 2: Book Your Bed</h3>
            {success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                {success}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Selected Bed Number: {bedNumber || 'None selected'}
              </label>
              <Button
                onClick={handleBookBed}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={!bedNumber}
              >
                Book Bed
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

////loading states,