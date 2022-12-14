import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const itemsData = [
  { id: "item_id_1", content: "item 1" },
  { id: "item_id_2", content: "item 2" },
  { id: "item_id_3", content: "item 3" },
  { id: "item_id_4", content: "item 4" },
];

const columnsData = {
  ["column_id_1"]: {
    name: "Group 1",
    items: itemsData,
  },
  ["column_id_2"]: {
    name: "Group 2",
    items: [],
  },
  ["column_id_3"]: {
    name: "Group 3",
    items: [],
  },
  ["column_id_4"]: {
    name: "Group 4",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

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
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: "8px" }}>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: "#E0BBE4",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                          borderRadius: "8px",
                        }}
                      >
                        <div style={{ marginTop: "8px" }}>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        borderRadius: "10px",
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 8px 8px 8px",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#957DAD"
                                          : "#D291BC",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
