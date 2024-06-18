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

  const {
    deals,
    fetchNextPage,
    updateDeals,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useContext(AppContext);

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

  return (
    <Table
      viewRef={ref}
      deals={deals}
      headers={headers}
      isFetchNextPageError={isFetchNextPageError}
      isFetchingNextPage={isFetchingNextPage}
      onDrop={handleDrop}
      onDrag={handleDrag}
      onUpdateDeals={updateDeals}
    />
  );
}
export const Table = ({
  deals,
  headers,
  viewRef,
  isFetchingNextPage,
  isFetchNextPageError,
  onDrag,
  onDrop,
  onUpdateDeals,
}) => {
  return (
    <div className={``}>
      <div className="overflow-y-auto h-96">
        <table className="w-full border-2">
          <thead className="h-12 border-b-2 bg-blue-200">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  draggable
                  onDragStart={() => onDrag(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(index)}
                  className="text-center font-normal  p-2 cursor-move border-l-4"
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
            {deals?.map((row, index) => (
              <TableRow
                onUpdateDeals={onUpdateDeals}
                headers={headers}
                row={row}
                key={index}
              />
            ))}
            <tr ref={viewRef}>
              <td
                className="p-3 text-lg text-gray-500 font-semibold"
                align="center"
                colSpan={headers.length}
              >
                {isFetchingNextPage
                  ? "Loading..."
                  : !isFetchNextPageError && "No more results"}
                {isFetchNextPageError && "Error loading more results"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TableRow = ({ row, onUpdateDeals, headers }) => {
  const [rowState, setRowState] = useState(row);
  const [hasChanged, setHasChanged] = useState(false);
  const columnWidth = `w-1/${headers.length}`;
  return (
    <tr>
      {headers.map((header, index) => (
        <td key={index} className={`text-center ${columnWidth}`}>
          <TableCellContent
            header={header}
            row={rowState}
            hasChanged={hasChanged}
            onStateChange={setRowState}
            onHasChanged={setHasChanged}
            onUpdateDeals={onUpdateDeals}
          />
        </td>
      ))}
    </tr>
  );
};

function TableCellContent({
  header,
  row,
  hasChanged,
  onStateChange,
  onHasChanged,
  onUpdateDeals,
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
        currDeal={row}
        buttonText={"save"}
        hasChanged={hasChanged}
        onHasChanged={onHasChanged}
        onUpdateDeals={onUpdateDeals}
      />
    );
  }

  return row[header];
}

function Button({ row, buttonText, hasChanged, onHasChanged, onUpdateDeals }) {
  const handleUpdate = (deals) => {
    return deals.map((deal) => {
      if (deal["name"] === row["name"]) {
        return row;
      }
      return deal;
    });
  };

  const handleClick = () => {
    onUpdateDeals((deals) => handleUpdate(deals));
    onHasChanged(false);
  };
  return (
    <button
      onClick={handleClick}
      disabled={!hasChanged}
      className={`px-4 py-2 font-semibold text-white cursor-pointer rounded ${
        hasChanged
          ? "bg-blue-500 hover:bg-blue-700 "
          : "bg-gray-400 cursor-not-allowed"
      }`}
      data-testid="save-button"
    >
      {buttonText}
    </button>
  );
}

export const EditableInput = ({ value, onStateChange, onHasChanged }) => {
  const handleInput = (event) => {
    const newNotes = event.target.value;
    onStateChange((row) => ({ ...row, dealNotes: newNotes }));
    onHasChanged(true);
  };
  return (
    <textarea
      value={value}
      onChange={handleInput}
      className="cursor-text bg-transparent outline-gray-400 p-1"
      data-testid="deal-notes"
    ></textarea>
  );
};

const Dropdown = ({ selected, onStateChange, onHasChanged, options }) => {
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
      data-testid="dropdown"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
