import React, { useState, useRef, useEffect } from "react";
import NodeComponent from "./Node";
import './tree.css'

interface Node {
  id: string;
  label: string;
  children: Node[];
}

interface TreeProps {
  zoomPercentage: number;
}

const Tree: React.FC<TreeProps> = ({ zoomPercentage }) => {
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      // Updating the windowWidth state directly might not be necessary
      // if you don't use it elsewhere.
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [nodes, setNodes] = useState<Node[]>([
    { id: "root", label: "Categories", children: [] },
  ]);

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number, y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return;
    setPosition({ 
      x: e.clientX - dragStart.current.x, 
      y: e.clientY - dragStart.current.y 
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
    dragStart.current = null;
  };

  const scaleFactor = zoomPercentage / 100;

  return (
    <div
      ref={treeRef}
      className="tree tree-container"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scaleFactor})`,
        cursor: dragging ? "grabbing" : "grab"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}  // Added this to handle the case where the mouse leaves the div while dragging
    >
      <ul className="node-list tree ul">
        {nodes.map((node) => (
          <NodeComponent
            key={node.id}
            node={node}
            nodes={nodes}
            setNodes={setNodes}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tree;
