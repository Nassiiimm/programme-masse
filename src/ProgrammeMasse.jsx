import { useState } from "react";

const PROGRAM_DATA = {
  profile: { taille: "1.72m", poids: "67kg", objectif: "75kg", age: "30 ans", freq: "4x/sem" },
  nutrition: { calories: "3000", proteines: "150g", glucides: "400g", lipides: "80g" },
  days: [
    {
      id: 1,
      title: "UPPER A",
      subtitle: "Push + Épaisseur",
      day: "Lundi",
      color: "#e2725b",
      totalSets: 29,
      duration: "~70 min",
      exercises: [
        {
          name: "Développé couché barre",
          muscles: "Pectoraux · Triceps · Deltoïdes ant.",
          sets: "4 × 6-8",
          rest: "3 min",
          priority: "compound",
          dimension: "profondeur",
          cue: "Rétraction scapulaire, pieds ancrés au sol. Descente contrôlée 2s, toucher le bas des pectoraux. Pousser explosif.",
          why: "Roi des mouvements pour le haut du corps. Pecs qui ressortent = profondeur de la poitrine."
        },
        {
          name: "Rowing barre penché",
          muscles: "Trapèzes · Rhomboïdes · Grand dorsal",
          sets: "4 × 6-8",
          rest: "3 min",
          priority: "compound",
          dimension: "épaisseur",
          cue: "Buste à 45°, tirer la barre vers le nombril. Serrer les omoplates 1s en haut. Ne pas tricher avec l'élan.",
          why: "LE mouvement #1 pour l'épaisseur du dos. Trapèzes moyens + rhomboïdes = dos 3D vu de profil."
        },
        {
          name: "Développé incliné haltères",
          muscles: "Pectoraux supérieurs · Deltoïdes",
          sets: "3 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "profondeur",
          cue: "Banc à 30° max. Étirement complet en bas, ne pas claquer les haltères en haut. Arc de mouvement naturel.",
          why: "Développe le haut des pecs — crée cette ligne de séparation visible vu de profil."
        },
        {
          name: "Rowing haltère unilatéral",
          muscles: "Grand dorsal · Trapèzes · Rhomboïdes",
          sets: "3 × 8-10/côté",
          rest: "90s",
          priority: "compound",
          dimension: "épaisseur",
          cue: "Genou et main sur banc, dos plat. Tirer le coude vers le plafond, pas vers l'arrière. Squeeze 1s en haut.",
          why: "Amplitude maximale + charge lourde unilatérale. Corrige les asymétries, construit l'épaisseur du lat et des trapèzes."
        },
        {
          name: "Élévations latérales",
          muscles: "Deltoïdes latéraux",
          sets: "3 × 12-15",
          rest: "1 min",
          priority: "isolation",
          dimension: "largeur",
          cue: "Légère inclinaison avant, auriculaires légèrement plus hauts que les pouces. Tempo lent, pas de momentum.",
          why: "Épaules plus larges = carrure imposante vu de face. Le V-taper commence ici."
        },
        {
          name: "Face Pull",
          muscles: "Deltoïdes post. · Trapèzes inf. · Rotateurs ext.",
          sets: "3 × 15-20",
          rest: "1 min",
          priority: "posture",
          dimension: "épaisseur",
          cue: "Poulie haute, corde. Tirer vers le front avec rotation externe en fin de mouvement. Coudes hauts.",
          why: "Arrière d'épaules développé = épaisseur visible de profil. Aussi critique pour la posture."
        },
        {
          name: "Curl barre EZ",
          muscles: "Biceps (courte & longue portion)",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "isolation",
          dimension: "profondeur",
          cue: "Coudes collés au corps, immobiles. Phase négative contrôlée 2-3s. Pas de balancement.",
          why: "Biceps développés = bras épais vu de côté, pas juste vu de face."
        },
        {
          name: "Dips triceps",
          muscles: "Triceps · Pectoraux inf.",
          sets: "3 × 8-10",
          rest: "90s",
          priority: "compound",
          dimension: "profondeur",
          cue: "Buste DROIT (pas penché en avant). Descendre à 90°, pas plus. Contrôle total, pas de rebond.",
          why: "Les triceps font 2/3 du bras. Bras épais = triceps massifs, visibles de tous les angles."
        },
        {
          name: "Pullover haltère",
          muscles: "Grand dorsal · Pectoraux · Dentelés",
          sets: "2 × 12-15",
          rest: "90s",
          priority: "isolation",
          dimension: "profondeur",
          cue: "Allongé perpendiculaire au banc, hanches basses. Descendre l'haltère derrière la tête en gardant les bras légèrement fléchis. Étirement MAX.",
          why: "Mouvement oublié des légendes. Expand la cage thoracique, connecte pecs et lats, crée la profondeur du torse."
        },
      ]
    },
    {
      id: 2,
      title: "LOWER A",
      subtitle: "Quad Emphasis",
      day: "Mardi",
      color: "#4a90d9",
      totalSets: 20,
      duration: "~55 min",
      exercises: [
        {
          name: "Squat barre (back squat)",
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
          rest: "2.5 min",
          priority: "compound",
          dimension: "complet",
          cue: "Pieds milieu de plateforme, largeur épaules. Ne JAMAIS verrouiller les genoux en haut. Amplitude complète.",
          why: "Permet de surcharger les quads sans fatiguer le bas du dos après le squat."
        },
        {
          name: "Soulevé de terre roumain (RDL)",
          muscles: "Ischio-jambiers · Fessiers · Érecteurs",
          sets: "3 × 8-10",
          rest: "2.5 min",
          priority: "compound",
          dimension: "complet",
          cue: "Barre le long des cuisses, charnière de hanche pure. Genoux légèrement fléchis et FIXES. Sentir l'étirement des ischios.",
          why: "Chaîne postérieure complète. Fessiers et ischios développés = profil impressionnant."
        },
        {
          name: "Leg curl allongé",
          muscles: "Ischio-jambiers",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "isolation",
          dimension: "complet",
          cue: "Contraction 1s en haut, phase négative lente 2-3s. Hanches plaquées au pad.",
          why: "Isolation pure des ischios. Équilibre quad/ischio = jambes complètes sous tous les angles."
        },
        {
          name: "Mollets debout",
          muscles: "Gastrocnémiens",
          sets: "4 × 12-15",
          rest: "1 min",
          priority: "isolation",
          dimension: "complet",
          cue: "Amplitude MAXIMALE : étirement complet en bas (pause 1s) + contraction max en haut (pause 1s).",
          why: "Mollets résistants — volume + amplitude complète pour les faire grossir."
        },
        {
          name: "Planche (gainage)",
          muscles: "Core · Transverse · Stabilisateurs",
          sets: "3 × 45-60s",
          rest: "1 min",
          priority: "core",
          dimension: "complet",
          cue: "Corps aligné : oreilles-épaules-hanches-chevilles. Serrer fessiers + abdos. Respirer.",
          why: "Core solide = meilleure posture + meilleure performance sur tous les composés."
        },
      ]
    },
    {
      id: 3,
      title: "UPPER B",
      subtitle: "Pull + Largeur",
      day: "Jeudi",
      color: "#7c5cbf",
      totalSets: 23,
      duration: "~60 min",
      exercises: [
        {
          name: "Développé incliné barre",
          muscles: "Pectoraux supérieurs · Deltoïdes ant. · Triceps",
          sets: "4 × 6-8",
          rest: "3 min",
          priority: "compound",
          dimension: "profondeur",
          cue: "Banc à 30°, même setup que le couché (rétraction scapulaire, arch naturel). Descente au haut des pecs.",
          why: "Angle différent du Jour 1 pour un développement complet et profond des pectoraux."
        },
        {
          name: "T-Bar Row",
          muscles: "Trapèzes moyens · Rhomboïdes · Lats",
          sets: "4 × 8-10",
          rest: "2.5 min",
          priority: "compound",
          dimension: "épaisseur",
          cue: "Prise serrée ou neutre. Tirer vers le sternum, squeeze MAX des omoplates. Torse à 45°, stable.",
          why: "Mouvement old-school pour l'épaisseur brute. Charge lourde + contraction intense = dos massif vu de profil."
        },
        {
          name: "Tirage vertical prise large",
          muscles: "Grand dorsal · Teres major · Biceps",
          sets: "3 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "largeur",
          cue: "Tirer les coudes vers le bas et l'arrière. Imaginer écraser une noix entre les omoplates. Jamais derrière la nuque.",
          why: "L'exercice clé pour la LARGEUR du dos. V-taper qui donne l'illusion d'épaules plus larges."
        },
        {
          name: "Développé épaules haltères",
          muscles: "Deltoïdes · Triceps · Trapèzes sup.",
          sets: "3 × 8-10",
          rest: "2 min",
          priority: "compound",
          dimension: "largeur",
          cue: "Dos bien calé contre le dossier. Haltères à hauteur d'oreilles en bas. Ne pas arquer excessivement.",
          why: "Épaules 3D. Deltoïdes développés = largeur ET profondeur de l'épaule."
        },
        {
          name: "Face Pull",
          muscles: "Deltoïdes post. · Trapèzes inf. · Infra-épineux",
          sets: "3 × 15-20",
          rest: "1 min",
          priority: "posture",
          dimension: "épaisseur",
          cue: "Identique au Jour 1. Rotation externe en fin de mouvement. Léger, technique parfaite.",
          why: "2ème session. Arrière d'épaules = épaisseur visible de profil, posture impeccable."
        },
        {
          name: "Curl incliné haltères",
          muscles: "Biceps (longue portion accentuée)",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "isolation",
          dimension: "profondeur",
          cue: "Banc à 45°, bras pendants naturellement. Aucun balancement.",
          why: "Position inclinée étire la longue portion = pic du biceps plus prononcé, bras plus impressionnant de côté."
        },
        {
          name: "Extensions triceps poulie haute",
          muscles: "Triceps (3 chefs)",
          sets: "3 × 10-12",
          rest: "90s",
          priority: "isolation",
          dimension: "profondeur",
          cue: "Coudes FIXES le long du corps. Extension complète en bas avec squeeze 1s.",
          why: "Triceps = 2/3 du bras. Triceps épais = bras massif vu de tous les angles."
        },
      ]
    },
    {
      id: 4,
      title: "LOWER B",
      subtitle: "Posterior + Trapèzes",
      day: "Vendredi",
      color: "#d4a037",
      totalSets: 23,
      duration: "~65 min",
      exercises: [
        {
          name: "Soulevé de terre conventionnel",
          muscles: "Chaîne postérieure · Trapèzes · Avant-bras",
          sets: "4 × 5-6",
          rest: "3-4 min",
          priority: "compound",
          dimension: "épaisseur",
          cue: "Barre au-dessus du milieu du pied, omoplates au-dessus de la barre. Pousser le sol, dos DROIT, barre collée au corps.",
          why: "Recrute le PLUS de masse musculaire en un mouvement. Construit l'épaisseur de tout le dos et des trapèzes."
        },
        {
          name: "Squat bulgare",
          muscles: "Quadriceps · Fessiers · Stabilisateurs",
          sets: "3 × 8-10/jambe",
          rest: "2 min",
          priority: "compound",
          dimension: "complet",
          cue: "Grand pas en avant, pied arrière sur un banc. Genou avant ne dépasse pas les orteils. Tronc droit.",
          why: "Unilatéral = corrige les déséquilibres. Excellent pour fessiers et stabilité."
        },
        {
          name: "Leg extension",
          muscles: "Quadriceps (isolation pure)",
          sets: "3 × 12-15",
          rest: "90s",
          priority: "isolation",
          dimension: "complet",
          cue: "Contraction 1s en haut, descente contrôlée. Ne PAS utiliser l'élan.",
          why: "Finisher pour les quads. Reps élevées = pump massif = croissance."
        },
        {
          name: "Hip thrust",
          muscles: "Fessiers · Ischio-jambiers",
          sets: "3 × 10-12",
          rest: "2 min",
          priority: "compound",
          dimension: "profondeur",
          cue: "Haut du dos sur le banc, pieds à plat. Squeeze MAX des fessiers en haut, menton rentré. Pause 1s.",
          why: "Meilleur exercice fessiers. Un physique complet vu de profil inclut des fessiers développés."
        },
        {
          name: "Shrugs haltères",
          muscles: "Trapèzes supérieurs",
          sets: "3 × 12-15",
          rest: "90s",
          priority: "isolation",
          dimension: "épaisseur",
          cue: "Haltères lourds le long du corps. Monter les épaules vers les oreilles, tenir 1s en haut. Pas de rotation.",
          why: "Trapèzes hauts = épaisseur du haut du dos visible de face ET de profil. Le 'yoke' look."
        },
        {
          name: "Mollets assis",
          muscles: "Soléaires",
          sets: "4 × 15-20",
          rest: "1 min",
          priority: "isolation",
          dimension: "complet",
          cue: "Amplitude complète. Assis = cible le soléaire (60% du volume du mollet).",
          why: "Complète le travail debout du Jour 2 pour des mollets complets."
        },
        {
          name: "Planche (gainage)",
          muscles: "Core · Transverse",
          sets: "3 × 45-60s",
          rest: "1 min",
          priority: "core",
          dimension: "complet",
          cue: "Identique au Jour 2. Progresser en ajoutant du temps ou en levant un bras/pied.",
          why: "2ème session core pour un tronc solide."
        },
      ]
    }
  ],
  dimensionSummary: {
    largeur: ["Tirage vertical (J3)", "Élévations latérales (J1)", "Développé épaules (J3)"],
    epaisseur: ["Rowing barre (J1)", "Rowing haltère (J1)", "T-bar row (J3)", "Face pull (J1+J3)", "Deadlift (J4)", "Shrugs (J4)", "Pullover (J1)"],
    profondeur_pecs: ["Développé couché (J1)", "Développé incliné (J1+J3)", "Pullover (J1)", "Dips (J1)"]
  },
  progression: [
    { rule: "Quand tu fais le HAUT de la fourchette de reps sur TOUTES tes séries → ajoute du poids", detail: "+2.5kg haut du corps, +5kg bas du corps" },
    { rule: "Log CHAQUE séance", detail: "Exercice, poids, reps. Pas de log = pas de progression." },
    { rule: "Deload toutes les 6-8 semaines", detail: "Réduis le poids de 40% pendant 1 semaine." },
    { rule: "Si tu stagnes 2 semaines sur un exo", detail: "Change la variante ou ajoute 1 série. Jamais les deux." },
  ],
  tips: [
    { icon: "🍽️", title: "Surplus calorique", text: "3000 kcal minimum. Si tu ne grossis pas après 2 semaines → +200 kcal." },
    { icon: "🥩", title: "Protéines", text: "150g/jour minimum (2.2g/kg). Répartis en 4-5 prises de 30-40g." },
    { icon: "😴", title: "Sommeil", text: "7-8h MINIMUM. La croissance se fait pendant le sommeil." },
    { icon: "💧", title: "Hydratation", text: "2.5-3L d'eau/jour." },
    { icon: "⏰", title: "Timing repas", text: "Glucides + protéines 1-2h avant et après l'entraînement." },
    { icon: "🔥", title: "Échauffement", text: "5 min cardio + 2 séries progressives avant chaque composé." },
  ],
  weekSchedule: [
    { day: "Lun", type: "upper", label: "Upper A" },
    { day: "Mar", type: "lower", label: "Lower A" },
    { day: "Mer", type: "rest", label: "Repos" },
    { day: "Jeu", type: "upper", label: "Upper B" },
    { day: "Ven", type: "lower", label: "Lower B" },
    { day: "Sam", type: "rest", label: "Repos" },
    { day: "Dim", type: "rest", label: "Repos" },
  ]
};

