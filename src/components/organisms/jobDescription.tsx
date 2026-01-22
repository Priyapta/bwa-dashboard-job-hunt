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
              field.onChange(editor.getData());
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
