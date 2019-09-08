import Controller, { inject as controller } from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  application: controller(),

  init() {
    this._super(...arguments);

    this.set('columns', [...this.application.columns]);
    this.set('rowData', [...this.application.rowData]);
  },

  actions: {
    toggleSource() {
      this.set('rowData', A([]));
      this.rowData.push([{ name: 'foo' }]);
    }
  }
});