const EXERCISE_IMAGES = {
  "Développé couché barre": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg",
  },
  "Rowing barre penché": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/1.jpg",
  },
  "Développé incliné haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/1.jpg",
  },
  "Rowing haltère unilatéral": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/1.jpg",
  },
  "Élévations latérales": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg",
  },
  "Face Pull": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/1.jpg",
  },
  "Curl barre EZ": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/1.jpg",
  },
  "Dips triceps": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips_-_Triceps_Version/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips_-_Triceps_Version/1.jpg",
  },
  "Pullover haltère": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Dumbbell_Pullover/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Dumbbell_Pullover/1.jpg",
  },
  "Squat barre (back squat)": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/1.jpg",
  },
  "Presse à cuisses": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/1.jpg",
  },
  "Soulevé de terre roumain (RDL)": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/1.jpg",
  },
  "Leg curl allongé": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/1.jpg",
  },
  "Mollets debout": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/1.jpg",
  },
  "Planche (gainage)": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg",
  },
  "Développé incliné barre": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg",
  },
  "T-Bar Row": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/T-Bar_Row_with_Handle/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/T-Bar_Row_with_Handle/1.jpg",
  },
  "Tirage vertical prise large": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg",
  },
  "Développé épaules haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/1.jpg",
  },
  "Curl incliné haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Curl/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Curl/1.jpg",
  },
  "Extensions triceps poulie haute": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/1.jpg",
  },
  "Soulevé de terre conventionnel": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/1.jpg",
  },
  "Squat bulgare": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Split_Squat_with_Dumbbells/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Split_Squat_with_Dumbbells/1.jpg",
  },
  "Leg extension": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/1.jpg",
  },
  "Hip thrust": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/1.jpg",
  },
  "Shrugs haltères": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shrug/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shrug/1.jpg",
  },
  "Mollets assis": {
    start: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/0.jpg",
    end: "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/1.jpg",
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
            Programme actif
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
          Prise de Masse
        </h1>
        <p style={{ color: "#71717a", fontSize: 14, fontWeight: 500 }}>
          Largeur + Épaisseur · 4 jours · 67→75kg
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
            { label: "Calories", value: "3000", unit: "kcal", color: "#e2725b" },
            { label: "Protéines", value: "150", unit: "g", color: "#4a90d9" },
            { label: "Glucides", value: "400", unit: "g", color: "#d4a037" },
            { label: "Lipides", value: "80", unit: "g", color: "#7c5cbf" },
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
                          ⚡ Exécution
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
                          💡 {ds.label} — Pourquoi
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
              title: "Épaisseur du dos", 
              color: "#e2725b", 
              exercises: ["Rowing barre penché (J1)", "Rowing haltère (J1)", "T-bar row (J3)", "Deadlift (J4)", "Shrugs (J4)"],
              note: "5 mouvements dédiés — priorité #1"
            },
            { 
              title: "Largeur (V-taper)", 
              color: "#4a90d9", 
              exercises: ["Tirage vertical (J3)", "Élévations latérales (J1)", "Développé épaules (J3)"],
              note: "3 mouvements stratégiques"
            },
            { 
              title: "Profondeur pecs", 
              color: "#7c5cbf", 
              exercises: ["Développé couché (J1)", "Développé incliné (J1+J3)", "Pullover (J1)", "Dips (J1)"],
              note: "Pecs bombés, pas plats"
            },
            { 
              title: "Posture & équilibre", 
              color: "#50c878", 
              exercises: ["Face Pull 2×/sem (J1+J3)", "Core/Planche 2×/sem (J2+J4)"],
              note: "Prévention + esthétique"
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
              Volume hebdomadaire par zone
            </div>
            {[
              { zone: "Dos (total)", sets: "18 séries", color: "#e2725b" },
              { zone: "Pectoraux", sets: "14 séries", color: "#7c5cbf" },
              { zone: "Épaules", sets: "12 séries", color: "#4a90d9" },
              { zone: "Bras", sets: "12 séries", color: "#d4a037" },
              { zone: "Jambes", sets: "26 séries", color: "#50c878" },
            ].map((z, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: i < 4 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color }} />
                  <span style={{ fontSize: 12, color: "#a1a1aa" }}>{z.zone}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: z.color }}>{z.sets}</span>
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

          {/* Ramadan timing */}
          <div style={{
            marginTop: 16,
            background: "#18181b", borderRadius: 12, border: "1px solid #d4a03730",
            padding: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#d4a037", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              🌙 Planning Ramadan (Ftour 18h)
            </div>
            {[
              { time: "18h00", label: "Ftour léger", desc: "Dattes, eau, soupe" },
              { time: "19h30", label: "Séance", desc: "~60 min" },
              { time: "20h30", label: "Repas principal", desc: "Protéines + glucides ++" },
              { time: "23h00", label: "Collation", desc: "Sandwich, fruits secs" },
              { time: "04h00", label: "Suhoor", desc: "Œufs, avoine, eau ++" },
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "center",
                padding: "8px 0",
                borderBottom: i < 4 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ minWidth: 50, fontSize: 12, fontWeight: 700, color: "#d4a037" }}>
                  {m.time}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fafafa" }}>{m.label}</span>
                  <span style={{ fontSize: 11, color: "#71717a", marginLeft: 6 }}>{m.desc}</span>
                </div>
              </div>
            ))}
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
          Programme Largeur + Épaisseur
          <br />
          67kg → 75kg · Semaines 1-12
          <br />
          <span style={{ color: "#3f3f46" }}>Ajuste les charges avec ton coach</span>
        </div>
      </div>
    </div>
  );
}
