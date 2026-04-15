declare module 'tiptap-extension-line-height' {
  import { Extension } from '@tiptap/core';

  export interface LineHeightOptions {
    types: string[];
    defaultLineHeight: string;
  }

  const LineHeight: Extension<LineHeightOptions>;
  export default LineHeight; // <-- Ubah bagian ini menjadi default export
}