import useSWR from "swr";

export default function useMapping() {

    let clientRfxs = JSON.parse(sessionStorage.getItem('client_rfxs')) || {id: 1};
    
    const { data, mutate, error } = useSWR(`/client_rfxs/8/buildings/`);

    return {
        mapping: data && data[0],
        mutate,
        error
    };
}
