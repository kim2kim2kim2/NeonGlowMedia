# NeonsVideo - Dagens Lyspunkt

En fargerik videoapplikasjon som viser daglige morsomme videoklipp og kule bilder med YouTube-avspillingsfunksjonalitet.

![NeonsVideo Banner](https://images.unsplash.com/photo-1506259091721-347e791bab0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=550&q=80)

## Installasjon

For å kjøre NeonsVideo lokalt, følg disse stegene:

```bash
# Klon repoet
git clone https://github.com/dittbrukernavn/neonsvideo.git
cd neonsvideo

# Installer avhengigheter
npm install

# Start utviklingsserveren
npm run dev
```

Applikasjonen vil kjøre på http://localhost:5000

## Teknisk Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: SQLite (single-file database)
- **State Management**: TanStack Query (React Query)
- **Video Player**: React Player
- **Routing**: Wouter

## Milestones

### Milestone 1: Grunnleggende Applikasjonsstruktur ✅
- Sett opp prosjektstrukturen med Express backend og React frontend
- Implementert data lagring med MemStorage
- Definert datamodeller for videoer og bilder
- Skapt API-endepunkt for å hente innhold

### Milestone 2: Frontend UI Components ✅
- Designet og implementert Header-komponent
- Laget Navigation-komponent med kategoribytte
- Utviklet FeaturedVideo-komponent med YouTube-integrasjon
- Bygget VideoCard og ImageCard-komponenter
- Implementert VideoCategory og ImageCategory-komponenter for å vise innholdstyper

### Milestone 3: Interaktivitet og Brukervennlighet ✅
- Lagt til modal-visning for videoer og bilder
- Implementert YouTube-avspilling i modaler
- Designet responsiv layout for mobil, nettbrett og desktop
- Lagt til animasjoner og overgangseffekter med Tailwind

### Milestone 4: Innholdsadministrasjon og Filtrering 🔄
- Implementere filtrering av innhold etter kategori
- Legge til søkefunksjonalitet
- Utvikle administratorgrensesnitt for å legge til innhold
- Innføre brukerautentisering for administrasjon

### Milestone 5: Forbedret Brukerengasjement ⏳
- Implementere likerklikk og favoritter
- Legge til kommentarfunksjonalitet
- Utvikle deling til sosiale medier
- Personlige anbefalinger basert på brukerens preferanser

## Layout

NeonsVideo er strukturert med en enkel og intuitiv layout:

1. **Header**: Inneholder logo og logg inn-knapp
2. **Navigasjon**: Kategori-navigasjon med neon-indikatorer for aktiv kategori
3. **Hovedseksjon**:
   - **Dagens Høydepunkt**: Et fremhevet video øverst på siden
   - **Kategoriseksjoner**: Separate seksjoner for morsomme videoer, kule bilder og musikk
4. **Footer**: Inneholder logo, sosiale media-ikoner og copyright-informasjon

Hver kategori er markert med sin egen neonaktige signalfarge:
- Morsomme videoer: Neon rosa (#FF1493)
- Kule bilder: Neon blå (#00BFFF)
- Musikk: Neon grønn (#39FF14)
- Trender: Neon gul (#FFFF00)

## Innholdsadministrasjon

### Hvordan innhold lagres

Applikasjonen bruker en SQLite databaseløsning som definert i `server/sqlite-storage.ts`. Denne lagrer alle videoer og bilder i en enkelt .db-fil, noe som gir persistent lagring selv etter at serveren starter på nytt. Datastrukturen er definert i `shared/schema.ts` og inneholder:

- **Video**: id, title, description, thumbnailUrl, videoUrl, category, duration, views, featured, createdAt
- **Image**: id, title, imageUrl, category, likes, views, username, createdAt

SQLite-databasen finnes som en enkelt fil kalt `neonsvideo.db` i rotmappen til prosjektet.

### Hvordan legge til nytt innhold

For å legge til nytt innhold i applikasjonen, kan du gjøre en av følgende:

#### 1. Programmatisk via API-endepunkt

Bruk følgende API-endepunkter for å legge til nytt innhold:

```typescript
// For å legge til en ny video
const newVideo = {
  title: "Video tittel",
  description: "Video beskrivelse", // valgfritt
  thumbnailUrl: "https://example.com/thumbnail.jpg",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  category: "funny", // eller "music", "trending"
  duration: "03:30", // valgfritt
  views: 0, // startes vanligvis på 0
  featured: false // sett til true for å vise som hovedvideo
};

fetch('/api/videos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newVideo)
});

// For å legge til et nytt bilde
const newImage = {
  title: "Bilde tittel",
  imageUrl: "https://example.com/image.jpg",
  category: "cool", // eller "trending"
  likes: 0, // startes vanligvis på 0
  views: 0, // startes vanligvis på 0
  username: "Brukernavn"
};

fetch('/api/images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newImage)
});
```

#### 2. Direkte i databasen

For testing og utvikling kan du legge til innhold direkte i SQLite-databasen via SQL-kommandoer:

```sql
-- Legg til en ny video
INSERT INTO videos (title, thumbnail_url, video_url, category, duration, views, featured) 
VALUES (
  'Ny video tittel',
  'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  'https://www.youtube.com/watch?v=VIDEO_ID',
  'funny',
  '02:30',
  0,
  0
);

-- Legg til et nytt bilde
INSERT INTO images (title, image_url, category, likes, views, username) 
VALUES (
  'Nytt bilde tittel',
  'https://example.com/image.jpg',
  'cool',
  0,
  0,
  'Brukernavn'
);
```

Du kan også endre `seedDatabaseIfEmpty()`-metoden i `server/sqlite-storage.ts` for å legge til mer innhold når databasen initialiseres første gang.

### Fremtidige forbedringer for innholdsadministrasjon

I fremtidige oppdateringer planlegger vi å implementere:

1. Et administratorgrensesnitt for å legge til og administrere innhold gjennom en brukervennlig UI
2. Mulighet for å migrere til PostgreSQL for større datavolum
3. Filtrering av innhold basert på flere attributter
4. Mulighet for brukere til å laste opp eget innhold
5. Avansert moderasjonssystem for å sikre at innholdet følger retningslinjene
6. Backup-funksjonalitet for SQLite-databasefilen

## Bruk av YouTube-videoer

NeonsVideo bruker React Player for å vise YouTube-videoer. For hver video må du angi:

1. **videoUrl**: URL-en til YouTube-videoen (f.eks. https://www.youtube.com/watch?v=VIDEO_ID)
2. **thumbnailUrl**: URL til miniatyrbildet (kan bruke `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`)

Dette gjør at videoer kan vises som innebygde spillere i både fremhevet-seksjonen og i modal-vinduer når brukere klikker på en video.

---

&copy; 2025 NeonsVideo - Alle rettigheter forbeholdt