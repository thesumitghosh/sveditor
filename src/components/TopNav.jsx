"use client";

import { useState } from "react";

export default function TopNav({ onLogout }) {

    const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "56px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 1000,
        alignItems:"center"
      }}
    >
      {/* BRAND / LOGO */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "16px",
          letterSpacing: "0.3px"
        }}
      >
        <img
            src="https://www.studyvarsity.com/icons/cropped-S-150x150.png"
            alt="Brand Logo"
            className="mx-auto"
            width={42}
            height={42}
          />
      </div>

      {/* RIGHT ACTIONS */}
<>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* USER AVATAR */}
        <div
          onClick={() => setOpen(!open)}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="22"
            height="22"
            fill="#374151"
          >
            <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
          </svg>
        </div>

        {/* DROPDOWN */}
        {/* {open && (
          <div
            style={{
              position: "absolute",
              top: "52px",
              right: 0,
              width: "160px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            <button
              onClick={() => {
          localStorage.removeItem("isAdmin");
          window.location.href = "/admin/login";
        }}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                background: "transparent",
                textAlign: "left",
                fontSize: "14px",
                fontWeight: 600,
                color: "#dc2626",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )} */}
      </div>

      {/* CLICK OUTSIDE TO CLOSE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
          }}
        />
      )}
    </>
    </div>
  );
}
