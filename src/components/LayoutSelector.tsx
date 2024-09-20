import { Layout, layoutSchema } from "@/app/page";
import React from "react";

interface LayoutSelectorProps {
  layout: Layout;
  setLayout: (layout: Layout) => void;
}

const LayoutSelector = (prop: LayoutSelectorProps) => {
  const { layout, setLayout } = prop;
  return (
    <div className="px-4 py-8 mb-4 shadow-lg">
      <h3 className="font-semibold text-lg tracking-tight pb-2">
        Select Layout Type
      </h3>
      <select
        name="layout"
        id="layout"
        className="dark:bg-gray-900 p-2 rounded"
        value={layout}
        onChange={(e) => setLayout(layoutSchema.parse(e.target.value))}
      >
        <option value="symmetrical">symmetrical</option>
        <option value="asymmetrical">asymmetrical</option>
        <option value="focalPoint">Central focal point</option>
      </select>
    </div>
  );
};

export default LayoutSelector;
