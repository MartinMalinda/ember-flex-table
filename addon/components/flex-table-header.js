import { bool } from '@ember/object/computed';
import Component from '@ember/component';
import $ from 'jquery';
import { run } from '@ember/runloop';
import layout from '../templates/components/flex-table-header';

export default Component.extend({
  layout,

  // attributeBindings: ['style'],
  classNameBindings: ['isResizing:resizing-column'],
  classNames: 'flex-header-wrap',

  mappedColumns: [],
  draggedColumn: null,
  draggedColumnPosX: null,

  canSort: true,

  isResizing: bool('draggedColumn'),

  cancelDragging(){

    // trigger action to save column width to LocalStorage
    if(this.get('draggedColumn')){
      this.get('afterColumnResize')(this.get('draggedColumn'));
    }

    this.set('draggedColumn', null);

    run.later(this, () => {
      this.set('canSort', true);
    }, 100);
  },

  avoidTableShrinking(){
    const flexTable = $('.flex-table .table');
    $('.flex-content-wrap').css('min-width', flexTable.width());
  },

  mouseMove(event){
    const draggedColumn = this.get('draggedColumn');

    if(draggedColumn){
      const $wrapEl = this.$().parents().find('.flex-table-wrap');
      const wrapPosLeft = $wrapEl[0].getBoundingClientRect().x;
      let newWidth = $wrapEl.scrollLeft() - wrapPosLeft + event.clientX - this.get('draggedColumnPosX');
      const minWidth = this.get('draggedColumn.minWidth');
      if(newWidth < minWidth){
        newWidth = minWidth;
      }
      this.set('draggedColumn.width', newWidth);
    }
  },

  mouseUp(event){
    this.cancelDragging();
  },

  mouseLeave(event){
    this.cancelDragging();
  },

  actions: {
    setDraggedColumn(columnIndex, position){
      this.set('draggedColumn', this.get('mappedColumns')[columnIndex]);
      this.set('draggedColumnPosX', position);

      this.avoidTableShrinking();
      this.set('canSort', false);
    }
  }
});
