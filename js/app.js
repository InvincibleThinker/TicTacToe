import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  window.addEventListener("storage", () => {
    view.render(store.game, store.stats);
  });
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
    view.render(store.game, store.stats);
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    view.render(store.game, store.stats);
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // view.handlePlayerMove(square, store.game.currentPlayer);
    store.plyerMove(+square.id);
    view.render(store.game, store.stats);

    // if (store.game.status.isComplete) {
    //   view.openModal(
    //     store.game.status.winner
    //       ? `${store.game.status.winner. name}, wins!`
    //       : "Tie!"
    //   );

    //   return;
    // }

    // view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
