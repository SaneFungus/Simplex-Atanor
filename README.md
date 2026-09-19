# Simplex Atanor

**Interfejs epistemicznej transmutacji** — przeglądarkowe narzędzie do porządkowania problemów, wyboru perspektywy analizy i generowania rozbudowanych promptów refleksyjnych.

🔗 **Uruchom aplikację:** [sanefungus.github.io/Simplex-Atanor](https://sanefungus.github.io/Simplex-Atanor/)

## O projekcie

Simplex Atanor pomaga przekształcić dowolne zagadnienie w ustrukturyzowany proces analityczny. Użytkownik wpisuje problem, wybiera formę transmutacji, fazę alchemiczną, sefiroty oraz parametry procesu, a następnie otrzymuje gotowy prompt do dalszej pracy z modelem językowym lub własnym procesem refleksji.

Aplikacja działa w całości po stronie klienta — nie wymaga backendu, instalacji ani konfiguracji serwera.

## Możliwości

- wprowadzanie zagadnienia w sekcji **Materia Prima**;
- wybór jednej z trzech form transmutacji:
  - **Separatio** — analityczny rozkład problemu na elementy fundamentalne;
  - **Coagulatio** — przełożenie wniosków na działania i praktyczne implementacje;
  - **Coniunctio** — integracja przeciwieństw i synteza dialektyczna;
- wybór fazy alchemicznej: **Nigredo**, **Albedo**, **Citrinitas** lub **Rubedo**;
- interaktywna mapa **Drzewa Życia** z możliwością wyboru sefirot;
- gotowe ścieżki analizy:
  - Analiza Systemowa;
  - Transformacja Praktyczna;
  - Synteza Dialektyczna;
  - Oczyszczenie Konceptualne;
- dostosowanie parametrów, takich jak głębia analizy, perspektywy epistemiczne, zakres czasowy, poziom systemowy i napięcie dialektyczne;
- ustawienie poziomu rekursji metapoznawczej;
- zapisywanie, wczytywanie i usuwanie konfiguracji w `localStorage` przeglądarki;
- podgląd wygenerowanego promptu oraz kopiowanie go do schowka;
- responsywny interfejs dostosowany do urządzeń mobilnych.

## Uruchomienie lokalne

Projekt jest statyczną aplikacją HTML/CSS/JavaScript. Najprościej otworzyć plik `index.html` w przeglądarce.

Dla środowiska lokalnego można również uruchomić prosty serwer HTTP, na przykład:

```bash
python3 -m http.server 8000
```

Następnie otwórz [http://localhost:8000](http://localhost:8000) w przeglądarce.

## Struktura projektu

```text
.
├── index.html   # Struktura interfejsu
├── script.js    # Logika aplikacji i generator promptów
├── styles.css   # Style, układ i responsywność
└── README.md    # Dokumentacja projektu
```

## Technologie

- HTML5
- CSS3
- JavaScript
- SVG — wizualizacja Drzewa Życia
- `localStorage` — przechowywanie szablonów po stronie użytkownika
- Font Awesome 6 — ikony interfejsu

## Przechowywanie danych i prywatność

Aplikacja nie korzysta z backendu. Zapisane szablony są przechowywane lokalnie w pamięci przeglądarki pod kluczem `simplexTemplates`. Treść zagadnienia i wygenerowane prompty nie są wysyłane przez aplikację do zewnętrznego serwera.

Wyczyszczenie danych witryny lub `localStorage` spowoduje usunięcie zapisanych konfiguracji.

## Ograniczenia

Przycisk **Transmutuj** generuje i wyświetla prompt w taki sam sposób jak **Podgląd**. Aplikacja nie wysyła promptu bezpośrednio do API modelu językowego — wygenerowaną treść należy skopiować i wykorzystać w wybranym narzędziu.

## Licencja

W repozytorium nie określono obecnie licencji. Przed ponownym wykorzystaniem lub dystrybucją kodu sprawdź warunki ustalone przez właściciela projektu.

## Autor

[SaneFungus](https://github.com/SaneFungus)
