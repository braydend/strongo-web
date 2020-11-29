import { useEffect, useState } from 'react';

type Exercise = {
    id: number,
    name: string,
};

const useExercises = () => {
    const [data, setData] = useState<Exercise[]>();
    const [error, setError] = useState<string>();
    const host = process.env.REACT_APP_SERVER_HOST || '';

    const fetchAllExercises = async () => {
        const response = await (await fetch(`${host}/exercises`)).json();

        return response.data;
    };

    useEffect(() => {
        try{
            (async () => setData(await fetchAllExercises()))();
        }catch (e){
            setError(e.message);
        }
    }, []);

    return ({ data, loading: data === undefined, error });
};

export { useExercises };