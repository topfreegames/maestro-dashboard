export const randomString =
  (length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let result = ''
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

export const reduceRoomsStatuses = status => {
  const statuses = ['Creating', 'Occupied', 'Ready', 'Terminating']
  return statuses.reduce((acc, x) => acc + status[`roomsAt${x}`], 0)
}
