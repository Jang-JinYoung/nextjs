// src/app/test/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getTestData } from "../api/testApi";

const TestPage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["test"],
        queryFn: () => getTestData(),
    });

    if (isLoading) return <div>isLoading..</div>;

    return <div>TestPage</div>;
};

export default TestPage;
