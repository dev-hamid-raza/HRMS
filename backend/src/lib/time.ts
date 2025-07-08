
export const toPKTDate = (date: Date | string): Date => {
    const d = new Date(date);
    const shifted = new Date(d);
    shifted.setHours(shifted.getHours() + 5);
    return shifted;
};