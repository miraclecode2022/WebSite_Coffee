import React, { Component } from 'react';

class Input extends Component {
    constructor(props){
        super(props);
        this.state = {
            ten: "",
            ho: "",
            tuoi: 0,
            load: true
        }
    }

    componentDidMount = () => {
        this.setTitle()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    setTitle = () => {
        setTimeout(() => {
            this.setState({
                load: false
            })
        }, 5000)
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="ho" onChange={this.handleChange} /><br/>
                    <input name="ten" onChange={this.handleChange} /><br/>
                    <input name="tuoi" onChange={this.handleChange} /><br/>
                    <button type="submit">Gửi</button>
                    <br/>
                    { 
                        this.state.ho && this.state.ten && this.state.tuoi ? 
                            <div>
                                Họ và Tên : { this.state.ho + " " + this.state.ten }
                                <br/>
                                Tuổi: { this.state.tuoi }
                            </div>
                        : null
                    }
                </form>
            </div>
        );
    }
}

export default Input;