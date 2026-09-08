import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  content?: string;
  language: string;
  onChange: (value: string) => void;
}

const getLanguage = (language: string): string => {
  switch (language.toLowerCase()) {
    case ".html":
    case ".htm":
      return "html";

    case ".js":
    case ".mjs":
    case ".cjs":
      return "javascript";

    case ".jsx":
      return "javascript";

    case ".ts":
      return "typescript";

    case ".tsx":
      return "typescript";

    case ".css":
      return "css";

    case ".scss":
      return "scss";

    case ".less":
      return "less";

    case ".json":
    case ".jsonc":
      return "json";

    case ".md":
    case ".markdown":
      return "markdown";

    case ".xml":
      return "xml";

    case ".svg":
      return "xml";

    case ".yaml":
    case ".yml":
      return "yaml";

    case ".graphql":
    case ".gql":
      return "graphql";

    case ".sql":
      return "sql";

    case ".sh":
    case ".bash":
      return "shell";

    case ".py":
      return "python";

    case ".java":
      return "java";

    case ".c":
      return "c";

    case ".cpp":
    case ".cc":
    case ".cxx":
      return "cpp";

    case ".cs":
      return "csharp";

    case ".go":
      return "go";

    case ".rs":
      return "rust";

    case ".php":
      return "php";

    case ".rb":
      return "ruby";

    case ".swift":
      return "swift";

    case ".kt":
    case ".kts":
      return "kotlin";

    case ".dart":
      return "dart";

    case ".lua":
      return "lua";

    case ".env":
      return "ini";

    case ".toml":
      return "ini";

    case ".dockerfile":
      return "dockerfile";

    default:
      return "plaintext";
  }
};

const CodeEditor = ({ content, language, onChange }: CodeEditorProps) => {
  const lang: string = getLanguage(language);

  if (lang === "xml") {
    return (
      <iframe
        srcDoc={`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            select:none;
          }

          body {
            display: flex;
            align-items: center;
            justify-content: center;
            background:#222222;
          }

          svg {
            width: 80%;
            height: 80%;
            max-width: 800px;
            max-height: 800px;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `}
        className="h-full w-full border-0 select-none"
        sandbox=""
      />
    );
  }
  if (lang === "plaintext") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#222222] select-none">
        Preview not available
      </div>
    );
  }
  return (
    <Editor
      height="100%"
      language={lang}
      className="select-none"
      value={content ?? ""}
      theme="vs-dark"
      onChange={(value) => onChange(value ?? "")}
      options={{
        fontSize: 22,
        mouseWheelZoom: true,
      }}
    />
  );
};

export default CodeEditor;
