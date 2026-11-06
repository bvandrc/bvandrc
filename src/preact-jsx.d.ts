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
    interface IntrinsicElements {
      /**
       * Deprecated no-wrap element — with CSS stripped, the only way to keep a
       * README line from wrapping between two images, which `&nbsp;` cannot.
       */
      nobr: HTMLAttributes<HTMLElement>
    }
  }
}
