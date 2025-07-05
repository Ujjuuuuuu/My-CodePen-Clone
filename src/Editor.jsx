import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { githubLight } from "@uiw/codemirror-theme-github";

export default function Editor({ language, displayName, value, onChange, theme }) {
  const extensions = {
    xml: html(),
    css: css(),
    javascript: javascript(),
  };

  const editorTheme = theme === "dark" ? oneDark : githubLight;

  return (
    <div className="editor-pane">
      <div className="editor-title">{displayName}</div>
      <CodeMirror
        value={value}
        height="100%"
        theme={editorTheme}
        extensions={[extensions[language]]}
        onChange={(val) => onChange(val)}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
        }}
      />
    </div>
  );
}
