import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid";

const itemsData = [
  { id: uuid(), content: "item 1" },
  { id: uuid(), content: "item 2" },
];

const columnsData = [
  {
    [uuid()]: {
      name: "Group 1",
      items: itemsData,
    },
  },
];

function App() {
  const [columns, setColumns] = useState(columnsData);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => console.log(result)}
      ></DragDropContext>
    </div>
  );
}

export default App;
