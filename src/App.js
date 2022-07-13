import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	const [data, setData] = useState([]);

	const [search, setSearch] = useState("");

	const getMovie = async () => {
		const response = await axios.get(
			`https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json`
		);
		return response;
	};

	useEffect(() => {
		async function fetchData() {
			const response = await getMovie();
			setData(response.data);
		}
		fetchData();
	}, []);
	const re = new RegExp(search, "i");
	const filtered = data.filter((entry) =>
		Object.values(entry).some((val) => typeof val === "string" && val.match(re))
	);

	if (filtered !== "") {
		return (
			<div className="App">
				<h1>Game App</h1>
				<form className="d-flex" role="search">
					<input
						className="form-control w-25"
						style={{ margin: "auto" }}
						type="search"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</form>
				<div className="container">
					<div className="row">
						{filtered.map((data) => (
							<div className="col-md-4">
								<div className="card m-2">
									<div className="card-body">
										<h5 className="card-title">{data.title}</h5>
										<h5 className="card-title">{data.platform}</h5>
										<p className="card-text">{data.genre}</p>
										<p className="card-text">{data.score}</p>
										<p className="card-text">{data.editors_choice}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="App">
			<h1>Game App</h1>
			<form className="d-flex" role="search">
				<input
					className="form-control w-25"
					style={{ margin: "auto" }}
					type="search"
					placeholder="Search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
			<div className="container">
				<div className="row">
					{data.slice(1).map((data) => (
						<div className="col-md-4">
							<div className="card m-2">
								<div className="card-body">
									<h5 className="card-title">{data.title}</h5>
									<h5 className="card-title">{data.platform}</h5>
									<p className="card-text">{data.genre}</p>
									<p className="card-text">{data.score}</p>
									<p className="card-text">{data.editors_choice}</p>
									<div className="btn btn-primary">Go somewhere</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
