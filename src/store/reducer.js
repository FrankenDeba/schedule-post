export const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        notes: action.payload.notes,
        showables: action.payload.showables,
      };

    case "add":
      console.log("adding to reducer: ", action.payload);
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case "show":
      const noteIdx = state.notes.findIndex(
        (note) => (note.id = action.payload.id)
      );
      let note = state.notes[noteIdx];

      note = { ...note, shouldShow: true };
      // console.log(
      //   "setting show in reducer ttt",
      //   action.payload,
      //   state.notes.splice(noteIdx, 1, note)
      // );
      const showables = state.showables;
      showables[action.payload.id] = true;

      return {
        ...state,
        showables,
      };

    default:
      return state;
  }
};
