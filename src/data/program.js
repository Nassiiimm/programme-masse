export const PROGRAM_DATA = {
  version: "2.1",
  profile: { taille: "1.71m", poids: "70kg", objectif: "74-75kg lean", age: "30 ans", freq: "4x/sem" },
  nutrition: { calories: "2800-2900", proteines: "150-160g", glucides: "340-360g", lipides: "90-100g" },
  days: [
    {
      id: 1,
      title: "UPPER A",
      subtitle: "Push + Pull",
      day: "Lundi",
      color: "#e2725b",
      totalSets: 21,
      duration: "~55 min",
      exercises: [
        {
          name: "Développé couché haltères",
          muscles: "Pectoraux · Triceps · Deltoïdes ant.",
          sets: "4 × 8-10",
          rest: "2-3 min",
          priority: "compound",
          dimension: "profondeur",
          cue: "Stretch profond en bas, grip à 45°. Rétraction scapulaire, pieds ancrés. Descente contrôlée 2s, pousser explosif.",
          why: "Haltères = plus d'amplitude et de stabilisateurs que la barre. Pecs qui ressortent vu de profil."
        },
        {
          name: "Tirage vertical prise large",
          muscles: "Grand dorsal · Teres major · Biceps",
          sets: "4 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "largeur",
          cue: "Tirer les coudes vers le bas et l'arrière. Imaginer écraser une noix entre les omoplates. Jamais derrière la nuque.",
          why: "L'exercice clé pour la LARGEUR du dos. V-taper qui donne l'illusion d'épaules plus larges."
        },
        {
          name: "Rowing unilatéral haltère",
          muscles: "Grand dorsal · Trapèzes · Rhomboïdes",
          sets: "3 × 8-10",
          rest: "90s",
          priority: "compound",
          dimension: "épaisseur",
          cue: "Genou et main sur banc, dos plat. Tirer le coude vers le plafond. Full stretch en bas, squeeze 1s en haut.",
          why: "Amplitude maximale unilatérale. Corrige les asymétries, construit l'épaisseur du lat et des trapèzes."
        },
        {
          name: "Développé incliné haltères",
          muscles: "Pectoraux supérieurs · Deltoïdes",
          sets: "2 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "profondeur",
          cue: "Banc à 30° max. Étirement complet en bas, arc de mouvement naturel.",
          why: "Développe le haut des pecs — crée cette ligne de séparation visible vu de profil."
        },
        {
          name: "Élévations latérales",
          muscles: "Deltoïdes latéraux",
          sets: "4 × 12-15",
          rest: "60s",
          priority: "isolation",
          dimension: "largeur",
          cue: "Légère inclinaison avant, auriculaires légèrement plus hauts que les pouces. Tempo lent, pas de momentum.",
          why: "PRIORITÉ #1 — Épaules plus larges = carrure imposante vu de face. Le V-taper commence ici."
        },
        {
          name: "Face Pull",
          muscles: "Deltoïdes post. · Trapèzes inf. · Rotateurs ext.",
          sets: "2 × 15-20",
          rest: "60s",
          priority: "posture",
          dimension: "épaisseur",
          cue: "Poulie haute, corde. Tirer vers le front avec rotation externe en fin de mouvement. Coudes hauts.",
          why: "Arrière d'épaules = épaisseur visible de profil. Critique pour la posture et la santé des épaules."
        },
        {
          name: "Curl marteau",
          muscles: "Brachial · Brachio-radial · Biceps",
          sets: "2 × 10-12",
          rest: "60s",
          priority: "isolation",
          dimension: "largeur",
          cue: "Prise neutre (pouces vers le haut). Coudes fixes, phase négative contrôlée 2-3s.",
          why: "Le brachial donne la largeur du bras vu de face. Souvent négligé, fait la différence."
        },
      ]
    },
    {
      id: 2,
      title: "LOWER A",
      subtitle: "Quadriceps",
      day: "Mardi",
      color: "#4a90d9",
      totalSets: 20,
      duration: "~55 min",
      exercises: [
        {
          name: "Squat barre",
          muscles: "Quadriceps · Fessiers · Core · Érecteurs",
          sets: "4 × 6-8",
          rest: "3 min",
          priority: "compound",
          dimension: "complet",
          cue: "Pieds largeur épaules, pointes légèrement ouvertes. Descendre sous le parallèle. Genoux dans l'axe des pieds.",
          why: "L'exercice #1 pour la masse totale. Développe les cuisses ET renforce tout le tronc."
        },
        {
          name: "Presse à cuisses",
          muscles: "Quadriceps · Fessiers",
          sets: "3 × 10-12",
          rest: "2 min",
          priority: "compound",
          dimension: "complet",
          cue: "Pieds milieu de plateforme, largeur épaules. Ne JAMAIS verrouiller les genoux en haut. Amplitude complète.",
          why: "Permet de surcharger les quads sans fatiguer le bas du dos après le squat."
        },
        {
          name: "RDL barre",
          muscles: "Ischio-jambiers · Fessiers · Érecteurs",
          sets: "3 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "complet",
          cue: "BARRE le long des cuisses (plus stable que haltères). Charnière de hanche pure. Genoux légèrement fléchis et FIXES.",
          why: "Chaîne postérieure complète. La barre glisse naturellement le long des cuisses = meilleur contrôle."
        },
        {
          name: "Leg curl",
          muscles: "Ischio-jambiers",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "isolation",
          dimension: "complet",
          cue: "Contraction 1s en haut, phase négative lente 2-3s. Hanches plaquées au pad.",
          why: "Isolation pure des ischios. Équilibre quad/ischio = jambes complètes sous tous les angles."
        },
        {
          name: "Hyperextensions",
          muscles: "Érecteurs · Fessiers · Ischio-jambiers",
          sets: "3 × 12-15",
          rest: "60s",
          priority: "compound",
          dimension: "complet",
          cue: "Descente contrôlée, remonter jusqu'à l'alignement du corps. Ne PAS hyper-étendre. Squeeze fessiers en haut.",
          why: "OBLIGATOIRE — Renforce le bas du dos pour protéger la colonne sur squat et deadlift."
        },
        {
          name: "Planche",
          muscles: "Core · Transverse · Stabilisateurs",
          sets: "2 × 45-60s",
          rest: "60s",
          priority: "core",
          dimension: "complet",
          cue: "Corps aligné : oreilles-épaules-hanches-chevilles. Serrer fessiers + abdos. Respirer.",
          why: "Core solide = meilleure posture + meilleure performance sur tous les composés."
        },
        {
          name: "Mollets debout",
          muscles: "Gastrocnémiens",
          sets: "2 × 12-15",
          rest: "60s",
          priority: "isolation",
          dimension: "complet",
          cue: "Amplitude MAXIMALE : étirement complet en bas (pause 1s) + contraction max en haut (pause 1s).",
          why: "Mollets résistants — volume + amplitude complète pour les faire grossir."
        },
      ]
    },
    {
      id: 3,
      title: "UPPER B",
      subtitle: "LARGEUR",
      day: "Jeudi",
      color: "#7c5cbf",
      totalSets: 23,
      duration: "~60 min",
      exercises: [
        {
          name: "Tirage vertical prise large",
          muscles: "Grand dorsal · Teres major · Biceps",
          sets: "4 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "largeur",
          cue: "EN PREMIER — frais pour maximiser le V-taper. Tirer les coudes vers le bas, squeeze omoplates.",
          why: "Jour LARGEUR = dos en premier. Grand dorsal en adduction = ce qui crée visuellement le V."
        },
        {
          name: "Tirage horizontal poulie",
          muscles: "Trapèzes moyens · Rhomboïdes · Grand dorsal",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "compound",
          dimension: "épaisseur",
          cue: "Prise neutre ou serrée. Tirer vers le nombril, squeeze MAX des omoplates 1s. Torse stable, pas de balancement.",
          why: "Épaisseur du dos vue de profil. La poulie permet un stretch et une contraction supérieurs au rowing barre."
        },
        {
          name: "Développé incliné barre",
          muscles: "Pectoraux supérieurs · Deltoïdes ant. · Triceps",
          sets: "3 × 6-8",
          rest: "2-3 min",
          priority: "compound",
          dimension: "profondeur",
          cue: "Banc à 30°, rétraction scapulaire, arch naturel. Descente au haut des pecs. Progression linéaire +2.5kg/séance.",
          why: "La BARRE permet de charger plus lourd et de progresser par incréments fins. Développe le haut des pecs."
        },
        {
          name: "Développé épaules haltères",
          muscles: "Deltoïdes · Triceps · Trapèzes sup.",
          sets: "2 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "largeur",
          cue: "Dos bien calé contre le dossier. Haltères à hauteur d'oreilles en bas. Ne pas arquer excessivement.",
          why: "Épaules 3D. Deltoïdes développés = largeur ET profondeur de l'épaule."
        },
        {
          name: "Élévations latérales",
          muscles: "Deltoïdes latéraux",
          sets: "4 × 12-15",
          rest: "60s",
          priority: "isolation",
          dimension: "largeur",
          cue: "Légère inclinaison avant, mener avec le coude. Ne pas monter plus haut que les épaules.",
          why: "PRIORITÉ #1 — 2ème session de la semaine. Fréquence 2x/sem = croissance optimale des deltoïdes latéraux."
        },
        {
          name: "Face Pull",
          muscles: "Deltoïdes post. · Trapèzes inf. · Infra-épineux",
          sets: "3 × 15-20",
          rest: "60s",
          priority: "posture",
          dimension: "épaisseur",
          cue: "Identique au Jour 1. Rotation externe en fin de mouvement. Léger, technique parfaite.",
          why: "Posture + arrière d'épaules = épaisseur de profil. Non négociable avec 5 pressings/semaine."
        },
        {
          name: "Curl incliné haltères",
          muscles: "Biceps (longue portion accentuée)",
          sets: "2 × 10-12",
          rest: "60s",
          priority: "isolation",
          dimension: "profondeur",
          cue: "Banc à 45-60°, bras pendants naturellement. Aucun balancement. Stretch max en bas.",
          why: "Position inclinée étire la longue portion = pic du biceps plus prononcé, bras impressionnant de côté."
        },
        {
          name: "Extension triceps overhead",
          muscles: "Triceps (long chef accentué)",
          sets: "2 × 10-12",
          rest: "60s",
          priority: "isolation",
          dimension: "profondeur",
          cue: "Poulie basse ou haltère derrière la tête. Coudes pointés vers le plafond, fixes. Extension complète.",
          why: "Le long chef = le plus volumineux des 3 chefs du triceps. Position overhead = stretch max = croissance max."
        },
      ]
    },
    {
      id: 4,
      title: "LOWER B",
      subtitle: "Ischio/Fessiers",
      day: "Vendredi",
      color: "#d4a037",
      totalSets: 21,
      duration: "~60 min",
      exercises: [
        {
          name: "Trap bar deadlift",
          muscles: "Chaîne postérieure · Quadriceps · Trapèzes",
          sets: "3 × 6-8",
          rest: "3 min",
          priority: "compound",
          dimension: "épaisseur",
          cue: "PAS de conventionnel. Centre de gravité aligné. Pousser le sol, dos DROIT, bracing abdominal.",
          why: "Même patron moteur que le deadlift, mais -20-30% de stress lombaire. Idéal pour un débutant."
        },
        {
          name: "Leg extension",
          muscles: "Quadriceps (isolation pure)",
          sets: "3 × 12-15",
          rest: "90s",
          priority: "isolation",
          dimension: "complet",
          cue: "AVANT le bulgare — pré-fatigue les quads. Contraction 1s en haut, descente contrôlée.",
          why: "Placé avant le bulgare pour échauffer les quads et réduire la charge nécessaire au bulgare."
        },
        {
          name: "Squat bulgare",
          muscles: "Quadriceps · Fessiers · Stabilisateurs",
          sets: "3 × 8-10/jambe",
          rest: "90s",
          priority: "compound",
          dimension: "complet",
          cue: "Grand pas en avant, pied arrière sur un banc. Appui mural ou TRX si besoin pour la stabilité. Tronc droit.",
          why: "Unilatéral = corrige les déséquilibres. Excellent pour fessiers et stabilité. Progresser vers la version libre."
        },
        {
          name: "Leg curl",
          muscles: "Ischio-jambiers",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "isolation",
          dimension: "complet",
          cue: "Contraction 1s en haut, phase négative lente 2-3s. Hanches plaquées au pad.",
          why: "Isolation pure des ischios. Complète le travail du trap bar deadlift."
        },
        {
          name: "Hip thrust",
          muscles: "Fessiers · Ischio-jambiers",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "compound",
          dimension: "profondeur",
          cue: "Haut du dos sur le banc, pieds à plat. Squeeze MAX des fessiers en haut, menton rentré. Pause 1s.",
          why: "Meilleur exercice fessiers. Un physique complet vu de profil inclut des fessiers développés."
        },
        {
          name: "Hyperextensions",
          muscles: "Érecteurs · Fessiers · Ischio-jambiers",
          sets: "3 × 12-15",
          rest: "60s",
          priority: "compound",
          dimension: "complet",
          cue: "Identique au Jour 2. OBLIGATOIRE 2x/semaine pour protéger le bas du dos.",
          why: "OBLIGATOIRE — 2ème session. Érecteurs forts = colonne protégée sur tous les composés lourds."
        },
        {
          name: "Pallof press",
          muscles: "Core · Obliques · Transverse",
          sets: "3 × 10/côté",
          rest: "60s",
          priority: "core",
          dimension: "complet",
          cue: "Poulie à hauteur de poitrine. Pousser les mains devant soi, résister à la rotation. Tenir 2s bras tendus.",
          why: "ANTI-ROTATION — Le type de travail core absent de la plupart des programmes. Essentiel pour la stabilité en squat et deadlift."
        },
      ]
    }
  ],
  dimensionSummary: {
    largeur: ["Tirage vertical 2×/sem (J1+J3)", "Élévations latérales 2×/sem (J1+J3)", "Développé épaules (J3)"],
    epaisseur: ["Rowing unilatéral (J1)", "Tirage horizontal (J3)", "Face pull 2×/sem (J1+J3)", "Trap bar deadlift (J4)"],
    profondeur_pecs: ["Développé couché haltères (J1)", "Développé incliné haltères (J1)", "Développé incliné barre (J3)"]
  },
  progression: [
    { rule: "HAUT DU CORPS — Progression linéaire", detail: "+2.5kg par séance si tu atteins tes reps. Si tu échoues 2 séances → deload." },
    { rule: "BAS DU CORPS — Double progression (safe)", detail: "Monte les reps dans la fourchette, puis +5kg et redescends en reps." },
    { rule: "ISOLATION — Incréments micro", detail: "+1-2kg quand tu atteins le haut de la fourchette sur toutes les séries." },
    { rule: "Log CHAQUE séance", detail: "Exercice, poids, reps. Pas de log = pas de progression." },
    { rule: "Deload toutes les 4 semaines", detail: "3 semaines progressives + 1 semaine à -40% du poids, mêmes reps." },
  ],
  tips: [
    { icon: "🍽️", title: "Surplus calorique", text: "2800-2900 kcal. Si <0.5kg/mois → +100-150 kcal. Si >1kg/mois → -100 kcal." },
    { icon: "🥩", title: "Protéines", text: "150-160g/jour (2.1-2.3g/kg). Répartis en 4-5 prises de 30-40g." },
    { icon: "🥑", title: "Lipides", text: "90-100g/jour minimum. Essentiels pour la testostérone et la récupération." },
    { icon: "😴", title: "Sommeil", text: "7-8h MINIMUM. La croissance se fait pendant le sommeil." },
    { icon: "💧", title: "Hydratation", text: "2.5-3L d'eau/jour." },
    { icon: "💊", title: "Créatine", text: "5g/jour tous les jours. Le seul supplément prouvé scientifiquement pour la masse." },
    { icon: "🔥", title: "Échauffement", text: "12-15 min : 5 min cardio + mobilité + L-Fly rotations externes + séries progressives." },
    { icon: "🚶", title: "Cardio", text: "2-3×/semaine, marche rapide 20-30 min. Objectif : rester lean, pas brûler des calories." },
  ],
  weekSchedule: [
    { day: "Lun", type: "upper", label: "Upper A" },
    { day: "Mar", type: "lower", label: "Lower A" },
    { day: "Mer", type: "rest", label: "Repos" },
    { day: "Jeu", type: "upper", label: "Upper B" },
    { day: "Ven", type: "lower", label: "Lower B" },
    { day: "Sam", type: "rest", label: "Cardio" },
    { day: "Dim", type: "rest", label: "Repos" },
  ]
};

