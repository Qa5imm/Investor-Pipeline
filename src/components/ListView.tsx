// @ts-nocheck

import { useInView } from "react-intersection-observer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../providers/StateProvider";
import {
  headersMap,
  headerList,
  pipelineStages,
  editable,
} from "../data/staticState";

export default function ListView() {
  const { ref, inView } = useInView();
  const [headers, setHeaders] = useState(headerList);

  const { deals, fetchNextPage, isFetchingNextPage, isFetchNextPageError } =
    useContext(AppContext);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  let startInd = null;

  const handleDrag = (dragInd) => {
    startInd = dragInd;
  };
  const handleDrop = (dropInd) => {
    const updatedColumns = [...headers];
    updatedColumns.splice(dropInd, 0, updatedColumns.splice(startInd, 1)[0]);
    setHeaders(updatedColumns);
  };
  console.log("deals", deals);

  return (
    <div className={``}>
      <div className="overflow-y-auto h-72">
        <table className="w-full border-2">
          <thead className="h-12 border-b-2 bg-blue-100">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  draggable
                  onDragStart={() => handleDrag(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  className="text-center font-normal text-gray-500 p-2 cursor-move border-l-4"
                >
                  {headersMap[header]}
                  {header === "dealNotes" && (
                    <i className="fa-solid fa-pen-to-square mx-2" />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deals?.pages.map((page, index) => (
              <Page page={page} headers={headers} key={index} pageNum={index} />
            ))}
            <tr ref={ref}>
              <td
                className="p-4 text-lg text-gray-500 font-semibold"
                align="center"
                colSpan={headers.length}
              >
                {isFetchingNextPage ? "Loading..." : "No more results"}
                {isFetchNextPageError && "Error loading more results"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Page({ page, headers, pageNum }) {
  return page?.data.map((row, index) => (
    <TableRow
      headers={headers}
      pageNum={pageNum}
      rowNum={index}
      row={row}
      key={index}
    />
  ));
}

function TableRow({ row, headers, rowNum, pageNum }) {
  const [rowState, setRowState] = useState(row);
  const [hasChanged, setHasChanged] = useState(false);
  const columnWidth = `w-1/${headers.length}`;
  return (
    <tr className="">
      {headers.map((header) => (
        <td className={`p-1 text-center ${columnWidth}`}>
          <CellContent
            header={header}
            row={rowState}
            pageNum={pageNum}
            rowNum={rowNum}
            hasChanged={hasChanged}
            onStateChange={setRowState}
            onHasChanged={setHasChanged}
          />
        </td>
      ))}
    </tr>
  );
}

function CellContent({
  header,
  row,
  pageNum,
  rowNum,
  hasChanged,
  onStateChange,
  onHasChanged,
}) {
  if (header === "pipelineStage") {
    return (
      <Dropdown
        selected={row[header]}
        options={pipelineStages}
        onHasChanged={onHasChanged}
        onStateChange={onStateChange}
      />
    );
  }

  if (editable.includes(header)) {
    return (
      <EditableInput
        value={row[header]}
        onStateChange={onStateChange}
        onHasChanged={onHasChanged}
      />
    );
  }

  if (header === "actions") {
    return (
      <Button
        row={row}
        pageNum={pageNum}
        rowNum={rowNum}
        buttonText={"save"}
        hasChanged={hasChanged}
        onHasChanged={onHasChanged}
      />
    );
  }

  return row[header];
}

function Button({
  row,
  pageNum,
  rowNum,
  buttonText,
  hasChanged,
  onHasChanged,
}) {
  const { updateDeals } = useContext(AppContext);

  const handleUpdate = (deals) => {
    return {
      ...deals,
      pages: deals.pages.map((page, pIndex) => {
        if (pIndex === pageNum) {
          return {
            ...page,
            data: page.data.map((currentRow, rIndex) => {
              if (rIndex === rowNum) {
                return row; // updated row data
              }
              return currentRow;
            }),
          };
        }
        return page;
      }),
    };
  };

  const handleClick = () => {
    updateDeals((deals) => handleUpdate(deals));
    onHasChanged(false);
  };
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 font-semibold text-white cursor-pointer rounded ${
        hasChanged
          ? "bg-blue-500 hover:bg-blue-700 "
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      {buttonText}
    </button>
  );
}

function EditableInput({ value, onStateChange, onHasChanged }) {
  const handleInput = (event) => {
    const newNotes = event.target.value;
    onStateChange((row) => ({ ...row, dealNotes: newNotes }));
    onHasChanged(true);
  };
  return (
    <textarea
      value={value}
      onChange={handleInput}
      className="cursor-text"
    ></textarea>
  );
}

function Dropdown({ selected, onStateChange, onHasChanged, options }) {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onStateChange((row) => ({ ...row, pipelineStage: newValue }));
    onHasChanged(true);
  };
  return (
    <select
      className="bg-transparent outline-none border-none p-2 rounded"
      value={selected}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
