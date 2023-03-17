import React from "react";
import { Table } from "../../components";

const TABLE_HEADERS = ["From", "To", "Content"]
const TABLE_CONTENTS = [{From: "0x123", To: "0x456", Content: "Hello World"}, {From: "0x123", To: "0x456", Content: "Hello World"}, {From: "0x123", To: "0x456", Content: "Hello World"}]

export default function Home() {
  return (
    <div className="container p-2 flex justify-center">
      <div className="card w-3/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Recent Asserts</h2>
          <Table  headers={TABLE_HEADERS} contents={TABLE_CONTENTS} />
        </div>
      </div>
    </div>
  );
}
