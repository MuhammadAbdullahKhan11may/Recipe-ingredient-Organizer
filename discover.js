// ── INGREDIENTS MAP ──────────────────────────────────────────
const recipeIngredients = {
  'Sausage Pasta':          ['Penne pasta','Juicy sausage slices','Spinach','Rich tomato sauce','Garlic','Onion','Olive oil','Parmesan cheese','Black pepper','Italian herbs'],
  'Ice Cream Sundae':       ['Chocolate ice cream scoops','Vanilla ice cream scoops','Rich chocolate sauce','Berry coulis','Whipped cream','Chocolate chips','Chopped nuts','Maraschino cherry','Cookie crumbs','Caramel drizzle'],
  'Gourmet Burger':         ['Juicy beef patty','Fresh lettuce','Tomato','Mozzarella cheese','Basil','Toasted bun', 'Red onion','Pickles','Burger sauce','Avocado slices','Black pepper','Butter'],
  'Chicken Parmesan':       ['Crispy breaded chicken breast','Marinara sauce','Melted mozzarella','Spaghetti','Parmesan cheese','Italian seasoning','Garlic powder','Breadcrumbs','Olive oil','Fresh parsley'],
  'Pepperoni Pizza':        ['Pepperoni','Stretchy melted cheese','Pizza crust', 'Pizza sauce','Oregano','Basil','Garlic powder','Olive oil','Parmesan cheese'],
  'Spaghetti Carbonara':    ['Creamy spaghetti','Sausage slices','Freshly grated parmesan cheese','Egg yolks','Black pepper','Garlic','Parsley','Olive oil','Pecorino cheese'],
  'Chocolate Mousse Cake':  ['Layered chocolate mousse cake','Cocoa powder','Dark chocolate shards','Whipped cream','Vanilla extract','Chocolate syrup','Butter','Sugar','Chocolate curls'],
  'Chilli Paneer Rice':     ['Spicy chilli paneer cubes','Rich tomato gravy','Vegetable fried rice','Bell peppers','Spring onions','Garlic','Soy sauce','Green chilies','Cornflour'],
  'Caesar Salad':           ['Crisp romaine lettuce','Parmesan cheese','Croutons','Bacon','Creamy Caesar dressing','Flatbread','Lemon juice','Anchovies','Garlic','Olive oil','Chicken breast','Black pepper'],
  'Charcuterie Board':      ['Figs','Grapes','Eggs','Cheese','Prosciutto','Olives','Almonds','Crackers','Honey','Walnuts','Dried apricots','Brie cheese','Salami'],
  'Festive Nougat':         ['Creamy nougat rounds','Figs','Strawberries','Raspberries','Honey','Pistachios','Almonds','Candied orange peel','Vanilla extract','Powdered sugar'],
  'Cheesy Pull Pizza':      ['Pepperoni','Stretchy mozzarella cheese','Golden pizza crust', 'Pizza sauce','Parmesan cheese','Basil','Garlic butter','Oregano','Red pepper flakes'],
  'Grilled Chicken Salad':  ['Sesame-crusted grilled chicken','Crisp cabbage slaw','Shredded carrots','Fresh spinach', 'Cherry tomatoes','Cucumber','Avocado','Lemon dressing','Bell peppers','Red onion'],
  'Antipasto Spread':       ['Bruschetta','Olives','Cured meats','Refreshing gin cocktails', 'Mozzarella balls','Artichokes','Roasted peppers','Parmesan','Breadsticks','Sun-dried tomatoes'],
  'Shakshuka':              ['Poached eggs','Rich spiced tomato sauce','Fresh basil','Cherry tomatoes','Crusty bread','Garlic','Onion','Bell peppers','Paprika','Cumin','Olive oil'],
  'Classic Lasagna':        ['Pasta layers','Rich meat sauce','Melted baked cheese',  'Ricotta cheese','Parmesan cheese','Garlic','Onion','Basil','Oregano'],
  'Chocolate Cake':         ['Chocolate cake layers','Chocolate ganache','Fresh strawberries','Vanilla extract','Butter','Cocoa powder','Chocolate chips','Whipped cream','Powdered sugar'],
  'Teriyaki Chicken Bowl':  ['Grilled teriyaki chicken','Teriyaki sauce','Sesame seeds','Fresh salad greens','Tomatoes','Steamed rice','Broccoli','Carrots','Edamame','Cucumber','Green onions'],
  'Honey Sesame Chicken':   ['Crispy chicken','Honey sesame sauce','Steamed rice','Green onions','Sesame seeds', 'Garlic','Ginger','Bell peppers','Broccoli','Soy sauce','Carrots'],
  'Beef Stir Fry':          ['Tender beef strips','Broccoli','Bell peppers','Stir fry sauce','Rice','Garlic','Ginger','Soy sauce','Green onions','Mushrooms','Sesame oil'],
  'Glazed Salmon':          ['Pan-seared salmon fillets','Soy glaze','Sesame','Fresh green onions','Garlic','Ginger','Lime juice','Honey','Broccoli','Steamed rice'],
  'Wok Stir Fry':           ['Chicken','Mixed vegetables','Asian stir-fry sauce','Seasonings', 'Broccoli','Carrots','Bell peppers','Garlic','Ginger','Sesame oil'],
  'Fine Dining Lasagna':    ['Pasta layers','Beef bolognese','Béchamel sauce','Fresh basil','Parmesan','Ricotta cheese','Garlic','Oregano','Nutmeg','Mozzarella cheese','Olive oil'],
  'Rosemary Gin Tonic':     ['Gin','Tonic water','Fresh rosemary','Lemon slice','Ice','Lime wedge','Juniper berries','Mint leaves','Cucumber slices','Simple syrup','Orange peel'],
'Strawberry Velvet Cake':   ['Red velvet cake layers','Whipped cream cheese frosting','Fresh whole strawberries','Strawberry jam glaze','Dark chocolate base crust','Powdered sugar dusting','Strawberry coulis drizzle'],
'Lavender Honey Panna Cotta': ['Whole milk','Heavy cream','Lavender buds','Honey','Gelatin sheets','Edible viola flowers','Vanilla bean paste'],
'Mango Cream Slushy':       ['Fresh ripe mango cubes','Mango juice base','Sweetened condensed milk','Whipped cream','Crushed ice','Mango syrup drizzle','Orange straws'],
'Classic Ice Cream Sundae': ['Chocolate ice cream scoops','Vanilla ice cream scoops','Rich hot fudge sauce','Whipped fresh cream','Maraschino cherries','Crushed walnuts','Caramel drizzle'],
'Tropical Mango Smoothie':  ['Fresh mango','Passion fruit pulp','Orange juice','Coconut water','Crushed ice','Honey','Mint garnish'],
'Teriyaki Chicken Wok':     ['Grilled chicken thighs','Shredded green cabbage','Julienned carrots','Red bell pepper strips','Teriyaki sauce','Sesame oil','Steamed white rice'],
'Sushi Platter':            ['Salmon nigiri','Tuna nigiri','White fish nigiri','Eel sushi','Soy sauce','Pickled ginger','Wasabi paste'],
'Grilled Chicken Wrap':     ['Spiced grilled chicken breast','Flour tortilla','Shredded iceberg lettuce','Diced tomatoes','Red onion','Chipotle mayo sauce','Cheddar cheese'],
'BBQ Pork Ribs':            ['Pork spare ribs','Smoky BBQ sauce','Brown sugar rub','Garlic powder','Paprika','Apple cider vinegar','Black pepper'],
'Chicken Teriyaki Bowl':    ['Chicken thighs', 'Soy sauce', 'Mirin', 'Sake', 'Sugar', 'Toasted sesame seeds', 'Shredded cabbage', 'Shredded carrots', 'Fresh spinach leaves', 'Cherry tomatoes', 'Lemon wedges'],
'Garden BBQ Skewers':       ['Marinated beef chunks','Bell pepper cubes','Cherry tomatoes','Red onion wedges','Zucchini slices','Mushrooms','Garlic marinade','Olive oil','Smoked paprika','Sea salt & black pepper'],
'Strawberry Boba Splash':   ['Fresh strawberries','Tapioca boba pearls','Strawberry milk base','Condensed sweetened milk','Ice cubes','Strawberry syrup','Lychee jelly cubes','Rose water','Coconut cream','Pink food coloring'],
'Berry Apple Smoothie':     ['Fresh raspberries','Red apple','Beetroot juice','Almond milk'],
};

