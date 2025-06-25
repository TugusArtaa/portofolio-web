"use client";

import { useState, useEffect } from "react";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
import ProjectCard from "@/components/shared/ProjectCard";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import EmptyState from "@/components/shared/EmptyState";

export default function ProjectListPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    project: any | null;
  }>({
    isOpen: false,
    project: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/project");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (project: any) => {
    setDeleteModal({ isOpen: true, project });
  };

  const confirmDelete = async () => {
    if (!deleteModal.project) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/project/${deleteModal.project.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProjects();
        setDeleteModal({ isOpen: false, project: null });
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Gagal menghapus proyek. Silakan coba lagi.");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, project: null });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return "Updated just now";
    } else if (diffMinutes < 60) {
      return `Updated ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `Updated ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffDays === 1) {
      return "Updated 1 day ago";
    } else if (diffDays < 7) {
      return `Updated ${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Updated ${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const addIcon = (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
      <path
        d="M6 0v12M0 6h12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );

  if (isLoading) {
    return <LoadingSkeleton variant="card" count={6} />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <PageHeader
          title="Daftar Proyek"
          subtitle="Kelola dan pantau semua proyek Anda dengan mudah"
          itemCount={projects.length}
          itemLabel="proyek"
          actionButton={{
            label: "Tambah Proyek",
            href: "/admin/projects/new",
            icon: addIcon,
          }}
        />

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <EmptyState
            title="Belum ada proyek"
            description="Mulai perjalanan Anda dengan membuat proyek pertama yang menakjubkan"
            actionButton={{
              label: "Buat Proyek Pertama",
              href: "/admin/projects/new",
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onDelete={deleteProject}
                formatDate={formatDate}
                showActions={true}
                variant="admin"
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Konfirmasi Hapus"
        description="Apakah anda yakin ingin menghapus proyek ini?"
        warningMessage="Semua data proyek termasuk gambar dan informasi lainnya akan hilang permanen."
      />
    </div>
  );
}
