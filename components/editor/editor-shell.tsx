"use client"

import * as React from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

interface EditorShellProps {
  children: React.ReactNode
}

/**
 * Top-level layout shell for the editor workspace.
 *
 * Manages the sidebar open/closed state and composes {@link EditorNavbar}
 * (fixed top bar with toggle) and {@link ProjectSidebar} (floating overlay
 * panel). The `children` prop is rendered in the main canvas area below the
 * navbar.
 */
export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div className="flex h-screen flex-col bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main canvas area — offset by navbar height */}
      <main className="flex-1 pt-12">{children}</main>
    </div>
  )
}
