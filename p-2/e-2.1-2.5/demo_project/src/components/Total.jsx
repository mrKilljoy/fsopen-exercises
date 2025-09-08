const Total = ({ parts }) => {
    const allExercises = parts.reduce((t, p) => t + p.exercises, 0);

    return (
        <h3>Number of exercises: {allExercises}</h3>
    );
}

export default Total;