import type { ComponentChildren } from 'preact'

/** Renders each line separated by `<br />`. */
export const Lines = ({ lines }: { lines: ComponentChildren[] }) =>
  lines.map((line, i) => (
    <>
      {i > 0 && <br />}
      {line}
    </>
  ))
