import React from "react";
import { Exercise, useExercises } from "../../hooks/useExercises";
import ExerciseCards from "../Dashboard/ExerciseCard";
import Layout from "../Layout";
import Loader from "../Loader";

export const ExercisePage = () => (
  <Layout>
    <Loader<Exercise[]> fetch={useExercises} Success={ExerciseCards} />
  </Layout>
);
