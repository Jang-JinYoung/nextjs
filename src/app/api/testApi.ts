import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export const getTestData = () =>
    fetcher("https://jsonplaceholder.typicode.com/todos").then((res) => {

        return res;
    });
