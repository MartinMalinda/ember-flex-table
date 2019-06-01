import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import $ from 'jquery';
import layout from '../templates/components/flex-table-col-header';
import { equalProperties } from 'ember-flex-table/macros/logic';

export default Component.extend({
  layout,

  tagName: 'th',
  classNames: ['flex-table-col-header'],
  attributeBindings: ['style'],

  isBeingSorted: equalProperties('column.key', 'sortProperty'),
  style: computed('index','column.width', function(){
    return htmlSafe(`z-index:${100 - this.get('index')};width:${this.get('column.width')}px`);
  }),


  caretDirection: computed('sortAsc','isBeingSorted', function(){
    if(this.get('sortAsc') && this.get('isBeingSorted')){
      return 'up';
    }
    return 'down';
  }),

  mouseDown(event){
    if(event.target.className === "right handle"){

      // right handle was clicked, sending out index of this column and it's position
      this.attrs.onDrag(this.get('index'), $(this.element).position().left);

    }
  },

  click(event){
    if(event.target.className !== "form-control ember-view ember-text-field"){
      if(this.get('column.sortable') && this.get('canSort')){
        this.get('onClick')(this.get('column.key'));
      }
    }
  }
});
