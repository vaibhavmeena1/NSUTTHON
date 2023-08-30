import React, { useState, ChangeEvent } from 'react';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import shortUUID from 'short-uuid';

interface Props {
  onBanner1Upload: (url: string) => void;
  onBanner2Upload: (url: string) => void;
}

const FileUpload: React.FC<Props> = ({ onBanner1Upload, onBanner2Upload }) => {  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [url1, setUrl1] = useState<string>('');
  const [url2, setUrl2] = useState<string>('');
  const [uploadStatus1, setUploadStatus1] = useState<"idle" | "uploading" | "uploaded">("idle");
  const [uploadStatus2, setUploadStatus2] = useState<"idle" | "uploading" | "uploaded">("idle");


  const s3Client = new S3Client({ 
    region: import.meta.env.VITE_AWS_REGION!,
    // region: "ap-south-1"!,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID!,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY!

    }
  });
  

  const uploadToS3 = async (file: File, setId: React.Dispatch<React.SetStateAction<string>>, setUploadStatus: React.Dispatch<React.SetStateAction<"idle" | "uploading" | "uploaded">>, callback: (url: string) => void, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    setUploadStatus("uploading"); // Set the status to uploading

      // Generate a short UUID
      const translator = shortUUID();
      const shortId = translator.new();
  
      // Append the short UUID to the filename
      const filenameParts = file.name.split('.');
      const newName = `${filenameParts[0]}-${shortId}.${filenameParts[1]}`;
  
      const params = {
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: newName,
        Body: file,
      };
      
      try {
        await s3Client.send(new PutObjectCommand(params));
        const url = `https://${params.Bucket}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${params.Key}`;
  
        setId(url);
      setUploadStatus("uploaded"); // Set the status to uploaded
      callback(url);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus("idle"); // Reset to idle on error
    }
  };
 
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>, setUploadStatus: React.Dispatch<React.SetStateAction<"idle" | "uploading" | "uploaded">>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus("idle"); // Reset the upload status to idle
    }
  }

  return (
    <div className="flex  gap-5 mb-6 -mt-4 w-full">
      <div className="grid w-full max-w-xl items-center gap-4 md:gap-1">
        <Label className="" htmlFor="banner1">Banner 1</Label>
        <Input id="banner1" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFile1, setUploadStatus1)} />
        <Button 
          disabled={uploadStatus1 !== "idle"} 
          onClick={(e) => file1 && uploadToS3(file1, setUrl1, setUploadStatus1, onBanner1Upload, e)}
        >
          {uploadStatus1 === "idle" ? "Upload" : (uploadStatus1 === "uploading" ? "Uploading..." : "Uploaded")}
        </Button>
        {/* {url1 && <p>URL: {url1}</p>} */}
      </div>

      <div className="grid w-full max-w-xl items-center gap-4 md:gap-4 ">
        <Label className="" htmlFor="banner2">Banner 2</Label>
        <Input id="banner2" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFile2, setUploadStatus2)} />
        <Button 
          disabled={uploadStatus2 !== "idle"} 
          onClick={(e) => file2 && uploadToS3(file2, setUrl2, setUploadStatus2, onBanner2Upload, e)}
        >
          {uploadStatus2 === "idle" ? "Upload" : (uploadStatus2 === "uploading" ? "Uploading..." : "Uploaded")}
        </Button>
        {/* {url2 && <p>URL: {url2}</p>} */}
      </div>
    </div>
  );
}
export default FileUpload;