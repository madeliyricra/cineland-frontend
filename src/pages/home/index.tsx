import { PremierCard } from "../../components";
import { PREMIERS } from "../../utils/data";
import "./styles.css";

const Home = () => {
    return (
        <section className="premiers-container">
            {PREMIERS?.map((premier) => (
                <PremierCard key={premier.id} {...premier} />
            ))}
        </section>
    );
};

export default Home;
