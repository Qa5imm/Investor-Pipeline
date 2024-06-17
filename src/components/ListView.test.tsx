// @ts-nocheck

import { render, screen } from "@testing-library/react";
import { headerList } from "../data/staticState";
import { EditableInput, TableView } from "./ListView";

jest.mock("react-intersection-observer", () => {});
jest.mock("@tanstack/react-query", () => {});

describe("ListView Table Component", () => {
  const mockFunction = jest.fn();
  const mockRef = { current: {} };

  const deals = [
    {
      name: "Y combinator",
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

  it("should display fetched deals", async () => {
    render(
      <TableView
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
  });
  it("should be setting the state value properly", async () => {
    render(
      <EditableInput
        value={"hello world"}
        onStateChange={mockFunction}
        onHasChanged={mockFunction}
      />
    );

    const textarea = screen.queryByTestId("notes");
    expect(textarea.value).toEqual("hello world");
  });
});
