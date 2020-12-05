import React from "react";
import { Card, Spinner } from "react-bootstrap";
import { Exercise, useExercises } from "../../hooks/useExercises";
import Layout from "../Layout";

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  return (
    <Card>
      <Card.Header>{exercise.name}</Card.Header>
    </Card>
  );
};

export const ExercisePage = () => {
  const { data, loading } = useExercises();

  if (loading) return <Spinner animation="border" />;

  return (
    <Layout>
      {data?.map((exercise) => (
        <ExerciseCard exercise={exercise} />
      ))}
    </Layout>
  );
};
