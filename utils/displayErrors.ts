import {UseFormSetError} from "react-hook-form";
import toast from "react-hot-toast";


export function displayErrors(errors: {
    [key: string]: string
}, setError: UseFormSetError<any>, message?: string, setFocus?: (str: string) => void) {

    if (errors && errors.length) {
        if(typeof errors === 'string') {
            toast.error(errors);
        }else {
            const errorKeys = Object.keys(errors);
            errorKeys.forEach(error => {
                setError(error, {
                    type: "manual",
                    message: typeof errors[error] === 'string' ? errors[error] : errors[error][0]
                });
            })
            if (setFocus) {
                setFocus(errorKeys[0]);
            }
        }

    } else {
        toast.error(message || 'Something went wrong');
    }
}

