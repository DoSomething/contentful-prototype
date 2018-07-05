import React from 'react';
import PropTypes from 'prop-types';

class AccountControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isEditing: false,
      name: 'placeholder',
      birthday: 'June 4',
      email: 'bae@gmail.com',
      password: '•••••',
      phone: '555-5555',
    };
  }
  handleEdit() {
    this.setState({ isEditing: true });
  }

  handleSave(event) {
    this.setState({ isEditing: false });
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target);
    console.log(value);
    console.log(name);
    this.setState({ [name]: value });
  }

  render() {
    const isEditing = this.state.isEditing;

    if (isEditing) {
      return (
        <div>
          <div className="margin-top-lg">
            <h5>Name</h5>
            <div className="margin-top-md">
              <form>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </div>
          <div className="margin-top-lg">
            <h5>Birthday</h5>
            <div className="margin-top-md">
              <form>
                <input
                  type="text"
                  name="birthday"
                  value={this.state.birthday}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </div>
          <div className="margin-top-lg">
            <h5>Password</h5>
            <div className="margin-top-md">
              <form>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </div>
          <div className="margin-top-lg">
            <h5>Email</h5>
            <div className="margin-top-md">
              <form>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </div>
          <div className="margin-top-lg">
            <h5>Phone Number</h5>
            <div className="margin-top-md">
              <form>
                <input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </div>
          <SaveButton
            onClick={() => {
              if (
                window.confirm('Are you sure you want to make these changes?')
              )
                this.handleSave();
            }}
          />
        </div>
      );
    }
    return (
      <div>
        <div className="margin-top-lg">
          <h5>Name</h5>
          <div className="margin-top-md">
            <p> {this.state.name} </p>
          </div>
        </div>
        <div className="margin-top-lg">
          <h5>Birthday</h5>
          <div className="margin-top-md">
            <p> {this.state.birthday} </p>
          </div>
        </div>
        <div className="margin-top-lg">
          <h5>Password</h5>
          <div className="margin-top-md">
            <p>&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;</p>
          </div>
        </div>
        <div className="margin-top-lg">
          <h5>Email</h5>
          <div className="margin-top-md">
            <p>{this.state.email}</p>
          </div>
        </div>
        <div className="margin-top-lg">
          <h5>Phone Number</h5>
          <div className="margin-top-md">
            <p>{this.state.phone}</p>
          </div>
        </div>

        <EditButton onClick={this.handleEdit} />
      </div>
    );
  }
}
function SaveButton(props) {
  return (
    <button
      onClick={props.onClick}
      className="button margin-top-lg margin-bottom-lg"
    >
      Save Changes
    </button>
  );
}
function EditButton(props) {
  return (
    <button
      onClick={props.onClick}
      className="button margin-top-lg margin-bottom-lg"
    >
      Edit Profile
    </button>
  );
}
EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AccountControl;
