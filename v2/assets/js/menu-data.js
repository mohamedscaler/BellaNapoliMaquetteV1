/* Carte Bella Napoli da Luigi — reprise du menu imprimé (prix CHF, identiques sur place et à l'emporter) */
window.MENU = [
  {
    id: 'classiques',
    label: 'Pizzas classiques',
    intro: 'Pâte à la farine moulue à la meule de pierre, fermentée naturellement 24 à 48 heures. Toutes nos pizzas sont garnies de basilic frais.',
    items: [
      { name: 'Marinara', desc: 'Sauce tomate, ail, origan', price: '14.50' },
      { name: 'Margherita', desc: 'Sauce tomate, fior di latte', price: '16.50' },
      { name: 'Venezia', desc: 'Sauce tomate, fior di latte, jambon cuit', price: '18.00' },
      { name: 'Mario Bross', desc: 'Sauce tomate, fior di latte, champignons, olives', price: '18.00' },
      { name: 'Salame', desc: 'Sauce tomate, fior di latte, salami Napoli', price: '18.00' },
      { name: 'Sophia Loren', desc: 'Sauce tomate, fior di latte, jambon cuit, champignons', price: '19.50' },
      { name: 'Calabrese', desc: 'Sauce tomate, fior di latte, salami piquant, olives', price: '19.50' },
      { name: 'Hawaï', desc: 'Sauce tomate, fior di latte, jambon cuit, ananas', price: '19.50' },
      { name: 'Tonno', desc: 'Sauce tomate, fior di latte, thon, oignons', price: '19.50' },
      { name: 'Partenopea', desc: 'Sauce tomate, fior di latte, anchois, câpres, ail, origan', price: '22.00' },
      { name: 'La Formaggi', desc: 'Fior di latte, grana padano, taleggio, gorgonzola, mascarpone — sans tomate', price: '22.00' },
      { name: 'Carbonara', desc: 'Fior di latte, guanciale, œuf — sans tomate', price: '22.00' },
      { name: 'Luigi', desc: 'Sauce tomate, fior di latte, jambon cuit, mascarpone, roquette', price: '22.00', tag: 'Maison' },
      { name: 'Massimo', desc: 'Sauce tomate, fior di latte, jambon cru, mascarpone', price: '22.00', tag: 'Maison' },
      { name: "O' Ninn", desc: 'Sauce tomate, fior di latte, jambon cuit, champignons, lard fumé, olives', price: '23.00' },
      { name: 'Vegetariana', desc: 'Sauce tomate, fior di latte, aubergines, courgettes, poivrons, champignons, artichauts', price: '23.00' },
      { name: 'Capricciosa', desc: 'Sauce tomate, fior di latte, jambon cuit, champignons, artichauts, olives, œuf', price: '23.00' },
      { name: 'Maria', desc: 'Sauce tomate, fior di latte, roquette, jambon cru, grana padano', price: '24.00' },
      { name: 'Costiera', desc: 'Sauce tomate, fior di latte, fruits de mer, gambas, ail, origan', price: '24.00' },
      { name: 'Calzone Napoletano', desc: 'Pizza farcie : ricotta, sauce tomate, fior di latte, jambon cuit, salame', price: '24.00' },
      { name: 'Pizza Fritta', desc: 'Pizza frite farcie : ricotta, sauce tomate, fior di latte, jambon cuit, salame', price: '24.00' },
      { name: 'Regina', desc: 'Sauce tomate, fior di latte, bufala, tomates cerises', price: '25.00' }
    ]
  },
  {
    id: 'speciales',
    label: 'Pizzas spéciales',
    intro: 'Les créations de Luigi. L’amore per Napoli in ogni pizza.',
    items: [
      { name: 'Bulle', desc: 'Fior di latte, Vacherin, Gruyère râpé, lard fumé — sans tomate', price: '26.00' },
      { name: 'Sorpresa', desc: 'Sauce tomate, fior di latte, aubergines, ’nduja, mascarpone, grana padano', price: '26.00' },
      { name: 'Bella Napoli', desc: 'Fior di latte, saucisse de porc, friarielli (cime di rapa) — sans tomate', price: '27.00', tag: 'Signature' },
      { name: 'Gabrielino', desc: 'Base ricotta, fior di latte, ’nduja, lard fumé, oignons caramélisés', price: '27.00' },
      { name: 'Maradona', desc: 'Sauce tomate, fior di latte, pesto, burrata, tomates cerises', price: '28.00' },
      { name: 'La mano di Dio', desc: 'Sauce tomate, fior di latte, saucisse de porc, aubergines, bufala', price: '28.00' },
      { name: 'King', desc: 'Crème à la truffe, fior di latte, saucisse de porc, burrata, tomates cerises — sans tomate', price: '28.50' },
      { name: 'Mamma mia', desc: 'Sauce tomate, fior di latte, carpaccio de bœuf, roquette, grana padano, huile à la truffe', price: '28.50' },
      { name: 'Antonella', desc: 'Crème de pistache, fior di latte, mortadella, burrata, pistache concassée — sans tomate', price: '28.50', tag: 'Coup de cœur' },
      { name: 'Joyce', desc: 'Sauce tomate, fior di latte, carpaccio de bœuf, burrata, pesto, grana padano', price: '29.00' },
      { name: 'Serenata napoletana', desc: 'Base pesto, fior di latte, jambon cru, tomates cerises, bufala', price: '29.00' }
    ]
  },
  {
    id: 'propositions',
    label: 'Nos propositions',
    intro: 'Les assiettes de la maison, à côté des pizzas.',
    items: [
      { name: 'Carpaccio de bœuf', desc: 'Roquette, tomates cerises, grana padano, huile aromatisée à la truffe, frites', price: '24.00' },
      { name: 'Lasagne maison', price: '25.00' },
      { name: 'Sapori di Napoli', desc: 'Beignets de pâte à pizza frits, roquette, jambon cru, tomates cerises, olives, bufala ou burrata au choix', price: '26.00' },
      { name: 'Tartare de bœuf 200 g', desc: 'Frites, beurre, toast · supplément cognac +2 CHF', price: '31.00' }
    ]
  },
  {
    id: 'pates',
    label: 'Pâtes',
    intro: 'Pâtes marquées * également disponibles sans gluten.',
    items: [
      { name: 'Penne ou spaghetti', desc: 'Sauce tomate ou pesto *', price: '18.00' },
      { name: 'Penne arrabbiata', desc: 'Sauce tomate, piment *', price: '20.00' },
      { name: 'Gnocchi sorrentina', desc: 'Sauce tomate, mozzarella, basilic', price: '24.00' },
      { name: 'Gnocchi quattro formaggi', desc: 'Grana padano, taleggio, gorgonzola, crème', price: '25.00' },
      { name: 'Tagliatelles au saumon', desc: 'Crème, oignons, saumon fumé', price: '25.00' },
      { name: 'Penne ou spaghetti bolognaise', desc: 'Sauce bolognaise *', price: '26.00' },
      { name: 'Spaghetti carbonara italiana', desc: 'Guanciale, œuf, pecorino romano *', price: '26.00' },
      { name: 'Penne amatriciana', desc: 'Sauce tomate, guanciale *', price: '26.00' },
      { name: 'Paccheri allo scoglio', desc: 'Mélange de fruits de mer, tomates cerises, gambas', price: '28.00' },
      { name: 'Tagliatelle mare e monti', desc: 'Crème, gambas, morilles', price: '28.00' }
    ]
  },
  {
    id: 'entrees',
    label: 'Entrées',
    intro: 'À partager, ou pour commencer.',
    items: [
      { name: 'Bruschetta (1 pièce)', desc: 'Tomate, ail, huile d’olive, origan, basilic', price: '2.50' },
      { name: 'Portion de frites', price: '7.00' },
      { name: 'Salade verte', price: '7.00' },
      { name: 'Salade mêlée', price: '9.00' },
      { name: 'Focaccia', desc: 'Huile d’olive, origan, grana padano · jambon cru +3 CHF', price: '11.00' },
      { name: 'Caprese', desc: 'Tomate, basilic, mozzarella di bufala ou burrata au choix', price: '12.00' },
      { name: 'Poker de montanare — Classique', desc: '4 montanarie à la sauce tomate, grana padano et basilic', price: '13.00' },
      { name: 'Poker de montanare — Misto', desc: '4 montanarie à la burrata : mortadella & pistache · jambon cru, pesto & grana · bacon & oignon caramélisé · ’nduja', price: '17.00', tag: 'À partager' }
    ]
  },
  {
    id: 'enfants',
    label: 'Menu enfant',
    intro: 'Pour les petits pizzaioli.',
    items: [
      { name: 'Chicken nuggets', desc: 'Avec frites', price: '13.00' },
      { name: 'Pizza Bugs Bunny', desc: 'En forme de lapin, jambon cuit', price: '13.00' },
      { name: 'Pizza Cœur', desc: 'En forme de cœur', price: '13.00' },
      { name: 'Penne ou spaghetti 80 g', desc: 'Sauce tomate ou pesto', price: '13.00' }
    ]
  }
];
