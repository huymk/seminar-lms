"use client";

import * as z from "zod";
import axios from "axios";
import { Course, Attachments } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import { init } from "next/dist/compiled/webpack/webpack";

interface AttachmentFormProps {
  initialData: Course & {
    attachment: Attachments[];
  };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEditing = () => setIsEditing((prev) => !prev);
  console.log("attachment", initialData.attachment);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachments updated successfully");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Something went wrong!!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong!!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEditing} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachment.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No Attachment yet
            </p>
          )}
          {initialData.attachment.length > 0 && (
            <div className="space-y-2">
              {initialData.attachment.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full  bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{attachment.title}</p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className=" h-4 w-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add an attachment to your course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
