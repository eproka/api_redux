import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../redux/actions";

export default function EditNote() {
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState(null);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const fetchedNote = await response.json();
          setNote(fetchedNote);
          setTitle(fetchedNote.title);
          setBody(fetchedNote.text);
        } else {
          console.error("Failed to fetch note");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleUpdateNote = () => {
    if (validateInputs()) {
      const updatedNote = {
        id: noteId,
        authorId: user ? user.id : null,
        title,
        text: body,
        createdAt: note ? note.createdAt : null,
      };
  
      dispatch(updateNote(updatedNote, navigate));
    }
  };

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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleGoBack = () => {
    navigate(`/notes`);
  };

  return (
    <div>
      <nav className="navigation">
        <div className="navigation-left">Hello, {user ? user.email : ''}</div>
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
      <h1>Edit note</h1>
      <div className="editNote-container">
        <div>
          <input
            className="title-input"
            type="text"
            id="editNote-title"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="error">{errors.title && <p>{errors.title}</p>}</div>
        </div>
        <div>
          <textarea
            id="editNote-body"
            className="note-text"
            value={body}
            onChange={handleBodyChange}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="create-button" onClick={handleUpdateNote}>
          Save
        </button>
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>
      </div>
    </div>
  );
}