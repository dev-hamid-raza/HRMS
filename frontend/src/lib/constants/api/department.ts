const BASE = '/departments'

export const DEPARTMENT_API = {
    LIST: BASE,
    CREATE: `${BASE}/create`,
    DELETE: (id: number) => `${BASE}/delete/${id}`,
    UPDATE: (id: number) => `${BASE}/update/${id}`,
}