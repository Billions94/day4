// import { isThisISOWeek } from 'date-fns/esm'
import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
// import ListGroupItem  from 'react-bootstrap/ListGroupItem'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DeleteComments from './DeleteComments'

// import Button from 'react-bootstrap/Button'


class Comments extends React.Component {

    state = {
         comments: [],
      addComment: {
          comment: '',
             rate: '',
        elementId: this.props.id
        }
    }


    fetchComments = async(id) => {
        try {

            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/` + id ,{
                headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjJhYTRiYjUzZDAwMTViMTllZGUiLCJpYXQiOjE2MzI5OTgxNzMsImV4cCI6MTYzNDIwNzc3M30.W2FmJgztmFyCsYsNpP-CJ5-vBcKzZG3RTeo4CLvwNR8"
                }
                })
                if (response.ok){
                    const data = await response.json()
                    console.log(`Here is your data` + data)
                    this.setState({
                        comments: data
                    })
                    console.log(this.state.comments)

    
                } else {
                    console.log(`An error occurred while trying to fetch data`)
                }

                
        } catch (e) {
            console.error(e)
        }
    }

    postComment = async (e)=>{
        e.preventDefault()
    
        

        try{
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/', {
                method: 'POST',
                body:JSON.stringify(this.state.addComment),
                headers: {
             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjJhYTRiYjUzZDAwMTViMTllZGUiLCJpYXQiOjE2MzI5OTgxNzMsImV4cCI6MTYzNDIwNzc3M30.W2FmJgztmFyCsYsNpP-CJ5-vBcKzZG3RTeo4CLvwNR8",
             "Content-Type": "application/json"
            }
            })
            if(response.ok){
                alert('Your review was successfully added')
                                this.setState({
                    ...this.state.addComment, addComment: {
                        comment: '',
                        rate: '',
                        elementId: ''
                    }
                })
                
               
            }else{
                alert('Yikes!!! an error occurred while trying to add the review')
            }

        } catch(e){
            console.log(`yikes we got an error`, e)
        }
        
        

    }

    componentDidMount = async() => {
        this.fetchComments(this.props.id)

    }

    

    render() {
        return (
            <div>


            <Form onSubmit={this.postComment}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="text-light">Rate book</Form.Label>
                    <Form.Control as="select" 
                     value={this.state.addComment.rate}
                     onChange={e => this.setState({
                        addComment: {
                        ...this.state.addComment,
                        rate: e.target.value
                       }
                    })}
                    >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="text-light">Write a review</Form.Label>
                    <Form.Control as="textarea" rows={3}
                     value={this.state.addComment.comment}
                     onChange={e => this.setState({
                         addComment: {
                         ...this.state.addComment,
                         comment: e.target.value
                        }
                     })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                        Submit
                </Button>
            </Form>

            {
                
                this.state.comments.map(info => (
                    <div>
                        <ListGroup.Item key={info._id}>{info.comment}</ListGroup.Item>
                        <DeleteComments key={info.id} id={info._id}/>
                    </div>
                    ))
                    
                }
                   
            </div>
        )
    }
}

export default Comments