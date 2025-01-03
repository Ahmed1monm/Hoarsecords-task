export function calculateDelay(time?: Date) {
    return time
        ? new Date(time).getTime() - Date.now()
        : 0
}
