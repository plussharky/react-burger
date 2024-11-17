import { useState } from "react";

export type TFormValues = {
    [key: string]: any;
}

export function useForm<T extends TFormValues>(inputValues: T) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}