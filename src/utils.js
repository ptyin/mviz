export const ms2Str = ms => {
  const h = Math.floor(ms / (3600 * 1000)), m = Math.floor((ms % (3600 * 1000)) / (60 * 1000)),
    s = Math.floor((ms % (60 * 1000)) / (1000))
  return (h < 9 ? '0' + h : h) + ':' + (m < 9 ? '0' + m : m) + ':' + (s < 9 ? '0' + s : s)
}