import 'preact'

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
      /**
       * Deprecated HTML alignment attribute — GitHub's README sanitizer strips
       * CSS, so this is how a block is centered there. A plain string, since
       * `<td>` and MathML's `<mtable>` each narrow it to their own keywords.
       */
      align?: Signalish<string | undefined>
    }

    interface ImgHTMLAttributes<T extends EventTarget = HTMLImageElement> {
      /**
       * Deprecated HTML float attribute — GitHub's README sanitizer strips CSS,
       * so this is the only way to float images there.
       */
      align?: 'left' | 'right'
    }
  }
}
