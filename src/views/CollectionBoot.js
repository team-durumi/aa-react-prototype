
import React, { Suspense, lazy, Component} from 'react';
import '../css/da-objects.css';

export default class CollectionBoot extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      isLoaded: false,
      collection: []
    };

  }

  //API 호출
  componentDidMount() {
    fetch("/dummy/CollectionBoot.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            collection: result
          });

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

  }

  render() {

    const { error, isLoaded, collection } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading.........</div>;
    } else {

      var ItemType = null;

      return (
        <div className="daCol">

          {collection.map(function(item, i){
            ItemType = React.lazy(() => import('../components/daMdlBoot/'+item.type+'/'+item.name+'.js'));
            return (
              <Suspense fallback={<div>Loading...</div>} key={i}>
                <ItemType data={item.props}/>
              </Suspense>
            );
          })}

        </div>
      );

    }
  }
}


