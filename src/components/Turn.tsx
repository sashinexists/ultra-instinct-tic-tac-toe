import square from "../shared/square";

interface Props {
  winner: square;
  isXTurn: boolean;
}

export default function Turn(props: Props) {
  const { winner, isXTurn } = props;
  const value = isXTurn ? square["x"] : square["o"];
  if (winner === square["blank"]) {
    return (
      <section className="info-box whosTurn">
        <p>
          <span className={`whosTurn-symbol whosTurn-symbol__${value}`}>
            {value}
          </span>
          's turn
        </p>
      </section>
    );
  } else {
    return (
      <section className={`info-box winner winner__${value}`}>
        <p>
          <span className={`winner-symbol winner-symbol__${value}`}>
            {value}
          </span>
         wins!
        </p>
      </section>
    );
  }
}
