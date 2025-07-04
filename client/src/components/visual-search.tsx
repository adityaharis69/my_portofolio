import { useState, useRef } from "react";
import { Camera, Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function VisualSearch() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    toast({
      title: "Camera Feature",
      description: "Camera functionality would be implemented here with proper permissions.",
    });
  };

  const handleVisualSearch = async () => {
    if (!selectedImage) return;
    
    setIsSearching(true);
    try {
      // Simulate visual search API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Visual Search Complete",
        description: "Found similar products! Check the results below.",
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Something went wrong with the visual search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardContent className="p-8">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-primary transition-colors cursor-pointer">
          <div className="text-center">
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Selected for search"
                  className="max-w-full h-48 object-contain mx-auto rounded-lg"
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleVisualSearch}
                    disabled={isSearching}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? "Searching..." : "Search Similar Products"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedImage(null)}
                  >
                    Clear Image
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Search</h3>
                <p className="text-gray-600 mb-6">Drag & drop an image or click to upload</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleUploadClick}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCameraClick}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}
