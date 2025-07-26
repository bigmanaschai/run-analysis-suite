import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Video } from "lucide-react";
import { useState } from "react";

interface VideoUploadCardProps {
  range: string;
  distance: string;
  isUploaded: boolean;
  onUpload: (file: File) => void;
}

export const VideoUploadCard = ({ range, distance, isUploaded, onUpload }: VideoUploadCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      onUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Card className="font-prompt h-48">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          {range}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{distance}</p>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            isDragging 
              ? 'border-primary bg-accent/50' 
              : isUploaded 
                ? 'border-green-500 bg-green-50' 
                : 'border-border hover:border-primary'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isUploaded ? (
            <div className="flex flex-col items-center gap-2 text-green-600">
              <CheckCircle className="w-8 h-8" />
              <span className="text-sm font-medium">Video Uploaded</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Drop video here or
              </span>
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};