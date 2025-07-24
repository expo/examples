const jokes = [
  {
    id: 0,
    question: "Why did the chicken cross the road?",
    answer: "To get to the other side.",
  },
  {
    id: 1,
    question: "Why don't skeletons fight each other?",
    answer: "They don't have the guts.",
  },
  {
    id: 2,
    question: "What do you call a snowman with a six-pack?",
    answer: "An abdominal snowman.",
  },
  {
    id: 3,
    question: "Why did the scarecrow win an award?",
    answer: "Because he was outstanding in his field.",
  },
  {
    id: 4,
    question: "What do elves learn at school?",
    answer: "The elf-abet.",
  },
  {
    id: 5,
    question: "Why was the math book sad?",
    answer: "Because it had too many problems.",
  },
  {
    id: 6,
    question: "What do you get if you eat Christmas decorations?",
    answer: "Tinselitis!",
  },
  { id: 7, question: "Why was the broom late?", answer: "It swept in." },
  {
    id: 8,
    question: "What's orange and sounds like a parrot?",
    answer: "A carrot.",
  },
  {
    id: 9,
    question: "Why don't eggs tell jokes?",
    answer: "They'd crack each other up.",
  },
  {
    id: 10,
    question: "What do you call a bear with no teeth?",
    answer: "A gummy bear.",
  },
  {
    id: 11,
    question: "How do you organize a space party?",
    answer: "You planet.",
  },
  {
    id: 12,
    question: "What do you get when you cross a snowman with a dog?",
    answer: "Frostbite.",
  },
  {
    id: 13,
    question: "Why did the golfer bring two pairs of trousers?",
    answer: "In case he got a hole in one.",
  },
  { id: 14, question: "What do you call a fish with no eyes?", answer: "Fsh." },
  {
    id: 15,
    question: "Why did the banana go to the doctor?",
    answer: "Because it wasn't peeling well.",
  },
  {
    id: 16,
    question: "Why can't your nose be 12 inches long?",
    answer: "Because then it would be a foot.",
  },
  {
    id: 17,
    question: "What do you call a dog magician?",
    answer: "A labracadabrador.",
  },
  {
    id: 18,
    question: "What happens to a frog's car when it breaks down?",
    answer: "It gets toad away.",
  },
  {
    id: 19,
    question: "Why do cows wear bells?",
    answer: "Because their horns don't work.",
  },
  {
    id: 20,
    question: "What do you call cheese that isn't yours?",
    answer: "Nacho cheese.",
  },
  {
    id: 21,
    question: "What did the traffic light say to the car?",
    answer: "Don't look! I'm changing.",
  },
  {
    id: 22,
    question: "Why did the tomato blush?",
    answer: "Because it saw the salad dressing.",
  },
  {
    id: 23,
    question: "How do you make a tissue dance?",
    answer: "You put a little boogie in it.",
  },
  {
    id: 24,
    question: "What do you call a boomerang that doesn't come back?",
    answer: "A stick.",
  },
  {
    id: 25,
    question: "Why did the cookie go to the hospital?",
    answer: "Because it felt crummy.",
  },
  {
    id: 26,
    question: "What do you call a sleeping bull?",
    answer: "A bulldozer.",
  },
  {
    id: 27,
    question: "Why was the computer cold?",
    answer: "It left its Windows open.",
  },
  {
    id: 28,
    question: "What kind of music do mummies listen to?",
    answer: "Wrap music.",
  },
  {
    id: 29,
    question: "Why did the bicycle fall over?",
    answer: "Because it was two-tired.",
  },
  {
    id: 30,
    question: "Why can't you give Elsa a balloon?",
    answer: "Because she'll let it go.",
  },
  {
    id: 31,
    question: "Why are ghosts bad at lying?",
    answer: "Because they are too transparent.",
  },
  {
    id: 32,
    question: "Why did the man run around his bed?",
    answer: "Because he was trying to catch up on his sleep!",
  },
  { id: 33, question: "What's brown and sticky?", answer: "A stick." },
  {
    id: 34,
    question: "How do cows stay up to date?",
    answer: "They read the moos-paper.",
  },
  {
    id: 35,
    question: "What did one wall say to the other?",
    answer: "I'll meet you at the corner.",
  },
  {
    id: 36,
    question: "Why don't some couples go to the gym?",
    answer: "Because some relationships don't work out.",
  },
  {
    id: 37,
    question: "What do you call an alligator in a vest?",
    answer: "An investigator.",
  },
  {
    id: 38,
    question: "What do you call a group of musical whales?",
    answer: "An orca-stra.",
  },
  {
    id: 39,
    question: "Why did the cow win an award?",
    answer: "Because she was outstanding in her field.",
  },
  {
    id: 40,
    question: "Why do birds fly south for the winter?",
    answer: "Because it's too far to walk.",
  },
  {
    id: 41,
    question: "Why did the mushroom go to the party?",
    answer: "Because he was a fungi.",
  },
  {
    id: 42,
    question: "What's a skeleton's least favorite room?",
    answer: "The living room.",
  },
  {
    id: 43,
    question: "Why did the music teacher go to jail?",
    answer: "Because she got caught with too many notes.",
  },
  {
    id: 44,
    question: "What do you call a pig that knows karate?",
    answer: "A pork chop.",
  },
  {
    id: 45,
    question: "Why can't you trust an atom?",
    answer: "Because they make up everything.",
  },
  {
    id: 46,
    question: "How do you catch a squirrel?",
    answer: "Climb a tree and act like a nut.",
  },
  {
    id: 47,
    question: "What do you get if you cross a vampire with a snowman?",
    answer: "Frostbite.",
  },
  { id: 48, question: "What's a cat's favorite color?", answer: "Purr-ple." },
  {
    id: 49,
    question: "What did the janitor say when he jumped out of the closet?",
    answer: "Supplies!",
  },
  {
    id: 50,
    question: "Why did the grape stop in the middle of the road?",
    answer: "Because it ran out of juice.",
  },
  {
    id: 51,
    question: "How do you make holy water?",
    answer: "You boil the hell out of it.",
  },
  {
    id: 52,
    question: "What do you get when you cross a fish and an elephant?",
    answer: "Swimming trunks.",
  },
  {
    id: 53,
    question: "Why did the stadium get hot after the game?",
    answer: "All the fans left.",
  },
  {
    id: 54,
    question: "What happens when frogs park illegally?",
    answer: "They get toad.",
  },
  {
    id: 55,
    question: "What do you call a cow with no legs?",
    answer: "Ground beef.",
  },
  {
    id: 56,
    question: "What kind of shoes do ninjas wear?",
    answer: "Sneakers.",
  },
  {
    id: 57,
    question: "Why don't scientists trust stairs?",
    answer: "Because they're always up to something.",
  },
  {
    id: 58,
    question: "What did one plate say to the other?",
    answer: "Lunch is on me.",
  },
  {
    id: 59,
    question: "How does the moon cut its hair?",
    answer: "Eclipse it.",
  },
  {
    id: 60,
    question: "What do you call a deer with no eyes?",
    answer: "No eye-deer.",
  },
  {
    id: 61,
    question: "What kind of tree fits in your hand?",
    answer: "A palm tree.",
  },
  {
    id: 62,
    question: "Why did the chicken sit on the egg?",
    answer: "Because it wanted to hatch a plan.",
  },
  {
    id: 63,
    question: "What's red and bad for your teeth?",
    answer: "A brick.",
  },
  {
    id: 64,
    question: "Why do bananas never feel lonely?",
    answer: "Because they hang out in bunches.",
  },
  {
    id: 65,
    question: "Why did the teddy bear say no to dessert?",
    answer: "Because it was stuffed.",
  },
  {
    id: 66,
    question: "Why couldn't the leopard play hide and seek?",
    answer: "Because he was always spotted.",
  },
  {
    id: 67,
    question: "What do you call a sad strawberry?",
    answer: "A blueberry.",
  },
  {
    id: 68,
    question: "Why don't pirates take a shower before they walk the plank?",
    answer: "Because they'll just wash up on shore.",
  },
  {
    id: 69,
    question: "Why was the belt arrested?",
    answer: "For holding up a pair of pants.",
  },
  {
    id: 70,
    question: "Why don't oysters share their pearls?",
    answer: "Because they're shellfish.",
  },
  {
    id: 71,
    question: "What do you call an owl that does magic?",
    answer: "Hoo-dini.",
  },
  {
    id: 72,
    question: "Why was the calendar always tired?",
    answer: "Because it had too many dates.",
  },
  {
    id: 73,
    question: "Why did the pony get sent to his room?",
    answer: "He wouldn't stop horsing around.",
  },
  {
    id: 74,
    question: "What do you call a pile of cats?",
    answer: "A meowtain.",
  },
  {
    id: 75,
    question: "Why did the baker go to therapy?",
    answer: "He kneaded it.",
  },
  {
    id: 76,
    question: "What do you call a fake noodle?",
    answer: "An impasta.",
  },
  {
    id: 77,
    question: "Why did the crab never share?",
    answer: "Because he was a little shellfish.",
  },
  {
    id: 78,
    question: "What do you call a dinosaur with an extensive vocabulary?",
    answer: "A thesaurus.",
  },
  {
    id: 79,
    question: "How do you stop a bull from charging?",
    answer: "Cancel its credit card.",
  },
  {
    id: 80,
    question: "Why are elevator jokes so good?",
    answer: "They work on many levels.",
  },
  {
    id: 81,
    question: "What does a lemon say when it answers the phone?",
    answer: "Yellow!",
  },
  {
    id: 82,
    question: "Why was the skeleton afraid of the party?",
    answer: "He had no body to go with.",
  },
  {
    id: 83,
    question: "What's the best thing about Switzerland?",
    answer: "I don't know, but the flag is a big plus.",
  },
  {
    id: 84,
    question: "Why don't ducks grow up?",
    answer: "Because they quack under pressure.",
  },
  {
    id: 85,
    question: "Why did the shoe go to school?",
    answer: "To become a sneakerhead.",
  },
  {
    id: 86,
    question: "What did one hat say to the other?",
    answer: "You stay here. I'll go on ahead.",
  },
  {
    id: 87,
    question: "Why can't your hand be 12 inches long?",
    answer: "Because then it would be a foot.",
  },
  {
    id: 88,
    question: "Why do cows have hooves instead of feet?",
    answer: "Because they lactose.",
  },
  {
    id: 89,
    question: "Why did the frog take the bus?",
    answer: "Because his car got toad.",
  },
  {
    id: 90,
    question: "Why did the fish blush?",
    answer: "Because it saw the ocean's bottom.",
  },
  {
    id: 91,
    question: "How do you make an octopus laugh?",
    answer: "With ten-tickles.",
  },
];

export const getRandomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
};
