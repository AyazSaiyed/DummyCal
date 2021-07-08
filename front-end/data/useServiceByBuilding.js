import useSWR from "swr";

export default function useServiceByBuilding() {
    
    const { data, mutate, error } = useSWR(`/service-by-building/`);

    return {
        serviceByBuilding: data,
        mutate,
        error
    };
}
