import Service from '@ember/service';
import { computed } from '@ember/object';
import { isPresent, isEmpty } from '@ember/utils';

export default Service.extend({

  data: null,
  namespace: 'ember-flex-table',

  defaultTableData: computed(function(){
    return {
      columnWidths: {

      },
      lastSortedBy: null
    }
  }),

  defaultData: computed(function(){
    let data = {
      tables: {
        common: JSON.parse(JSON.stringify(this.get('defaultTableData'))) 
      },
    };

    return data;
  }),

  init(){
    this._super(...arguments);

    this.initStorage();
  },

  initStorage(){
    let lsForNamespace = localStorage.getItem(this.get('namespace'));

    if(isPresent(lsForNamespace)){
      this.set('data', JSON.parse(lsForNamespace));
    } else {
     this.set('data', this.get('defaultData'));
    }
  },

  initTableData(tableId){
    let tables = this.get('data.tables');
    if(isEmpty(tables[tableId])){
      this.set(`data.tables.${tableId}`, this.get('defaultTableData'));
    }
  },

  save(){
    localStorage.setItem(this.get('namespace'), JSON.stringify(this.get('data')));
  },

  setColumnWidth(table, columnId, width){
    this.set(`data.tables.${table}.columnWidths.${columnId}`, width);
  },

  getColumnWidth(table, columnId){
    return this.get(`data.tables.${table}.columnWidths.${columnId}`);
  }

});