export const EXERCISE_IMAGES = {
  "Développé couché haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/1.jpg",
  },
  "Tirage vertical prise large": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg",
  },
  "Rowing unilatéral haltère": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/1.jpg",
  },
  "Développé incliné haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/1.jpg",
  },
  "Élévations latérales": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg",
  },
  "Face Pull": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/1.jpg",
  },
  "Curl marteau": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/1.jpg",
  },
  "Squat barre": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/1.jpg",
  },
  "Presse à cuisses": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/1.jpg",
  },
  "RDL barre": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/1.jpg",
  },
  "Leg curl": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/1.jpg",
  },
  "Hyperextensions": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/1.jpg",
  },
  "Planche": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg",
  },
  "Mollets debout": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/1.jpg",
  },
  "Tirage horizontal poulie": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/1.jpg",
  },
  "Développé incliné barre": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg",
  },
  "Développé épaules haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/1.jpg",
  },
  "Curl incliné haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Curl/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Curl/1.jpg",
  },
  "Extension triceps overhead": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/1.jpg",
  },
  "Trap bar deadlift": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/1.jpg",
  },
  "Leg extension": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/1.jpg",
  },
  "Squat bulgare": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Split_Squat_with_Dumbbells/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Split_Squat_with_Dumbbells/1.jpg",
  },
  "Hip thrust": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/1.jpg",
  },
  "Pallof press": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pallof_Press_With_Rotation/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pallof_Press_With_Rotation/1.jpg",
  },
};

export const priorityStyles = {
  compound: { bg: "rgba(226, 114, 91, 0.12)", border: "rgba(226, 114, 91, 0.3)", text: "#e2725b", label: "COMPOSÉ" },
  isolation: { bg: "rgba(74, 144, 217, 0.12)", border: "rgba(74, 144, 217, 0.3)", text: "#4a90d9", label: "ISOLATION" },
  posture: { bg: "rgba(80, 200, 120, 0.12)", border: "rgba(80, 200, 120, 0.3)", text: "#50c878", label: "POSTURE" },
  core: { bg: "rgba(212, 160, 55, 0.12)", border: "rgba(212, 160, 55, 0.3)", text: "#d4a037", label: "CORE" },
};

export const dimensionStyles = {
  largeur: { color: "#4a90d9", label: "LARGEUR" },
  épaisseur: { color: "#e2725b", label: "ÉPAISSEUR" },
  profondeur: { color: "#7c5cbf", label: "PROFONDEUR" },
  complet: { color: "#50c878", label: "COMPLET" },
};
