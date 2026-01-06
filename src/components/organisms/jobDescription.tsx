"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
    // dynamic import supaya aman dari SSR
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
    <div className="rounded-md border p-2">
      <CKEditor
        editor={ClassicEditor}
        data={form.getValues(name) || ""}
        onChange={(_: any, editor: any) => {
          const data = editor.getData();
          form.setValue(name, data, {
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
      />
    </div>
  );
}
