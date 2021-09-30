// import { isThisISOWeek } from 'date-fns/esm'
import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
// import ListGroupItem  from 'react-bootstrap/ListGroupItem'
import FormControl  from 'react-bootstrap/FormControl'


class Comments extends React.Component {

    state = {
         comments: [],
      addComments: {
          comment: '',
             rate: '',
        elementId: ''
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

    postComment = async (comment)=>{
        try{
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/', {
                method: 'POST',
                body:JSON.stringify(comment),
                headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMWM5NDRiYjUzZDAwMTViMTllY2MiLCJpYXQiOjE2MzMwMDE1NzksImV4cCI6MTYzNDIxMTE3OX0.WGqdgb0uXW7-MCUC94FOKrTEainfaSnnNBv6Le-F7uA",
            'Content-Type': 'application/json',
        }
            }
            )
            if(response.ok){
                console.log('we made it')
                
               
            }else{
                console.log('sike!!! you thought')
            }

        }
        catch{
            console.log('error')

        }
        

    }

    componentDidMount = async() => {
        this.fetchComments(this.props.id)

    }

    render() {
        return (
            <div>
                {
                
                this.state.comments.map(info => (
                    <ListGroup.Item key={info._id}>{info.comment}</ListGroup.Item>
                    ))
                }

        <FormControl
            placeholder="comment"
            onClick={(event)=>{
                    event.target.value.length > 3 &&
                    console.log(this.state.comments)

                    this.setState({
                        addComments : {
                            comment: event.target.value,
                            rate: '4',
                            elementId: this.state.comments[0].elementId
                        }
                    })
                    this.postComment(this.state.addComments)}}/>
            </div>
        )
    }
}

export default Comments