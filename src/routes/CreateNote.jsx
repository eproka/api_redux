import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../redux/actions";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createNoteError = useSelector((state) => state.user.createNoteError); 
  const user = useSelector((state) => state.user.user); 

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "Title is required";
    }

    return newErrors;
  };

  const handleCreateNote = () => {
    const newErrors = validateInputs();

    if (Object.keys(newErrors).length === 0) {
      const newNote = {
        authorId: user.id,
        title,
        text: body,
        createdAt: new Date().toISOString(),
      };

      dispatch(createNote(newNote));
      navigate("/notes");
    } else {
      setErrors(newErrors);
    }
  };

  const handleGoBack = () => {
    navigate("/notes");
  };

  return (
    <div>
      <nav className="navigation">
        <div className="navigation-left">Hello, {user.email}</div>
        <div className="navigation-right">
          <Link to="/home" className="navigation-link">
            About
          </Link>
          <Link to="/notes" className="navigation-link">
            Notes
          </Link>
          <Link to="/login" className="navigation-link">
            Logout
          </Link>
        </div>
      </nav>
      <div className="createNote-container">
        <h1 style={{ textAlign: "center" }}>Create new note</h1>
        <input
          type="text"
          className="title-input"
          placeholder="Name"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="error">{errors.title && <p>{errors.title}</p>}</div>
        <textarea
          className="note-text"
          placeholder=" Note text..."
          value={body}
          onChange={handleBodyChange}
        />
        {createNoteError && <div className="error">{createNoteError}</div>}
        <div className="button-container">
          <button className="create-button" onClick={handleCreateNote}>
            Create
          </button>
          <button className="back-button" onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}