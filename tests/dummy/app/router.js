import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('bootstrap');
  this.route('inline');
  this.route('semantic-ui');
  this.route('dynamic');
});

export default Router;
