const Part = ({part, name, exercises}) => {
  return (
    <div>
      <p>
        {part} {name} {exercises}
      </p>
    </div>
  );
};

export default Part;