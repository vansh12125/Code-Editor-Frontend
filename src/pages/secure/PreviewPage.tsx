import { useAuth } from "@/hooks";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProjectTree } from "@/interfaces";

const PreviewPage = () => {
  const { user } = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const previewData = useMemo(() => {
    if (!projectId) {
      return null;
    }

    const data = sessionStorage.getItem(
      `preview-project-${projectId}`,
    );

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as {
        projectTree: ProjectTree;
        language: string;
      };
    } catch {
      return null;
    }
  }, [projectId]);

  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);

  const projectTree = previewData?.projectTree ?? null;
  const language = previewData?.language ?? "";

  const previewHtml = useMemo(() => {
    if (!projectTree || language !== "HTML") {
      return "";
    }

    let html = "";
    let css = "";
    let js = "";

    const traverse = (node: ProjectTree) => {
      if (node.type === "file") {
        if (node.name === "index.html") {
          html = node.content ?? "";
        } else if (node.extension === ".css") {
          css += `\n${node.content ?? ""}`;
        } else if (node.extension === ".js") {
          js += `\n${node.content ?? ""}`;
        }

        return;
      }

      node.children.forEach(traverse);
    };

    traverse(projectTree);

    html = html.replace(
      /<link[^>]+href=["'][^"']+\.css["'][^>]*>/gi,
      "",
    );

    html = html.replace(
      /<script[^>]+src=["'][^"']+\.js["'][^>]*><\/script>/gi,
      "",
    );

    html = html.replace(
      /<\/head>/i,
      `<style>${css}</style></head>`,
    );

    html = html.replace(
      /<\/body>/i,
      `<script>${js}</script></body>`,
    );

    return html;
  }, [projectTree, language]);

  if (!user) {
    return null;
  }

  if (!previewData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Project not found</p>
      </div>
    );
  }

  if (language !== "HTML") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Preview is only available for HTML projects.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white">
      <iframe
        title="Project Preview"
        srcDoc={previewHtml}
        sandbox="allow-scripts"
        className="h-full w-full border-0"
      />
    </div>
  );
};

export default PreviewPage;