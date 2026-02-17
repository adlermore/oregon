import {cache} from "react";
import {API_URL} from "@/utils/constants";


export const getPermitOptions = cache(async () => {
    const res = await fetch(`${API_URL}permit-options`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch permit options');
    const json = await res.json();
    const {data} = json;
    return data;
});