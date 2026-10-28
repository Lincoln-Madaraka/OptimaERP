"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const params = useSearchParams();
  const moduleName = params.get("module");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-5">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <img src="/optimaerp-logo.svg" alt="OptimaERP" className="mb-8 h-10" />
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to access {moduleName || "OptimaERP"}.
        </p>
        <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm font-medium text-slate-700">
            Email or username
            <input type="text" autoComplete="username" required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input type="password" autoComplete="current-password" required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3" />
          </label>
          <button type="submit" disabled
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white opacity-60">
            Sign in — backend connection pending
          </button>
        </form>
        <a href="/" className="mt-6 block text-center text-sm text-blue-600">
          Back to workspace
        </a>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>;
}
