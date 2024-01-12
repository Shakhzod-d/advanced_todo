import React from "react";
import { useFormik } from "formik";

import "./EditModal.scss";

const EditModal = ({ isOpen, onClose, currentItem, onEdit }) => {
  const formik = useFormik({
    initialValues: {
      editedTitle: currentItem.title,
      editedDescription: currentItem.description,
    },
    onSubmit: (values) => {
      onEdit(currentItem.id, values);
      onClose();
    },
  });

  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal_content">
        <h2>Edit Item</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="editedTitle">Title:</label>
          <input
            type="text"
            id="editedTitle"
            name="editedTitle"
            value={formik.values.editedTitle}
            onChange={formik.handleChange}
          />
          <label htmlFor="editedDescription">Description:</label>
          <textarea
            id="editedDescription"
            name="editedDescription"
            value={formik.values.editedDescription}
            onChange={formik.handleChange}
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
