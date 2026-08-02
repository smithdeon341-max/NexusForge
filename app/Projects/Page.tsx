"use client";

import { useState } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Briefcase, Calendar, User, Building2, Plus, LayoutDashboard, Target, Settings, BarChart3, Users } from "lucide-react";
import Link from "next/link";

// --- DUMMY DATA ---
const INITIAL_PROJECTS = [
  { id: '1', title: "Q3 Server Migration", status: "Past", dueDate: "2026-06-15", employee: "Marcus Tech", business: "NexusForge Labs" },
  { id: '2', title: "Stripe Connect Integration", status: "Present", dueDate: "2026-08-10", employee: "Admin User", business: "StudioSocial" },
  { id: '3', title: "WebRTC Video Tuning", status: "Present", dueDate: "2026-08-05", employee: "Sarah Jenkins", business: "We The People App" },
  { id: '4', title: "AI Wingman V2", status: "Future", dueDate: "2026-10-01", employee: "Admin User", business: "Forge AI" },
];

const COLUMNS = ["Past", "Present", "Future"];

// --- SORTABLE ITEM COMPONENT ---
// This is an individual Project Card that can be dragged
function SortableProjectCard({ project }: { project: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`bg-zinc-900 border ${isDragging ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-zinc-800'} p-4 rounded-xl shadow-lg cursor-grab active:cursor-grabbing hover:border-zinc-700 transition-colors mb-3`}
    >
      <h4 className="font-bold text-white mb-3 text-lg leading-tight">{project.title}</h4>
      
      <div className="space-y-2 text-xs font-medium">
        <div className="flex items-center gap-2 text-zinc-400">
          <Building2 size={14} className="text-blue-500" />
          <span className="text-zinc-200">{project.business}</span>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          <div className="flex items-center gap-2">
            <User size={14} />
            <span>{project.employee}</span>
          </div>
          <div className="flex items-center gap-2 text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
            <Calendar size={12} />
            <span>{project.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function ProjectsDashboard() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // Configure Drag and Drop Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Prevent accidental drags when just clicking
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // If dragging a card over a column (changing its status)
    if (COLUMNS.includes(overId as string)) {
      setProjects((items) => items.map(proj => 
        proj.id === activeId ? { ...proj, status: overId as string } : proj
      ));
      return;
    }

    // If dragging a card over another card (reordering them)
    const activeIndex = projects.findIndex((p) => p.id === activeId);
    const overIndex = projects.findIndex((p) => p.id === overId);

    if (activeIndex !== overIndex) {
      setProjects((items) => {
        // If moving to a different column, update the status first
        const newItems = [...items];
        if (newItems[activeIndex].status !== newItems[overIndex].status) {
          newItems[activeIndex].status = newItems[overIndex].status;
        }
        return arrayMove(newItems, activeIndex, overIndex);
      });
    }
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex flex-col">
      
      {/* HEADER NAVIGATION (Matching the Businesses Page) */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Briefcase className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Projects</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><LayoutDashboard size={16}/> Home</Link>
            <Link href="/businesses" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Building2 size={16}/> Businesses</Link>
            <Link href="/plans" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Target size={16}/> Plans</Link>
            <Link href="/development" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Settings size={16}/> Development</Link>
            <Link href="/analytics" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><BarChart3 size={16}/> Analytics</Link>
            <Link href="/hr" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Users size={16}/> HR</Link>
          </nav>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm">
          <Plus size={16} /> New Project
        </button>
      </header>

      {/* KANBAN BOARD CONTAINER */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 h-full items-start min-w-[1000px]">
          
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            
            {/* Render the 3 Columns */}
            {COLUMNS.map((columnStatus) => {
              const columnProjects = projects.filter(p => p.status === columnStatus);

              return (
                <div key={columnStatus} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col max-w-sm shrink-0 h-[calc(100vh-140px)]">
                  
                  {/* Column Header */}
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 rounded-t-2xl">
                    <h2 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${columnStatus === 'Past' ? 'bg-zinc-500' : columnStatus === 'Present' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                      {columnStatus}
                    </h2>
                    <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded font-bold">
                      {columnProjects.length}
                    </span>
                  </div>

                  {/* Droppable Area for Cards */}
                  <div className="flex-1 p-3 overflow-y-auto">
                    <SortableContext 
                      id={columnStatus}
                      items={columnProjects.map(p => p.id)} 
                      strategy={verticalListSortingStrategy}
                    >
                      {columnProjects.map((project) => (
                        <SortableProjectCard key={project.id} project={project} />
                      ))}
                      
                      {/* Empty State / Drop Target */}
                      {columnProjects.length === 0 && (
                        <div className="h-24 border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 text-sm font-semibold">
                          Drop project here
                        </div>
                      )}
                    </SortableContext>
                  </div>
                </div>
              );
            })}

          </DndContext>

        </div>
      </div>

    </main>
  );
}