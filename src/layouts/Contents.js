
import React, {lazy, Suspense, Component} from 'react';
//import Collection from '../views/Collection';

const Collection = React.lazy(() => import('../views/Collection.js'));
const CollectionBoot = React.lazy(() => import('../views/CollectionBoot.js'));

/*
  const LoadableOtherComponent = Loadable({
    loader: () => import('../views/Collection.js'),
    loading: () => <div>Loading...</div>
  });
*/

export default class Contents extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    if(this.props.view === "Collection"){
      return (
        <Suspense fallback={<div>Loading...</div>}>
           <Collection item={this.props.item} />
        </Suspense>
      );
    }else if(this.props.view === "CollectionBoot"){
      return (
        <Suspense fallback={<div>Loading...</div>}>
           <CollectionBoot item={this.props.item} />
        </Suspense>
      );
    }
  }
}