const recipeSteps = {
  'Classic Lasagna': [
    'Preheat your oven to 375°F (190°C) and lightly grease a large baking dish.',
    'Brown 500g of ground beef in a large pan over medium-high heat, breaking it apart as it cooks.',
    'Add diced onions and minced garlic to the beef and cook until softened, about 5 minutes.',
    'Pour in 2 cans of crushed tomatoes and stir in tomato paste, oregano, basil, salt and pepper.',
    'Let the meat sauce simmer on low heat for at least 20 minutes, stirring occasionally.',
    'In a separate bowl, mix ricotta cheese with one egg, salt, pepper and a handful of fresh parsley.',
    'Boil lasagna pasta sheets in salted water until just al dente, then drain and lay flat.',
    'Spread a thin layer of meat sauce across the bottom of the greased baking dish.',
    'Layer pasta sheets over the sauce, slightly overlapping each sheet.',
    'Spread a generous layer of the ricotta mixture over the pasta sheets.',
    'Add another layer of meat sauce over the ricotta, then sprinkle shredded mozzarella.',
    'Repeat the layering process — pasta, ricotta, sauce, mozzarella — at least 3 times.',
    'Finish the top layer with sauce, a thick blanket of mozzarella, and grated parmesan.',
    'Cover the dish tightly with aluminium foil and bake for 35 minutes.',
    'Remove the foil and bake for another 15–20 minutes until the top is golden and bubbly.',
    'Remove from oven and let the lasagna rest for at least 15 minutes before slicing.',
    'Garnish with fresh basil leaves and a dusting of parmesan before serving.',
  ],
  'Chocolate Cake': [
    'Preheat oven to 350°F (175°C) and grease two 9-inch round cake pans with butter and flour.',
    'Sift together 2 cups flour, 2 cups sugar, ¾ cup cocoa powder, baking soda and salt into a large bowl.',
    'In a separate bowl whisk together 2 eggs, 1 cup buttermilk, ½ cup vegetable oil and vanilla extract.',
    'Slowly pour the wet ingredients into the dry ingredients, stirring gently to combine.',
    'Add 1 cup of hot freshly brewed coffee to the batter and whisk until completely smooth.',
    'Divide the batter evenly between the two prepared pans.',
    'Bake for 30–35 minutes or until a toothpick inserted in the centre comes out clean.',
    'Allow cakes to cool in the pans for 10 minutes before turning out onto a wire rack.',
    'While cakes cool, heat heavy cream in a saucepan until just simmering.',
    'Pour hot cream over chopped dark chocolate and let sit for 2 minutes, then stir to a smooth ganache.',
    'Allow the ganache to cool to a spreadable consistency, about 30 minutes.',
    'Place one cake layer on a serving plate and spread a thick layer of ganache on top.',
    'Stack the second cake layer on top and pour remaining ganache over the entire cake.',
    'Use a spatula to smooth the ganache over the sides and top of the cake.',
    'Arrange fresh whole strawberries decoratively on top of the cake.',
    'Refrigerate for at least 30 minutes to set the ganache before slicing.',
    'Slice with a warm knife for clean cuts and serve at room temperature.',
  ],
  'Chicken Teriyaki Bowl': [
    'Plan your meal around proteins that cook fast — chicken breast, shrimp, eggs or canned beans.',
    'Prep all ingredients before you start cooking: chop vegetables, measure spices, open cans.',
    'Heat a large pan or wok on high heat while you season your chosen protein with salt, pepper and garlic.',
    'Sear the protein on high heat for 3–4 minutes per side to build a golden crust quickly.',
    'Remove protein and set aside, then add a drizzle of oil and toss in pre-chopped vegetables.',
    'Stir-fry vegetables on high heat for 3–4 minutes, keeping them slightly crisp.',
    'Mix your sauce ingredients — soy sauce, honey, vinegar, cornstarch — in a small bowl.',
    'Add the sauce to the pan and let it bubble and thicken for 1–2 minutes.',
    'Return the protein to the pan and toss everything together to coat well.',
    'Cook a side of instant rice, couscous or noodles according to package instructions.',
    'Toast a handful of sesame seeds or nuts in a dry pan for 1 minute for a crunchy topping.',
    'Plate the rice or noodles as a base, then spoon the protein and vegetable mix on top.',
    'Drizzle extra sauce around the plate for presentation.',
    'Garnish with fresh herbs — cilantro, green onions or parsley — added at the very last moment.',
    'Squeeze a wedge of fresh lemon or lime over the entire dish just before serving.',
    'Serve immediately while hot so textures remain perfect.',
  ],
  'Fine Dining Lasagna': [
    'Prepare fresh egg pasta dough by combining 300g "00" flour with 3 egg yolks, one whole egg and olive oil.',
    'Knead the dough for 10 minutes until smooth and elastic, then wrap and rest for 30 minutes.',
    'Roll pasta dough through a pasta machine to setting 5 for thin, silky sheets.',
    'Cut sheets to fit your baking dish and blanch in boiling salted water for 30 seconds each.',
    'Prepare a slow-cooked beef bolognese with carrot, celery, onion, wine and passata for 2 hours.',
    'Make béchamel by melting butter, whisking in flour, then slowly adding warm milk until velvety.',
    'Season béchamel with nutmeg, white pepper and fine sea salt.',
    'Preheat oven to 180°C and butter a deep ceramic baking dish.',
    'Spread a thin layer of bolognese on the base, then a sheet of fresh pasta.',
    'Spoon béchamel over pasta, then bolognese, then a grating of aged parmesan.',
    'Continue alternating layers — pasta, béchamel, bolognese, parmesan — for 6 layers total.',
    'Finish the top with béchamel, a thick layer of parmesan and a few dots of cold butter.',
    'Bake covered for 25 minutes, then uncovered for 20 minutes until golden and caramelised.',
    'Rest the lasagna for 20 minutes before portioning with a sharp knife.',
    'Plate each portion on a warm plate, add a quenelle of ricotta and a drizzle of truffle oil.',
    'Garnish with micro basil leaves and freshly cracked black pepper.',
    'Serve with a side of crusty ciabatta and a glass of Chianti.',
  ],
  'Honey Sesame Chicken': [
    'Cut 500g chicken thighs into bite-sized chunks and pat completely dry with paper towels.',
    'Season chicken generously with salt, pepper, garlic powder and a pinch of white pepper.',
    'Coat chicken pieces in cornstarch, shaking off excess for an even light coating.',
    'Heat vegetable oil to 175°C in a deep pan or wok for frying.',
    'Fry chicken in batches for 4–5 minutes until golden brown and cooked through.',
    'Drain fried chicken on a wire rack over paper towels to keep it crispy.',
    'In a small saucepan combine honey, soy sauce, rice vinegar, sesame oil and a pinch of chilli flakes.',
    'Bring sauce to a gentle simmer over medium heat and stir until thickened slightly.',
    'Toast sesame seeds in a dry pan over medium heat until lightly golden, about 2 minutes.',
    'Cook fluffy steamed rice according to package instructions and fluff with a fork.',
    'Heat a clean wok on high, add a drizzle of oil and toss in minced garlic for 30 seconds.',
    'Add the fried chicken to the wok and pour the honey sesame sauce over it immediately.',
    'Toss everything quickly on high heat for 1–2 minutes until every piece is coated and glossy.',
    'Plate steamed rice in a bowl, spoon the glazed chicken over the top.',
    'Sprinkle toasted sesame seeds generously over the chicken.',
    'Scatter thinly sliced green onions over the finished dish.',
    'Serve with a wedge of lime and extra chilli sauce on the side.',
  ],
  'Beef Stir Fry': [
    'Slice 400g flank steak thinly against the grain for tender, quick-cooking strips.',
    'Marinate beef in soy sauce, oyster sauce, cornstarch, baking soda and sesame oil for 20 minutes.',
    'Cut broccoli into small florets and blanch in boiling salted water for 2 minutes, then drain.',
    'Slice bell peppers, carrots and snap peas into thin, uniform strips for even cooking.',
    'Mix stir fry sauce: soy sauce, oyster sauce, beef stock, sugar, cornstarch and a pinch of white pepper.',
    'Heat wok on the highest flame possible until smoking, then add a high smoke-point oil.',
    'Sear beef strips in a single layer for 1–2 minutes without stirring for a good char.',
    'Remove beef and set aside, leaving the flavourful juices in the wok.',
    'Add garlic, ginger and spring onion whites to the wok and stir fry for 30 seconds.',
    'Toss in the vegetables and stir fry on high heat for 2–3 minutes until tender-crisp.',
    'Return beef to the wok and pour stir fry sauce over everything.',
    'Toss continuously on high heat for 1–2 minutes until sauce thickens and coats everything.',
    'Cook steamed white rice or egg noodles as a base for the stir fry.',
    'Plate rice or noodles, then spoon the beef and vegetable stir fry over the top.',
    'Drizzle a few drops of sesame oil over the finished dish for fragrance.',
    'Garnish with sliced spring onions and a sprinkle of sesame seeds.',
    'Serve immediately as the dish loses its crispness quickly.',
  ],
  'Teriyaki Chicken Bowl': [
    'Prepare teriyaki sauce by combining soy sauce, mirin, sake and sugar in a small saucepan.',
    'Simmer sauce over medium heat, stirring until sugar dissolves and sauce thickens slightly.',
    'Score chicken thighs with a knife to help marinade penetrate, then coat in teriyaki sauce.',
    'Marinate chicken for at least 30 minutes in the refrigerator, or overnight for best flavour.',
    'Cook short-grain Japanese rice and season lightly with a splash of rice vinegar and salt.',
    'Preheat a grill pan or cast iron skillet on high heat until smoking hot.',
    'Place marinated chicken skin-side down and grill for 5–6 minutes without moving.',
    'Flip chicken and brush with more teriyaki sauce, grilling for another 4–5 minutes.',
    'Brush chicken with a final glaze of sauce in the last minute for a shiny, sticky finish.',
    'Rest the chicken for 5 minutes before slicing diagonally into strips.',
    'Prepare fresh salad greens with shredded cabbage, cherry tomatoes and edamame.',
    'Toss salad lightly with a drizzle of sesame dressing or rice vinegar.',
    'Scoop rice into a bowl and press gently to shape.',
    'Arrange sliced teriyaki chicken over the rice, fanning out the slices neatly.',
    'Add the fresh salad alongside the chicken in the bowl.',
    'Sprinkle toasted sesame seeds generously over the chicken and rice.',
    'Drizzle extra teriyaki sauce around the bowl for presentation and serve.',
  ],
  'Glazed Salmon': [
    'Pat 4 salmon fillets completely dry and season with salt, white pepper and garlic powder.',
    'Prepare glaze by mixing soy sauce, honey, rice vinegar, sesame oil and grated fresh ginger.',
    'Brush the glaze generously over the flesh side of each salmon fillet.',
    'Marinate salmon for 15 minutes at room temperature while you prep garnishes.',
    'Slice spring onions thinly on the diagonal and set aside for garnish.',
    'Toast sesame seeds in a dry pan until lightly golden, then remove from heat.',
    'Heat a non-stick or stainless steel pan on medium-high with a drizzle of oil.',
    'Place salmon skin-side up in the hot pan and sear for 3–4 minutes until golden.',
    'Flip salmon carefully and sear the skin side for 2–3 minutes until crisp.',
    'Spoon remaining glaze over the fillets in the last minute of cooking.',
    'Tilt the pan and baste the salmon repeatedly with the caramelising glaze.',
    'Remove salmon when the flesh flakes easily with a fork at the thickest part.',
    'Plate salmon on a warm plate, skin-side down.',
    'Drizzle any remaining pan glaze over the top of the fillet.',
    'Scatter toasted sesame seeds over the glazed surface.',
    'Pile spring onion slices across the centre of each fillet.',
    'Serve immediately with steamed jasmine rice and sautéed bok choy on the side.',
  ],
  'Wok Stir Fry': [
    'Slice chicken breast thinly against the grain and marinate with soy sauce, cornstarch and sesame oil.',
    'Chop all vegetables — cabbage, carrots, bell peppers, broccoli, snap peas — into even thin pieces.',
    'Prepare the stir fry sauce by mixing soy sauce, oyster sauce, hoisin, sesame oil and cornstarch.',
    'Heat the wok on the highest flame available until you see wisps of smoke rising.',
    'Add a high smoke-point oil and swirl to coat the wok surface.',
    'Add marinated chicken and spread in a single layer, leaving to sear for 90 seconds.',
    'Stir vigorously and cook chicken through completely, about 3–4 minutes total, then remove.',
    'Add a touch more oil and toss in garlic, ginger and dried chilli for 30 seconds.',
    'Add the harder vegetables first — carrots and broccoli — and stir fry for 2 minutes.',
    'Add the softer vegetables — cabbage, bell pepper, snap peas — and toss for another 2 minutes.',
    'Return chicken to the wok along with all the vegetables.',
    'Pour the prepared sauce over everything and toss rapidly on high heat.',
    'Cook for 1–2 minutes until sauce thickens and coats every piece beautifully.',
    'Adjust seasoning with a pinch of sugar and a dash of white pepper.',
    'Drizzle a few drops of sesame oil around the edge of the wok for fragrance.',
    'Plate over steamed white rice or egg noodles immediately.',
    'Garnish with sliced spring onions, sesame seeds and a wedge of lime.',
  ],
  'Sausage Pasta': [
    'Bring a large pot of heavily salted water to a rolling boil.',
    'Slice Italian sausages into rounds or remove casings and crumble into pieces.',
    'Heat olive oil in a wide pan over medium-high heat and brown the sausage for 5–6 minutes.',
    'Add finely diced onion and minced garlic to the pan and cook until softened.',
    'Deglaze the pan with a splash of white wine, scraping up all the browned bits.',
    'Pour in crushed tomatoes and stir in tomato paste, oregano, chilli flakes and sugar.',
    'Simmer the tomato sausage sauce for 15 minutes, stirring occasionally.',
    'Cook penne pasta in the boiling water until 1 minute before al dente.',
    'Reserve 1 cup of starchy pasta cooking water before draining.',
    'Drain pasta and add directly to the sauce in the pan.',
    'Add a splash of pasta water and toss everything together on medium heat.',
    'Add fresh baby spinach leaves and fold them into the hot pasta until just wilted.',
    'Taste and adjust seasoning with salt, black pepper and a pinch of sugar.',
    'Remove from heat and stir in a knob of cold butter for a glossy finish.',
    'Serve in warm bowls, making sure each portion gets plenty of sausage pieces.',
    'Finish with a generous grating of Pecorino Romano or Parmesan.',
    'Drizzle with good quality extra virgin olive oil and a crack of black pepper.',
  ],
  'Ice Cream Sundae': [
    'Place sundae glasses in the freezer for 10 minutes to chill before building.',
    'Make the hot fudge sauce by melting dark chocolate with butter, cream and sugar over a double boiler.',
    'Stir the fudge sauce until completely smooth and glossy, then keep warm.',
    'Make the berry coulis by blending fresh raspberries and strawberries with a little sugar and lemon.',
    'Pass the coulis through a fine sieve to remove seeds for a silky smooth sauce.',
    'Scoop chocolate ice cream into a slightly softened state — just 5 minutes at room temperature.',
    'Place 2 large scoops of chocolate ice cream into the chilled sundae glass.',
    'Drizzle warm hot fudge sauce over the chocolate ice cream.',
    'Add 2 scoops of vanilla ice cream on top of the chocolate layer.',
    'Pour the berry coulis over the vanilla scoops for a striking colour contrast.',
    'Add a generous swirl of freshly whipped cream on top.',
    'Sprinkle crushed toasted walnuts or hazelnuts for crunch.',
    'Place a maraschino cherry right at the peak of the whipped cream.',
    'Drizzle extra chocolate sauce and berry coulis in zigzag patterns for presentation.',
    'Dust lightly with cocoa powder using a fine sieve.',
    'Add a pirouette wafer biscuit or chocolate flake on the side.',
    'Serve immediately before the ice cream begins to melt.',
  ],
  'Gourmet Burger': [
    'Choose 80/20 fat-ratio ground beef for the juiciest, most flavourful patties.',
    'Divide beef into 180g portions and form into balls without overworking the meat.',
    'Press each ball gently into a patty about 1cm wider than your bun.',
    'Make a small indent in the centre of each patty to prevent bulging during cooking.',
    'Season both sides generously with coarse sea salt and cracked black pepper just before cooking.',
    'Heat a cast iron skillet or griddle pan on the highest heat until nearly smoking.',
    'Place patties on the dry hot pan — no oil needed — and cook for 3 minutes without pressing.',
    'Flip once and immediately place a slice of fresh mozzarella on top of each patty.',
    'Cover with a metal bowl for 1 minute to steam and melt the cheese perfectly.',
    'Toast brioche buns cut-side down in butter for 1–2 minutes until golden.',
    'Spread a generous layer of garlic aioli or special sauce on both bun halves.',
    'Place crisp fresh lettuce on the bottom bun as a base.',
    'Layer sliced ripe tomato and thin red onion rings on the lettuce.',
    'Place the cheese-topped patty on the vegetable stack.',
    'Add fresh torn basil leaves over the melted mozzarella.',
    'Crown with the top bun and press lightly to hold everything together.',
    'Serve with thick-cut fries and pickles on the side.',
  ],
  'Chicken Parmesan': [
    'Butterfly 2 large chicken breasts and pound to an even 1cm thickness with a meat mallet.',
    'Set up a breading station: seasoned flour, beaten eggs, and panko mixed with parmesan.',
    'Season chicken on both sides with salt, pepper, garlic powder and Italian seasoning.',
    'Coat each chicken piece in flour, shaking off excess.',
    'Dip floured chicken into beaten egg, letting the excess drip off.',
    'Press firmly into the panko-parmesan mixture, coating every surface.',
    'Let breaded chicken rest on a rack for 10 minutes so the coating adheres.',
    'Heat olive oil in a large oven-safe skillet over medium-high heat.',
    'Shallow fry chicken for 3–4 minutes per side until deep golden brown and crispy.',
    'Remove pan from heat and spoon marinara sauce generously over each piece.',
    'Lay slices of fresh mozzarella over the sauced chicken.',
    'Sprinkle grated parmesan over the mozzarella layer.',
    'Transfer the pan to a 200°C oven for 8–10 minutes until cheese is melted and bubbling.',
    'Cook spaghetti in salted boiling water until al dente while chicken is in the oven.',
    'Toss drained pasta with marinara sauce and a drizzle of olive oil.',
    'Plate a nest of spaghetti and lay the crispy Chicken Parmesan alongside.',
    'Garnish with fresh torn basil and an extra dusting of parmesan.',
  ],
  'Pepperoni Pizza': [
    'Make pizza dough by mixing flour, instant yeast, salt, sugar and olive oil with warm water.',
    'Knead the dough for 8–10 minutes until smooth, elastic and slightly tacky.',
    'Place dough in an oiled bowl, cover with a damp cloth and rise for 1–2 hours.',
    'Preheat oven with a pizza stone or heavy baking tray inside at 250°C for at least 45 minutes.',
    'Prepare pizza sauce by blending canned San Marzano tomatoes with garlic, olive oil, salt and basil.',
    'Simmer sauce for 10 minutes then spread on paper towels to reduce excess moisture.',
    'Punch down the risen dough and divide into 2 equal balls.',
    'Stretch each dough ball by hand on a floured surface, rotating as you go.',
    'Aim for a thin centre and slightly thicker crust edges of about 30cm diameter.',
    'Dust the hot pizza stone with semolina and lay the stretched dough on top.',
    'Spread a thin, even layer of tomato sauce leaving a 2cm border for the crust.',
    'Tear and scatter fresh mozzarella evenly over the sauce.',
    'Layer pepperoni slices over the cheese, slightly overlapping each piece.',
    'Drizzle with a thin stream of good olive oil over the topping.',
    'Slide into the oven and bake for 8–10 minutes until crust is charred and cheese is bubbly.',
    'Remove from oven and immediately scatter torn fresh basil over the hot pizza.',
    'Let rest for 2 minutes before slicing and serving.',
  ],
  'Spaghetti Carbonara': [
    'Bring a large pot of very heavily salted water to a full rolling boil.',
    'Cut guanciale or pancetta into small cubes or lardons about 1cm thick.',
    'Render guanciale in a dry cold pan, bringing heat up slowly to release fat gently.',
    'Cook until the fat is translucent and the edges are slightly crisp, about 8 minutes.',
    'In a bowl whisk together 4 egg yolks and 1 whole egg until combined.',
    'Add a very generous amount of finely grated Pecorino Romano to the egg mixture.',
    'Season the egg-cheese mixture with plenty of cracked black pepper.',
    'Cook spaghetti in the boiling water until 1 minute before al dente.',
    'Reserve at least 2 cups of hot, starchy pasta water before draining.',
    'Drain spaghetti and add immediately to the pan with the guanciale off the heat.',
    'Toss the pasta vigorously in the rendered fat for 30 seconds.',
    'Add the egg mixture to the pasta, tossing rapidly and continuously.',
    'Add pasta water a splash at a time, tossing constantly to create a creamy emulsified sauce.',
    'The sauce should coat every strand — silky, creamy but not scrambled.',
    'Taste and adjust seasoning with salt and plenty more black pepper.',
    'Plate by twisting spaghetti into a nest using tongs.',
    'Finish with more freshly grated Pecorino and a generous crack of black pepper at the table.',
  ],
  'Chocolate Mousse Cake': [
    'Make the chocolate sponge base by melting dark chocolate with butter over a double boiler.',
    'Whisk sugar and egg yolks until pale and thick, then fold in the warm chocolate mixture.',
    'In a separate bowl whisk egg whites to stiff peaks and fold gently into the chocolate base.',
    'Pour into a lined springform tin and bake at 160°C for 25 minutes.',
    'Allow sponge base to cool completely in the tin before adding mousse layers.',
    'Melt 200g dark chocolate and allow to cool to room temperature.',
    'Whip 400ml heavy cream to soft peaks in a chilled bowl.',
    'Melt gelatine in warm water according to packet instructions.',
    'Fold melted chocolate and dissolved gelatine into the whipped cream gently.',
    'Pour chocolate mousse over the cooled sponge base and smooth the top.',
    'Refrigerate for 2 hours until the mousse sets firmly.',
    'Make a second layer using white or milk chocolate mousse using the same method.',
    'Pour the second mousse layer over the set first layer and return to the refrigerator.',
    'Chill for another 2 hours until completely firm.',
    'Unmould the cake carefully and place on a serving plate.',
    'Dust the top generously with high-quality cocoa powder using a fine sieve.',
    'Arrange shards of dark chocolate and a few raspberries on top for decoration.',
  ],
  'Chilli Paneer Rice': [
    'Cut 250g firm paneer into 2cm cubes and pat completely dry.',
    'Coat paneer cubes in cornstarch seasoned with salt, pepper and chilli powder.',
    'Shallow fry paneer in hot oil until golden and crispy on all sides, then drain.',
    'Prepare the sauce base by sautéing diced onions, capsicum and garlic in oil.',
    'Add slit green chillies and cook on high heat for 1 minute.',
    'Mix soy sauce, tomato ketchup, chilli sauce, vinegar and sugar in a small bowl.',
    'Pour the sauce mixture into the pan and stir to combine with the vegetables.',
    'Add a cornstarch slurry to the sauce and cook until it thickens to coat a spoon.',
    'Gently fold the crispy paneer into the sauce, tossing to coat without breaking.',
    'Cook vegetable fried rice by frying day-old cooked rice in a hot wok with oil.',
    'Add diced carrots, peas, corn and spring onions to the wok and toss on high heat.',
    'Season the fried rice with soy sauce, white pepper and sesame oil.',
    'Make a well in the centre of the rice and scramble 2 eggs before mixing in.',
    'Plate the vegetable fried rice on one side of the plate.',
    'Spoon the chilli paneer generously alongside the fried rice.',
    'Garnish with sliced spring onions and fresh coriander leaves.',
    'Serve immediately with extra chilli sauce on the side.',
  ],
  'Caesar Salad': [
    'Make Caesar dressing by blending anchovies, garlic, egg yolk, lemon juice and Dijon mustard.',
    'Slowly drizzle olive oil into the blender while running to emulsify the dressing.',
    'Add grated Parmesan and Worcestershire sauce, then season with salt and cracked pepper.',
    'Taste dressing and adjust with more lemon or salt as needed.',
    'Cut a day-old baguette into rough cubes for croutons.',
    'Toss bread cubes in olive oil, garlic powder and dried oregano.',
    'Bake croutons at 190°C for 10–12 minutes, tossing halfway, until golden and crunchy.',
    'Cook bacon rashers in a dry pan until crispy, then drain on paper towels and crumble.',
    'Wash and dry romaine lettuce thoroughly, then tear into large pieces.',
    'Wrap the romaine in paper towels and refrigerate for 10 minutes to keep it crisp.',
    'Place chilled romaine in a large salad bowl.',
    'Pour enough dressing to lightly coat — not drown — the leaves and toss gently.',
    'Add croutons and crumbled bacon and toss once more.',
    'Shave generous curls of Parmesan over the top using a vegetable peeler.',
    'Lay flatbread on the side or cut into strips as edible scoops.',
    'Finish with a heavy crack of black pepper over the assembled salad.',
    'Serve immediately so the croutons stay crunchy and the lettuce stays cold.',
  ],
  'Charcuterie Board': [
    'Select a large wooden board, marble slab or slate as your base.',
    'Choose 3–4 types of cheese with varied textures: hard, soft, aged and blue.',
    'Slice hard cheeses and fan them out; leave soft cheeses whole for guests to scoop.',
    'Fold prosciutto and salami into ruffles and roses for visual interest.',
    'Fill small ramekins or bowls with olives, whole-grain mustard and fig jam.',
    'Arrange the cheese first as anchors, then build outward with meats.',
    'Fill gaps with clusters of red and green seedless grapes.',
    'Halve fresh figs and tuck them near the cheeses they complement.',
    'Add a handful of Marcona almonds and toasted walnuts for crunch and texture.',
    'Scatter crackers and thin slices of toasted baguette around the edges.',
    'Add a few hard-boiled quail eggs or regular eggs for a protein element.',
    'Tuck fresh rosemary sprigs and thyme around the board as aromatic decoration.',
    'Add honeycomb or a small jar of honey near the aged cheese.',
    'Fill any remaining gaps with more fruit, nuts or extra crackers.',
    'Add a few cornichons or pickled vegetables for acidity.',
    'Step back and adjust colours and shapes until the board looks full and abundant.',
    'Serve with small cheese knives and cocktail picks and enjoy immediately.',
  ],
  'Festive Nougat': [
    'Line a deep square baking tin with baking paper and lightly spray with oil.',
    'Place rice paper sheets on the base of the tin if available.',
    'Toast pistachios, almonds and hazelnuts in a dry pan until fragrant, then cool.',
    'Combine sugar, glucose syrup and water in a saucepan and heat to 130°C.',
    'In a separate saucepan heat honey to 121°C on a candy thermometer.',
    'Whisk egg whites in a stand mixer to stiff peaks.',
    'With the mixer running, slowly pour hot honey into the egg whites in a thin stream.',
    'Then carefully pour the hot sugar syrup into the mixture while continuing to whisk.',
    'Whisk on high for 8–10 minutes until the nougat is thick, white and holds shape.',
    'Fold in toasted nuts, dried fruits — figs, cranberries, apricots — and vanilla extract.',
    'Work quickly as the nougat sets fast once nuts are added.',
    'Pour nougat into the prepared tin and smooth the top with a wet spatula.',
    'Place another sheet of rice paper or baking paper on top and press flat.',
    'Allow to set at room temperature for at least 4 hours or overnight.',
    'Turn out the nougat block and cut into rounds or squares using a sharp oiled knife.',
    'Arrange on a serving platter with fresh strawberries, raspberries and figs.',
    'Dust lightly with icing sugar and serve as a festive centrepiece.',
  ],
  'Cheesy Pull Pizza': [
    'Make pizza dough and allow a long cold fermentation in the fridge for 24–48 hours.',
    'Remove dough from refrigerator 2 hours before baking to come to room temperature.',
    'Preheat oven to the highest setting with a pizza stone inside for 1 hour.',
    'Prepare pizza sauce using crushed San Marzano tomatoes seasoned with garlic and basil.',
    'Grate a generous mix of mozzarella, provolone and fontina for maximum stretch.',
    'Slice pepperoni thinly and refrigerate until needed.',
    'Stretch the cold-fermented dough gently by hand into a round shape.',
    'Transfer stretched dough to a pizza peel dusted with semolina flour.',
    'Spread a thin layer of sauce using the back of a spoon in circular motions.',
    'Scatter the triple-cheese blend very generously over the sauce.',
    'Layer pepperoni slices across the cheese, covering most of the surface.',
    'Add a final thin layer of mozzarella over the pepperoni to trap them under cheese.',
    'Slide the pizza onto the hot stone and bake for 7–9 minutes.',
    'Watch for the crust to char in spots and the cheese to bubble and brown.',
    'Remove from oven and let rest for 90 seconds — the cheese pull is best slightly cooled.',
    'Cut into slices and pull apart for the dramatic cheese stretch effect.',
    'Finish with a drizzle of hot honey and fresh basil leaves.',
  ],
  'Grilled Chicken Salad': [
    'Prepare the sesame marinade by mixing soy sauce, sesame oil, honey, garlic and ginger.',
    'Coat chicken breasts in the marinade and refrigerate for at least 1 hour.',
    'Toast sesame seeds in a dry pan until golden, then press them onto the marinated chicken.',
    'Preheat a grill pan or outdoor grill to high heat and oil the grates.',
    'Grill chicken for 5–6 minutes per side until cooked through with clear grill marks.',
    'Rest chicken for 5 minutes before slicing against the grain.',
    'Shred green cabbage very finely using a mandoline or sharp knife.',
    'Julienne carrots into thin matchsticks for texture.',
    'Wash and spin fresh baby spinach until completely dry.',
    'Make the dressing by whisking rice vinegar, sesame oil, soy sauce, honey and ginger.',
    'Toss cabbage and carrots together with half the dressing.',
    'Arrange spinach as the base layer on a large serving platter.',
    'Pile dressed cabbage and carrot slaw over the spinach.',
    'Fan sliced chicken breast attractively over the slaw.',
    'Drizzle remaining dressing over the chicken and salad.',
    'Scatter toasted sesame seeds and sliced spring onions over the finished dish.',
    'Serve immediately with extra dressing on the side.',
  ],
  'Antipasto Spread': [
    'Select a mix of cured meats — prosciutto, salami, bresaola and coppa.',
    'Choose 2–3 artisan cheeses to complement the meats.',
    'Prepare bruschetta by slicing a sourdough baguette diagonally and grilling each slice.',
    'Rub warm bruschetta toast with a halved raw garlic clove while hot.',
    'Drizzle with extra virgin olive oil and top with diced tomatoes, basil and sea salt.',
    'Marinate mixed olives in lemon zest, thyme, chilli flakes and olive oil.',
    'Arrange meats in loose folds and curls on a large serving board.',
    'Place cheeses at intervals with small knives for spreading.',
    'Nestle ramekins of olives, marinated peppers and pickled vegetables around the board.',
    'Add breadsticks, focaccia slices and artisan crackers in clusters.',
    'Fill gaps with roasted red peppers, sun-dried tomatoes and marinated artichokes.',
    'Prepare gin cocktails with fresh herbs and citrus to serve alongside.',
    'Add fresh grapes and halved figs for sweetness and colour contrast.',
    'Scatter caperberries and cornichons for a briny acidic balance.',
    'Drizzle honey over the cheeses just before serving.',
    'Garnish the board with fresh rosemary, thyme and edible flowers.',
    'Serve at room temperature — never cold — for the best flavour.',
  ],
  'Shakshuka': [
    'Heat a generous pour of olive oil in a wide heavy skillet or cast iron pan.',
    'Add diced onions and red peppers and sauté on medium heat until very soft, about 10 minutes.',
    'Add minced garlic, cumin, smoked paprika, ground coriander and chilli flakes.',
    'Cook the spices for 1–2 minutes, stirring constantly until deeply fragrant.',
    'Add tomato paste and stir into the spiced vegetables, cooking for 2 minutes more.',
    'Pour in canned crushed tomatoes and a pinch of sugar, stirring to combine.',
    'Add halved cherry tomatoes on top for texture and freshness.',
    'Simmer the sauce uncovered for 15 minutes, stirring occasionally, until thickened.',
    'Taste and adjust seasoning with salt, pepper and more chilli if needed.',
    'Use the back of a spoon to make 4–6 deep wells in the thick sauce.',
    'Crack one fresh egg into each well, being careful not to break the yolk.',
    'Spoon a little sauce gently over the egg whites to help them set.',
    'Cover the pan with a lid and cook on low-medium heat for 5–7 minutes.',
    'Check eggs — whites should be set, yolks still runny and glossy.',
    'Scatter torn fresh basil and flat-leaf parsley generously over the surface.',
    'Crumble feta cheese over the top if desired for extra richness.',
    'Serve directly from the pan with thick crusty bread for dipping.',
  ],
  'Chocolate Cake': [
    'Preheat oven to 350°F and grease two round pans.',
    'Mix dry ingredients: flour, cocoa, sugar, baking soda, salt.',
    'Whisk wet ingredients separately and combine with dry.',
    'Add hot coffee and mix until smooth batter forms.',
    'Pour into pans and bake for 30–35 minutes.',
    'Cool completely before frosting.',
    'Make ganache with hot cream and chopped chocolate.',
    'Frost and decorate with strawberries.',
  ],
  'Cheesy Pull Pizza': [
    'Make and cold-ferment dough for 24 hours.',
    'Stretch dough and top with triple cheese blend.',
    'Bake on hot stone at max temperature.',
    'Pull apart for ultimate cheese stretch.',
  ],
  'Strawberry Velvet Cake': [
    'Preheat oven to 175°C and grease two round cake tins.',
    'Sift together flour, cocoa powder, baking soda and salt.',
    'Beat butter and sugar until pale and fluffy, about 5 minutes.',
    'Add eggs one at a time, beating well after each addition.',
    'Mix in red food colouring and vanilla extract until evenly red.',
    'Alternate adding flour mixture and buttermilk, beginning and ending with flour.',
    'Add white vinegar and stir briefly to activate the baking soda.',
    'Divide batter between the prepared tins and bake for 28–32 minutes.',
    'Test doneness with a toothpick — it should come out clean.',
    'Cool cakes completely on a wire rack before assembling.',
    'Make cream cheese frosting by beating softened cream cheese, butter, icing sugar and vanilla.',
    'Level each cake layer with a serrated knife for a flat surface.',
    'Spread a thick layer of cream cheese frosting between the two layers.',
    'Apply a thin crumb coat of frosting all over the outside and refrigerate for 20 minutes.',
    'Apply the final generous coat of frosting and smooth with a palette knife.',
    'Arrange fresh whole and halved strawberries decoratively on top.',
    'Warm the strawberry jam until runny and brush over the strawberries as a glaze.',
  ],
   'Lavender Honey Panna Cotta': [
    'Bloom gelatine sheets in cold water for 5 minutes until soft and pliable.',
    'Pour whole milk and heavy cream into a saucepan over medium-low heat.',
    'Add dried lavender buds and vanilla bean paste to the cream mixture.',
    'Heat gently until steaming but not boiling, about 70°C.',
    'Remove from heat and steep the lavender for 10 minutes.',
    'Strain the cream through a fine sieve to remove all lavender buds.',
    'Add honey to the warm strained cream and stir until dissolved.',
    'Squeeze excess water from the bloomed gelatine and add to the warm cream.',
    'Stir gently until gelatine dissolves completely without any lumps.',
    'Pour mixture through the sieve once more for a silky-smooth result.',
    'Divide evenly among serving glasses or moulds.',
    'Allow to cool at room temperature for 15 minutes.',
    'Cover each glass with cling film and refrigerate for at least 4 hours.',
    'Remove from refrigerator 10 minutes before serving.',
    'Drizzle a generous pool of honey over the surface of each panna cotta.',
    'Arrange edible viola flowers and a sprig of fresh lavender on top.',
    'Serve chilled directly in the glass for the most elegant presentation.',
  ],
  'Mango Cream Slushy': [
    'Peel and dice 3 ripe fresh mangoes, removing as much flesh as possible from the stone.',
    'Freeze mango cubes on a tray for at least 2 hours until solid.',
    'Pour mango juice into ice cube trays and freeze overnight.',
    'Blend frozen mango cubes with mango juice ice cubes until a thick slushy forms.',
    'Add sweetened condensed milk to the blender and pulse briefly to combine.',
    'Drizzle mango syrup down the inside walls of a tall clear cup.',
    'Pour the mango slushy mixture into the cup, filling three-quarters full.',
    'Layer fresh diced mango cubes over the slushy surface.',
    'Pipe or spoon a generous swirl of whipped cream on top.',
    'Add more mango cubes on top of the whipped cream.',
    'Drizzle additional mango syrup over the whipped cream for colour.',
    'Press an orange straw through the layers diagonally.',
    'Sprinkle a tiny pinch of chaat masala or tajin for a surprising flavour pop.',
    'Add a few fresh mint leaves beside the straw as garnish.',
    'Serve immediately before the slushy melts.',
    'Stir gently with the straw before drinking to mix all the layers.',
    'Best enjoyed outdoors on a hot day.',
  ],
  'Classic Ice Cream Sundae': [
    'Chill sundae glasses in the freezer for 15 minutes.',
    'Make hot fudge by melting chocolate with cream, butter and sugar.',
    'Blend fresh berries into a smooth coulis and pass through a sieve.',
    'Whip fresh heavy cream with vanilla and icing sugar to soft peaks.',
    'Scoop chocolate ice cream slightly softened for easier scooping.',
    'Place two generous scoops of chocolate ice cream into each chilled glass.',
    'Drizzle hot fudge sauce generously over the chocolate ice cream.',
    'Add two scoops of vanilla ice cream on top.',
    'Pour berry coulis over the vanilla scoops for colour contrast.',
    'Add a large swirl of freshly whipped cream on top.',
    'Scatter crushed walnuts or toasted hazelnuts for crunch.',
    'Drizzle extra fudge and coulis in overlapping zigzag patterns.',
    'Place a maraschino cherry at the peak of the whipped cream.',
    'Add a pirouette biscuit or chocolate flake at an angle.',
    'Dust with a tiny amount of cocoa powder using a fine sieve.',
    'Serve immediately with a long sundae spoon.',
    'Eat from the top down to experience each layer in order.',
  ],
  'Tropical Mango Smoothie': [
    'Choose fully ripe mangoes — the flesh should be deeply orange and very fragrant.',
    'Peel and dice mango into chunks, reserving a few slices for garnish.',
    'Scoop out passion fruit pulp and pass half through a sieve to remove some seeds.',
    'Squeeze fresh oranges for juice — about 150ml per serving.',
    'Measure out chilled coconut water.',
    'Add mango chunks, passion fruit pulp, orange juice and coconut water to a blender.',
    'Blend on high for 60 seconds until completely smooth.',
    'Taste and add honey if needed — ripe mango is often sweet enough.',
    'Add crushed ice to the blender and pulse 3 times for a thicker texture.',
    'Pour into a tall chilled glass.',
    'Stir gently with a long spoon.',
    'Garnish with a reserved mango slice on the rim of the glass.',
    'Add a fresh sprig of mint for fragrance.',
    'Insert a black metal straw for an eco-friendly touch.',
    'Drizzle a tiny bit of passion fruit pulp over the top surface.',
    'Serve immediately while cold and frothy on top.',
    'Best consumed within 10 minutes before the froth settles.',
  ],
  'Teriyaki Chicken Wok': [
    'Slice chicken thighs into thin strips against the grain.',
    'Marinate with soy sauce, sesame oil, cornstarch and garlic for 20 minutes.',
    'Shred green cabbage finely on a mandoline.',
    'Julienne carrots and slice red bell peppers thinly.',
    'Prepare teriyaki sauce with soy sauce, mirin, sake, sugar and sesame oil.',
    'Heat wok until smoking hot, add oil and sear chicken strips quickly.',
    'Remove chicken once browned and set aside.',
    'Add garlic and ginger to the wok and stir fry for 30 seconds.',
    'Toss in cabbage, carrots and peppers and stir fry on high heat.',
    'Return chicken to the wok and pour teriyaki sauce over everything.',
    'Toss rapidly until sauce thickens and coats every piece.',
    'Cook steamed rice and fluff with a fork before serving.',
    'Plate rice in a bowl and spoon the teriyaki chicken wok over the top.',
    'Drizzle extra teriyaki sauce over the assembled bowl.',
    'Sprinkle toasted sesame seeds generously over the dish.',
    'Scatter thinly sliced spring onions for freshness.',
    'Serve with pickled ginger and extra chilli sauce on the side.',
  ],
  'Sushi Platter': [
    'Cook Japanese short-grain sushi rice and season with rice vinegar, sugar and salt.',
    'Spread rice on a tray and fan to cool to body temperature — never refrigerate.',
    'Slice the freshest sashimi-grade salmon diagonally into thick, even pieces.',
    'Slice tuna and white fish in the same manner, keeping all cuts uniform.',
    'Prepare eel by warming in a pan with sweet soy glaze until caramelised.',
    'Wet your hands with water and rice vinegar to prevent sticking.',
    'Take a small ball of rice — about 20g — and mould into an oval shape.',
    'Press firmly but gently to compact the rice without squashing it.',
    'Apply a tiny smear of wasabi to the top of each rice mound.',
    'Drape a slice of fish over the rice and press gently to adhere.',
    'Repeat for each type of fish, making 2–3 pieces of each variety.',
    'Arrange nigiri on a long slate or wooden platter in colourful alternating order.',
    'Place eel sushi at one end of the platter as the centrepiece.',
    'Fill a small shallow dish with quality soy sauce for dipping.',
    'Place pickled ginger in a neat pile beside the sushi for palate cleansing.',
    'Add a small mound of freshly grated wasabi beside the ginger.',
    'Serve with chopsticks and the spritz cocktail immediately.',
  ],
  'Grilled Chicken Wrap': [
    'Combine smoked paprika, cumin, garlic powder, onion powder, chilli powder and salt.',
    'Coat chicken breasts generously with the spice blend and olive oil.',
    'Marinate for at least 30 minutes or up to 4 hours in the refrigerator.',
    'Preheat a griddle pan or grill on high heat until very hot.',
    'Grill chicken for 5–6 minutes per side until cooked through with char marks.',
    'Rest chicken for 5 minutes, then slice into diagonal strips.',
    'Make chipotle mayo by blending mayonnaise with chipotle in adobo, lime juice and garlic.',
    'Warm flour tortillas directly on the griddle for 30 seconds per side.',
    'Spread chipotle mayo generously across the centre of each warm tortilla.',
    'Layer shredded iceberg lettuce over the mayo.',
    'Add diced tomatoes and thinly sliced red onion over the lettuce.',
    'Place sliced grilled chicken down the centre of the vegetables.',
    'Drizzle additional chipotle mayo over the chicken.',
    'Add a handful of shredded cheddar cheese over the filling.',
    'Fold in the sides of the tortilla firmly, then roll tightly from the bottom.',
    'Press the wrap seam-side down on the hot griddle for 30 seconds to seal.',
    'Cut diagonally and serve with extra dipping sauce on the side.',
  ],
  'BBQ Pork Ribs': [
    'Remove the silver membrane from the back of the rack using a paper towel for grip.',
    'Mix the dry rub: brown sugar, paprika, garlic powder, onion powder, cumin, pepper and salt.',
    'Apply the dry rub liberally to all surfaces of the ribs, pressing it in firmly.',
    'Wrap rubbed ribs tightly in cling film and refrigerate for at least 4 hours or overnight.',
    'Preheat oven to 150°C — low and slow is the secret to fall-off-the-bone ribs.',
    'Place ribs meat-side up on a foil-lined baking tray.',
    'Drizzle apple cider vinegar over the ribs for moisture and tenderness.',
    'Cover tightly with foil and bake for 2.5–3 hours.',
    'Meanwhile prepare BBQ sauce with ketchup, brown sugar, vinegar, Worcestershire and mustard.',
    'Simmer BBQ sauce for 20 minutes until thick and deeply flavoured.',
    'Remove ribs from the oven and carefully open the foil — steam will escape.',
    'Increase oven temperature to 220°C or preheat your grill to high.',
    'Brush ribs generously with BBQ sauce on both sides.',
    'Return to oven uncovered for 15–20 minutes, basting every 5 minutes.',
    'The ribs are ready when the sauce is caramelised and sticky with charred edges.',
    'Rest for 10 minutes before cutting between each bone into individual ribs.',
    'Serve stacked on a board with extra BBQ sauce and coleslaw on the side.',
  ],
  'Garden BBQ Skewers': [
    'Cut beef or lamb into 3cm chunks and place in a large bowl.',
    'Prepare marinade: olive oil, lemon juice, garlic, smoked paprika, cumin, salt and pepper.',
    'Add beef to marinade, toss well and refrigerate for at least 2 hours.',
    'Soak wooden skewers in water for 30 minutes to prevent burning on the grill.',
    'Cut bell peppers, zucchini, red onion and cherry tomatoes into chunks matching meat size.',
    'Toss vegetables in olive oil, salt and dried oregano.',
    'Thread meat and vegetables alternately onto skewers, beginning and ending with meat.',
    'Light charcoal and allow to ash over — white ash means the heat is perfect.',
    'Place skewers on the grill and cook for 3–4 minutes without moving for good sear marks.',
    'Rotate skewers a quarter turn and continue cooking, rotating every 3 minutes.',
    'Total grill time is about 12–15 minutes for medium beef.',
    'Brush with remaining marinade during the last 2 minutes for extra flavour.',
    'Remove from grill and rest skewers on a board for 3 minutes.',
    'Serve on a wooden board with warm flatbread alongside.',
    'Add a bowl of tzatziki or garlic sauce for dipping.',
    'Squeeze fresh lemon juice over the skewers just before serving.',
    'Garnish with fresh flat-leaf parsley and a sprinkle of sumac.',
  ],
  'Strawberry Boba Splash': [
    'Cook tapioca boba pearls according to package instructions until soft and chewy.',
    'Drain boba and sweeten immediately in a brown sugar syrup while still warm.',
    'Allow sweetened boba to cool to room temperature.',
    'Make strawberry syrup by simmering fresh strawberries with sugar and water.',
    'Blend syrup until smooth and pass through a fine sieve.',
    'Prepare the strawberry milk base by mixing fresh strawberry puree with whole milk.',
    'Add condensed milk to the strawberry milk and stir until sweet and creamy.',
    'Drizzle strawberry syrup artfully down the inside of a clear cup.',
    'Add a large scoop of boba pearls to the base of the cup.',
    'Add lychee jelly cubes over the boba for extra chewiness.',
    'Fill the cup with ice cubes.',
    'Pour the strawberry milk mixture over the ice.',
    'Add fresh halved strawberries on top of the drink.',
    'Spoon a crown of crushed ice on the very top.',
    'Place 2–3 whole fresh strawberries dramatically on the ice crown.',
    'Add a wide boba straw so pearls can be sucked through easily.',
    'Serve immediately and stir before drinking to mix all layers.',
  ],
  'Berry Apple Smoothie': [
    'Wash fresh raspberries and core and chop one large red apple.',
    'Add raspberries, apple, beetroot juice and almond milk to a blender.',
    'Blend on high for 60 seconds until completely smooth.',
    'Pour into a glass over ice and serve with a straw.',
  ],
};

