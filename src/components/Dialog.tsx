"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { hashEndpointWithScope, getPackedForbiddenCountries, countries } from "@selfxyz/core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSwitchChain } from "wagmi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { parseEther } from "viem";
import { toast } from "sonner";
import { FileUploader } from "react-drag-drop-files";
import upload from "./upload";
import { Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { deployContract } from "../../utils/contractdeploy";
import {useAccount} from "wagmi";
import { useRouter } from "next/navigation";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  BaseError,
} from "wagmi";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
interface Bed {
  bedNumber: string;
  gender: "M" | "F";
  price: string;
  imageUrl: string;
}

export function HotelRegistrationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [boysPrice, setBoysPrice] = useState("");
  const [girlsPrice, setGirlsPrice] = useState("");
  const account = useAccount();
  const router = useRouter();
  const [forbiddenCountries, setForbiddenCountries] = useState<string[]>([]);
  const [currentBed, setCurrentBed] = useState<Bed>({
    bedNumber: "",
    gender: "M",
    price: "",
    imageUrl: "",
  });
  const [ofacEnabled, setOfacEnabled] = useState(false);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    linksTree: "",
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('hotelFormData');
    const savedCountries = localStorage.getItem('selectedCountries');
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData.formData || { name: "", description: "", linksTree: "" });
      setBoysPrice(parsedData.boysPrice || "");
      setGirlsPrice(parsedData.girlsPrice || "");
      setBeds(parsedData.beds || []);
    }
    
    if (savedCountries) {
      setForbiddenCountries(JSON.parse(savedCountries));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      formData,
      boysPrice,
      girlsPrice,
      beds
    };
    localStorage.setItem('hotelFormData', JSON.stringify(dataToSave));
    localStorage.setItem('selectedCountries', JSON.stringify(forbiddenCountries));
  }, [formData, boysPrice, girlsPrice, beds, forbiddenCountries]);

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        const imageUrl = await upload(base64Data);
        if (imageUrl) {
          setCurrentBed(prev => ({ ...prev, imageUrl }));
          
          // Save bed image to localStorage with bed number as key
          const bedImages = JSON.parse(localStorage.getItem('bedImages') || '{}');
          bedImages[currentBed.bedNumber] = imageUrl;
          localStorage.setItem('bedImages', JSON.stringify(bedImages));
          
          toast.success("Image uploaded successfully!");
        }
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const addBed = () => {

    if (beds.some(bed => bed.bedNumber === currentBed.bedNumber)) {
      toast.error("This bed number already exists");
      return;
    }

    setBeds([...beds, currentBed]);
    setCurrentBed({
      bedNumber: "",
      gender: "M",
      price: "",
      imageUrl: "",
    });
  };

  const removeBed = (index: number) => {
    setBeds(beds.filter((_, i) => i !== index));
  };
  const identityVerificationHub = "0x3e2487a250e2A7b56c7ef5307Fb591Cc8C83623D";
  const scope = hashEndpointWithScope("https://ba1e-2a09-bac1-7420-38-00-50-18e.ngrok-free.app", 'Self-Hotel-Booking');
  const token = "0x96CFA0E76Bd15d99A1230CA3955be5E677B746a6"
  //@ts-ignore
  const attestationId = 2n 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (beds.length === 0) {
        toast.error("Please add at least one bed");
        return;
      }

      if (!boysPrice || !girlsPrice) {
        toast.error("Please set prices for both boys and girls hostels");
        return;
      }

      // Convert country codes to country constants
      const selectedCountries = forbiddenCountries.map(code => {
        const countryEntry = Object.entries(countries).find(([_, value]) => value === code);
        return countryEntry ? `countries.${countryEntry[0]}` : code;
      });
      const ofacEnabled = [true, true, true] as [boolean, boolean, boolean];
      const s = {
        ...formData,
        boysPrice: parseFloat(boysPrice),
        girlsPrice: parseFloat(girlsPrice),
        forbiddenCountries: selectedCountries,
        beds: beds.map(bed => ({
          ...bed,
          bedNumber: parseInt(bed.bedNumber),
          price: bed.gender === "M" ? parseFloat(boysPrice) : parseFloat(girlsPrice),
        })),
      };


      const boysBedPrice = BigInt(s.boysPrice);
      const girlsBedPrice = BigInt(s.girlsPrice);

      const boysBeds = s.beds
        .filter((b) => b.gender === "M")
        .map((b) => b.bedNumber);

      const girlsBeds = s.beds
        .filter((b) => b.gender === "F")
        .map((b) => b.bedNumber);
      console.log(boysBedPrice, girlsBedPrice, boysBeds, girlsBeds, true, selectedCountries, ofacEnabled)
      const packed = getPackedForbiddenCountries(selectedCountries);
      const forbiddenCountriesListPacked = [
        BigInt(packed[0]),
        BigInt(packed[1]),
        BigInt(packed[2]),
        BigInt(packed[3])
      ] as [bigint, bigint, bigint, bigint];
      const contract = await deployContract(
        account.address,
        identityVerificationHub,
        scope,
        Number(attestationId),
        token,
        boysBedPrice,
        girlsBedPrice,
        boysBeds,
        girlsBeds,
        true,
        forbiddenCountriesListPacked,
        ofacEnabled
      )
      console.log('selectedCountries', selectedCountries)
      console.log("contract deployed is, c , ", contract);
      toast.success("Hotel registered successfully!");
      router.push(`/booking/${contract}`);
      setIsOpen(false);

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to register hotel");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Register Your Hotel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register Your Hotel</DialogTitle>
          <DialogDescription>
            Fill in the details below to register your hotel on our platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Hotel Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="boysPrice">Boys Hostel Price (per bed)</Label>
              <Input
                id="boysPrice"
                type="number"
                step="0.01"
                value={boysPrice}
                onChange={(e) => setBoysPrice(e.target.value)}
                placeholder="Enter price for boys hostel"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="girlsPrice">Girls Hostel Price (per bed)</Label>
              <Input
                id="girlsPrice"
                type="number"
                step="0.01"
                value={girlsPrice}
                onChange={(e) => setGirlsPrice(e.target.value)}
                placeholder="Enter price for girls hostel"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Forbidden Countries</Label>
            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
              {Object.entries(countries).map(([code, name]) => (
                <div key={code} className="flex items-center space-x-2">
                  <Checkbox
                    id={code}
                    checked={forbiddenCountries.includes(name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setForbiddenCountries([...forbiddenCountries, name]);
                      } else {
                        setForbiddenCountries(forbiddenCountries.filter(c => c !== name));
                      }
                    }}
                  />
                  <Label htmlFor={code}>{name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ofac"
                checked={ofacEnabled}
                onCheckedChange={(checked) => setOfacEnabled(checked as boolean)}
              />
              <Label htmlFor="ofac">Enable OFAC Compliance</Label>
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <h3 className="font-medium">Add Beds</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Bed Number</Label>
                <Input
                  value={currentBed.bedNumber}
                  onChange={(e) => setCurrentBed({ ...currentBed, bedNumber: e.target.value })}
                  placeholder="Enter bed number"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <select
                  value={currentBed.gender}
                  onChange={(e) => setCurrentBed({ ...currentBed, gender: e.target.value as "M" | "F" })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="M">Boys Hostel</option>
                  <option value="F">Girls Hostel</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  value={currentBed.gender === "M" ? boysPrice : girlsPrice}
                  disabled
                  placeholder="Price will be set based on gender"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Bed Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <FileUploader
                  handleChange={handleImageUpload}
                  name="file"
                  types={fileTypes}
                  disabled={isUploading}
                />
                {isUploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              </div>
              {currentBed.imageUrl && (
                <div className="mt-2">
                  <img
                    src={currentBed.imageUrl}
                    alt="Current bed"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <Button
              type="button"
              onClick={addBed}
              className="w-full"
              disabled={isUploading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Bed
            </Button>
          </div>

          {beds.length > 0 && (
            <div className="space-y-2">
              <Label>Added Beds</Label>
              <div className="grid grid-cols-2 gap-2">
                {beds.map((bed, index) => (
                  <div key={index} className="border rounded-lg p-2 relative">
                    <button
                      type="button"
                      onClick={() => removeBed(index)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-100 hover:bg-red-200"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                    <img
                      src={bed.imageUrl}
                      alt={`Bed ${bed.bedNumber}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="mt-2 text-sm">
                      <p>Bed #{bed.bedNumber}</p>
                      <p className="text-gray-500">{bed.gender === "M" ? "Boys Hostel" : "Girls Hostel"}</p>
                      <p className="text-gray-500">Price: {bed.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="linksTree">Links Tree URL</Label>
            <Input
              id="linksTree"
              value={formData.linksTree}
              onChange={(e) => setFormData({ ...formData, linksTree: e.target.value })}
              placeholder="https://linktr.ee/yourhotel"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

