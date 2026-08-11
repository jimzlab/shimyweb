import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ping")({
  component: () => {
    return (
      <div style={{ fontFamily: "monospace", padding: "20px", color: "#888" }}>
        {"{ \"status\": \"ok\", \"timestamp\": " + Date.now() + " }"}
      </div>
    );
  },
});
