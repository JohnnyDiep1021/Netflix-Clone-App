import React from "react";

import "./NewUser.scss";

const NewUser = () => {
  return (
    <div className="newUser-container">
      <h1 className="newUser-title">New User</h1>
      <form className="newUser-form">
        <div className="newUser-item">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div>
        <div className="newUser-item">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUser-item">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUser-item">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUser-item">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUser-item">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUser-item">
          <span className="newUser-title">Gender</span>
          <div className="newUser-gender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUser-item">
          <label>Active</label>
          <select className="newUser-select" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUser-btn">Create</button>
      </form>
    </div>
  );
};

export default NewUser;
