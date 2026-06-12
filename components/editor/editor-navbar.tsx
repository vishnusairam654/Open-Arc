"use client"

import { Button } from "@/components/ui/button"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
}: EditorNavbarProps) {
  return (
    <nav
      data-slot="editor-navbar"
      className="fixed inset-x-0 top-0 z-40 flex h-12 items-center border-b border-surface-border bg-surface px-3"
    >
      {/* Left section */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center section */}
      <div className="flex flex-1 items-center justify-center" />

      {/* Right section — empty for now */}
      <div className="flex items-center" />
    </nav>
  )
}
