import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(p =>
        <Part key={p.id} name={p.name} number={p.exercises} />)}
    </div>
  );
};

export default Content;