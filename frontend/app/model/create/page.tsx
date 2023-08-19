"use client";

import React, { useState } from "react";

export default function Page() {
  const [modelName, setModelName] = useState("");

  var handleCreate = async () => {
    const response = await fetch("/api/model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: modelName }),
    });

    if (response.ok) {
      console.log("create table ok")
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-3xl">Create Model</h1>
      <div className="flex flex-col gap-y-7">
        <div className="flex gap-x-4">
          <label>Model name:</label>
          <input
            type="text"
            className="text-black"
            onChange={(e) => {
              setModelName(e.target.value);
            }}
            required
          />
        </div>
        <button
          className="w-fit border-2 px-4 py-2 rounded-md"
          onClick={() => handleCreate()}
        >
          Create model
        </button>
      </div>
    </div>
  );
}
