import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";

import { Route } from "lucide-react";

export type CustomFlowNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

export default memo(({ data }: NodeProps<Node<CustomFlowNodeData>>) => {
  return (
    <>
      <div className="cloud gradient">
        <div>
          <Route width={16} />
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner">
          <div className="body">
            {data.icon && <div className="icon">{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
});
