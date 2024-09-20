import React from "react";

interface WallSizeControlsProps {
  wallWidth: number;
  setWallWidth: (width: number) => void;
  wallHeight: number;
  setWallHeight: (height: number) => void;
}

const WallSizeControls = (props: WallSizeControlsProps) => {
  const { wallWidth, setWallWidth, wallHeight, setWallHeight } = props;
  return (
    <div className="px-4 py-8 mb-4 shadow-lg">
      <h3 className="font-semibold text-lg tracking-tight pb-2">
        Adjust wall size
      </h3>
      <label className="grid grid-cols-2 items-center pb-2">
        <span className="text-end pr-2">Width (inches)</span>
        <input
          type="number"
          value={wallWidth}
          className="dark:bg-gray-900 p-2"
          onChange={(e) => setWallWidth(Number(e.target.value))}
        />
      </label>
      <label className="grid grid-cols-2 items-center">
        <span className="text-end pr-2">Height (inches)</span>
        <input
          type="number"
          value={wallHeight}
          className="dark:bg-gray-900 p-2"
          onChange={(e) => setWallHeight(Number(e.target.value))}
        />
      </label>
    </div>
  );
};

export default WallSizeControls;
