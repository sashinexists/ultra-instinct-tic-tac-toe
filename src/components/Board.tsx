import square from "../shared/square";
import Square from "./Square";

interface Props {
  position: number;
  board: Array<square>;
  takeTurn: Function;
  isActive: boolean;
  winner: square;
}

export default function Board(props: Props) {
  const { board, position, takeTurn, isActive, winner } = props;
  return (
    <div
      className={`board board-${position} board-active__${isActive} board-victory__${winner}`}
    >
      {board.map((sq, i) => {
        return (
          <Square
            key={i}
            board={position}
            position={i}
            value={sq}
            takeTurn={takeTurn}
          />
        ); //value will be changed to sq
      })}
    </div>
  );
}
