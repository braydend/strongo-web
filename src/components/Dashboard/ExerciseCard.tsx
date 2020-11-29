import React from "react";
import { Card, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { Exercise } from "../../hooks/useExercises";
import { useSets } from "../../hooks/useSets";
import { ResponsiveGrid } from "../styled";

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({
  exercise: { id, name },
}) => {
  const { data, loading, error } = useSets(id);

  if (error) console.error(error);

  const hasSets = data.length > 0;

  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        {loading ? (
          <Spinner animation="border" />
        ) : hasSets ? (
          <ul>
            {data.map((s) => (
              <li key={s.ID}>
                {s.Reps} - {s.Weight}
              </li>
            ))}
          </ul>
        ) : (
          <strong>You haven't recorded any {name} sets. Start today!</strong>
        )}
      </Card.Body>
    </Card>
  );
};

const CardContainer = styled(ResponsiveGrid)`
  padding: 2rem 0;
  grid-gap: 1rem;
`;

const ExerciseCards: React.FC<{ exercises: Exercise[] }> = ({ exercises }) => {
  return (
    <CardContainer>
      {exercises.map((e) => (
        <ExerciseCard exercise={e} key={e.id} />
      ))}
    </CardContainer>
  );
};

export default ExerciseCards;
