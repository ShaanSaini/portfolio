"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { upload } from "@vercel/blob/client";
import { addProjectAction } from "./actions";

type Status = "idle" | "uploading" | "saving" | "error";

export function UploadForm({ disabled = false }: { disabled?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("image") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setError("Choose an image file.");
      return;
    }

    const formData = new FormData(form);
    const title = String(formData.get("title") ?? "").trim();

    try {
      setStatus("uploading");
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
      const blob = await upload(`images/${Date.now()}-${safeName}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob-upload",
      });

      formData.set("imageUrl", blob.url);
      formData.set("imageAlt", title);

      setStatus("saving");
      startTransition(async () => {
        try {
          await addProjectAction(formData);
          form.reset();
          setStatus("idle");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Save failed.");
          setStatus("error");
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
      setStatus("error");
    }
  }

  const busy = status === "uploading" || status === "saving" || isPending;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <fieldset disabled={disabled} className="contents">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted">Image</span>
        <input
          type="file"
          name="image"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          required
          className="text-sm text-muted file:mr-3 file:rounded-md file:border file:border-border file:bg-background-elevated file:px-3 file:py-1.5 file:text-foreground file:text-sm"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted">Title</span>
        <input
          type="text"
          name="title"
          required
          className="rounded-md border border-border bg-background-elevated px-3 py-2 text-foreground outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted">Caption</span>
        <textarea
          name="caption"
          required
          rows={2}
          className="rounded-md border border-border bg-background-elevated px-3 py-2 text-foreground outline-none focus:border-accent"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted">Year</span>
          <input
            type="text"
            name="year"
            placeholder={String(new Date().getFullYear())}
            className="rounded-md border border-border bg-background-elevated px-3 py-2 text-foreground outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted">Tags (comma-separated)</span>
          <input
            type="text"
            name="tags"
            placeholder="Photography, Branding"
            className="rounded-md border border-border bg-background-elevated px-3 py-2 text-foreground outline-none focus:border-accent"
          />
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-2 self-start rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "uploading"
          ? "Uploading…"
          : status === "saving"
            ? "Saving…"
            : "Add project"}
      </button>
      </fieldset>
    </form>
  );
}
