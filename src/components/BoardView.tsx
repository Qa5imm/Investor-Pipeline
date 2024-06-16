//@ts-nocheck

import { useContext } from "react";
import { AppContext } from "../providers/StateProvider";
import { pipelineStages } from "../data/staticState";

function BoardView() {
  const { deals } = useContext(AppContext);

  return (
    <div className="flex gap-x-2 px-6 overflow-scroll h-96">
      {pipelineStages.map((stage, index) => (
        <Column title={stage} key={index} deals={deals || []} />
      ))}
    </div>
  );
}

function Column({ title, deals }) {
  const { updateDeals } = useContext(AppContext);
  const handleDragStart = (e, deal) => {
    e.dataTransfer.setData("deal", deal);
  };

  const handleDrop = (e) => {
    const dealName = e.dataTransfer.getData("deal");
    const indicators = getIndicators();
    const { element } = getNearestIndicators(e, indicators);
    const { before } = element.dataset;

    let transferredDeal;
    const remainingDeals = [];

    deals.forEach((deal) => {
      if (deal.name === dealName) {
        transferredDeal = deal;
      } else {
        remainingDeals.push(deal);
      }
    });
    const updatedDeal = { ...transferredDeal, pipelineStage: title };

    const movetoEnd = before === "-1";

    if (movetoEnd) {
      let insertIndex = -1;

      deals.forEach((deal, ind) => {
        if (deal.pipelineStage === updatedDeal.pipelineStage) {
          insertIndex = ind;
        }
      });

      if (insertIndex !== -1) {
        insertIndex += 1;
      }

      remainingDeals.splice(insertIndex, 0, updatedDeal);
    } else {
      const insertIndex = remainingDeals.findIndex(
        (deal) => deal.name === before
      );
      remainingDeals.splice(insertIndex, 0, updatedDeal);
    }
    updateDeals(remainingDeals);
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${title}"]`));
  };

  const getNearestIndicators = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    console.log(indicators);

    return indicators.reduce(
      (closet, elem) => {
        const box = elem.getBoundingClientRect();
        console.log("box", box, elem.dataset, "eleme", e.clientY);

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closet.offset) {
          return {
            offset: offset,
            element: elem,
          };
        }
        return closet;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const fitlteredDeals = deals?.filter((deal) => deal.pipelineStage === title);
  return (
    <div
      className="shrink-0 w-52"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="gap-x-2 mb-2">
        <p className="bg-blue-200 w-full flex justify-between rounded px-2 py-1">
          {title}
          <span>{fitlteredDeals?.length}</span>
        </p>
      </div>
      <div className="flex flex-col">
        {fitlteredDeals.map((deal) => (
          <Card deal={deal} onDragStart={handleDragStart} />
        ))}
      </div>
      <Indicators card={null} column={title} />
    </div>
  );
}

function Card({ deal, onDragStart }) {
  return (
    <>
      <Indicators card={deal.name} column={deal.pipelineStage} />
      <div
        draggable="true"
        onDragStart={(e) => {
          onDragStart(e, deal.name);
        }}
        className="border px-1 rounded py-1 cursor-move"
      >
        <p>{deal.name}</p>
      </div>
    </>
  );
}
function Indicators({ card, column }) {
  console.log("card", card);
  return (
    <div data-before={card || "-1"} data-column={column} className="h-4"></div>
  );
}

export default BoardView;
