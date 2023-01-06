import Course from "./components/Course";
import data from "./Data";

const App = () => {
  return (
    <div>
      <Course courses={data} />
    </div>
  );
};

export default App;

