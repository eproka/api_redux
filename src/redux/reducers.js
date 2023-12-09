const registrationInitialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const registrationReducer = (state = registrationInitialState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "REGISTER_USER":
      return registrationInitialState;
    default:
      return state;
  }
};

const userInitialState = {
  email: "",
  password: "",
  confirmPassword: "",
  createNoteError: null,
  user: null,
  date: null,
  notes: [],
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
        date: action.payload.date,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
      };
    case "CREATE_NOTE_ERROR":
      return {
        ...state,
        createNoteError: action.error,
      };
    default:
      return state;
  }
};

const notesInitialState = {
  notes: [],
};

export const notesReducer = (state = notesInitialState, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};

const createNoteInitialState = {
  createNoteError: null,
};

export const createNoteReducer = (state = createNoteInitialState, action) => {
  switch (action.type) {
    case "CREATE_NOTE_SUCCESS":
      return {
        ...state,
        createNoteError: null,
      };
    case "CREATE_NOTE_ERROR":
      return {
        ...state,
        createNoteError: action.error,
      };
    default:
      return state;
  }
};