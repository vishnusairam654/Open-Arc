"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Floating project sidebar that overlays the editor canvas.
 *
 * Slides in from the left using M3 emphasized easing (`duration-500`).
 * Contains a "Projects" header, shadcn `Tabs` (My Projects / Shared) with
 * empty-state placeholders, and a full-width "New Project" footer button.
 *
 * Stacking: sidebar panel is `z-50`, backdrop is `z-30` (below navbar `z-40`
 * so the toggle remains clickable).
 */
export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/40 transition-opacity duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel — floats above content */}
      <aside
        data-slot="project-sidebar"
        className={cn(
          "fixed top-14 bottom-3 left-3 z-50 flex w-72 flex-col rounded-3xl border border-surface-border bg-surface-low/90 shadow-2xl backdrop-blur-md transition-transform duration-500",
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <h2 className="text-sm font-semibold text-copy-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-1 flex-col overflow-hidden px-3 pt-3">
          <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1 text-xs">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1 text-xs">
                Shared
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <TabsContent value="my-projects" className="pt-6">
                <EmptyState label="No projects yet" />
              </TabsContent>
              <TabsContent value="shared" className="pt-6">
                <EmptyState label="Nothing shared with you" />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Footer — New Project button */}
        <div className="border-t border-surface-border p-3">
          <Button className="w-full gap-2" size="lg">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

/** Empty placeholder state shown inside sidebar tabs when no items exist. */
function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-high">
        <FolderOpen className="h-5 w-5 text-copy-muted" />
      </div>
      <p className="text-xs text-copy-muted">{label}</p>
    </div>
  )
}
