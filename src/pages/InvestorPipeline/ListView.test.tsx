// @ts-nocheck

import { render, screen } from "@testing-library/react";
import { headerList } from "../../data/staticState";
import { Table, TableRow } from "./ListView";
import userEvent from "@testing-library/user-event";

jest.mock("react-intersection-observer", () => {});
jest.mock("@tanstack/react-query", () => {});

const user = userEvent.setup();
const mockFunction = jest.fn();
const mockRef = { current: {} };

const deals = [
  {
    name: "Twitter",
    pipelineStage: "Identified",
    investments: 700,
    "3monCount": 11,
    dealNotes: "",
  },
  {
    name: "TechStars",
    pipelineStage: "Identified",
    investments: 450,
    "3monCount": 5,
    dealNotes: "",
  },
  {
    name: "500 Startups",
    pipelineStage: "Call Scheduled",
    investments: 300,
    "3monCount": 8,
    dealNotes: "",
  },
];

describe("ListView", () => {
  it("should display fetched deals", async () => {
    render(
      <Table
        deals={deals}
        headers={headerList}
        onDrag={mockFunction}
        onDrop={mockFunction}
        onUpdateDeals={mockFunction}
        viewRef={mockRef}
        isFetchingNextPage={true}
        isFetchNextPageError={false}
      />
    );
    expect(screen.getByText("TechStars")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
  });

  const WrappedTableRow = () => {
    return (
      <table>
        <tbody>
          <TableRow
            row={deals[0]}
            headers={headerList}
            onUpdateDeals={mockFunction}
          />
        </tbody>
      </table>
    );
  };
  it("should be update the textarea value properly", async () => {
    render(<WrappedTableRow />);

    const textarea = screen.queryByTestId("deal-notes");
    await user.type(textarea, "good bye world");
    expect(textarea.value).toEqual("good bye world");
  });
});
