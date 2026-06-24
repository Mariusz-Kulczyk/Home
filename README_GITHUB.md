# Publikacja na GitHub Pages

Ta wersja jest statyczna: HTML, CSS, JavaScript oraz lokalne pliki multimedialne. Nie wymaga PHP, bazy danych ani panelu CMS.

## Wrzucenie na GitHub

1. Rozpakuj ten ZIP.
2. Utwórz nowe repozytorium na GitHub.
3. Wgraj **zawartość tego folderu** do głównego katalogu repozytorium — plik `home.html` ma znaleźć się w katalogu głównym.
4. W repozytorium przejdź do **Settings → Pages**.
5. Wybierz **Deploy from a branch**, potem gałąź `main` i folder `/(root)`.
6. Zapisz ustawienia. GitHub pokaże adres strony po zakończeniu publikacji.

## Ważne

- Nie wgrywaj pliku ZIP bezpośrednio do repozytorium.
- Wielkość liter w nazwach plików ma znaczenie, więc nie zmieniaj nazw plików ani katalogów.
- Barometr pobiera dane z opublikowanego Google Sheets / Google Charts. Do działania wymaga internetu oraz publicznego arkusza.
- Planer nie ma wpisanego klucza API. Użytkownik podaje własny klucz Gemini wyłącznie w przeglądarce.
- `site-mobile.css` i `site-mobile.js` odpowiadają za układ mobilny i menu na telefonach.

## Nazwy adresów
- `home.html`, `home-en.html`, `home-de.html` — strona główna
- `projects.html`, `projects-en.html`, `projects-de.html` — Projekty
- `articles.html`, `articles-en.html`, `articles-de.html` — Artykuły
- `articles-1.html`, `articles-2.html`, … — kolejne artykuły; odpowiedniki językowe mają końcówki `-en` i `-de`
- `loadplanner.html`, `loadplanner-en.html`, `loadplanner-de.html` — Loadplanner
- `barometr.html`, `barometr-en.html`, `barometr-de.html` — Barometr

`index.html` pozostaje tylko wejściem GitHub Pages i przekierowuje na `home.html`.
