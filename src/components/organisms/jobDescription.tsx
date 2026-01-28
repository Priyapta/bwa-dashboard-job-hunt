"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import type { Editor } from "@ckeditor/ckeditor5-core";
type JobDescriptionEditorProps = {
  form: any;
  name: string;
};

export function JobDescriptionEditor({
  form,
  name,
}: JobDescriptionEditorProps) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [CKEditor, setCKEditor] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  useEffect(() => {
    import("@ckeditor/ckeditor5-react").then((mod) => {
      setCKEditor(() => mod.CKEditor);
    });

    import("@ckeditor/ckeditor5-build-classic").then((mod) => {
      setClassicEditor(() => mod.default);
    });

    setEditorLoaded(true);
  }, []);

  if (!editorLoaded || !CKEditor || !ClassicEditor) {
    return <p className="text-sm text-muted-foreground">Loading editor...</p>;
  }
  const stripHtml = (html: string) => {
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="rounded-md border p-2">
          <CKEditor
            editor={ClassicEditor}
            data={field.value || ""}
            onChange={(_: unknown, editor: Editor) => {
              const html = editor.getData();
              const cleanText = stripHtml(html);
              field.onChange(cleanText);
            }}
            onBlur={field.onBlur}
          />

          {/* ERROR DARI SCHEMA */}
          {fieldState.error && (
            <p className="text-sm text-red-500 mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
