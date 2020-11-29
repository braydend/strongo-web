import React from "react";
import { Spinner } from "react-bootstrap";
import { useExercises } from "../../hooks/useExercises";
import ExerciseCards from "../Dashboard/ExerciseCard";
import Layout from "../Layout";

export const ExercisePage = () => {
  const { data, loading } = useExercises();

  const hasExercises = data.length > 0;

  return (
    <Layout>
      {loading ? (
        <Spinner animation="border" />
      ) : hasExercises ? (
        <ExerciseCards exercises={data} />
      ) : (
        <strong>There are no exercises yet</strong>
      )}
    </Layout>
  );
};