// ── OPEN MODAL ───────────────────────────────────────────────
function openModal(src, name, category, desc) {
  const overlay = document.getElementById('d-modal');

  const ings = recipeIngredients[name] || [];
  const steps = recipeSteps[name] || [];

  const ingsHTML = ings.length ? `
    <div class="d-modal-ingredients">
      <div class="d-modal-ings-title">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        Ingredients
      </div>
      <ul class="d-modal-ing-list">
        ${ings.map(i => `<li><span class="d-ing-dot"></span>${i}</li>`).join('')}
      </ul>
    </div>` : '';

  const stepsHTML = steps.length ? `
    <div class="d-modal-steps">
      <div class="d-modal-steps-title">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        How to Make
      </div>
      <ul class="d-modal-steps-list">
        ${steps.map(s => `<li><span class="d-step-dot"></span>${s}</li>`).join('')}
      </ul>
    </div>` : '';

  overlay.innerHTML = `
    <div class="d-modal-inner" onclick="event.stopPropagation()">
      <button class="d-modal-close" onclick="closeModal()">✕</button>
      <div class="d-modal-img-wrap">
        <img src="${src}" alt="${name}"
          onerror="this.parentElement.style.background='#111'; this.style.display='none';"/>
      </div>
      <div class="d-modal-info">
        <span class="d-modal-cat">${category}</span>
        <div class="d-modal-name">${name}</div>
        <p class="d-modal-desc">${desc}</p>
        ${ingsHTML}
        ${stepsHTML}
      </div>
    </div>`;

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// ── CLOSE MODAL ──────────────────────────────────────────────
function closeModal() {
  const overlay = document.getElementById('d-modal');
  overlay.classList.add('hidden');
  overlay.innerHTML = '';               // clear content
  document.body.style.overflow = '';   // always restore scroll
}

// ── CLOSE ON BACKDROP CLICK ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('d-modal');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });
  }
});

