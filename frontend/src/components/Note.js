const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important';
  return (
    //added a button to the component and assign its event handler as the toggleImportance function passed in the component's props.
      <li className="note">
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    );
};

export default Note;