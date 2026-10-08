/* Carte du restaurant : catégories, plats et prix (CHF) */
window.MENU = [
  {
    id: 'pizzas',
    label: 'Pizzas rouges',
    intro: 'Base sauce tomate, fior di latte et basilic frais. Pâte à la farine moulue à la meule de pierre, fermentée naturellement 24 à 48 heures.',
    items: [
      { name: 'Margherita', price: '16.50' },
      { name: 'Venezia', desc: 'Jambon cuit', price: '18' },
      { name: 'Mario Bross', desc: 'Champignons, olives', price: '18' },
      { name: 'Salame', desc: 'Salame Napoli', price: '18' },
      { name: 'Tunisienne', desc: 'Merguez', price: '18' },
      { name: 'Sophia Loren', desc: 'Jambon cuit, champignons', price: '19.50' },
      { name: 'Calabrese', desc: 'Salami piquant, olives', price: '19.50' },
      { name: 'Hawaï', desc: 'Jambon cuit, ananas', price: '19.50' },
      { name: 'Tonno', desc: 'Thon, oignons', price: '19.50' },
      { name: 'Napoli', desc: 'Anchois, câpres, ail, origan', price: '20' },
      { name: 'Sole mio', desc: 'Jambon cuit, œuf miroir', price: '20' },
      { name: 'Orientale', desc: 'Merguez, poivrons, olives', price: '20' },
      { name: 'Massimo', desc: 'Jambon cru, mascarpone', price: '22', tag: 'Maison' },
      { name: 'Luigi', desc: 'Jambon cuit, mascarpone, roquette', price: '22', tag: 'Maison' },
      { name: 'Capricciosa', desc: 'Jambon cuit, champignons, artichauts, olives, œuf miroir', price: '23' },
      { name: 'Quattro stagioni', desc: 'Fruits de mer, jambon cuit, champignons, poivrons', price: '23' },
      { name: 'La Contadina', desc: 'Salami Napoli, ricotta, champignons', price: '23' },
      { name: "O' Ninn", desc: 'Jambon cuit, champignons, lard fumé, olives', price: '23' },
      { name: 'Vegetariana', desc: 'Aubergines, courgettes, poivrons, champignons, artichauts', price: '23' },
      { name: 'Giulia', desc: 'Fromage de chèvre, lard fumé', price: '23' },
      { name: 'Capri', desc: 'Thon, câpres, poivrons, anchois, olives', price: '23' },
      { name: 'Calzone Napoletano', desc: 'Pizza farcie : ricotta, fior di latte, jambon cuit, salami', price: '24' },
      { name: 'Maria', desc: 'Jambon cru, roquette, grana padano', price: '24' },
      { name: 'Alessia', desc: 'Friarielli, aubergines, courgettes, poivrons', price: '24' },
      { name: 'Martina', desc: 'Saucisses de porc, poivrons', price: '24' },
      { name: 'Costiera', desc: 'Fruits de mer, gambas, ail, origan', price: '24' },
      { name: 'Stella di mare', desc: 'Crevettes, gambas, ail, origan', price: '25' },
      { name: 'Regina', desc: 'Bufala, tomates cerise', price: '25' }
    ]
  },
  {
    id: 'blanches',
    label: 'Pizzas blanches',
    intro: 'Fior di latte et basilic frais, sans sauce tomate.',
    items: [
      { name: 'Quattro formaggi', desc: 'Grana padano, taleggio, gorgonzola', price: '21' },
      { name: 'Carbonara', desc: 'Lard fumé, œuf miroir', price: '22' },
      { name: 'Linda', desc: 'Fromage de chèvre, lard fumé, champignons', price: '24' },
      { name: 'Norvégienne', desc: 'Saumon, oignons, câpres', price: '24' }
    ]
  },
  {
    id: 'gourmets',
    label: 'Gourmets',
    intro: 'Les créations de Luigi. La carte évolue au fil des saisons.',
    items: [
      { name: 'Bulle', desc: 'Fior di latte, Vacherin, Gruyère râpé, lard fumé', price: '26' },
      { name: 'Sorpresa', desc: 'Tomate, fior di latte, aubergines, nduja, mascarpone, grana padano', price: '26' },
      { name: 'Bella Napoli', desc: 'Saucisses de porc, friarielli, crème de burrata — sans tomate', price: '27', tag: 'Signature' },
      { name: 'La mano di Dio', desc: 'Tomate, fior di latte, saucisses de porc, aubergines, bufala', price: '28' },
      { name: 'Maradona', desc: 'Tomate, fior di latte, pesto, crème de burrata, tomates cerise', price: '28' },
      { name: 'King', desc: 'Crème de truffe, fior di latte, saucisses de porc, burrata, tomates cerise', price: '28.50' },
      { name: 'Mamma mia', desc: 'Tomate, fior di latte, carpaccio de bœuf, roquette, grana, huile de truffe', price: '28.50' },
      { name: 'Antonella', desc: 'Crème de pistache, fior di latte, mortadella, burrata, pistache', price: '28.50', tag: 'Coup de cœur' },
      { name: 'Joyce', desc: 'Carpaccio de bœuf, burrata, pesto, grana padano', price: '29' },
      { name: 'Pizza fritta', desc: 'Pizza frite farcie : tomate, ricotta, fior di latte, jambon cuit, salami', price: '24' }
    ]
  },
  {
    id: 'entrees',
    label: 'Entrées',
    intro: 'À partager, ou pour commencer.',
    items: [
      { name: 'Bruschetta', desc: 'Tomate, ail, huile d’olive, origan, basilic — la pièce', price: '3' },
      { name: 'Bruschetta aux fruits de mer', desc: 'La pièce', price: '4' },
      { name: 'Portion de frites', price: '7' },
      { name: 'Salade verte', price: '7' },
      { name: 'Salade mêlée', price: '9' },
      { name: 'Focaccia', desc: 'Huile d’olive, origan, grana padano', price: '11' },
      { name: 'Focaccia marinara', desc: 'Sauce tomate, ail, origan', price: '11' },
      { name: 'Focaccia crudo', desc: 'Huile d’olive, origan, grana padano, jambon cru', price: '14' },
      { name: 'Caprese', desc: 'Tomates cerise, mozzarella di bufala, basilic', price: '14' },
      { name: 'Montanara classica', desc: '3 mini pizzas frites, sauce tomate, grana padano, basilic', price: '16' },
      { name: 'Tris di montanare', desc: 'Tomate & grana · mortadella & pistache · pesto & bufala', price: '17' },
      { name: 'Plateau de charcuterie', desc: 'Charcuteries et fromages — petit / grand', price: '20 / 28' }
    ]
  },
  {
    id: 'propositions',
    label: 'Suggestions',
    intro: 'À l’affiche en ce moment.',
    items: [
      { name: 'Tartare de bœuf 200 g', desc: 'Frites, beurre, toast · supplément cognac 2 CHF', price: '31' },
      { name: 'Carpaccio de bœuf', desc: 'Roquette, tomates cerise, grana padano, huile à la truffe, frites', price: '26.50' },
      { name: 'Sapori di Napoli', desc: 'Jambon cru, roquette, bufala ou burrata, tomates cerise, beignets de pâte', price: '25' },
      { name: 'Lasagne maison', price: '25' }
    ]
  },
  {
    id: 'pates',
    label: 'Pâtes',
    intro: 'Pâtes sans gluten disponibles sur demande (*).',
    items: [
      { name: 'Penne ou spaghetti', desc: 'Sauce tomate ou pesto *', price: '18' },
      { name: 'Penne arrabbiata', desc: 'Sauce tomate, piment *', price: '20' },
      { name: 'Gnocchi alla sorrentina', desc: 'Sauce tomate, mozzarella, basilic', price: '24' },
      { name: 'Gnocchi quattro formaggi', desc: 'Grana padano, taleggio, gorgonzola, crème', price: '25' },
      { name: 'Tagliatelles au saumon', desc: 'Crème, oignons, tomates cerise, saumon fumé', price: '25' },
      { name: 'Ravioli aux crustacés', price: '25' },
      { name: 'Ravioli aubergines & scamorza', price: '25' },
      { name: 'Penne ou spaghetti bolognese', desc: 'Sauce bolognaise maison *', price: '26' },
      { name: 'Spaghetti carbonara', desc: 'Guanciale, œuf, grana padano *', price: '26' },
      { name: 'Penne amatriciana', desc: 'Sauce tomate, guanciale *', price: '26' },
      { name: 'Spaghetti aux fruits de mer', desc: 'Fruits de mer, tomates cerise, ail *', price: '28' }
    ]
  },
  {
    id: 'enfants',
    label: 'Enfants',
    intro: 'Pour les petits pizzaioli.',
    items: [
      { name: 'Pizza Bugs Bunny', desc: 'En forme de lapin, jambon cuit', price: '13' },
      { name: 'Pizza Cuore', desc: 'En forme de cœur', price: '13' },
      { name: 'Chicken nuggets', desc: 'Avec frites', price: '13' },
      { name: 'Penne ou spaghetti', desc: 'Sauce tomate ou pesto', price: '13' }
    ]
  }
];
