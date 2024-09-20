import React from "react";

interface MeasurementOverlayProps {
  wallWidth: number;
  wallHeight: number;
  frames: { id: string; width: number; top: number; left: number }[];
  scale: number;
  showMeasurements: boolean;
}

const MeasurementOverlay = (props: MeasurementOverlayProps) => {
  const { frames, scale, wallHeight, wallWidth, showMeasurements } = props;
  if (!showMeasurements) return null;

  const measurements = frames.map((frame) => {
    const { width, top, left } = frame;
    const distanceToRightEdge = wallWidth - (left + width); // in inches
    const startX = (left + width) * scale;
    const startY = top * scale;
    const endX = wallWidth * scale;
    const endY = startY;

    return (
      <React.Fragment key={frame.id}>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="red"
          strokeWidth="1"
        />
        <text
          x={(startX + endX) / 2}
          y={startY - 5}
          textAnchor="middle"
          fill="black"
        >
          {distanceToRightEdge.toFixed(2)} in
        </text>
      </React.Fragment>
    );
  });
  return (
    <svg
      className="absoulte top-0 left-0 pointer-events-none"
      style={{
        width: `${wallWidth * scale}px`,
        height: `${wallHeight * scale}px`,
      }}
    >
      {measurements}
    </svg>
  );
};

export default MeasurementOverlay;
