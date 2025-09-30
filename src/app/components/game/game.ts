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

  selectedLanguage: string = "en";

  // Updated English Word List
  sectionWords: SectionWords[] = [
    {
      name: "Locations",
      modalInfo: "📍 Your Location",
      words: [
        // Original Words
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
        // New Sophisticated Words
        { name: "Observatory" },
        { name: "Embassy" },
        { name: "Conservatory" },
        { name: "Foundry" },
        { name: "Amphitheater" },
        { name: "Cathedral" },
        { name: "Laboratory" },
        { name: "Sanctuary" },
        { name: "Vineyard" },
        { name: "Atelier" },
        { name: "Penitentiary" },
        { name: "Bazaar" },
        { name: "Lighthouse" },
        { name: "Quarry" },
        { name: "Bunker" },
      ],
    },
    {
      name: "Notable Figures",
      modalInfo: "Your Notable Figure",
      words: [
        // Original Words
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
        { name: "Lionel Messi" }, // Corrected name
        { name: "Serena Williams" },
        { name: "Barack Obama" },
        { name: "Marilyn Monroe" },
        { name: "Cleopatra" },
        // New Sophisticated Words
        { name: "Marie Curie" },
        { name: "Nikola Tesla" },
        { name: "Vincent van Gogh" },
        { name: "William Shakespeare" },
        { name: "Socrates" },
        { name: "Galileo Galilei" },
        { name: "Martin Luther King Jr." },
        { name: "Frida Kahlo" },
        { name: "Nikolaus Copernicus" },
        { name: "Amelia Earhart" },
      ],
    },
    {
      name: "Artifacts & Implements",
      modalInfo: "Your Object",
      words: [
        // Original Words
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
        // New Sophisticated Words
        { name: "Abacus" },
        { name: "Gramophone" },
        { name: "Quill" },
        { name: "Telescope" },
        { name: "Microscope" },
        { name: "Scythe" },
        { name: "Anvil" },
        { name: "Chalice" },
        { name: "Loom" },
        { name: "Sundial" },
        { name: "Metronome" },
        { name: "Harpsichord" },
        { name: "Pocket Watch" },
      ],
    },
  ];

  // Turkish Word List for Localization
  sectionWords_tr: SectionWords[] = [
    {
      name: "Mekanlar",
      modalInfo: "📍 Konumun",
      words: [
        // Orijinal Kelimeler
        { name: "Hastane" },
        { name: "Okul" },
        { name: "Plaj" },
        { name: "Restoran" },
        { name: "Havaalanı" },
        { name: "Kütüphane" },
        { name: "Spor Salonu" },
        { name: "Park" },
        { name: "Sinema" },
        { name: "Hayvanat Bahçesi" },
        { name: "Müze" },
        { name: "AVM" },
        { name: "Ofis" },
        { name: "Mutfak" },
        { name: "Garaj" },
        { name: "Bahçe" },
        { name: "Banyo" },
        { name: "Yatak Odası" },
        { name: "Otel" },
        { name: "Banka" },
        { name: "Karakol" },
        { name: "İtfaiye İstasyonu" },
        { name: "Süpermarket" },
        { name: "Eczane" },
        { name: "Kafe" },
        { name: "Berber Dükkanı" },
        { name: "Benzin İstasyonu" },
        { name: "Tren İstasyonu" },
        { name: "Gözlemevi" },
        { name: "Büyükelçilik" },
        { name: "Konservatuvar" },
        { name: "Dökümhane" },
        { name: "Amfitiyatro" },
        { name: "Katedral" },
        { name: "Laboratuvar" },
        { name: "Koruma Alanı" },
        { name: "Üzüm Bağı" },
        { name: "Atölye" },
        { name: "Cezaevi" },
        { name: "Çarşı" },
        { name: "Deniz Feneri" },
        { name: "Taş Ocağı" },
        { name: "Sığınak" },
      ],
    },
    {
      name: "Ünlüler",
      modalInfo: "Senin ünlün",
      words: [
        // Orijinal İsimler
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
        { name: "Lionel Messi" },
        { name: "Serena Williams" },
        { name: "Barack Obama" },
        { name: "Marilyn Monroe" },
        { name: "Kleopatra" },
        // Yeni İsimler
        { name: "Marie Curie" },
        { name: "Nikola Tesla" },
        { name: "Vincent van Gogh" },
        { name: "William Shakespeare" },
        { name: "Sokrates" },
        { name: "Galileo Galilei" },
        { name: "Martin Luther King Jr." },
        { name: "Frida Kahlo" },
        { name: "Nikolas Kopernik" },
      ],
    },
    {
      name: "Eşyalar & Aletler",
      modalInfo: "Senin Nesnen",
      words: [
        // Orijinal Nesneler
        { name: "Dizüstü Bilgisayar" },
        { name: "Bisiklet" },
        { name: "Akıllı Telefon" },
        { name: "Sırt Çantası" },
        { name: "Kamera" },
        { name: "Piyano" },
        { name: "Araba" },
        { name: "Gözlük" },
        { name: "Şemsiye" },
        { name: "Mikrodalga" },
        { name: "Şişe" },
        { name: "Kol Saati" },
        { name: "Kitap" },
        { name: "Sandalye" },
        { name: "Masa" },
        // Yeni Nesneler
        { name: "Abaküs" },
        { name: "Gramofon" },
        { name: "Teleskop" },
        { name: "Mikroskop" },
        { name: "Tırpan" },
        { name: "Örs" },
        { name: "Kadeh" },
        { name: "Dokuma Tezgahı" },
        { name: "Güneş Saati" },
        { name: "Metronom" },
        { name: "Cep Saati" },
      ],
    },
  ];

  selectedSection: SectionWords = this.sectionWords.find((s) =>
    s.name = "Places"
  )!;

  activeSectionWords: SectionWords[] = this.sectionWords;
  languages: string[] = ["en", "tr"];

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

  setLanguage(): void {
    console.log(this.selectedLanguage);
    if (this.selectedLanguage === "tr") {
      this.activeSectionWords = this.sectionWords_tr;
    } else {
      this.activeSectionWords = this.sectionWords;
    }
    this.selectedSection = this.activeSectionWords[0];
  }

  addPlayer(): void {
    if (this.newPlayerName.trim() && !this.gameState.gameStarted) {
      const player: Player = {
        name: this.newPlayerName.trim(),
        isSpy: false,
        hasViewed: false,
      };

      this.gameState.players.push(player);

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
