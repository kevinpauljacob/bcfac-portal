import React from "react";

const account = () => {
	const submit = () => {}

  return (
    <div>
      <p className="text-xl py-5">Account Settings</p>
      <div className="flex py-1">
        <label htmlFor="email">Email:&nbsp;</label>
        <p>sr6015@srmist.edu.in</p>
      </div>
      <div className="flex py-1">
        <label htmlFor="name">Name:&nbsp;</label>
        <p>Berlin</p>
      </div>
      <div className="flex py-1">
        <label htmlFor="regno">Registration Number:&nbsp;</label>
        <p>RA2111050010006</p>
      </div>
      <form onSubmit={submit}>
        <div className="flex py-1">
          <label htmlFor="passwordChange">Change Password:&nbsp;</label>
          <input
            type="password"
            id="passwordChange"
            name="passwordChange"
            className="border-2 rounded-sm"
          />
        </div>
				<br />
				<button type="submit" className="border p-2 rounded-md">Save Changes</button>
      </form>
			
    </div>
  );
};

export default account;
