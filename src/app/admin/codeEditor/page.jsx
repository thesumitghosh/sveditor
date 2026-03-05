"use client";
import React, { useEffect, useRef, useState } from "react";

import Editor from "@monaco-editor/react";

import _ from "lodash";




export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};



export default function CodeEditor() {
  const [session, setSession] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const iframeRef = useRef(null);
  const [openHistoryIndex, setOpenHistoryIndex] = useState(null);

  const userId = "guset";

  const languages = [
    "javascript",
    "python",
    "php",
    "java",
    "go",
    "html",
    "css",
    "react",
  ];

  const isFrontendLang = ["html", "css", "react", "javascript"].includes(
    language
  );

  /* ================= BACKEND EXECUTION ================= */
  const runBackendCode = async () => {
    /* setLoading(true); */
    setOutput("Running...");
    try {
      const res = await fetch("https://serverapi.studyvarsity.com/api/code/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, language, code }),
      });
      const data = await res.json();
      setOutput(data.output || data.error);
      fetchHistory();
    } catch {
      setOutput("Server error");
    }
    setLoading(false);
  };

  /* ================= FRONTEND PREVIEW ================= */
  const runFrontendCode = () => {
    setConsoleOutput([]);
    setOutput("");

    let htmlContent = "";

    if (language === "html") {
      htmlContent = code;
    }

    if (language === "css") {
      htmlContent = `
        <style>${code}</style>
        <div class="preview">CSS Applied Preview</div>
      `;
    }

    if (language === "javascript" || language === "react") {
      htmlContent = `
        <div id="root"></div>
        <script>
          const log = console.log;
          console.log = function(...args){
            parent.postMessage({type:'console', data: args.join(' ')}, '*');
            log.apply(console, args);
          }
          try {
            ${code}
          } catch(err){
            parent.postMessage({type:'console', data: err.message}, '*');
          }
        <\/script>
      `;
    }

    const iframeDoc = iframeRef.current.contentDocument;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
  };

  const handleRun = () => {
    if (isFrontendLang) {
      runFrontendCode();
    } else {
      runBackendCode();
    }
  };

  /* ================= CONSOLE LISTENER ================= */
  useEffect(() => {
    const listener = (event) => {
      if (event.data.type === "console") {
        setConsoleOutput((prev) => [...prev, event.data.data]);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  /* ================= HISTORY ================= */
  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `https://serverapi.studyvarsity.com/api/code/history/${userId}`
      );
      const data = await res.json();
      setHistory(data);
    } catch { }
  };

  useEffect(() => {
    fetchHistory();
  }, [session]);

  const isDark = theme === "dark";


  useEffect(() => {
    // 1. Get all cookies and split them into an array
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      // 2. Extract the cookie name
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // 3. Delete by setting an expired date and matching the path
      // Setting path=/ is crucial as cookies are path-specific
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
  }, []);

  return (
    <>


      <div style={{ marginTop: "-60px" }}>
        <div className="xxl:max-w-screen-xxl mx-auto flex justify-between" style={{
          background: _.isEmpty(session?.user) && "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", // night sky gradient

        }}>


          {/* Main Feed */}


          <div className="flex-1 lg:min-w-[600px] ">
            <div style={{ height: "60px" }} />

            <section className="d-flex justify-center text-center bg-gradient-to-b from-gray-50 to-white">



              <div
                style={{
                  minHeight: "100vh",
                  backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
                  color: isDark ? "#fff" : "#000",
                  padding: "10px",
                }}
              >
                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "15px",
                    marginBottom: "10px",
                    backgroundColor: "#0f172a",
                    position:"fixed",
                    top:"55px",
                    zIndex:"999",
                    height:"55px",
                    width:"98%",
                    padding:"10px"
                  }}
                >
                  <h1 style={{ fontFamily: "cursive", fontWeight: "700", fontSize: "16px", alignContent:"center" }}>Coding Ground</h1>

                  <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "2px solid gray",
                        backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
                        color: isDark ? "#fff" : "#000",
                      }}
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={handleRun}
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#22c55e",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                      }}
                    >
                      Run
                    </button>

                    <button
                      onClick={() =>
                        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                      }
                      style={{
                        padding: "8px 15px",
                        color: theme === "dark" ? "#1e293b" : "#fff",
                        background: theme === "dark"
                          ? "linear-gradient(90deg, #facc15, #f97316)" // sunrise gradient
                          : "linear-gradient(90deg, #1e40af, #3b82f6)", // night sky gradient
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "700",
                        width: "50px"

                      }}
                    >
                      <span style={{ fontSize: "16px" }}>
                        {theme === "dark" ? "☀" : "🌙"}
                      </span>
                      {/* {theme === "dark" ?"☀" : "🌙"} */}
                    </button>
                  </div>
                </div>

                {/* MAIN LAYOUT */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop:"65px"
                  }}
                >
                  {/* EDITOR */}
                  <div style={{ flex: 2, minWidth: "300px", height: "50vh" }}>
                    <Editor
                      height="100%"
                      theme={isDark ? "vs-dark" : "light"}
                      language={
                        language === "react"
                          ? "javascript"
                          : language === "cpp"
                            ? "cpp"
                            : language
                      }
                      value={code}
                      onChange={(value) => setCode(value || "")}
                    />
                  </div>

                  {/* PREVIEW + OUTPUT */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: "280px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {/* IFRAME PREVIEW */}
                    {isFrontendLang && (
                      <iframe
                        ref={iframeRef}
                        title="preview"

                        style={{
                          flex: 1,
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                          minHeight: "200px",
                        }}
                      />
                    )}

                    {/* BACKEND OUTPUT */}
                    {!isFrontendLang && (
                      <div
                        style={{
                          backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
                          padding: "10px",
                          borderRadius: "8px",
                          flex: 1,
                          overflowY: "auto",
                        }}
                      >
                        <strong>Output</strong>
                        <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
                      </div>
                    )}

                    {/* CONSOLE OUTPUT */}
                    {isFrontendLang && (
                      <div
                        style={{
                          backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
                          padding: "10px",
                          borderRadius: "8px",
                          flex: 1,
                          overflowY: "auto",
                        }}
                      >
                        <strong>Console</strong>
                        {consoleOutput.map((log, index) => (
                          <div key={index}>{log}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>


                {/* ================= Code History ================= */}
                {!_.isEmpty(session?.user) &&
                  <div
                    style={{
                      marginTop: "15px",
                      backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9",
                      borderRadius: "10px",
                      padding: "10px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      border: "1px solid #334155",
                      marginBottom: "100px",
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: "8px",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: theme === "dark" ? "#38bdf8" : "#1e40af",
                      }}
                    >
                      📜 Code History
                    </h3>

                    {history.length === 0 && (
                      <div style={{ fontSize: "13px", opacity: 0.7 }}>
                        No history available
                      </div>
                    )}

                    {history.map((item, index) => {
                      const isOpen = openHistoryIndex === index;

                      return (
                        <div
                          key={index}
                          style={{
                            marginBottom: "10px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            border:
                              theme === "dark"
                                ? "1px solid #334155"
                                : "1px solid #cbd5e1",
                          }}
                        >
                          {/* ================= HEADER ================= */}
                          <div
                            onClick={() =>
                              setOpenHistoryIndex(isOpen ? null : index)
                            }
                            style={{
                              padding: "12px",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              background:
                                theme === "dark"
                                  ? "linear-gradient(90deg,#1e293b,#0f172a)"
                                  : "linear-gradient(90deg,#e2e8f0,#f8fafc)",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            <span>
                              {item.language.toUpperCase()} Snippet
                            </span>

                            <span
                              style={{
                                transition: "0.3s",
                                transform: isOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            >
                              ⌄
                            </span>
                          </div>

                          {/* ================= BODY ================= */}
                          <div
                            style={{
                              maxHeight: isOpen ? "400px" : "0px",
                              overflow: "hidden",
                              transition: "max-height 0.4s ease",
                              backgroundColor:
                                theme === "dark" ? "#0f172a" : "#ffffff",
                            }}
                          >
                            {isOpen && (
                              <div style={{ padding: "12px" }}>
                                {/* Code */}
                                <div
                                  style={{
                                    backgroundColor:
                                      theme === "dark"
                                        ? "#1e293b"
                                        : "#f1f5f9",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    fontFamily: "monospace",
                                    fontSize: "12px",
                                    marginBottom: "10px",
                                    whiteSpace: "pre-wrap",
                                  }}
                                >
                                  {item.code}
                                </div>

                                {/* Output */}
                                <div
                                  style={{
                                    backgroundColor:
                                      theme === "dark"
                                        ? "#020617"
                                        : "#e2e8f0",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <strong>Output:</strong>
                                  <div>{item.output}</div>
                                </div>

                                {/* Buttons */}
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      setCode(item.code);
                                      setLanguage(item.language);
                                    }}
                                    style={{
                                      padding: "6px 12px",
                                      borderRadius: "20px",
                                      border: "none",
                                      cursor: "pointer",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      background:
                                        "linear-gradient(90deg,#3b82f6,#2563eb)",
                                      color: "#fff",
                                    }}
                                  >
                                    ✏ Load
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleRun()
                                    }
                                    style={{
                                      padding: "6px 12px",
                                      borderRadius: "20px",
                                      border: "none",
                                      cursor: "pointer",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      background:
                                        "linear-gradient(90deg,#22c55e,#16a34a)",
                                      color: "#fff",
                                    }}
                                  >
                                    ▶ Run Again
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                }


                {/* RESPONSIVE */}
                <style jsx>{`
        @media (max-width: 768px) {
          div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }
        }
      `}</style>
              </div>

            </section>

          </div>

        </div>


      </div>
    </>
  );
}
