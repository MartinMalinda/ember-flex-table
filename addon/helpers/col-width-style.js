import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function colWidthStyle([width]) {
  return htmlSafe(`width: ${width}px`);
}

export default buildHelper(colWidthStyle);