// ── CLOSE ON ESC ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
// ── CATEGORY FILTER ───────────────────────────────────────────
function filterRecipes(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.rstrip-card').forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCat === category) {
      card.style.display = '';
      card.style.animation = 'filterFadeIn 0.3s ease both';
    } else {
      card.style.display = 'none';
    }
  });

  updateCounter();
}
function updateCounter() {
  const visible = document.querySelectorAll('.rstrip-card:not([style*="display: none"])').length;
  document.getElementById('recipe-count').textContent = visible;
}
document.addEventListener('DOMContentLoaded', () => {
  updateCounter();
});

// ── Member Modal Data ─────────────────────────────────────────
const MEMBER_DATA = {
  abdullah: {
    name:     'Abdullah Khan',
    role:     'Team Leader',
    photo:    'img 7.jpeg',
    linkedin: 'https://www.linkedin.com/in/muhammad-abdullah-khan-34b156402',
    github:   'https://github.com/MuhammadAbdullahKhan11may',
    email:    'abdullahkhan11may@gmail.com',
    phone:    '03192096617',
  },
  hannan: {
    name:     'Abdul Hannan Shaikh',
    role:     'Team Member',
    photo:    'img 10.jpeg',
    linkedin: 'https://www.linkedin.com/in/abdul-hannan-shaikh-2727b630b',
    github:   null,
    email:    null,
    phone:    '03340638457',
  },
  bilal: {
    name:     'Bilal Faheem',
    role:     'Team Member',
    photo:    'img 8.png',
    linkedin: 'https://www.linkedin.com/in/muhammad-bilal-b74398377',
    github:   null,
    email:    null,
    phone:    '03052691363',
  },
};

