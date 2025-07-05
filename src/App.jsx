import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import "./App.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function App() {
  const [html, setHtml] = useState(localStorage.getItem("html") || "");
  const [css, setCss] = useState(localStorage.getItem("css") || "");
  const [js, setJs] = useState(localStorage.getItem("js") || "");
  const [srcDoc, setSrcDoc] = useState("");
  const [theme, setTheme] = useState("dark");

  // Save code to localStorage
  useEffect(() => {
    localStorage.setItem("html", html);
    localStorage.setItem("css", css);
    localStorage.setItem("js", js);
  }, [html, css, js]);

  // Update preview iframe
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}<\/script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const downloadCodeAsZip = () => {
    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("style.css", css);
    zip.file("script.js", js);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "my-codepen.zip");
    });
  };

  return (
    <>
      <div className="toolbar">
        <button className="theme-toggle" onClick={toggleTheme}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <button className="download-btn" onClick={downloadCodeAsZip}>
          ⬇️ Download ZIP
        </button>
      </div>

      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          theme={theme}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          theme={theme}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          theme={theme}
        />
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}
