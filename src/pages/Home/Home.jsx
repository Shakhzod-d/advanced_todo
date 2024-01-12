import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoByID,
  editTodo,
  fetchTodos,
  selectCount,
} from "../../features/todoSlice";
import Card from "../../components/Card/Card";
import { MdEditSquare } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import AddTodoButton from "../../components/AddTodoButton/AddTodoButton";
import Modal from "../../components/Modal/Modal";
import EditModal from "../../components/EditModal/EditModal";

const Home = () => {
  const { todos, loading, role } = useSelector(selectCount);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [todoObj, setTodoId] = useState({ title: "", description: "" });

  const dispatch = useDispatch();

  const closeModal = () => {
    setIsModalVisible(false);
  };

  function onDelete(id) {
    dispatch(deleteTodoByID(id));
  }
  const onEdit = (item) => {
    setTodoId(item);
    setEditModalOpen(true);
  };

  const handleEdit = (itemId, currentItem) => {
    const newCurrentTodo = {
      id: itemId,
      title: currentItem.editedTitle,
      description: currentItem.editedDescription,
      handleCloseModal: () => setEditModalOpen(false),
    };
    // console.log(newCurrentTodo);
    dispatch(editTodo(newCurrentTodo));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div>
      {loading && `loading...`}
      <br />
      {isModalVisible && <Modal onClose={closeModal} />}
      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          currentItem={todoObj}
          onEdit={handleEdit}
        />
      )}

      <br />
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "44%",
            display: "flex",
            justifyContent: "right",
            margin: "0.5rem 0",
          }}
        >
          <AddTodoButton onClick={() => setIsModalVisible(true)} />
        </div>

        {!loading &&
          todos.length > 0 &&
          todos?.map((item) => {
            // console.log(item.id);
            return (
              <Card {...item} key={item.id} isRole={true}>
                <>
                  <div className="card-image-container">
                    <img
                      src={"https://picsum.photos/200/200"}
                      alt="Product Image"
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h2 className="card-title">{item?.title}</h2>
                    <p className="card-info">{item?.description}</p>
                    <p
                      className="card-price"
                      style={{
                        color: item?.createdBy === "admin" ? "red" : "green",
                      }}
                    >
                      Created by: {` `}
                      {item?.createdBy}
                    </p>
                  </div>
                  {role === `admin` && (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => onEdit(item)}
                      >
                        <MdEditSquare size={18} />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => onDelete(item.id)}
                      >
                        <FaTrash className="delete-icon" />
                      </button>
                    </>
                  )}
                  {item?.createdBy === "user" && role === `user` && (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => onEdit(item)}
                      >
                        <MdEditSquare size={18} />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => onDelete(item.id)}
                      >
                        <FaTrash className="delete-icon" />
                      </button>
                      {/* {JSON.stringify(item.id)} */}
                    </>
                  )}
                </>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
