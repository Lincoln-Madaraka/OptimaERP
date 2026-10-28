"use client";

import { useState } from "react";

const modules = [
  { name: "Accounting", icon: "◈", description: "Invoices, payments and financial reports" },
  { name: "CRM", icon: "◎", description: "Leads, opportunities and customers" },
  { name: "Selling", icon: "▣", description: "Quotations, orders and sales" },
  { name: "Buying", icon: "▤", description: "Suppliers and purchase orders" },
  { name: "Stock", icon: "▦", description: "Inventory and warehouses" },
  { name: "Projects", icon: "◇", description: "Projects, tasks and timesheets" },
  { name: "Manufacturing", icon: "⚙", description: "Production and work orders" },
  { name: "Support", icon: "◉", description: "Issues and customer support" },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = modules.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#192438]">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <img src="/optimaerp-logo.svg" alt="OptimaERP" className="h-9 max-w-44" />
          <span className="text-sm text-slate-500">ERP Workspace</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-2 text-sm font-medium text-blue-600">OPTIMAERP</p>
        <h1 className="text-3xl font-semibold tracking-tight">Your workspace</h1>
        <p className="mt-2 text-slate-500">
          Access your business modules in one place.
        </p>

        <input
          type="search"
          placeholder="Search modules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-8 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((module) => (
            <div
              key={module.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 text-3xl text-blue-600">{module.icon}</div>
              <h2 className="font-semibold">{module.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
