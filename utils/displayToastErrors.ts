import toast from 'react-hot-toast';

export function displayToastErrors(errors: {[key: string]: string}, message?: string) {
    if (errors) {
        if(typeof errors === 'string') {
            toast.error(errors);
        }else {
            const errorKeys = Object.keys(errors);
            errorKeys.forEach(error => {
               toast.error(error || 'Something went wrong');
            })
        }

    } else {
        toast.error(message || 'Something went wrong');
    }
}

