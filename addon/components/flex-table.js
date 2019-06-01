import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';
import { A } from '@ember/array';
import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { run } from '@ember/runloop';
import $ from 'jquery';
import EmberObject, { computed } from '@ember/object';
import layout from '../templates/components/flex-table';

export default Component.extend({
  layout,

  localStorage: service('flex-table-local-storage'),

  classNames: ['flex-table'],

  $thead: null,
  $el: null,
  scrollTop: null,

  columns: [],

  sortAsc: true,
  sortProperty: null, 

  tableId: 'flex-table',

  mappedColumns: computed(function(){
    // overwrite widths with those saved in localStorage
    const ls = this.get('localStorage');
    return A(this.get('columns').map(column => {
      let savedWidth = ls.getColumnWidth(this.get('tableId'), column.id);
      if(savedWidth){
        column.width = savedWidth;
      }

      return EmberObject.create(column);
    }));
  }),

  rowsSorting: computed('sortAsc', 'sortProperty', function(){
    let sortDir = this.get('sortAsc') ? 'asc' : 'desc';
    return [`${this.get('sortProperty')}:${sortDir}`];
  }),
  _sortedRows: sort('filteredRows','rowsSorting'),

  sortedRows: computed('_sortedRows.[]', 'sortProperty', function() {
    if (this.sortProperty) {
      return this._sortedRows;
    }

    return this.filteredRows;
  }),

  rows: computed('rowData.[]', function(){
    return A(this.get('rowData').map(row => EmberObject.create(row)));
  }),

  filteredRows: computed('rows.[]', 'mappedColumns.@each.filterBy', function(){

    let filterColumns = this.get('mappedColumns').filter(column => column.get('filterBy') && column.get('filterBy').length > 0);

    if (filterColumns.length) {
      return this.get('rows').filter(row => {
        return filterColumns.every(column => {
          return String(row.get(column.get('key'))).indexOf(column.get('filterBy')) > -1;
        });
      });
    }

    return this.rows;

  }),

  theadPositioningStyle: computed('scrollLeft', function(){
    return htmlSafe(`left: -${this.get('scrollLeft')}px`);
  }),

  setScrollLeft($el){
    this.set('scrollLeft', $el.scrollLeft());
  },

  moveTableHeaderOnHorizontalScroll($el){
    $el.scroll(() => {
      run.debounce(this, () => {
        this.setScrollLeft($el); 
      }, 0);
    });
  },

  didInsertElement() {
    const $el = $(this.element).find('.flex-table-wrap');
    this.set('$el', $el);
    this.moveTableHeaderOnHorizontalScroll($el);
    this.get('localStorage').initTableData(this.get('tableId'));
  },

  willDestroyElement() {
    this.get('$el').unbind('scroll');
  },

  actions: {
    switchSortProperty(property){
      if(property === this.get('sortProperty')){
        this.toggleProperty('sortAsc');
      } else {
        this.set('sortProperty', property);
      }
    },

    saveColumnWidth(column){
      const ls = this.get('localStorage');
      ls.setColumnWidth(this.get('tableId'), column.id, column.width);
      ls.save();
    }
  }

});
