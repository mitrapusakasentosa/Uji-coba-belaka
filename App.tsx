// App.tsx
import React, { useState, useRef } from "react";
import {
  PlusCircle,
  Image as ImageIcon,
  FileText,
  Search,
  User,
  Menu,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { JobType, TaskData } from "./types";
import { formatIDR } from "./utils/formatters";

import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";

const App: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobType, setJobType] = useState<JobType>(JobType.SINGLE);
  const [priceInput, setPriceInput] = useState("");
  const [generatedData, setGeneratedData] = useState<TaskData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !priceInput) return;
    setIsGenerating(true);
    setTimeout(() => {
      const price = parseFloat(priceInput);
      const newData: TaskData = {
        phoneNumber,
        jobType,
        productPrice: price,
        generatedAt: new Date().toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };
      setGeneratedData(newData);
      setIsGenerating(false);
    }, 800);
  };

  const fixedWidth = 1440;
  const fixedHeight = 900;

  const downloadImage = async () => {
    if (!resultRef.current) return;
    const original = resultRef.current.style.cssText;
    resultRef.current.style.width = `${fixedWidth}px`;
    resultRef.current.style.height = `${fixedHeight}px`;
    try {
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#000",
        width: fixedWidth,
        height: fixedHeight,
      });
      const link = document.createElement("a");
      link.download = `GUCCI_DESKTOP_TASK_${phoneNumber}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      resultRef.current.style.cssText = original;
    }
  };

  const downloadPDF = async () => {
    if (!resultRef.current) return;
    const original = resultRef.current.style.cssText;
    resultRef.current.style.width = `${fixedWidth}px`;
    resultRef.current.style.height = `${fixedHeight}px`;
    try {
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#000",
        width: fixedWidth,
        height: fixedHeight,
      });
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [fixedWidth, fixedHeight],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, fixedWidth, fixedHeight);
      pdf.save(`GUCCI_DESKTOP_PDF_${phoneNumber}.pdf`);
    } finally {
      resultRef.current.style.cssText = original;
    }
  };

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem href="/search" aria-label="Search">
              <MagnifyingGlassIcon />
            </NavbarItem>
            <NavbarItem href="/inbox" aria-label="Inbox">
              <InboxIcon />
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/profile-photo.jpg" square />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                <Avatar src="/tailwind-logo.svg" />
                <SidebarLabel>Gucci System</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
            </Dropdown>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/">
                <HomeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/tasks">
                <Square2StackIcon />
                <SidebarLabel>Tugas</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/orders">
                <TicketIcon />
                <SidebarLabel>Pesanan</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem href="/support">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src="/profile-photo.jpg" className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-white">Erica</span>
                    <span className="block truncate text-xs text-zinc-500">erica@example.com</span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <div className="p-6 bg-gradient-to-br from-[#1a1c3d] via-[#0a0a0a] min-h-screen text-zinc-100">
        {/* Form Input */}
        <section className="max-w-4xl mx-auto mb-16 bg-[#0a0a0a] p-8 rounded-3xl border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-purple-600 p-2 rounded-lg">
              <PlusCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">INPUT DATA TUGAS</h2>
          </div>
          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">
                Nomor Telepon
              </label>
              <input
                type="text"
                required
                placeholder="08123456789"
                className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:border-purple-500 outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">
                Jenis Tugas
              </label>
              <select
                className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:border-blue-500 outline-none"
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
              >
                <option value={JobType.SINGLE}>1 Pesanan - 1 Produk</option>
                <option value={JobType.TRIPLE}>1 Pesanan - 3 Produk</option>
                <option value={JobType.QUAD}>1 Pesanan - 4 Produk</option>
                <option value={JobType.PENTA}>1 Pesanan - 5 Produk</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">
                Harga Produk
              </label>
              <input
                type="number"
                required
                placeholder="Rp..."
                className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:border-green-500 outline-none"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 pt-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-white text-black font-black py-4 rounded-xl uppercase shadow-lg flex items-center justify-center gap-3 text-xs tracking-[0.2em]"
              >
                {isGenerating ? "MENGOLAH DATA..." : <><Eye className="w-4 h-4" /> GENERATE</>}
              </button>
            </div>
          </form>
        </section>

        {generatedData && (
          <div className="max-w-[1440px] mx-auto">
            <div
              ref={resultRef}
              style={{ width: fixedWidth, height: fixedHeight }}
              className="bg-black p-10 rounded-2xl border border-zinc-900 shadow-2xl"
            >
              {/* --- konten hasil seperti di kode asli --- */}
              {/* ... potongan isi hasil tidak diubah ... */}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
              <button
                onClick={downloadImage}
                className="bg-[#111] border border-zinc-800 hover:border-purple-500 hover:bg-[#1a1a1a] text-white py-4 px-10 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest"
              >
                <ImageIcon className="w-5 h-5 text-purple-500" />
                Download Image (Desktop)
              </button>
              <button
                onClick={downloadPDF}
                className="bg-[#111] border border-zinc-800 hover:border-blue-500 hover:bg-[#1a1a1a] text-white py-4 px-10 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest"
              >
                <FileText className="w-5 h-5 text-blue-500" />
                Simpan PDF (Desktop)
              </button>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default App;
