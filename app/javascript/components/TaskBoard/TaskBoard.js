import React, { useEffect, useState } from "react";
import KanbanBoard from "@asseinfo/react-kanban";
import { propOr } from "ramda";

import Task from "../Task";
import TasksRepository from "../../repositories/TasksRespository";

import ColumnHeader from "../ColumnHeader";

const STATES = [
  { key: "new_task", value: "New" },
  { key: "in_development", value: "In Dev" },
  { key: "in_qa", value: "In QA" },
  { key: "in_code_review", value: "in CR" },
  { key: "ready_for_release", value: "Ready for release" },
  { key: "released", value: "Released" },
  { key: "archived", value: "Archived" },
];

const initialBoard = {
  columns: STATES.map((column) => ({
    id: column.key,
    title: column.value,
    cards: [],
    meta: {},
  })),
};

function TaskBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);
  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: items, meta },
      }));
    });
  };

  const generateBoard = () => {
    const generatedBoard = {
      columns: STATES.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr({}, "cards", boardCards[key]),
        meta: propOr({}, "meta", boardCards[key]),
      })),
    };

    setBoard(generatedBoard);
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: items, meta },
      }));
    });
  };

  return (
    <KanbanBoard
      disableColumnDrag
      renderColumnHeader={(column) => <ColumnHeader column={column} />}
      onLoadMore={loadColumnMore}
      renderCard={(card) => <Task task={card} />}
    >
      {board}
    </KanbanBoard>
  );
}

export default TaskBoard;
