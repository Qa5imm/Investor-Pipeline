// @ts-nocheck
import React from "react";
export default function Resizable({ children }) {
  const [node, setNode] = React.useState(null);

  const ref = React.useCallback((nodeEle) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = React.useCallback(
    (e) => {
      if (!node) {
        return;
      }

      const parent = node.parentElement;
      if (!parent) return;

      //   turning off draggable to prevent it's interference in column resizeability
      parent.setAttribute("draggable", "false");

      const startPos = {
        x: e.clientX,
        y: e.clientY,
      };
      const styles = window.getComputedStyle(parent);
      const w = parseInt(styles.width, 10);

      const handleMouseMove = (e) => {
        const dx = e.clientX - startPos.x;
        parent.style.width = `${w + dx}px`;
        updateCursor();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        parent.setAttribute("draggable", "true");

        resetCursor();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [node]
  );

  const updateCursor = () => {
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const resetCursor = () => {
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
  };

  React.useEffect(() => {
    if (!node) {
      return;
    }
    node.addEventListener("mousedown", handleMouseDown);

    return () => {
      node.removeEventListener("mousedown", handleMouseDown);
    };
  }, [node, handleMouseDown]);

  return children({ ref });
}
