import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const itemsData = [
  { id: uuidv4(), content: "item 1" },
  { id: uuidv4(), content: "item 2" },
];

const columnsData = [
  {
    [uuidv4]: {
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
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {Object.entries(columns).map(([id, column], index) => {
          return (
            <Droppable key={index} droppableId={id}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightpink"
                        : "lightgrey",
                      padding: 4,
                      width: 250,
                      minHeight: 500,
                    }}
                  ></div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
