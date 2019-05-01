import React, { Component } from 'react'
import { Form, Button, Container, Input, Radio, Message, Redirect, Select } from 'semantic-ui-react'

class ProfileEdit extends Component{
  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: "",
    band: '',
    location: "",
    commitment: "",
    soundcloud: "",
    youtube: ""
    // errors: false,
    // errorMessage: '',
    // redirect: false
  }

  handleChange = (e, { value }) => this.setState({ band: value }, () => console.log(this.state))

  onClick = (event) =>{
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }
    fetch(`http://localhost:3000/api/v1/users`,options)
    .then(resp=>resp.json())
    // .then(this.handleResponse)
  }

  // handleResponse = (resp) => {
  //   if (resp.status === 400){
  //     this.setState({errors: true, errorMessage: resp.messages[0]})
  //   } else if (resp.status === 200){
  //     this.props.logIn({auth: {email: this.state.email, password:this.state.password}})
  //     this.setState({redirect:true})
  //   }
  // }

  render(){
    const options = [
      { key: 'c', text: 'Casual Jam', value: 'causal jam' },
      { key: 'o', text: 'Ongoing Jam', value: 'ongoing jam' },
    ]
    return(
      <Container>
        {this.state.errors && <Message negative>{this.state.errorMessage}</Message>}
        <Form >
        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Band'
              name='radioGroup'
              value={true}
              checked={this.state.band}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Individual'
              name='radioGroup'
              value={false}
              checked={!this.state.band}
              onChange={this.handleChange}
            />
          </Form.Field>
          </Form.Group>
          <Form.Input label='Name' placeholder='Enter your name' name='name' required onChange={this.onChange}/>
          <Form.Input label='Email' placeholder='Email' name='email' required onChange={this.onChange}/>
          <Form.Input label='Password' placeholder='Password' type='password' name='password' required onChange={this.onChange}/>
          <Form.Input label='Confirm Password' placeholder='Password' type='password' name='password_confirmation' required onChange={this.onChange}/>
          <Form.Input label='Location' placeholder='Enter your address / city' name='location' onChange={this.onChange} />
          <Form.Field control={Select} label='Commitment' options={options} placeholder='Commitment' />
          <Form.Group widths='equal'>
          <Form.Field control={Input} label='Soundcloud' placeholder='username' name='soundcloud' onChange={this.onChange}/>
          <Form.Field control={Input} label='Youtube' placeholder='username' name='youtube' onChange={this.onChange}/>
          </Form.Group>
          <Button onClick={this.onClick}>Submit</Button>
        </Form>
        {this.state.redirect && <Redirect to={"/"} />}
      </Container>
    )
  }
}

export default ProfileEdit