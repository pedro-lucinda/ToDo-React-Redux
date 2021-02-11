import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { editTodo } from "../../store/modules/todos/actions";
import "./style.scss";

const Modal = (props) => {
  const dispatch = useDispatch();
  const [modalInfo] = useState(props.modalInfo);
  const [select, setSelect] = useState(modalInfo.status || "backlog");
  const [form, onChangeInput] = useForm({
    title: modalInfo.title,
    todo: modalInfo.toDo,
    status: modalInfo.status,
  });

  //change to do or do nothing
  function handleChangeTodo() {
    const editedTodo = {
      id: modalInfo.id,
      userid: modalInfo.userid,
      title: form.title || modalInfo.title,
      toDo: form.todo || modalInfo.toDo,
      status: select || modalInfo.status,
    };

    dispatch(editTodo(editedTodo, modalInfo));
    return props.setOpenModal(false);
  }

  return (
    <div className="c_modal">
      <h2> Edit </h2>
      <main>
        <section>
          <input
            value={form.title}
            onChange={onChangeInput}
            name={"title"}
            type="text"
            maxLength="35"
          />
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="backlog" name="backlog">
              backlog
            </option>
            <option value="doing" name="doing">
              doing
            </option>
            <option value="done" name="done">
              done
            </option>
          </select>
        </section>
        <textarea
          value={form.todo}
          onChange={onChangeInput}
          name="todo"
          type="text"
          maxLength="70"
        />
        <section className="s_buttons">
          <button onClick={handleChangeTodo}>Save</button>
          <button onClick={props.delete} style={{ backgroundColor: "red" }}>
            Delete
          </button>
          <button onClick={props.cancel} style={{ backgroundColor: "#979797" }}>
            Cancel
          </button>
        </section>
      </main>
    </div>
  );
};

export default Modal;
