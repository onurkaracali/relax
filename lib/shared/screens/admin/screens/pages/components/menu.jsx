import Component from 'components/component';
import ListHeader from 'components/list-header';
import ListSearchFilter from 'components/list-search-filter';
import Modal from 'components/modal';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import List from './list';
import New from './new';

export default class PagesMenu extends Component {
  static fragments = List.fragments;

  static propTypes = {
    children: PropTypes.node,
    pages: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
    closeNew: PropTypes.func.isRequired,
    activePageId: PropTypes.string,
    newOpened: PropTypes.bool.isRequired
  };

  render () {
    const {pages, onBack, onNew, activePageId} = this.props;

    return (
      <div>
        <ListHeader
          title='Pages'
          onBack={onBack}
          newIcon='nc-icon-outline ui-2_window-add'
          onNew={onNew}
        />
        <ListSearchFilter />
        <Scrollable className={styles.list}>
          <List pages={pages} activePageId={activePageId} />
        </Scrollable>
        {this.renderNew()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New Page' title='What should we call it?' onClose={closeNew}>
          <New fragments={PagesMenu.fragments} onClose={closeNew} />
        </Modal>
      );
    }
  }
}
