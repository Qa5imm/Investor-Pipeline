// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from "react";
import "./new.css";

const T = () => {
  const [columns, setColumns] = useState([
    "Header 1",
    "Header 2",
    "Header 3",
    "Four",
  ]);
  const [rows, setRows] = useState([
    ["Row 1, Column 1", "Row 1, Column 2", "Row 1, Column 3", "qasim"],
    ["Row 2, Column 1", "Row 2, Column 2", "Row 2, Column 3", "qasim"],
  ]);

  let draggedColIndex = null;

  const handleDragStart = (index) => {
    draggedColIndex = index;
  };

  const handleDrop = (targetIndex) => {
    if (draggedColIndex === targetIndex) return;

    const updatedColumns = [...columns];
    const updatedRows = rows.map((row) => [...row]);

    updatedColumns.splice(
      targetIndex,
      0,
      updatedColumns.splice(draggedColIndex, 1)[0]
    );
    updatedRows.forEach((row) =>
      row.splice(targetIndex, 0, row.splice(draggedColIndex, 1)[0])
    );

    setColumns(updatedColumns);
    setRows(updatedRows);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((header, index) => (
              <th
                key={index}
                className="draggable border-b-2 p-4"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b p-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default T;
