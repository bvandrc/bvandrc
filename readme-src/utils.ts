import octicons from '@primer/octicons'

/** Wraps an octicon's path in an SVG data URI usable as a shields.io logo. */
export const octiconLogo = (name: string, fill: string) => {
  const { path } = octicons[name].heights['16']
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#${fill}">${path}</svg>`
  const b64 = Buffer.from(svg).toString('base64')
  return `data:image/svg%2Bxml;base64,${encodeURIComponent(b64)}`
}
