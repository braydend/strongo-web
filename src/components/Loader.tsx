import React from "react";
import { Spinner } from "react-bootstrap";
import { ApiRequest } from "../utils/api";

type Props<Q> = {
  fetch: () => ApiRequest<Q>;
  Error?: React.FC;
  Loading?: React.FC;
  Success: React.FC<{} & { data: Q }>;
};

function Loader<T>(props: Props<T>) {
  const { fetch, Error, Loading, Success } = props;
  const { data, loading, error } = fetch();

  if (error) return Error ? <Error /> : <strong>Something just broke!</strong>;
  if (loading) return Loading ? <Loading /> : <Spinner animation="border" />;

  return <Success data={data} />;
}

export default Loader;
