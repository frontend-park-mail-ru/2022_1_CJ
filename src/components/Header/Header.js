import { Component } from '../../core/models/Component.js';
import { userAsyncActions, userStore } from '../../core/modules/Stores/UserStore.js';

export class HeaderComponent extends Component {
  afterRender() {
    userStore.dispatch(userAsyncActions.getData);
    super.afterRender();
  }
}
