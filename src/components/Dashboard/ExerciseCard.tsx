import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { Exercise } from "../../hooks/useExercises";
import { useSets, Set } from "../../hooks/useSets";
import Loader from "../Loader";
import { ResponsiveGrid } from "../styled";

const ExerciseSets: React.FC<{ data: Set[] }> = ({ data }) => {
  const hasSets = data.length > 0;

  if (!hasSets)
    return <strong>You haven't recorded any sets. Start today!</strong>;

  return (
    <ul>
      {data.map((s) => (
        <li key={s.ID}>
          {s.Reps} - {s.Weight}
        </li>
      ))}
    </ul>
  );
};

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({
  exercise: { id, name },
}) => (
  <Card>
    <Card.Header>{name}</Card.Header>
    <Card.Body>
      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
      <Loader<Set[]> fetch={() => useSets(id)} Success={ExerciseSets} />
    </Card.Body>
  </Card>
);

const CardContainer = styled(ResponsiveGrid)`
  padding: 2rem 0;
  grid-gap: 1rem;
`;

const ExerciseCards: React.FC<{ data: Exercise[] }> = ({ data }) => {
  return (
    <CardContainer>
      {data.map((e) => (
        <ExerciseCard exercise={e} key={e.id} />
      ))}
    </CardContainer>
  );
};

export default ExerciseCards;
