import { useState } from "react";

const PROGRAM_DATA = {
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

const EXERCISE_IMAGES = {
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
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_(Back_Extensions)/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_(Back_Extensions)/1.jpg",
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

const priorityStyles = {
  compound: { bg: "rgba(226, 114, 91, 0.12)", border: "rgba(226, 114, 91, 0.3)", text: "#e2725b", label: "COMPOSÉ" },
  isolation: { bg: "rgba(74, 144, 217, 0.12)", border: "rgba(74, 144, 217, 0.3)", text: "#4a90d9", label: "ISOLATION" },
  posture: { bg: "rgba(80, 200, 120, 0.12)", border: "rgba(80, 200, 120, 0.3)", text: "#50c878", label: "POSTURE" },
  core: { bg: "rgba(212, 160, 55, 0.12)", border: "rgba(212, 160, 55, 0.3)", text: "#d4a037", label: "CORE" },
};

const dimensionStyles = {
  largeur: { color: "#4a90d9", label: "LARGEUR" },
  épaisseur: { color: "#e2725b", label: "ÉPAISSEUR" },
  profondeur: { color: "#7c5cbf", label: "PROFONDEUR" },
  complet: { color: "#50c878", label: "COMPLET" },
};

export default function ProgrammeMasse() {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [activeSection, setActiveSection] = useState("program");
  const d = PROGRAM_DATA;
  const currentDay = d.days[activeDay];

  const toggleExercise = (idx) => {
    setExpandedExercise(expandedExercise === idx ? null : idx);
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#09090b",
      color: "#fafafa",
      minHeight: "100vh",
      maxWidth: 520,
      margin: "0 auto",
      paddingBottom: 32,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #09090b; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <div style={{
        padding: "32px 20px 20px",
        background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
        borderBottom: "1px solid #27272a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#50c878",
            boxShadow: "0 0 8px rgba(80,200,120,0.5)"
          }} />
          <span style={{ fontSize: 11, color: "#71717a", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
            Programme actif · V2.1
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1.1,
          marginBottom: 4,
          color: "#fafafa",
        }}>
          Quiet Luxury Sportif
        </h1>
        <p style={{ color: "#71717a", fontSize: 14, fontWeight: 500 }}>
          V-Taper optimisé · 4 jours · 70→74-75kg lean
        </p>

        {/* Dimension badges */}
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {[
            { label: "Largeur", color: "#4a90d9", icon: "↔" },
            { label: "Épaisseur", color: "#e2725b", icon: "↕" },
            { label: "Profondeur", color: "#7c5cbf", icon: "⬌" },
          ].map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 4,
              background: `${d.color}15`, border: `1px solid ${d.color}30`,
              borderRadius: 6, padding: "4px 8px",
              fontSize: 10, fontWeight: 600, color: d.color,
            }}>
              <span>{d.icon}</span> {d.label}
            </div>
          ))}
        </div>

        {/* Macros */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Calories", value: "2850", unit: "kcal", color: "#e2725b" },
            { label: "Protéines", value: "155", unit: "g", color: "#4a90d9" },
            { label: "Glucides", value: "350", unit: "g", color: "#d4a037" },
            { label: "Lipides", value: "95", unit: "g", color: "#7c5cbf" },
          ].map((m, i) => (
            <div key={i} style={{
              flex: "1 1 calc(25% - 6px)",
              minWidth: 70,
              background: "#18181b",
              borderRadius: 10,
              padding: "10px 8px",
              textAlign: "center",
              border: `1px solid ${m.color}22`,
            }}>
              <div style={{ fontSize: 10, color: "#71717a", marginBottom: 2, fontWeight: 600, letterSpacing: 0.5 }}>
                {m.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: m.color, lineHeight: 1.2 }}>
                {m.value}
                <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.7 }}>{m.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION TABS */}
      <div style={{
        display: "flex", gap: 0, padding: "0 20px", marginTop: 16,
        borderBottom: "1px solid #27272a",
      }}>
        {[
          { id: "program", label: "Programme" },
          { id: "dimensions", label: "3D View" },
          { id: "conseils", label: "Conseils" },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              background: "none", border: "none", color: activeSection === s.id ? "#fafafa" : "#52525b",
              fontSize: 13, fontWeight: 600, padding: "10px 14px", cursor: "pointer",
              borderBottom: activeSection === s.id ? "2px solid #e2725b" : "2px solid transparent",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === "program" && (
        <>
          {/* WEEK OVERVIEW */}
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {d.weekSchedule.map((ws, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "8px 2px", borderRadius: 8,
                  background: ws.type === "rest" ? "#18181b" : ws.type === "upper" ? "rgba(226,114,91,0.1)" : "rgba(74,144,217,0.1)",
                  border: `1px solid ${ws.type === "rest" ? "#27272a" : ws.type === "upper" ? "rgba(226,114,91,0.2)" : "rgba(74,144,217,0.2)"}`,
                  cursor: ws.type !== "rest" ? "pointer" : "default",
                  opacity: ws.type === "rest" ? 0.5 : 1,
                }}
                  onClick={() => {
                    if (ws.type !== "rest") {
                      const dayIdx = d.days.findIndex(day => day.day.startsWith(ws.day.slice(0, 3)));
                      if (dayIdx >= 0) { setActiveDay(dayIdx); setExpandedExercise(null); }
                    }
                  }}
                >
                  <div style={{ fontSize: 10, color: "#71717a", fontWeight: 600 }}>{ws.day}</div>
                  <div style={{
                    fontSize: 9, fontWeight: 600, marginTop: 2,
                    color: ws.type === "rest" ? "#52525b" : ws.type === "upper" ? "#e2725b" : "#4a90d9",
                  }}>
                    {ws.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DAY TABS */}
          <div style={{
            display: "flex", gap: 6, padding: "16px 20px 0",
            overflowX: "auto",
          }}>
            {d.days.map((day, i) => (
              <button
                key={day.id}
                onClick={() => { setActiveDay(i); setExpandedExercise(null); }}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  padding: "12px 6px 10px",
                  borderRadius: 10,
                  border: activeDay === i ? `1.5px solid ${day.color}` : "1.5px solid #27272a",
                  background: activeDay === i ? `${day.color}11` : "#18181b",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                  color: activeDay === i ? day.color : "#52525b",
                  textTransform: "uppercase",
                }}>
                  Jour {day.id}
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 700, marginTop: 2,
                  color: activeDay === i ? "#fafafa" : "#71717a",
                }}>
                  {day.title}
                </div>
                <div style={{
                  fontSize: 9, color: "#52525b", marginTop: 1, fontWeight: 500,
                }}>
                  {day.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* DAY HEADER */}
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 14px",
              background: `linear-gradient(135deg, ${currentDay.color}15, ${currentDay.color}08)`,
              borderRadius: 10,
              border: `1px solid ${currentDay.color}25`,
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa" }}>
                  {currentDay.title}
                  <span style={{ color: currentDay.color, fontWeight: 500, fontSize: 13, marginLeft: 6 }}>
                    {currentDay.subtitle}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>
                  {currentDay.day}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#71717a" }}>{currentDay.totalSets} séries</div>
                <div style={{ fontSize: 11, color: "#71717a" }}>{currentDay.duration}</div>
              </div>
            </div>
          </div>

          {/* EXERCISES */}
          <div style={{ padding: "8px 20px" }}>
            {currentDay.exercises.map((ex, i) => {
              const ps = priorityStyles[ex.priority];
              const ds = dimensionStyles[ex.dimension];
              const isExpanded = expandedExercise === i;
              return (
                <div
                  key={i}
                  onClick={() => toggleExercise(i)}
                  style={{
                    marginTop: 8,
                    background: isExpanded ? "#1c1c20" : "#14141a",
                    borderRadius: 12,
                    border: isExpanded ? `1px solid ${ps.border}` : "1px solid #27272a",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    overflow: "hidden",
                  }}
                >
                  {/* Exercise row */}
                  <div style={{ padding: "14px 14px 12px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    {/* Number */}
                    <div style={{
                      minWidth: 28, height: 28, borderRadius: 8,
                      background: ps.bg,
                      border: `1px solid ${ps.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: ps.text,
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {i + 1}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#fafafa" }}>
                          {ex.name}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 8, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
                          color: ds.color, background: `${ds.color}15`, border: `1px solid ${ds.color}30`,
                          padding: "2px 5px", borderRadius: 4,
                        }}>
                          {ds.label}
                        </span>
                        <span style={{
                          fontSize: 8, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
                          color: ps.text, background: ps.bg, border: `1px solid ${ps.border}`,
                          padding: "2px 5px", borderRadius: 4,
                        }}>
                          {ps.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>
                        {ex.muscles}
                      </div>
                    </div>

                    {/* Sets & Rest */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: currentDay.color }}>
                        {ex.sets}
                      </div>
                      <div style={{ fontSize: 10, color: "#52525b", marginTop: 1 }}>
                        repos {ex.rest}
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div style={{
                      padding: "0 14px 14px",
                      borderTop: "1px solid #27272a",
                      marginTop: 0,
                      paddingTop: 12,
                    }}>
                      {/* Exercise illustration */}
                      {EXERCISE_IMAGES[ex.name] && (
                        <div style={{
                          display: "flex", gap: 8, marginBottom: 10,
                          background: "#0a0a0f",
                          borderRadius: 10,
                          padding: 10,
                          border: "1px solid #27272a",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                          <div style={{ flex: 1, textAlign: "center" }}>
                            <img
                              src={EXERCISE_IMAGES[ex.name].start}
                              alt={`${ex.name} - position départ`}
                              style={{
                                width: "100%",
                                maxHeight: 160,
                                objectFit: "contain",
                                borderRadius: 6,
                              }}
                            />
                            <div style={{ fontSize: 9, color: "#52525b", marginTop: 4, fontWeight: 600 }}>DÉPART</div>
                          </div>
                          <div style={{
                            fontSize: 16, color: "#3f3f46", fontWeight: 700,
                            flexShrink: 0,
                          }}>→</div>
                          <div style={{ flex: 1, textAlign: "center" }}>
                            <img
                              src={EXERCISE_IMAGES[ex.name].end}
                              alt={`${ex.name} - position finale`}
                              style={{
                                width: "100%",
                                maxHeight: 160,
                                objectFit: "contain",
                                borderRadius: 6,
                              }}
                            />
                            <div style={{ fontSize: 9, color: "#52525b", marginTop: 4, fontWeight: 600 }}>FIN</div>
                          </div>
                        </div>
                      )}

                      {/* Execution cue */}
                      <div style={{
                        background: "#0f0f13",
                        borderRadius: 8,
                        padding: "10px 12px",
                        marginBottom: 8,
                        borderLeft: `3px solid ${currentDay.color}`,
                      }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: currentDay.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                          Exécution
                        </div>
                        <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                          {ex.cue}
                        </div>
                      </div>

                      {/* Why */}
                      <div style={{
                        background: "#0f0f13",
                        borderRadius: 8,
                        padding: "10px 12px",
                        borderLeft: `3px solid ${ds.color}`,
                      }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: ds.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                          {ds.label} — Pourquoi
                        </div>
                        <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                          {ex.why}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{
              textAlign: "center", padding: "12px 0 0", fontSize: 11, color: "#3f3f46",
              fontStyle: "italic",
            }}>
              Tape sur un exercice pour les détails
            </div>
          </div>
        </>
      )}

      {activeSection === "dimensions" && (
        <div style={{ padding: "20px" }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 24, fontWeight: 400, marginBottom: 8, color: "#fafafa",
          }}>
            Développement 3D
          </h2>
          <p style={{ fontSize: 13, color: "#71717a", marginBottom: 20, lineHeight: 1.5 }}>
            Un physique impressionnant sous tous les angles — pas juste de face.
          </p>

          {/* Body diagram concept */}
          <div style={{
            display: "flex", gap: 12, marginBottom: 24,
          }}>
            {[
              { view: "Face", dimension: "Largeur", color: "#4a90d9", desc: "V-taper, épaules larges, lats visibles" },
              { view: "Profil", dimension: "Épaisseur", color: "#e2725b", desc: "Dos épais, pecs bombés, trapèzes présents" },
              { view: "3/4", dimension: "Profondeur", color: "#7c5cbf", desc: "Volume total, densité musculaire" },
            ].map((v, i) => (
              <div key={i} style={{
                flex: 1,
                background: "#18181b",
                borderRadius: 12,
                border: `1px solid ${v.color}30`,
                padding: "14px 10px",
                textAlign: "center",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: `${v.color}15`, border: `2px solid ${v.color}40`,
                  margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>
                  {i === 0 ? "👤" : i === 1 ? "🚶" : "💪"}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: v.color, marginBottom: 2 }}>
                  {v.dimension}
                </div>
                <div style={{ fontSize: 9, color: "#52525b", fontWeight: 600, marginBottom: 4 }}>
                  Vue {v.view}
                </div>
                <div style={{ fontSize: 10, color: "#71717a", lineHeight: 1.4 }}>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Exercise breakdown by dimension */}
          {[
            {
              title: "Largeur (V-taper)",
              color: "#4a90d9",
              exercises: ["Tirage vertical 2×/sem (J1+J3)", "Élévations latérales 2×/sem (J1+J3)", "Développé épaules (J3)"],
              note: "PRIORITÉ #1 et #2 — 8 sér. tirage vertical + 8 sér. latérales/sem"
            },
            {
              title: "Épaisseur du dos",
              color: "#e2725b",
              exercises: ["Rowing unilatéral (J1)", "Tirage horizontal poulie (J3)", "Face pull 2×/sem (J1+J3)", "Trap bar deadlift (J4)"],
              note: "6 séries rowing + 5 séries face pull"
            },
            {
              title: "Profondeur pecs",
              color: "#7c5cbf",
              exercises: ["Dév. couché haltères (J1)", "Dév. incliné haltères (J1)", "Dév. incliné barre (J3)"],
              note: "9 séries/sem — équilibré, pas surdosé"
            },
            {
              title: "Posture & prévention",
              color: "#50c878",
              exercises: ["L-Fly rotations 2×/sem (échauffement)", "Face Pull 2×/sem", "Hyperextensions 2×/sem", "Pallof press (J4)", "Planche (J2)"],
              note: "Rotateurs, bas du dos, core anti-rotation"
            },
          ].map((section, i) => (
            <div key={i} style={{
              background: "#18181b",
              borderRadius: 12,
              border: `1px solid ${section.color}20`,
              padding: "14px 16px",
              marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fafafa" }}>
                  {section.title}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 600, color: section.color,
                  background: `${section.color}15`, padding: "3px 8px", borderRadius: 4,
                }}>
                  {section.exercises.length} exos
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {section.exercises.map((ex, j) => (
                  <div key={j} style={{
                    fontSize: 11, color: "#a1a1aa",
                    background: "#0f0f13", padding: "4px 8px", borderRadius: 6,
                    border: "1px solid #27272a",
                  }}>
                    {ex}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: "#52525b", fontStyle: "italic" }}>
                {section.note}
              </div>
            </div>
          ))}

          {/* Weekly volume summary */}
          <div style={{
            marginTop: 20, padding: 16,
            background: "linear-gradient(135deg, rgba(226,114,91,0.08), rgba(74,144,217,0.08))",
            borderRadius: 12, border: "1px solid #27272a",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fafafa", marginBottom: 10 }}>
              Volume hebdomadaire — ~80 séries/sem
            </div>
            {[
              { zone: "Deltoïdes latéraux", sets: "8 séries", color: "#4a90d9", note: "★★★ #1" },
              { zone: "Dos largeur (vertical)", sets: "8 séries", color: "#4a90d9", note: "★★★ #2" },
              { zone: "Pectoraux", sets: "9 séries", color: "#7c5cbf", note: "★★" },
              { zone: "Dos épaisseur (rowing)", sets: "6 séries", color: "#e2725b", note: "★★" },
              { zone: "Deltoïdes post.", sets: "5 séries", color: "#50c878", note: "★" },
              { zone: "Biceps", sets: "4 séries", color: "#d4a037", note: "★" },
              { zone: "Triceps", sets: "4 + pressing", color: "#d4a037", note: "★" },
              { zone: "Quadriceps", sets: "10 séries", color: "#4a90d9", note: "★★" },
              { zone: "Ischio-jambiers", sets: "9 séries", color: "#e2725b", note: "★★" },
              { zone: "Core", sets: "6-8 séries", color: "#50c878", note: "★" },
            ].map((z, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "5px 0",
                borderBottom: i < 9 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color }} />
                  <span style={{ fontSize: 11, color: "#a1a1aa" }}>{z.zone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: "#52525b" }}>{z.note}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: z.color, minWidth: 65, textAlign: "right" }}>{z.sets}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "conseils" && (
        <div style={{ padding: "20px" }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 24, fontWeight: 400, marginBottom: 16, color: "#fafafa",
          }}>
            Les fondamentaux
          </h2>

          <div style={{
            background: "linear-gradient(135deg, rgba(226,114,91,0.08), rgba(212,160,55,0.08))",
            border: "1px solid rgba(226,114,91,0.2)",
            borderRadius: 12, padding: 16, marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fafafa", marginBottom: 6 }}>
              La règle d'or
            </div>
            <div style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.6 }}>
              <span style={{ color: "#e2725b", fontWeight: 700 }}>Training 30%</span> + <span style={{ color: "#4a90d9", fontWeight: 700 }}>Nutrition 40%</span> + <span style={{ color: "#7c5cbf", fontWeight: 700 }}>Récup 30%</span>
            </div>
          </div>

          {/* Progression system */}
          <div style={{
            background: "#18181b",
            borderRadius: 12,
            border: "1px solid #27272a",
            padding: "14px 16px",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fafafa", marginBottom: 10 }}>
              Système de progression V2.1
            </div>
            {d.progression.map((p, i) => (
              <div key={i} style={{
                padding: "8px 0",
                borderBottom: i < d.progression.length - 1 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fafafa" }}>{p.rule}</div>
                <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>{p.detail}</div>
              </div>
            ))}
          </div>

          {d.tips.map((tip, i) => (
            <div key={i} style={{
              background: "#18181b",
              borderRadius: 12,
              border: "1px solid #27272a",
              padding: "14px 16px",
              marginBottom: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{tip.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fafafa" }}>{tip.title}</span>
              </div>
              <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.6, paddingLeft: 30 }}>
                {tip.text}
              </div>
            </div>
          ))}

          {/* Échauffement */}
          <div style={{
            marginTop: 16,
            background: "#18181b", borderRadius: 12, border: "1px solid #e2725b30",
            padding: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e2725b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              Échauffement obligatoire (12-15 min)
            </div>
            {[
              { step: "1", label: "Cardio léger", desc: "5 min — Rameur ou vélo", type: "upper+lower" },
              { step: "2", label: "Mobilité", desc: "3 min — Épaules (Upper) ou Hanches (Lower)", type: "upper+lower" },
              { step: "3", label: "L-Fly rotations externes", desc: "2×15 — NON NÉGOCIABLE", type: "upper" },
              { step: "4", label: "Activation", desc: "2 min — Band pull-aparts (Upper) ou Glute bridges + dead bugs (Lower)", type: "upper+lower" },
              { step: "5", label: "Séries progressives", desc: "5 min — Vide → 50% → 70% → 85%", type: "upper+lower" },
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "center",
                padding: "8px 0",
                borderBottom: i < 4 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: "#e2725b20", border: "1px solid #e2725b40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#e2725b" }}>
                  {m.step}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fafafa" }}>{m.label}</span>
                  <span style={{ fontSize: 11, color: "#71717a", marginLeft: 6 }}>{m.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Routine maison */}
          <div style={{
            marginTop: 16,
            background: "#18181b", borderRadius: 12, border: "1px solid #50c87830",
            padding: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#50c878", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              Routine maison (jours off) — 5-10 min
            </div>
            {[
              { label: "Planche", desc: "3 × 45-60s" },
              { label: "Planche latérale", desc: "2 × 30s/côté" },
              { label: "Dead bug", desc: "2 × 10/côté" },
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "6px 0",
                borderBottom: i < 2 ? "1px solid #27272a" : "none",
              }}>
                <span style={{ fontSize: 12, color: "#fafafa" }}>{m.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#50c878" }}>{m.desc}</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: "#52525b", marginTop: 8, fontStyle: "italic" }}>
              Objectif : rattraper le core. Faire tous les jours si possible.
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{
        margin: "24px 20px 0",
        padding: "16px",
        background: "#18181b",
        borderRadius: 12,
        border: "1px solid #27272a",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: "#52525b", lineHeight: 1.6 }}>
          Programme Quiet Luxury Sportif — V2.1
          <br />
          70kg → 74-75kg lean · ~80 séries/sem
          <br />
          <span style={{ color: "#3f3f46" }}>Optimisé V-Taper · Progression mixte</span>
        </div>
      </div>
    </div>
  );
}
