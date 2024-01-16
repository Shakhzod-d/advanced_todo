import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import "./Modal.scss";

const Modal = ({ onClose, header = "title", handleSubmit, currentItem }) => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    formik.getFieldProps("title")?.ref?.focus();
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // const handleSubmit = (values) => {
  //   dispatch(postNewTODO(values));

  //   closeModal();
  // };

  const formik = useFormik({
    initialValues: {
      title: currentItem === null ? "" : currentItem.title,
      description: currentItem === null ? "" : currentItem.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values, closeModal);
    },
  });

  return (
    <div
      className={`modal ${isVisible ? "show" : ""}`}
      onClick={(e) => e.target.classList.contains("modal") && closeModal()}
    >
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <p>{header}</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-container">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" {...formik.getFieldProps("title")} />
            {formik.touched.title && formik.errors.title && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors.title}
              </div>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error" style={{ color: "red" }}>
                {formik.errors.description}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
