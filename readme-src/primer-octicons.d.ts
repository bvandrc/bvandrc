// @primer/octicons ships no type declarations — minimal typing for our usage
declare module '@primer/octicons' {
  interface Octicon {
    heights: Record<string, { path: string }>
  }
  const octicons: Record<string, Octicon>
  export default octicons
}
