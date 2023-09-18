import React, { useEffect, useState } from "react";
import KanbanBoard from "@asseinfo/react-kanban";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { propOr } from "ramda";

import TasksRepository from "../../repositories/TasksRespository";

import Task from "../Task";
import ColumnHeader from "../ColumnHeader";
import AddPopup from "../AddPopup";
import EditPopup from "../EditPopup";
import TaskForm from "../forms/TaskForm";

import useStyles from "./useStyles";

const STATES = [
  { key: "new_task", value: "New" },
  { key: "in_development", value: "In Dev" },
  { key: "in_qa", value: "In QA" },
  { key: "in_code_review", value: "in CR" },
  { key: "ready_for_release", value: "Ready for release" },
  { key: "released", value: "Released" },
  { key: "archived", value: "Archived" },
];

const MODES = {
  ADD: "add",
  EDIT: "edit",
  NONE: "none",
};

const initialBoard = {
  columns: STATES.map((column) => ({
    id: column.key,
    title: column.value,
    cards: [],
    meta: {},
  })),
};

const TaskBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState({});
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);

  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);
  useEffect(() => console.log(boardCards));

  const styles = useStyles();

  const loadColumn = (state, page, perPage) => {
    return TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });
  };

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: items, meta },
      }));
    });
  };

  const loadColumnMore = (state, page, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: [...prevState[state].cards, ...items], meta },
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

  const loadBoardMore = () => {
    STATES.map(({ key }) => loadColumnMore(key));
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(
      ({ to }) => destination.toColumnId === to
    );
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { stateEvent: transition.event })
      .then(() => {
        loadColumnInitial(destination.toColumnId);
        loadColumnInitial(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };

  const handleAddPopupOpen = () => {
    console.log("open ");
    setMode(MODES.ADD);
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);

    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumnInitial(task.state);
      setMode(MODES.NONE);
    });
  };

  const loadTask = (id) => {
    return TasksRepository.show(id).then(({ data: { task } }) => task);
  };

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  const hadleTaskDestroy = (task) => {
    return TasksRepository.destroy(task.id).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  const handleEditPopupOpen = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  return (
    <>
      <KanbanBoard
        renderColumnHeader={(column) => (
          <ColumnHeader column={column} onLoadMore={loadColumnMore} />
        )}
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => (
          <Task onClick={handleEditPopupOpen} task={card} />
        )}
        disableColumnDrag
      >
        {board}
      </KanbanBoard>
      <Fab
        onClick={handleAddPopupOpen}
        className={styles.addButton}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      {mode === MODES.ADD && (
        <AddPopup onCardCreate={handleTaskCreate} onClose={handleClose} />
      )}

      {mode === MODES.EDIT && (
        <EditPopup
          onCardLoad={loadTask}
          onCardDestroy={hadleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
    </>
  );
};

export default TaskBoard;
