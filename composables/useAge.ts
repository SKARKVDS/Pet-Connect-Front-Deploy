export const useAge = (timestamp: number) => {
    const diff_ms = Date.now() - timestamp;

    const age_dt = new Date(diff_ms);

    return useState('age', () => Math.abs(age_dt.getUTCFullYear() - 1970))
}