import Card from 'react-bootstrap/Card'
import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Comments from './Comments'


class SingleBook extends Component {
  state = {
    selected: false,

  }

            handleToggle = () => {
                this.setState({ 
                    selected: !this.state.selected 
                })
            }

//   handleBook = () => {
//         // this.setState({book: })
//   }

  render() {

    return (

        
             
        <div className="mt-4 mb-5 ml-2">
                <div>
                    <Card onClick={this.handleToggle}  key={this.props.book.asin}  style={{ width: '16rem' }}>
                        <Card.Img variant="top" src={this.props.book.img}  style={{ height: '20rem' }} />
                        <Card.Body>
                            <Card.Title className="clamp">{this.props.book.title}</Card.Title>
                            <h5 className="d-inline-block">
                            Category:   {this.props.book.category}
                            </h5>                               
                            <div className="d-flex justify-content-between">
                                <Button variant="warning">Buy</Button> 
                                <div>{"€" + this.props.book.price}</div>                           
                            </div>
                        </Card.Body>
                    </Card>
                </div> 


                <div>
                    {
                        this.state.selected ?
                        <Comments id={this.props.book.asin}/>  
                        :
                        null                 
                    }
                </div>
            </div>
        

          )

         }
}




export default SingleBook

