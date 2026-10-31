# FitTrack

A responsive dark-premium fitness and nutrition tracking web app focused on muscle gain.

## Features
- Daily calorie and macro tracking (protein, carbs, fats)
- Food database with common Indian and everyday foods
- Manual food logging with meal categories and portion quantities
- Workout plans for Push, Pull, Legs, Upper and Lower days
- Set logging with reps, weight and calculated training volume
- Workout history and body-weight history
- Charts for daily calories, body weight and training volume
- Starter rule-based fitness assistant
- Editable profile and nutrition targets
- LocalStorage persistence (data stays in the current browser)

## Run locally
1. Extract the ZIP.
2. Open the `FitTrack` folder.
3. Double-click `index.html`, or use VS Code Live Server.
4. Internet is required for Google Fonts and Chart.js CDN. The rest of the app runs locally.

## Project structure
```
FitTrack/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
```

## Important notes
- Nutrition values are estimates. Actual values vary by brand, recipe, cooking method and serving size. The food list is a starter dataset, not a verified comprehensive nutrition database.
- The assistant is rule-based demo functionality, not a connected generative AI model. For a real AI assistant, create a backend endpoint and keep your API key on the server. Never put secret API keys in browser JavaScript.
- LocalStorage is device/browser-specific and is not cloud sync. Add authentication and a database such as Firebase/Supabase before using across devices or multiple accounts.
- Calorie and macro targets are editable estimates, not medical advice.


## New in this update
- Expanded Indian-focused food database: chai, coffee, milk, dal, roti, rice, poha, idli, dosa, paratha, sabzi, khichdi, chole, pav bhaji, snacks, fruits, protein foods and more.
- Food quantities support grams, millilitres and pieces. Chai and other drinks can be logged by ml.
- Water tracker with quick-add buttons (250 ml, 500 ml, 750 ml, 1 L), custom amounts and an editable daily goal. Water is tracked separately from tea/coffee and food diary drinks.
- Nutrition values are approximate estimates. Actual values vary by recipe, brand, portion size and cooking oil; use package labels or measured recipes when precision matters.
