import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  X, 
  Check, 
  AlertCircle,
  Download,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadDropzoneProps {
  title: string;
  description: string;
  acceptedTypes: string[];
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesUploaded?: (files: File[]) => void;
  existingFiles?: UploadedFile[];
  className?: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  status: "uploading" | "completed" | "error";
  progress?: number;
  url?: string;
}

export default function FileUploadDropzone({
  title,
  description,
  acceptedTypes,
  maxFiles = 10,
  maxSize = 10,
  onFilesUploaded,
  existingFiles = [],
  className
}: FileUploadDropzoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(existingFiles);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true);
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: "uploading",
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate file upload with progress
    newFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, progress: Math.min((f.progress || 0) + 10, 100) }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: "completed", progress: 100, url: `#file-${f.id}` }
              : f
          )
        );
        
        if (index === newFiles.length - 1) {
          setIsUploading(false);
          onFilesUploaded?.(acceptedFiles);
        }
      }, 2000 + index * 500);
    });
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
    maxSize: maxSize * 1024 * 1024,
    disabled: isUploading
  });

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive 
              ? "border-primary bg-primary/5" 
              : "border-gray-300 hover:border-gray-400",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Upload className={cn(
                "w-8 h-8",
                isDragActive ? "text-primary" : "text-gray-400"
              )} />
            </div>
            
            {isDragActive ? (
              <div>
                <p className="text-lg font-medium text-primary">Suelta los archivos aquí</p>
                <p className="text-sm text-gray-500">Se subirán automáticamente</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-gray-500">
                  Máximo {maxFiles} archivos, {maxSize}MB cada uno
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {acceptedTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type.split('/')[1]?.toUpperCase() || type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Archivos Subidos</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    {file.status === "completed" ? (
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    ) : file.status === "error" ? (
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">
                        {new Date(file.uploadDate).toLocaleDateString()}
                      </p>
                      
                      {file.status === "uploading" && file.progress !== undefined && (
                        <div className="flex-grow">
                          <Progress value={file.progress} className="h-1" />
                        </div>
                      )}
                      
                      <Badge 
                        variant={
                          file.status === "completed" ? "default" :
                          file.status === "error" ? "destructive" : "secondary"
                        }
                        className="text-xs"
                      >
                        {file.status === "completed" ? "Completado" :
                         file.status === "error" ? "Error" : "Subiendo..."}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {file.status === "completed" && file.url && (
                      <>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Stats */}
        {uploadedFiles.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
            <span>{uploadedFiles.length} archivo{uploadedFiles.length !== 1 ? 's' : ''} subido{uploadedFiles.length !== 1 ? 's' : ''}</span>
            <span>
              {formatFileSize(uploadedFiles.reduce((total, file) => total + file.size, 0))} total
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}