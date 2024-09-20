import React from "react";

interface PieceCountProps {
  pieceCount: number;
  setPieceCount: (count: number) => void;
}

const PieceCount = (props: PieceCountProps) => {
  const { pieceCount, setPieceCount } = props;
  return (
    <div className="px-4 py-8 mb-4 shadow-lg">
      <h3 className="font-semibold text-lg tracking-tight pb-2">
        Number of Pieces
      </h3>
      <label className="grid grid-cols-2 items-center">
        <span className="text-end pr-2">Pieces</span>
        <input
          type="number"
          value={pieceCount}
          className="dark:bg-gray-900 p-2"
          onChange={(e) => setPieceCount(Number(e.target.value))}
        />
      </label>
    </div>
  );
};

export default PieceCount;
