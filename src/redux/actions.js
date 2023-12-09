
export const setEmail = (email) => ({
  type: "SET_EMAIL",
  payload: email,
});

export const setPassword = (password) => ({
  type: "SET_PASSWORD",
  payload: password,
});

export const registerUser = (user) => ({
  type: "REGISTER_USER",
  payload: { ...user, date: Date.now() },
});

export const loginUser = (user) => ({
  type: "LOGIN_USER",
  payload: user,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

export const setNotes = (notes) => ({
  type: "SET_NOTES",
  payload: notes,
});

export const deleteNote = (noteId) => ({
  type: "DELETE_NOTE",
  payload: noteId,
});

export const createNote = (newNote) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        dispatch({ type: "CREATE_NOTE_SUCCESS" });
      } else {
        throw new Error("Failed to create note");
      }
    } catch (error) {
      dispatch({ type: "CREATE_NOTE_ERROR", error: error.message });
    }
  };
};

export const updateNote = (updatedNote, navigate) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5001/notes/${updatedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {

        navigate(`/view-note/${updatedNote.id}`);
      } else {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
};