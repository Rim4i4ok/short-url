import React from "react";

export const AuthPage = () => {
	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Short url</h1>
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">Authentication</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Enter email"
									id="email"
									type="text"
									name="email"
									className="yellow-input"
								/>
								<label htmlFor="email">Email</label>
							</div>

							<div className="input-field">
								<input
									placeholder="Enter password"
									id="password"
									type="password"
									name="password"
									className="yellow-input"
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button className="btn yellow darken-4" style={{ marginRight: 10 }}>
							Sign in
						</button>
						<button className="btn grey lighten-4 black-text">Register</button>
					</div>
				</div>
			</div>
		</div>
	);
};
