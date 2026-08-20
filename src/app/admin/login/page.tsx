"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <p className="font-mono text-xs text-muted">Admin</p>
      <h1 className="mt-2 font-display text-2xl text-foreground">
        Sign in to manage your portfolio
      </h1>
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted">Password</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="rounded-md border border-border bg-background-elevated px-3 py-2 text-foreground outline-none focus:border-accent"
          />
        </label>
        {state?.error && (
          <p className="text-sm text-red-400" role="alert">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
