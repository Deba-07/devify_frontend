import React from 'react';
import Tree from 'react-d3-tree';

const Minimap = ({ data, translate, zoom, dimensions }) => {
  const scale = 0.1;
  const minimapSize = {
    width: dimensions.width * scale,
    height: dimensions.height * scale,
  };

  return (
    <div
      className="absolute bottom-4 right-4 border bg-white rounded shadow-md z-10"
      style={{ width: minimapSize.width, height: minimapSize.height }}
    >
      <svg width="100%" height="100%">
        <g transform={`scale(${scale})`}>
          <foreignObject width={dimensions.width} height={dimensions.height}>
            <Tree
              data={data}
              orientation="vertical"
              translate={{ x: dimensions.width / 2, y: 100 }}
              zoomable={false}
              collapsible={false}
              nodeSize={{ x: 250, y: 100 }}
              separation={{ siblings: 1.5, nonSiblings: 2 }}
              styles={{
                links: { stroke: '#cbd5e1', strokeWidth: 1 },
                nodes: {
                  node: {
                    circle: { r: 4, fill: '#3b82f6' },
                    name: { fontSize: '6px', fill: '#1e293b' },
                  },
                  leafNode: {
                    circle: { r: 3, fill: '#10b981' },
                    name: { fontSize: '5px', fill: '#065f46' },
                  },
                },
              }}
            />
          </foreignObject>
        </g>
      </svg>
    </div>
  );
};

export default Minimap;
