/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//components + styles
import CreateToDoForm from "../../components/CreateToDoForm";
import Navbar from "../../components/Navbar";
import ToDo from "../../components/ToDo";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import "./style.scss";
//route
import { useHistory, useParams } from "react-router-dom";
//hooks
import { useForm } from "../../hooks/useForm";
//id
import { v4 as uuid_v4 } from "uuid";
//redux
import { createTodo, deleteTodo } from "../../store/modules/todos/actions";
import { useDispatch, useSelector } from "react-redux";
import CreatedTodoAlert from "../../components/Alerts/CreatedTodoAlert";
import ErrorOnLoginAlert from "../../components/Alerts/ErrorOnLoginAlert";
import { DeleteAlertCustomClass } from "../../components/Alerts/DeleteAlertCustomClass";

const Home = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const { todos } = useSelector((state) => state);
  const [select, setSelect] = useState("backlog");
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [todoModalInfo, setTodoModalInfo] = useState([]);
  //forms
  const [form, onChangeInput] = useForm({
    title: "",
    description: "",
  });
  //save todos into localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //verification if the user is logged in
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("session"));
    if (!userSession) {
      ErrorOnLoginAlert()
      return history.push("/");
    }
  }, [userId]);

  //create to do
  function handleCreateToDo(e) {
    e.preventDefault();

    const newTodo = {
      userid: userId,
      id: uuid_v4(),
      title: form.title,
      toDo: form.description,
      status: select,
      date: Date.now(),
    };

    form.title = "";
    form.description = "";
    form.status = "backlog";

    dispatch(createTodo(newTodo));

    return CreatedTodoAlert()
  }

  //delete to do and close modal
  function handleDeleteTodo(modalInfo) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: DeleteAlertCustomClass,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(modalInfo));
        return setOpenModal(false);
      }
    });
  }

  //open modal
  function handleOpenModal(id) {
    const modalInfo = todos.filter((todo) => todo.id === id);
    setTodoModalInfo(modalInfo[0]);
    return setOpenModal(true);
  }


  return (
    <div
      className="c_home"
      style={{
        backgroundColor: `${openModal ? "rgba(0, 0, 0, 0.4)" : "#F4F4F4"}`,
      }}
    >
      <Navbar />
      <CreateToDoForm
        onSubmit={handleCreateToDo}
        title={form.title}
        description={form.description}
        onChange={onChangeInput}
        select={select}
        onChangeSelect={(e) => setSelect(e.target.value)}
      />
      {openModal && (
        <Modal
          modalInfo={todoModalInfo}
          setOpenModal={setOpenModal}
          delete={() => handleDeleteTodo(todoModalInfo)}
          cancel={() => setOpenModal(false)}
        />
      )}

      <main className="c_todosHome  animateUp">
        <h2> To Do List </h2>
        {todos?.map((todo) => (
          <ToDo
            key={uuid_v4()}
            title={todo.title}
            todo={todo.toDo}
            status={todo.status}
            bgColor={
              (todo.status === "done" && "#9DF247") ||
              (todo.status === "doing" && "#F2A447") ||
              (todo.status === "backlog" && "#979797")
            }
            onClick={() => handleOpenModal(todo.id)}
          />
        ))}

        {todos?.length < 1 && <p> Your to do list will appear here! </p>}
      </main>
    </div>
  );
};

export default Home;
