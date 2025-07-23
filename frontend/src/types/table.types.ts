export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode); // ✅ Accepts string key or function
    className?: string;
}