function openMemberModal(key) {
  const m = MEMBER_DATA[key];
  if (!m) return;

  document.getElementById('mm-photo').src = m.photo;
  document.getElementById('mm-photo').alt = m.name;
  document.getElementById('mm-name').textContent = m.name;
  document.getElementById('mm-role').textContent = m.role;

  const links = document.getElementById('mm-links');
  links.innerHTML = `
    <!-- LinkedIn -->
    <a class="mm-link mm-linkedin" href="${m.linkedin}" target="_blank" rel="noopener">
      <span class="mm-link-icon">💼</span>
      <span>LinkedIn Profile</span>
      <span class="mm-link-label">↗</span>
    </a>

    ${m.github ? `
    <!-- GitHub -->
    <a class="mm-link mm-github" href="${m.github}" target="_blank" rel="noopener">
      <span class="mm-link-icon">🐙</span>
      <span>GitHub Profile</span>
      <span class="mm-link-label">↗</span>
    </a>` : ''}

    <!-- Email -->
    ${m.email
      ? `<a class="mm-link mm-email" href="mailto:${m.email}">
           <span class="mm-link-icon">✉️</span>
           <span>${m.email}</span>
         </a>`
      : `<div class="mm-link mm-email mm-disabled">
           <span class="mm-link-icon">✉️</span>
           <span>Email not available</span>
         </div>`
    }

    <!-- Phone -->
    <a class="mm-link mm-phone" href="tel:${m.phone}">
      <span class="mm-link-icon">📞</span>
      <span>${m.phone}</span>
    </a>
  `;

  document.getElementById('member-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeMemberModal() {
  document.getElementById('member-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMemberModal();
});

// ── Inject category dot into every card (mobile overlay indicator) ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.rstrip-card').forEach(card => {
    const dot = document.createElement('span');
    dot.className = 'rstrip-cat-dot';
    card.prepend(dot);
  });
});
