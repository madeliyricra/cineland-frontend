import { useLayoutEffect, useState } from "react";
import { CandyCard } from "../../components";
import { useCineStore } from "../../hooks/useCineStore";
import type { ICineStore } from "../../interfaces/cine-store";
import { getCandies } from "../../services/apiServices";
import "./styles.css";

const Candies = () => {
	const { candies, setCandies } = useCineStore() as ICineStore;
	const [loading, setLoading] = useState<boolean>(true);

	const getData = async () => {
		try {
			const { data } = await getCandies();
			setCandies(data);
		} finally {
			setLoading(false);
		}
	};

	useLayoutEffect(() => {
		getData();
	}, []);

	return (
		<section className="candy-container">
			{" "}
			{loading &&
				Array.from({ length: 6 }, (_, index) => (
					<div
						className="candy-card loading-card"
						key={index}
						style={{ height: "200px" }}
					></div>
				))}
			{!loading &&
				candies?.map((candy) => <CandyCard key={candy.id} {...candy} />)}
			{!loading && !candies?.length && (
				<div className="not-premiers">
					<h2>¡No hay estrenos disponibles!</h2>
				</div>
			)}
		</section>
	);
};

export default Candies;
