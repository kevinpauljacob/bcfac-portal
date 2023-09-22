import React from "react";

export default function Table() {
  return (
    <div className="p-4">
      <p className="text-xl pb-4">Study Material Details</p>
      <div className="border p-3 rounded-md">
        <table className="table-fixed w-full">
          <thead className="">
            <tr className="">
              <th className="w-2/4 text-left">Topic</th>
              <th className="w-2/4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-2/4 text-left">September 1</td>
              <td className="w-2/4 text-right">Uploaded</td>
            </tr>
            <tr>
              <td className="w-2/4 text-left">September 1</td>
              <td className="w-2/4 text-right">Uploaded</td>
            </tr>
            <tr>
              <td className="w-2/4 text-left">September 1</td>
              <td className="w-2/4 text-right">Uploaded</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
