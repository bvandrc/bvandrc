import 'preact'

declare module 'preact' {
  namespace JSX {
    interface ImgHTMLAttributes<T extends EventTarget = HTMLImageElement> {
      /**
       * Deprecated HTML float attribute — GitHub's README sanitizer strips CSS,
       * so this is the only way to float images there.
       */
      align?: 'left' | 'right'
      /** Deprecated HTML margin attribute — the only way to space images in a GitHub README. */
      vspace?: number | string
    }
  }
}
