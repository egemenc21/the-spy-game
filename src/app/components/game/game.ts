import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface Player {
  name: string;
  isSpy: boolean;
  hasViewed: boolean;
}

interface GameState {
  players: Player[];
  gameStarted: boolean;
  currentWord: string;
  showModal: boolean;
  modalPlayer: Player | null;
}

interface SectionWords {
  name: string;
  modalInfo: string;
  words: Words[];
}

interface Words {
  name: string;
  isSelected?: boolean;
}

@Component({
  selector: "app-game",
  imports: [CommonModule, FormsModule],
  templateUrl: "./game.html",
  styleUrl: "./game.css",
})
export class Game implements OnInit {
  newPlayerName: string = "";
  gameState: GameState = {
    players: [],
    gameStarted: false,
    currentWord: "",
    showModal: false,
    modalPlayer: null,
  };

  sectionWords: SectionWords[] = [
    {
      name: "Places",
      modalInfo: "📍 Your Location",
      words: [
        { name: "Hospital" },
        { name: "School" },
        { name: "Beach" },
        { name: "Restaurant" },
        { name: "Airport" },
        { name: "Library" },
        { name: "Gym" },
        { name: "Park" },
        { name: "Cinema" },
        { name: "Zoo" },
        { name: "Museum" },
        { name: "Mall" },
        { name: "Office" },
        { name: "Kitchen" },
        { name: "Garage" },
        { name: "Garden" },
        { name: "Bathroom" },
        { name: "Bedroom" },
        { name: "Hotel" },
        { name: "Bank" },
        { name: "Police Station" },
        { name: "Fire Station" },
        { name: "Supermarket" },
        { name: "Pharmacy" },
        { name: "Coffee Shop" },
        { name: "Barber Shop" },
        { name: "Gas Station" },
        { name: "Train Station" },
      ],
    },
    {
      name: "Famous People",
      modalInfo: "Your Famous Person",
      words: [
        { name: "Albert Einstein" },
        { name: "Leonardo da Vinci" },
        { name: "Elon Musk" },
        { name: "Oprah Winfrey" },
        { name: "Nelson Mandela" },
        { name: "Steve Jobs" },
        { name: "Bill Gates" },
        { name: "Taylor Swift" },
        { name: "Cristiano Ronaldo" },
        { name: "Michael Jackson" },
        { name: "Messi" },
        { name: "Serena Williams" },
        { name: "Barack Obama" },
        { name: "Marilyn Monroe" },
        { name: "Cleopatra" },
      ],
    },
    {
      name: "Objects",
      modalInfo: "Your object",
      words: [
        { name: "Laptop" },
        { name: "Bicycle" },
        { name: "Smartphone" },
        { name: "Backpack" },
        { name: "Camera" },
        { name: "Piano" },
        { name: "Car" },
        { name: "Glasses" },
        { name: "Umbrella" },
        { name: "Microwave" },
        { name: "Bottle" },
        { name: "Watch" },
        { name: "Book" },
        { name: "Chair" },
        { name: "Table" },
      ],
    },
  ];

  selectedSection: SectionWords = this.sectionWords.find((s) =>
    s.name = "Places"
  )!;

  ngOnInit(): void {
    if (
      localStorage.getItem("currentPlayers") &&
      localStorage.getItem("currentPlayers") !== "" &&
      localStorage.getItem("currentPlayers") != null
    ) {
      this.gameState.players = JSON.parse(
        localStorage.getItem("currentPlayers") as string,
      );
    }
  }

  addPlayer(): void {
    if (this.newPlayerName.trim() && !this.gameState.gameStarted) {
      const player: Player = {
        name: this.newPlayerName.trim(),
        isSpy: false,
        hasViewed: false,
      };

      this.gameState.players.push(player);

      // just always update storage after change
      localStorage.setItem(
        "currentPlayers",
        JSON.stringify(this.gameState.players),
      );

      this.newPlayerName = "";
    }
  }

  removePlayer(index: number): void {
    if (!this.gameState.gameStarted) {
      this.gameState.players.splice(index, 1);
      if (localStorage.getItem("currentPlayers")) {
        localStorage.setItem(
          "currentPlayers",
          JSON.stringify(this.gameState.players),
        );
      }
    }
  }

  startGame(): void {
    if (this.gameState.players.length < 3) return;

    // If all words are used, don't start a new round
    if (this.allWordsUsed()) {
      alert(
        `All words in the "${this.selectedSection.name}" section have been used!`,
      );
      return;
    }

    this.gameState.players.forEach((player) => {
      player.hasViewed = false;
      player.isSpy = false;
    });

    const spyIndex = Math.floor(Math.random() * this.gameState.players.length);
    this.gameState.players[spyIndex].isSpy = true;

    // pick a random unused word
    const unusedWords = this.selectedSection.words.filter((word) =>
      !word.isSelected
    );
    const randomWord =
      unusedWords[Math.floor(Math.random() * unusedWords.length)];
    randomWord.isSelected = true;

    console.log(unusedWords);

    this.gameState.currentWord = randomWord.name;
    this.gameState.gameStarted = true;
  }

  showPlayerInfo(player: Player): void {
    if (!this.gameState.gameStarted) return;
    this.gameState.modalPlayer = player;
    this.gameState.showModal = true;
    player.hasViewed = true;
  }

  closeModal(): void {
    this.gameState.showModal = false;
    this.gameState.modalPlayer = null;
  }

  endGame(): void {
    this.gameState.gameStarted = false;
    this.gameState.showModal = false;
    this.gameState.modalPlayer = null;
  }

  newRound(): void {
    this.endGame();
    this.startGame();
  }

  allPlayersViewed(): boolean {
    return this.gameState.players.every((player) => player.hasViewed);
  }

  allWordsUsed(): boolean {
    return this.selectedSection.words.every((word) => word.isSelected);
  }

  getViewedCount(): number {
    return this.gameState.players.filter((player) => player.hasViewed).length;
  }
}
