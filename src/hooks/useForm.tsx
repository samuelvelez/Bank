import { useState } from 'react';

export const useForm = <T extends Object>(initState: T) => {

    const [state, setState] = useState(initState);

    const onChange = (value: string, field: keyof T) => {
        setState({
            ...state,
            [field]: value
        });
    }

    const resetForm = () => {
        setState(initState);
    };

    return {
        ...state,
        form: state,
        onChange,
        resetForm
    }

}