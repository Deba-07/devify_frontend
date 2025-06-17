import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { isOutdated } from "../utils/versionUtils";
import Minimap from "./Minimap";

const DependencyTree = ({ data, onNodeClick }) => {
  const outerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const [translate, setTranslate] = useState({ x: 500, y: 100 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const updateSize = () => {
      if (outerRef.current) {
        const { offsetWidth, offsetHeight, scrollWidth } = outerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
        setTranslate({ x: scrollWidth / 2, y: 100 }); // center horizontally
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!data) return <p className="text-gray-500">No dependency data loaded.</p>;

  const transformNode = (node) => {
    const children = (node.dependencies || []).map(transformNode);
    const outdated = isOutdated(node.version, node.latest);
    const label = `${node.name}@${node.version || "latest"}${outdated ? " 🔁" : ""}`;
    return {
      name: label,
      attributes: {
        License: node.license || "N/A",
        Type: node.type || "",
      },
      children,
      _original: node,
    };
  };

  const treeData = [transformNode(data)];

  const handleZoom = (delta) => {
    const newZoom = Math.min(2, Math.max(0.4, zoom + delta));
    setZoom(newZoom);
    if (outerRef.current) {
      const { scrollWidth } = outerRef.current;
      setTranslate({ x: scrollWidth / 2, y: 100 });
    }
  };

  const resetView = () => {
    setZoom(1);
    if (outerRef.current) {
      const { scrollWidth } = outerRef.current;
      setTranslate({ x: scrollWidth / 2, y: 100 });
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-gray-900 border shadow relative">
      {/* Zoom Controls */}
      <div className="absolute top-3 right-4 z-10 flex space-x-2">
        <button
          onClick={() => handleZoom(0.1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => handleZoom(-0.1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          −
        </button>
        <button
          onClick={resetView}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>

      {/* Scrollable Graph */}
      <div
        ref={outerRef}
        className="w-full h-full overflow-auto px-2 py-4 bg-white"
      >
        <div className="relative inline-block min-w-[2000px] min-h-full">
          <Tree
            data={treeData}
            orientation="vertical"
            panOnDrag
            collapsible
            pathFunc="step"
            translate={translate}
            zoom={zoom}
            nodeSize={{ x: 200, y: 50 }} // more compact height
            enableLegacyTransitions
            transitionDuration={300}
            scaleExtent={{ min: 0.4, max: 2 }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            styles={{
              links: {
                stroke: "#94a3b8",
                strokeWidth: 2,
              },
              nodes: {
                node: {
                  circle: { r: 8, fill: "#3b82f6" },
                  name: {
                    fontSize: "13px",
                    fontWeight: "600",
                    fill: "#1e293b",
                  },
                  attributes: { fontSize: "11px", fill: "#475569" },
                },
                leafNode: {
                  circle: { r: 7, fill: "#10b981" },
                  name: {
                    fontSize: "12px",
                    fontWeight: "500",
                    fill: "#065f46",
                  },
                  attributes: { fontSize: "11px", fill: "#475569" },
                },
              },
            }}
            onNodeClick={(nodeData) => {
              if (onNodeClick) onNodeClick(nodeData.data._original);
            }}
          />
        </div>
      </div>

      <Minimap
        data={treeData}
        translate={translate}
        zoom={zoom}
        dimensions={dimensions}
      />
    </div>
  );
};

export default DependencyTree;
