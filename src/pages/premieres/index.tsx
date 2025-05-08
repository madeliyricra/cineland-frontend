import { useLayoutEffect, useState } from "react";
import { PremierCard } from "../../components";
import "./styles.css";
import type { IPremiere } from "../../interfaces/premiere";
import { getPremieres } from "../../services/apiServices";

const Premieres = () => {
  const [premieres, setPremieres] = useState<IPremiere[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const { data } = await getPremieres();
      setPremieres(data);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <section className="premiers-container">
      {
        loading && (
          Array.from({ length: 5 }, (_, index) => (
            <div className="premier-card loading-card" key={index} style={{height: '200px'}}></div>
          ))
        )
      }
      {!loading && premieres?.map((premier) => (
        <PremierCard key={premier.id} {...premier} />
      ))}

      {!loading && !premieres?.length && (
        <div className="not-premiers">
          <h2>¡No hay estrenos disponibles!</h2>
        </div>
      )}
    </section>
  );
};

export default Premieres;
